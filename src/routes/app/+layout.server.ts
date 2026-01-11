import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	// TODO: integrate with backend - verify JWT token with backend API
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(302, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	// TODO: integrate with backend - validate token with backend
	// Можно добавить проверку валидности токена через API:
	// const isValid = await validateToken(token);
	// if (!isValid) {
	//   cookies.delete('authToken');
	//   throw redirect(302, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
	// }

	return {
		token
	};
};
