import apiClient from './client';
import type { AxiosResponse } from 'axios';

export interface Note {
	id: string;
	title: string;
	body: string;
	created_at: string;
	updated_at: string;
}

export interface NoteWrite {
	title?: string;
	body?: string;
}

export async function listNotes(notebookId: string): Promise<Note[]> {
	const r: AxiosResponse<Note[]> = await apiClient.get(
		`/api/v1/notebooks/${notebookId}/notes`
	);
	return r.data;
}

export async function createNote(
	notebookId: string,
	data: NoteWrite
): Promise<Note> {
	const r: AxiosResponse<Note> = await apiClient.post(
		`/api/v1/notebooks/${notebookId}/notes`,
		data
	);
	return r.data;
}

export async function updateNote(
	notebookId: string,
	noteId: string,
	data: NoteWrite
): Promise<Note> {
	const r: AxiosResponse<Note> = await apiClient.patch(
		`/api/v1/notebooks/${notebookId}/notes/${noteId}`,
		data
	);
	return r.data;
}

export async function deleteNote(
	notebookId: string,
	noteId: string
): Promise<void> {
	await apiClient.delete(`/api/v1/notebooks/${notebookId}/notes/${noteId}`);
}
