import apiClient from './client';
import type { AxiosResponse } from 'axios';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	access_token?: string;
	token?: string;
	message?: string;
	user?: {
		id: string;
		email: string;
		username?: string;
	};
}

export interface RegisterRequest {
	email: string;
	password: string;
	username?: string;
}

export interface RegisterResponse {
	message?: string;
	user?: {
		id: string;
		email: string;
		username?: string;
	};
}

/**
 * Авторизация пользователя
 * @param credentials - email и password
 * @returns Данные пользователя и токен
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
	try {
		const response: AxiosResponse<LoginResponse> = await apiClient.post(
			'/api/v1/auth/login',
			credentials
		);

		// TODO: integrate with backend - токен должен устанавливаться в httpOnly cookie сервером
		// Если токен приходит в ответе, можно сохранить его (но лучше через cookie)
		if (response.data.access_token || response.data.token) {
			// Токен должен устанавливаться сервером в cookie
			// Если нужно сохранить на клиенте (не рекомендуется для production):
			// localStorage.setItem('authToken', response.data.access_token || response.data.token);
		}

		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Регистрация нового пользователя
 * @param data - email, password, username (опционально)
 * @returns Данные пользователя
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
	try {
		const response: AxiosResponse<RegisterResponse> = await apiClient.post(
			'/api/v1/auth/register',
			data
		);

		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Выход из системы
 */
export async function logout(): Promise<void> {
	try {
		await apiClient.post('/api/v1/auth/logout');
		// TODO: integrate with backend - очистка cookie должна происходить на сервере
	} catch (error) {
		throw error;
	}
}
