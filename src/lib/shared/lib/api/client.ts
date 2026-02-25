import axios, { type AxiosInstance, type AxiosError } from 'axios';

// В dev режиме используем прокси из vite.config.ts (относительный путь)
// В production используем полный URL из env
const API_URL =
	import.meta.env.DEV
		? '' // Используем прокси в dev режиме
		: import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient: AxiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Для работы с cookies
});

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			// Перенаправляем на страницу логина если не авторизован
			// В SvelteKit это можно сделать через goto('/auth/login')
			// но лучше обрабатывать на уровне layout или компонента
			console.warn('Unauthorized: redirect to login');
		}
		return Promise.reject(error);
	}
);

export default apiClient;
