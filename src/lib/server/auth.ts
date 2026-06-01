import { redirect, type Cookies } from '@sveltejs/kit';

// NOTE: cookie names here must match what your backend's `set_access_cookies` /
// `set_refresh_cookies` actually set. If your fastapi-jwt-auth config keeps the
// defaults, change to 'access_token_cookie' / 'refresh_token_cookie'.
const ACCESS_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';

const REFRESH_URL = '/api/v1/auth/refresh';
const PROFILE_URL = '/api/v1/auth/profile';

type CookieOpts = Parameters<Cookies['set']>[2];

/** Parse a single Set-Cookie line into { name, value, opts for SvelteKit cookies.set }. */
function parseSetCookie(line: string): { name: string; value: string; opts: CookieOpts } | null {
	const parts = line.split(';').map((s) => s.trim());
	if (parts.length === 0) return null;
	const head = parts[0];
	const eq = head.indexOf('=');
	if (eq < 0) return null;
	const name = head.slice(0, eq);
	const value = head.slice(eq + 1);
	const opts: CookieOpts = { path: '/' };
	for (let i = 1; i < parts.length; i++) {
		const [rawK, ...rest] = parts[i].split('=');
		const k = rawK.toLowerCase().trim();
		const v = rest.join('=').trim();
		if (k === 'path') opts.path = v || '/';
		else if (k === 'domain') opts.domain = v;
		else if (k === 'max-age') opts.maxAge = parseInt(v, 10);
		else if (k === 'expires') opts.expires = new Date(v);
		else if (k === 'secure') opts.secure = true;
		else if (k === 'httponly') opts.httpOnly = true;
		else if (k === 'samesite') {
			const lv = v.toLowerCase();
			if (lv === 'lax' || lv === 'strict' || lv === 'none') opts.sameSite = lv;
		}
	}
	return { name, value, opts };
}

/**
 * Server-side token refresh. Calls /auth/refresh with current cookies (forwarded
 * by SvelteKit's event.fetch), parses Set-Cookie from the response, and pushes
 * the new cookies onto SvelteKit's outgoing response via cookies.set().
 * Returns true on success; false if refresh endpoint rejected.
 */
async function tryServerRefresh(
	fetch: typeof globalThis.fetch,
	cookies: Cookies
): Promise<boolean> {
	try {
		const res = await fetch(REFRESH_URL, { method: 'POST' });
		if (!res.ok) {
			console.warn('[ssr-auth] /refresh status', res.status);
			return false;
		}
		const setCookies: string[] = (res.headers as unknown as { getSetCookie?: () => string[] })
			.getSetCookie
			? (res.headers as unknown as { getSetCookie: () => string[] }).getSetCookie()
			: res.headers.get('set-cookie')
				? [res.headers.get('set-cookie') as string]
				: [];
		for (const line of setCookies) {
			const parsed = parseSetCookie(line);
			if (!parsed) continue;
			cookies.set(parsed.name, parsed.value, parsed.opts);
		}
		return true;
	} catch (e) {
		console.warn('[ssr-auth] /refresh exception', e);
		return false;
	}
}

export interface AuthedLoad {
	token: string | undefined;
	profile: unknown;
}

/**
 * Use inside `+layout.server.ts` / `+page.server.ts` to require an authenticated
 * user. Fetches /auth/profile. On 401/422 attempts a single /auth/refresh, then
 * retries. If all fails, deletes auth cookies and redirects to /auth/login with
 * `redirect` param.
 */
export async function requireAuth(
	fetch: typeof globalThis.fetch,
	cookies: Cookies,
	currentPath: string
): Promise<AuthedLoad> {
	async function fetchProfile(): Promise<Response> {
		const headers: Record<string, string> = {};
		const token = cookies.get(ACCESS_COOKIE);
		if (token) headers['Authorization'] = `Bearer ${token}`;
		return fetch(PROFILE_URL, { method: 'GET', headers });
	}

	let profile: unknown = null;
	let res = await fetchProfile();

	if ((res.status === 401 || res.status === 422) && cookies.get(REFRESH_COOKIE)) {
		console.info('[ssr-auth] profile', res.status, '— attempting refresh');
		const ok = await tryServerRefresh(fetch, cookies);
		if (ok) {
			console.info('[ssr-auth] refresh OK, retrying profile');
			res = await fetchProfile();
		}
	}

	if (res.ok) {
		profile = await res.json();
	} else {
		console.warn('[ssr-auth] profile final status', res.status, '— bumping to login');
		cookies.delete(ACCESS_COOKIE, { path: '/' });
		cookies.delete(REFRESH_COOKIE, { path: '/' });
		throw redirect(302, `/auth/login?redirect=${encodeURIComponent(currentPath)}`);
	}

	return { token: cookies.get(ACCESS_COOKIE), profile };
}
