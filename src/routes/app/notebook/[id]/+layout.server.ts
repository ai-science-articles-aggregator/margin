import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, params, fetch }) => {
	const accessToken = cookies.get('access_token');
	const notebookId = params.id;

	if (!accessToken) {
		throw redirect(302, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	// Получаем данные профиля пользователя
	let profile = null;
	try {
		const response = await fetch('/api/v1/auth/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.ok) {
			profile = await response.json();
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('Profile API error:', response.status, errorData);

			if (response.status === 401) {
				cookies.delete('access_token', { path: '/' });
				throw redirect(302, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
			}
		}
	} catch (error) {
		console.error('Profile load error:', error);
		throw redirect(302, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	// Если это страница notebook, загружаем его данные
	let notebook = null;
	if (notebookId) {
		try {
			const response = await fetch(`/api/v1/notebooks/${notebookId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				notebook = await response.json();
			}
		} catch (error) {
			console.error('Notebook load error:', error);
		}
	}

	return {
		token: accessToken,
		profile,
		notebook
	};
};
