import apiClient from './client';
import type { AxiosResponse } from 'axios';

export type PaletteKey =
	| 'sienna'
	| 'moss'
	| 'azure'
	| 'plum'
	| 'ochre'
	| 'teal'
	| 'rose'
	| 'forest'
	| 'slate'
	| 'amber';

export const PALETTE_KEYS: PaletteKey[] = [
	'sienna',
	'moss',
	'azure',
	'plum',
	'ochre',
	'teal',
	'rose',
	'forest',
	'slate',
	'amber'
];

export interface AreaShort {
	id: string;
	slug: string;
	name: string;
	palette_key: PaletteKey;
}

export interface AreaRead extends AreaShort {
	created_at: string;
}

export interface AreaCreatePayload {
	name: string;
	palette_key?: PaletteKey;
}

export interface AreaUpdatePayload {
	name?: string;
	palette_key?: PaletteKey;
}

export async function getAreas(): Promise<AreaRead[]> {
	const r: AxiosResponse<AreaRead[]> = await apiClient.get('/api/v1/areas');
	return r.data;
}

export async function createArea(data: AreaCreatePayload): Promise<AreaRead> {
	const r: AxiosResponse<AreaRead> = await apiClient.post('/api/v1/areas', data);
	return r.data;
}

export async function updateArea(
	id: string,
	data: AreaUpdatePayload
): Promise<AreaRead> {
	const r: AxiosResponse<AreaRead> = await apiClient.patch(
		`/api/v1/areas/${id}`,
		data
	);
	return r.data;
}

export async function deleteArea(id: string): Promise<void> {
	await apiClient.delete(`/api/v1/areas/${id}`);
}
