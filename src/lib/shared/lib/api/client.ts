import axios, {
	type AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig
} from 'axios';

export const API_URL = import.meta.env.DEV
	? ''
	: import.meta.env.VITE_API_URL || 'http://192.168.1.177:8000';

const apiClient: AxiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});

const REFRESH_URL = '/api/v1/auth/refresh';
const LOGIN_URL = '/api/v1/auth/login';
const LOGOUT_URL = '/api/v1/auth/logout';

// ─── 401 → refresh → retry ────────────────────────────────────────────────────
let inflightRefresh: Promise<void> | null = null;

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

function redirectToLogin() {
	if (typeof window === 'undefined') return;
	const here = window.location.pathname + window.location.search;
	if (here.startsWith('/auth/')) return;
	console.warn('[auth] redirecting to login from', here);
	window.location.assign(`/auth/login?redirect=${encodeURIComponent(here)}`);
}

async function performRefresh(): Promise<void> {
	if (!inflightRefresh) {
		console.info('[auth] access token expired — attempting refresh');
		inflightRefresh = apiClient
			.post(REFRESH_URL, {}, { _retry: true } as RetryConfig)
			.then((res) => {
				console.info('[auth] refresh OK', res.status);
				return undefined;
			})
			.catch((err: AxiosError) => {
				console.warn(
					'[auth] refresh failed',
					'status=',
					err.response?.status,
					'body=',
					err.response?.data
				);
				throw err;
			})
			.finally(() => {
				inflightRefresh = null;
			});
	}
	return inflightRefresh;
}

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const original = error.config as RetryConfig | undefined;
		const status = error.response?.status;

		// fastapi-jwt-auth raises 401 on expired tokens; some libs use 422 on
		// malformed jwt — handle both to be safe.
		const isAuthFail = status === 401 || status === 422;

		if (!isAuthFail || !original || original._retry) {
			return Promise.reject(error);
		}

		const url = original.url ?? '';
		// Don't try to refresh auth endpoints themselves
		if (url.includes(REFRESH_URL) || url.includes(LOGIN_URL) || url.includes(LOGOUT_URL)) {
			if (url.includes(REFRESH_URL)) redirectToLogin();
			return Promise.reject(error);
		}

		console.info('[auth]', status, 'on', url, '— will try refresh + retry');
		original._retry = true;
		try {
			await performRefresh();
		} catch (refreshErr) {
			redirectToLogin();
			return Promise.reject(refreshErr);
		}

		console.info('[auth] retrying', url);
		return apiClient(original);
	}
);

export default apiClient;
