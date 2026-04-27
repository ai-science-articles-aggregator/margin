import axios, { type AxiosInstance, type AxiosError } from 'axios';

export const API_URL = import.meta.env.DEV
	? ''
	: import.meta.env.VITE_API_URL || 'http://192.168.1.177:8000';

export const apiClient: AxiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			console.warn('Unauthorized: redirect to login');
		}
		return Promise.reject(error);
	}
);

export default apiClient;
