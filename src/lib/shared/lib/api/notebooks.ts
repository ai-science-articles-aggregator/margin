import apiClient, { API_URL } from './client';
import { refreshAccessToken } from './auth';
import type { AxiosResponse } from 'axios';
import type { AreaShort } from './areas';
import type { TagShort } from './tags';

// ─── Types ──────────────────────────────────────────────────────────────────

export type Visibility = 'private' | 'shared' | 'public';

export interface SharedBy {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
}

/** Response shape from GET /notebooks and GET /notebooks/:id */
export interface NotebookListItem {
	id: string;
	name: string;
	description: string | null;
	area: AreaShort | null;
	tags: TagShort[];
	visibility: Visibility;
	is_owner: boolean;
	shared_by: SharedBy | null;
	sources_count: number;
	notes_count: number;
	created_at: string;
	updated_at: string;
}

export interface NotebookCreate {
	name: string;
	description?: string;
	area_id?: string | null;
	tags?: string[];
	visibility?: Visibility;
}

export interface NotebookListQuery {
	owned_only?: boolean;
	shared_only?: boolean;
	visibility?: Visibility;
	area_id?: string;
	q?: string;
	tags?: string[];
	tags_op?: 'and' | 'or';
}

// ─── CRUD ────────────────────────────────────────────────────────────────────

export async function getNotebooks(
	query: NotebookListQuery = {}
): Promise<NotebookListItem[]> {
	const params: Record<string, string | boolean> = {};
	if (query.owned_only) params.owned_only = true;
	if (query.shared_only) params.shared_only = true;
	if (query.visibility) params.visibility = query.visibility;
	if (query.area_id) params.area_id = query.area_id;
	if (query.q) params.q = query.q;
	if (query.tags && query.tags.length > 0) params.tags = query.tags.join(',');
	if (query.tags_op) params.tags_op = query.tags_op;

	const response: AxiosResponse<NotebookListItem[]> = await apiClient.get(
		'/api/v1/notebooks',
		{ params }
	);
	return response.data;
}

export async function getNotebook(notebookId: string): Promise<NotebookListItem> {
	const response: AxiosResponse<NotebookListItem> = await apiClient.get(
		`/api/v1/notebooks/${notebookId}`
	);
	return response.data;
}

export async function createNotebook(
	data: NotebookCreate
): Promise<NotebookListItem> {
	const response: AxiosResponse<NotebookListItem> = await apiClient.post(
		'/api/v1/notebooks/create',
		data
	);
	return response.data;
}

export async function updateNotebook(
	notebookId: string,
	data: NotebookCreate
): Promise<NotebookListItem> {
	const response: AxiosResponse<NotebookListItem> = await apiClient.put(
		`/api/v1/notebooks/${notebookId}`,
		data
	);
	return response.data;
}

export async function deleteNotebook(notebookId: string): Promise<void> {
	await apiClient.delete(`/api/v1/notebooks/${notebookId}`);
}

// ─── RAG search proxy ───────────────────────────────────────────────────────

/** Result coming back from POST /notebooks/:id/search (proxied RAG hit) */
export interface ArticleResult {
	id: string;
	title?: string | null;
	authors?: string | null;
	score?: number;
}

export interface SearchResponse {
	query: string;
	articles: ArticleResult[];
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
	const response = await apiClient.post<SearchResponse>(
		`/api/v1/notebooks/${notebookId}/search`,
		{ query, top_k }
	);
	return response.data;
}

// ─── SSE stream (summarize) ─────────────────────────────────────────────────

export async function summarizeStream(
	notebookId: string,
	request: SummarizeRequest,
	onToken: (token: string) => void,
	onStatus?: (status: string) => void
): Promise<void> {
	const url = `${API_URL}/api/v1/notebooks/${notebookId}/summarize`;

	const init: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(request)
	};

	let response = await fetch(url, init);
	// One-shot retry on expired access token
	if (response.status === 401) {
		try {
			await refreshAccessToken();
			response = await fetch(url, init);
		} catch {
			redirectToLoginIfNeeded();
			throw new Error('Unauthorized');
		}
	}

	if (!response.ok || !response.body) throw new Error(`Summarize failed: ${response.status}`);

	await readSse(response.body, onToken, onStatus);
}

function redirectToLoginIfNeeded() {
	if (typeof window === 'undefined') return;
	const here = window.location.pathname + window.location.search;
	if (!here.startsWith('/auth/')) {
		window.location.assign(`/auth/login?redirect=${encodeURIComponent(here)}`);
	}
}

async function readSse(
	body: ReadableStream<Uint8Array>,
	onToken: (token: string) => void,
	onStatus?: (status: string) => void
): Promise<void> {
	const reader = body.getReader();
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
				const obj = JSON.parse(payload);
				if (typeof obj.token === 'string') onToken(obj.token);
				else if (typeof obj.status === 'string') onStatus?.(obj.status);
			} catch {
				/* ignore non-JSON tokens */
			}
		}
	}
}
