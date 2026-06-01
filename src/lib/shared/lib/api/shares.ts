import apiClient from './client';
import type { AxiosResponse } from 'axios';

export type ShareRole = 'viewer' | 'commenter' | 'editor';

export interface ShareUser {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
}

export interface ShareRead {
	notebook_id: string;
	user: ShareUser;
	role: ShareRole;
	area_id: string | null;
	created_at: string;
}

export interface ShareCreatePayload {
	user_id?: string;
	user_email?: string;
	role?: ShareRole;
}

export async function listShares(notebookId: string): Promise<ShareRead[]> {
	const r: AxiosResponse<ShareRead[]> = await apiClient.get(
		`/api/v1/notebooks/${notebookId}/shares`
	);
	return r.data;
}

export async function addShare(
	notebookId: string,
	payload: ShareCreatePayload
): Promise<ShareRead> {
	const r: AxiosResponse<ShareRead> = await apiClient.post(
		`/api/v1/notebooks/${notebookId}/shares`,
		payload
	);
	return r.data;
}

export async function removeShare(
	notebookId: string,
	userId: string
): Promise<void> {
	await apiClient.delete(`/api/v1/notebooks/${notebookId}/shares/${userId}`);
}

/** Recipient updates their own area binding for a shared notebook. */
export async function updateMyShare(
	notebookId: string,
	areaId: string | null
): Promise<ShareRead> {
	const r: AxiosResponse<ShareRead> = await apiClient.patch(
		`/api/v1/notebooks/${notebookId}/shares/me`,
		{ area_id: areaId }
	);
	return r.data;
}
