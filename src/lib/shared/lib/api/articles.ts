import apiClient from './client';
import type { AxiosResponse } from 'axios';

/** Article metadata returned by POST /articles/batch. */
export interface ArticleRead {
	id: string;
	arxiv_id: string | null;
	title: string | null;
	authors: string | null;
	abstract: string | null;
	published: string | null;
	categories: string | null;
	primary_category: string | null;
	doi: string | null;
	journal_ref: string | null;
	num_pages: number | null;
	pdf_url: string | null;
}

/**
 * Resolve article metadata from external articles DB.
 * Returns in input order, dedup'd. Unknown IDs are simply absent.
 */
export async function getArticlesBatch(ids: string[]): Promise<ArticleRead[]> {
	if (ids.length === 0) return [];
	const r: AxiosResponse<ArticleRead[]> = await apiClient.post(
		'/api/v1/articles/batch',
		{ ids }
	);
	return r.data;
}
