import { requireAuth } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, fetch }) => {
	const auth = await requireAuth(fetch, cookies, url.pathname);
	return {
		token: auth.token,
		profile: auth.profile
	};
};
