import { requireAuth } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, fetch, params }) => {
	const auth = await requireAuth(fetch, cookies, url.pathname);

	// Fetch notebook details using the (possibly refreshed) access token
	const notebookId = params.id;
	let notebook = null;
	if (notebookId && auth.token) {
		try {
			const res = await fetch(`/api/v1/notebooks/${notebookId}`, {
				method: 'GET',
				headers: { Authorization: `Bearer ${auth.token}` }
			});
			if (res.ok) notebook = await res.json();
		} catch (err) {
			console.warn('[ssr] notebook load error', err);
		}
	}

	return {
		token: auth.token,
		profile: auth.profile,
		notebook
	};
};
