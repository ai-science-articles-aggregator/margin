import apiClient, { API_URL } from './client';
import type { AxiosResponse } from 'axios';

export interface Notebook {
	id: string;
	user_id: string;
	name: string;
	description: string | null;
	created_at: string;
	updated_at: string;
}

export interface NotebookCreate {
	name: string;
	description?: string;
}

export interface NotebookListResponse {
	id: string;
	name: string;
	description: string | null;
	created_at: string;
	updated_at: string;
}

/**
 * Получить все ноутбуки пользователя
 * @returns Список ноутбуков
 */
export async function getNotebooks(): Promise<NotebookListResponse[]> {
	try {
		const response: AxiosResponse<NotebookListResponse[]> =
			await apiClient.get('/api/v1/notebooks/');
		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Получить конкретный ноутбук по ID
 * @param notebookId - UUID ноутбука
 * @returns Данные ноутбука
 */
export async function getNotebook(notebookId: string): Promise<Notebook> {
	try {
		const response: AxiosResponse<Notebook> = await apiClient.get(
			`/api/v1/notebooks/${notebookId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Создать новый ноутбук
 * @param data - название и описание
 * @returns Созданный ноутбук
 */
export async function createNotebook(data: NotebookCreate): Promise<Notebook> {
	try {
		const response: AxiosResponse<Notebook> = await apiClient.post(
			'/api/v1/notebooks/create',
			data
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Обновить ноутбук
 * @param notebookId - UUID ноутбука
 * @param data - новые данные
 * @returns Обновленный ноутбук
 */
export async function updateNotebook(notebookId: string, data: NotebookCreate): Promise<Notebook> {
	try {
		const response: AxiosResponse<Notebook> = await apiClient.put(
			`/api/v1/notebooks/${notebookId}`,
			data
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}

/**
 * Удалить ноутбук
 * @param notebookId - UUID ноутбука
 */
export async function deleteNotebook(notebookId: string): Promise<void> {
	try {
		await apiClient.delete(`/api/v1/notebooks/${notebookId}`);
	} catch (error) {
		throw error;
	}
}

// --- Search & Summarize ---

export interface Article {
	id: string;
	title: string;
	authors: string;
	score: number;
}

export interface SearchResponse {
	query: string;
	articles: Article[];
}

export interface SummarizeRequest {
	article_ids: string[];
	query: string;
}

export async function searchArticles(
	notebookId: string,
	query: string,
	top_k = 10
): Promise<SearchResponse> {
	const response = await apiClient.post<SearchResponse>(`/api/v1/notebooks/${notebookId}/search`, {
		query,
		top_k
	});
	return response.data;
}

export async function summarizeStream(
	notebookId: string,
	request: SummarizeRequest,
	onToken: (token: string) => void
): Promise<void> {
	const response = await fetch(`${API_URL}/api/v1/notebooks/${notebookId}/summarize`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(request)
	});

	if (!response.ok || !response.body) throw new Error(`Summarize failed: ${response.status}`);

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split('\n');
		buffer = lines.pop() ?? '';

		for (const line of lines) {
			if (!line.startsWith('data: ')) continue;
			const payload = line.slice(6).trim();
			if (payload === '[DONE]') return;
			try {
				const { token } = JSON.parse(payload);
				onToken(token);
			} catch {}
		}
	}
}
