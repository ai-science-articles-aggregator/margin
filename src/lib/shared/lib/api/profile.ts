import apiClient from './client';
import type { AxiosResponse } from 'axios';

export interface NotifSettings {
	digest_weekly: boolean;
	new_citations: boolean;
	shared_activity: boolean;
}

export interface UserProfile {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	department: string | null;
	notif_settings?: NotifSettings;
	created_at: string;
	updated_at: string;
}

export interface ProfileUpdatePayload {
	first_name?: string;
	last_name?: string;
	department?: string | null;
	email?: string;
}

export async function updateProfile(data: ProfileUpdatePayload): Promise<UserProfile> {
	const response: AxiosResponse<UserProfile> = await apiClient.patch(
		'/api/v1/auth/profile',
		data
	);
	return response.data;
}

// ─── Display helpers ────────────────────────────────────────────────────────

/** Full name from first + last, falls back to email local part. */
export function displayName(u: Pick<UserProfile, 'first_name' | 'last_name' | 'email'> | null | undefined): string {
	if (!u) return '';
	const name = `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim();
	if (name) return name;
	return u.email?.split('@')[0] ?? '';
}

/** 1–2 letter initials for avatar. */
export function initialsOf(u: Pick<UserProfile, 'first_name' | 'last_name' | 'email'> | null | undefined): string {
	if (!u) return '?';
	const f = (u.first_name ?? '').trim();
	const l = (u.last_name ?? '').trim();
	if (f && l) return (f[0] + l[0]).toUpperCase();
	if (f) return f.slice(0, 2).toUpperCase();
	if (l) return l.slice(0, 2).toUpperCase();
	const email = u.email ?? '';
	const local = email.split('@')[0] ?? '';
	return local.slice(0, 2).toUpperCase() || '?';
}
