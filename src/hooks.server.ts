import type { HandleFetch } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

// Внутренний адрес backend для server-side вызовов (SSR). На клиенте /api роутит
// nginx (прод) или vite-прокси (dev); на сервере их нет — ходим в backend напрямую.
// Адрес выбирается по окружению автоматически, override через API_INTERNAL_URL:
//   - dev  (vite dev)       → http://localhost:8000  (backend на хосте)
//   - прод (сборка, docker) → http://backend:8000    (docker-сеть citadel)
const API_INTERNAL_URL =
	env.API_INTERNAL_URL || (dev ? 'http://localhost:8000' : 'http://backend:8000');

/**
 * Серверный event.fetch('/api/...') по умолчанию обрабатывается самим
 * SvelteKit-сервером (нет такого роута → 404). Переписываем такие запросы
 * напрямую в backend. При смене origin SvelteKit перестаёт автоматически
 * форвардить куки — прокидываем заголовок Cookie вручную.
 */
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const url = new URL(request.url);
	if (url.pathname.startsWith('/api/')) {
		const target = new URL(url.pathname + url.search, API_INTERNAL_URL);
		const proxied = new Request(target, request);
		const cookie = event.request.headers.get('cookie');
		if (cookie) proxied.headers.set('cookie', cookie);
		return fetch(proxied);
	}
	return fetch(request);
};
