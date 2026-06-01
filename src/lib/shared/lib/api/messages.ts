import apiClient, { API_URL } from './client';
import { refreshAccessToken } from './auth';
import type { AxiosResponse } from 'axios';

export interface ChatCitation {
	article_id: string;
	label: string;
	frag?: string;
}

export interface ChatMessage {
	id: string;
	role: 'user' | 'assistant' | 'system';
	text: string;
	citations: ChatCitation[];
	created_at: string;
}

export async function listMessages(
	notebookId: string
): Promise<ChatMessage[]> {
	const r: AxiosResponse<ChatMessage[]> = await apiClient.get(
		`/api/v1/notebooks/${notebookId}/messages`
	);
	return r.data;
}

/**
 * Send a chat message — backend responds with SSE-stream of assistant tokens.
 * `onToken` is called for each `data: { "token": "..." }` line.
 */
export async function sendMessageStream(
	notebookId: string,
	text: string,
	onToken: (token: string) => void
): Promise<void> {
	const url = `${API_URL}/api/v1/notebooks/${notebookId}/messages`;
	const init: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({ text })
	};

	let response = await fetch(url, init);
	if (response.status === 401) {
		try {
			await refreshAccessToken();
			response = await fetch(url, init);
		} catch {
			if (typeof window !== 'undefined') {
				const here = window.location.pathname + window.location.search;
				if (!here.startsWith('/auth/')) {
					window.location.assign(`/auth/login?redirect=${encodeURIComponent(here)}`);
				}
			}
			throw new Error('Unauthorized');
		}
	}

	if (!response.ok || !response.body) {
		throw new Error(`Send message failed: ${response.status}`);
	}

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
				const obj = JSON.parse(payload);
				if (typeof obj.token === 'string') onToken(obj.token);
			} catch {
				/* ignore */
			}
		}
	}
}
