import apiClient from './client';
import type { AxiosResponse } from 'axios';

export interface UserProfile {
	id: string;
	username: string;
	email: string;
	full_name: string | null;
	created_at: string;
	updated_at: string;
}

/**
 * Получить данные текущего пользователя
 * @returns Профиль пользователя
 */
export async function getProfile(): Promise<UserProfile> {
	try {
		const response: AxiosResponse<UserProfile> = await apiClient.get('/api/v1/auth/profile');
		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Обновить данные профиля пользователя
 * @param data - Данные для обновления (username, full_name, email)
 * @returns Обновлённый профиль
 */
export async function updateProfile(data: {
	username?: string;
	full_name?: string | null;
	email?: string;
}): Promise<UserProfile> {
	try {
		const response: AxiosResponse<UserProfile> = await apiClient.patch('/api/v1/auth/profile', data);
		return response.data;
	} catch (error) {
		throw error;
	}
}
