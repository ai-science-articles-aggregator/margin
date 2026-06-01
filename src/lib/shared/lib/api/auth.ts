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
	};
}

export interface RegisterRequest {
	email: string;
	first_name: string;
	last_name: string;
	department?: string;
	password: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
	const response: AxiosResponse<LoginResponse> = await apiClient.post(
		'/api/v1/auth/login',
		credentials
	);
	return response.data;
}

export async function register(data: RegisterRequest): Promise<LoginResponse> {
	const response: AxiosResponse<LoginResponse> = await apiClient.post(
		'/api/v1/auth/register',
		data
	);
	return response.data;
}

export async function logout(): Promise<void> {
	await apiClient.post('/api/v1/auth/logout');
}

/**
 * Ask backend to mint a new access_token using the refresh_token cookie.
 * Backend is expected to set a fresh httpOnly access_token cookie on success.
 * Throws if the refresh token itself is invalid/expired.
 */
export async function refreshAccessToken(): Promise<void> {
	await apiClient.post('/api/v1/auth/refresh');
}
