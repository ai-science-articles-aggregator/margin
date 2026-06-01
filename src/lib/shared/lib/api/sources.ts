import apiClient from './client';
import type { AxiosResponse } from 'axios';

export interface NotebookSource {
	article_id: string;
	selected: boolean;
	added_at: string;
}

export async function listSources(
	notebookId: string
): Promise<NotebookSource[]> {
	const r: AxiosResponse<NotebookSource[]> = await apiClient.get(
		`/api/v1/notebooks/${notebookId}/sources`
	);
	return r.data;
}

export async function addSources(
	notebookId: string,
	articleIds: string[]
): Promise<NotebookSource[]> {
	const r: AxiosResponse<NotebookSource[]> = await apiClient.post(
		`/api/v1/notebooks/${notebookId}/sources`,
		{ article_ids: articleIds }
	);
	return r.data;
}

export async function setSourceSelected(
	notebookId: string,
	articleId: string,
	selected: boolean
): Promise<NotebookSource> {
	const r: AxiosResponse<NotebookSource> = await apiClient.patch(
		`/api/v1/notebooks/${notebookId}/sources/${encodeURIComponent(articleId)}`,
		{ selected }
	);
	return r.data;
}

export async function removeSource(
	notebookId: string,
	articleId: string
): Promise<void> {
	await apiClient.delete(
		`/api/v1/notebooks/${notebookId}/sources/${encodeURIComponent(articleId)}`
	);
}
