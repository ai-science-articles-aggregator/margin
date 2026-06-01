import apiClient from './client';
import type { AxiosResponse } from 'axios';

export interface TagShort {
	id: string;
	slug: string;
	name: string;
}

export interface TagWithCount extends TagShort {
	notebook_count: number;
}

export async function getTags(query?: string): Promise<TagWithCount[]> {
	const params = query ? { q: query } : undefined;
	const r: AxiosResponse<TagWithCount[]> = await apiClient.get('/api/v1/tags', {
		params
	});
	return r.data;
}

export async function renameTag(id: string, name: string): Promise<TagShort> {
	const r: AxiosResponse<TagShort> = await apiClient.patch(`/api/v1/tags/${id}`, {
		name
	});
	return r.data;
}

export async function deleteTag(id: string): Promise<void> {
	await apiClient.delete(`/api/v1/tags/${id}`);
}
