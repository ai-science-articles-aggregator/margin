<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import {
		searchArticles,
		summarizeStream,
		type ArticleResult
	} from '$lib/shared/lib/api/notebooks';
	import {
		listSources,
		addSources,
		setSourceSelected,
		removeSource,
		type NotebookSource
	} from '$lib/shared/lib/api/sources';
	import {
		listNotes,
		createNote,
		deleteNote,
		type Note
	} from '$lib/shared/lib/api/notes';
	import {
		listMessages,
		sendMessageStream,
		type ChatMessage
	} from '$lib/shared/lib/api/messages';
	import { getArticlesBatch, type ArticleRead } from '$lib/shared/lib/api/articles';
	import { MOCK_SUMMARY } from '$lib/shared/lib/mock-data';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Kbd from '$lib/shared/ui/kbd/kbd.svelte';
	import Checkbox from '$lib/shared/ui/checkbox/checkbox.svelte';
	import Search from 'lucide-svelte/icons/search';
	import Sparkles from 'lucide-svelte/icons/sparkles';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	type Tab = 'chat' | 'summary';

	let tab = $state<Tab>('chat');
	let sourceFilter = $state<'all' | 'selected'>('all');
	let sourceQuery = $state('');

	let sources = $state<NotebookSource[]>([]);
	let articlesById = $state<Map<string, ArticleRead>>(new Map());
	let remoteResults = $state<ArticleResult[]>([]);
	let isSearching = $state(false);

	let chat = $state<ChatMessage[]>([]);
	let chatInput = $state('');
	let isSending = $state(false);
	let pendingAssistant = $state('');

	let notes = $state<Note[]>([]);
	let newNoteBody = $state('');
	let newNoteOpen = $state(false);
	let savingNote = $state(false);

	let summaryOutput = $state('');
	let isSummarizing = $state(false);

	const t = $derived(i18n.t);
	const notebookId = $derived($page.params.id ?? '');
	const notebook = $derived($page.data?.notebook);
	const canWrite = $derived(notebook?.is_owner !== false);

	let selectedIds = $derived(sources.filter((s) => s.selected).map((s) => s.article_id));
	let selectedCount = $derived(selectedIds.length);

	let visibleSources = $derived(
		sourceFilter === 'selected' ? sources.filter((s) => s.selected) : sources
	);

	async function loadSources() {
		if (!notebookId) return;
		try {
			sources = await listSources(notebookId);
			await hydrateArticles(sources.map((s) => s.article_id));
		} catch (err: any) {
			console.warn('load sources failed', err);
		}
	}

	async function hydrateArticles(ids: string[]) {
		const missing = ids.filter((id) => !articlesById.has(id));
		if (missing.length === 0) return;
		try {
			const arr = await getArticlesBatch(missing);
			const next = new Map(articlesById);
			for (const a of arr) next.set(a.id, a);
			articlesById = next;
		} catch (err) {
			console.warn('hydrate articles failed', err);
		}
	}

	async function loadNotes() {
		if (!notebookId) return;
		try {
			notes = await listNotes(notebookId);
		} catch (err) {
			console.warn('load notes failed', err);
		}
	}

	async function loadMessages() {
		if (!notebookId) return;
		try {
			chat = await listMessages(notebookId);
		} catch (err) {
			console.warn('load messages failed', err);
		}
	}

	async function toggleSource(s: NotebookSource) {
		if (!canWrite) return;
		const next = !s.selected;
		// optimistic
		sources = sources.map((x) => (x.article_id === s.article_id ? { ...x, selected: next } : x));
		try {
			await setSourceSelected(notebookId, s.article_id, next);
		} catch (err: any) {
			// rollback
			sources = sources.map((x) => (x.article_id === s.article_id ? { ...x, selected: !next } : x));
			toast.error(err.response?.data?.detail ?? t.toast.searchFailed);
		}
	}

	async function dropSource(s: NotebookSource, e: Event) {
		e.stopPropagation();
		if (!canWrite) return;
		try {
			await removeSource(notebookId, s.article_id);
			sources = sources.filter((x) => x.article_id !== s.article_id);
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.toast.searchFailed);
		}
	}

	async function attachRemote(r: ArticleResult) {
		if (!canWrite) return;
		try {
			const newSources = await addSources(notebookId, [r.id]);
			// merge — dedup by article_id
			const map = new Map<string, NotebookSource>();
			for (const s of sources) map.set(s.article_id, s);
			for (const s of newSources) map.set(s.article_id, s);
			sources = Array.from(map.values());
			// метаданные берём прямо из результата поиска — без запроса /batch
			const next = new Map(articlesById);
			next.set(r.id, {
				id: r.id,
				title: r.title ?? null,
				authors: r.authors ?? null,
				arxiv_id: null,
				abstract: null,
				published: null,
				categories: null,
				primary_category: null,
				doi: null,
				journal_ref: null,
				num_pages: null,
				pdf_url: null
			});
			articlesById = next;
			toast.success(i18n.lang === 'ru' ? 'Добавлено' : 'Added');
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.toast.searchFailed);
		}
	}

	/** Explicit submit — runs semantic retrieval against the RAG backend. */
	async function runSourceSearch() {
		const q = sourceQuery.trim();
		if (!q || !notebookId || isSearching) return;
		isSearching = true;
		try {
			const res = await searchArticles(notebookId, q);
			remoteResults = res.articles;
			if (res.articles.length === 0) {
				toast.info(t.toast.nothingFound);
			}
		} catch (err) {
			toast.error(t.toast.searchFailed);
		} finally {
			isSearching = false;
		}
	}

	function onSourceSearchKey(e: KeyboardEvent) {
		// Enter submits, Shift+Enter inserts newline (default browser behaviour).
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			runSourceSearch();
		}
	}

	/** Suggestion card click — pre-fill chat input so user can edit before sending. */
	function pickSuggestion(q: string) {
		chatInput = q;
		// Focus the input on next tick so cursor lands there.
		queueMicrotask(() => {
			const el = document.querySelector<HTMLInputElement>('[data-chat-input]');
			el?.focus();
		});
	}

	async function sendChat(e?: Event) {
		e?.preventDefault();
		const q = chatInput.trim();
		if (!q || !notebookId || isSending) return;
		chatInput = '';
		isSending = true;
		pendingAssistant = '';
		// optimistic user message
		const userMsg: ChatMessage = {
			id: `tmp-${Date.now()}`,
			role: 'user',
			text: q,
			citations: [],
			created_at: new Date().toISOString()
		};
		chat = [...chat, userMsg];

		try {
			await sendMessageStream(notebookId, q, (token) => {
				pendingAssistant += token;
			});
			// stream finished — refetch authoritative history (server-saved ids + citations)
			await loadMessages();
			pendingAssistant = '';
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? (i18n.lang === 'ru' ? 'Ошибка отправки' : 'Send failed'));
		} finally {
			isSending = false;
		}
	}

	async function runSummary() {
		if (!notebookId || selectedIds.length === 0) return;
		isSummarizing = true;
		summaryOutput = '';
		try {
			await summarizeStream(
				notebookId,
				{ article_ids: selectedIds, query: 'Summarize the selected sources.' },
				(tok) => {
					summaryOutput += tok;
				}
			);
			toast.success(t.toast.summaryReady);
		} catch (err) {
			toast.error(t.toast.summaryFailed);
		} finally {
			isSummarizing = false;
		}
	}

	async function submitNewNote(e?: Event) {
		e?.preventDefault();
		const body = newNoteBody.trim();
		if (!body || !notebookId) {
			newNoteOpen = false;
			return;
		}
		savingNote = true;
		try {
			const n = await createNote(notebookId, {
				title: body.slice(0, 60),
				body
			});
			notes = [n, ...notes];
			newNoteBody = '';
			newNoteOpen = false;
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? (i18n.lang === 'ru' ? 'Не удалось сохранить' : 'Save failed'));
		} finally {
			savingNote = false;
		}
	}

	async function dropNote(n: Note, e: Event) {
		e.stopPropagation();
		try {
			await deleteNote(notebookId, n.id);
			notes = notes.filter((x) => x.id !== n.id);
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? (i18n.lang === 'ru' ? 'Не удалось удалить' : 'Delete failed'));
		}
	}

	function articleOf(s: NotebookSource): ArticleRead | undefined {
		return articlesById.get(s.article_id);
	}

	function summaryBullets(): string[] {
		return i18n.lang === 'ru' ? MOCK_SUMMARY.bulletsRu : MOCK_SUMMARY.bullets;
	}
	function questions(): string[] {
		return i18n.lang === 'ru' ? MOCK_SUMMARY.questionsRu : MOCK_SUMMARY.questions;
	}

	function fmtNoteDate(iso: string): string {
		try {
			const d = new Date(iso);
			return d.toLocaleDateString(i18n.lang === 'ru' ? 'ru-RU' : 'en-US', {
				month: 'short',
				day: 'numeric'
			}).toUpperCase();
		} catch {
			return '';
		}
	}

	onMount(() => {
		loadSources();
		loadNotes();
		loadMessages();
	});
</script>

<div
	class="flex-1 grid min-h-0 overflow-hidden bg-paper"
	style="grid-template-columns: 270px 1fr 280px; grid-template-rows: minmax(0, 1fr);"
>
	<!-- SOURCES -->
	<aside
		class="flex flex-col min-h-0 bg-surface border-r-hair border-line overflow-hidden"
		style="padding:20px 16px;"
	>
		<div class="flex justify-between items-baseline mb-3">
			<Mono>{i18n.lang === 'ru' ? `ИСТОЧНИКИ · ${sources.length}` : `SOURCES · ${sources.length}`}</Mono>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); runSourceSearch(); }} class="mb-3">
			<div class="relative">
				<Search class="absolute left-2 top-[10px] w-3 h-3 text-muted pointer-events-none" />
				<textarea
					bind:value={sourceQuery}
					onkeydown={onSourceSearchKey}
					placeholder={t.notebook.searchSources}
					rows="2"
					disabled={isSearching}
					class="w-full bg-paper text-ink border-hair border-line focus:border-ink outline-none rounded-sm pl-7 pr-3 py-[8px] text-cap font-sans box-border resize-y placeholder:text-dim leading-[1.45]"
					style="min-height:56px;"
				></textarea>
			</div>
			<div class="flex items-center justify-between mt-1 px-[2px]">
				<span class="font-mono text-meta-s text-dim tracking-[0.04em]">
					{t.notebook.searchSourcesHint}
				</span>
				{#if isSearching}
					<span class="font-mono text-meta-s text-muted tracking-[0.04em]">
						{i18n.lang === 'ru' ? 'ПОИСК…' : 'SEARCHING…'}
					</span>
				{/if}
			</div>
		</form>

		<div class="flex gap-[6px] mb-3">
			<button
				type="button"
				onclick={() => (sourceFilter = 'all')}
				class="px-[8px] py-[2px] font-mono text-meta-s uppercase tracking-[0.04em] cursor-pointer border-hair rounded-xs"
				style="color: {sourceFilter === 'all'
					? 'var(--color-ink)'
					: 'var(--color-muted)'}; border-color: {sourceFilter === 'all'
					? 'var(--color-ink)'
					: 'var(--color-line)'}; background: {sourceFilter === 'all'
					? 'var(--color-paper)'
					: 'transparent'};"
			>
				{t.notebook.filterAll}
			</button>
			<button
				type="button"
				onclick={() => (sourceFilter = 'selected')}
				class="px-[8px] py-[2px] font-mono text-meta-s uppercase tracking-[0.04em] cursor-pointer border-hair rounded-xs"
				style="color: {sourceFilter === 'selected'
					? 'var(--color-ink)'
					: 'var(--color-muted)'}; border-color: {sourceFilter === 'selected'
					? 'var(--color-ink)'
					: 'var(--color-line)'};"
			>
				{i18n.lang === 'ru' ? `Выбрано · ${selectedCount}` : `Selected · ${selectedCount}`}
			</button>
		</div>

		<div class="overflow-auto flex-1" style="margin-left:-4px; margin-right:-4px;">
			{#each visibleSources as s (s.article_id)}
				{@const art = articleOf(s)}
				<div
					role="button"
					tabindex="0"
					onclick={() => toggleSource(s)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							toggleSource(s);
						}
					}}
					class="group w-full text-left rounded-xs mb-[2px] cursor-pointer flex gap-2 items-start p-[10px_8px]"
					style="background: {s.selected ? 'var(--color-surface-2)' : 'transparent'};"
				>
					<div style="margin-top:2px;">
						<Checkbox checked={s.selected} ariaLabel={art?.title ?? s.article_id} />
					</div>
					<div class="min-w-0 flex-1">
						<div class="text-cap text-ink leading-[1.35] line-clamp-2">
							{art?.title ?? s.article_id}
						</div>
						{#if art?.authors}
							<div class="font-mono text-meta-s text-muted tracking-[0.02em] mt-[3px] line-clamp-1">
								{art.authors}
							</div>
						{/if}
					</div>
					{#if canWrite}
						<button
							type="button"
							onclick={(e) => dropSource(s, e)}
							class="bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-ink opacity-0 group-hover:opacity-100 transition-opacity"
							aria-label="Remove"
						>
							<Trash2 class="w-3 h-3" />
						</button>
					{/if}
				</div>
			{/each}

			{#if sources.length === 0 && !isSearching}
				<div class="px-[8px] py-4 text-cap text-muted">
					{i18n.lang === 'ru'
						? 'Источников пока нет. Найдите статьи поиском.'
						: 'No sources yet. Find articles by typing above.'}
				</div>
			{/if}

			{#if remoteResults.length > 0}
				<div class="mt-3 px-[8px]">
					<Mono>
						{i18n.lang === 'ru' ? 'РЕЗУЛЬТАТЫ ПОИСКА' : 'SEARCH RESULTS'}
					</Mono>
				</div>
				{#each remoteResults as r (r.id)}
					{@const already = sources.some((s) => s.article_id === r.id)}
					<button
						type="button"
						onclick={() => attachRemote(r)}
						disabled={already || !canWrite}
						class="w-full text-left p-[10px_8px] rounded-xs flex gap-2 items-start bg-transparent border-0 cursor-pointer hover:bg-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<div class="min-w-0 flex-1">
							<div class="text-cap text-ink leading-[1.35] line-clamp-2">
								{r.title ?? r.id}
							</div>
							{#if r.authors}
								<div class="font-mono text-meta-s text-muted tracking-[0.02em] mt-[3px]">
									{r.authors}
								</div>
							{/if}
						</div>
						{#if already}
							<span class="font-mono text-meta-s text-dim">
								{i18n.lang === 'ru' ? 'УЖЕ' : 'IN'}
							</span>
						{:else}
							<span class="text-accent text-cap">+</span>
						{/if}
					</button>
				{/each}
			{/if}

			{#if isSearching}
				<div class="px-[8px] py-2 text-meta text-dim">{t.common.loading}</div>
			{/if}
		</div>
	</aside>

	<!-- CENTER (tabs) -->
	<main class="flex flex-col min-h-0 overflow-hidden bg-paper">
		<div
			class="flex border-b-hair border-line bg-surface"
			style="padding:0 24px; gap:0;"
		>
			{#each [{ id: 'chat' as const, l: t.notebook.tabChat, s: `${chat.length}` }, { id: 'summary' as const, l: t.notebook.tabSummary, s: `${summaryBullets().length}` }] as tt (tt.id)}
				<button
					type="button"
					onclick={() => (tab = tt.id)}
					class="bg-transparent border-0 cursor-pointer flex items-center gap-[6px] font-sans"
					style="padding:14px 0; margin-right:24px; border-bottom: 1.5px solid {tab === tt.id
						? 'var(--color-ink)'
						: 'transparent'}; color: {tab === tt.id ? 'var(--color-ink)' : 'var(--color-muted)'}; font-size:13px; font-weight: {tab === tt.id ? 500 : 400};"
				>
					{tt.l}
					<span class="font-mono text-meta-s text-dim">{tt.s}</span>
				</button>
			{/each}
		</div>

		{#if tab === 'chat'}
			<div class="flex-1 overflow-auto" style="padding:24px 40px;">
				{#each chat as m (m.id)}
					<div class="mb-7">
						{#if m.role === 'user'}
							<div class="flex justify-end">
								<div
									class="bg-surface-2 rounded-xl text-body-s leading-[1.5]"
									style="max-width:78%; padding:10px 14px;"
								>
									{m.text}
								</div>
							</div>
						{:else}
							<div>
								<div class="flex items-center gap-2 mb-2">
									<div
										class="flex items-center justify-center font-serif"
										style="width:20px; height:20px; background: var(--color-ink); color: var(--color-paper); font-size:13px;"
									>
										M
									</div>
									<Mono>
										{i18n.lang === 'ru'
											? `MARGIN · ${m.citations.length} ЦИТАТ`
											: `MARGIN · ${m.citations.length} CITATIONS`}
									</Mono>
								</div>
								<div
									class="text-body text-ink leading-[1.65] whitespace-pre-wrap"
									style="padding-left:28px;"
								>
									{m.text}
								</div>
								{#if m.citations.length > 0}
									<div
										class="mt-3 flex flex-col gap-[6px]"
										style="padding-left:28px;"
									>
										{#each m.citations as cite, ci (ci)}
											<div
												class="bg-surface border-hair border-line rounded-xs px-3 py-[6px] flex gap-[10px] items-center font-mono text-meta text-muted"
											>
												<span class="text-accent" style="font-weight:600;">[{ci + 1}]</span>
												<span class="text-ink">{cite.label}</span>
												{#if cite.frag}
													<span class="text-dim">{cite.frag}</span>
												{/if}
											</div>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}

				{#if pendingAssistant}
					<div class="mb-7">
						<div class="flex items-center gap-2 mb-2">
							<div
								class="flex items-center justify-center font-serif"
								style="width:20px; height:20px; background: var(--color-ink); color: var(--color-paper); font-size:13px;"
							>
								M
							</div>
							<Mono>{i18n.lang === 'ru' ? 'MARGIN · ОТВЕЧАЕТ…' : 'MARGIN · TYPING…'}</Mono>
						</div>
						<div
							class="text-body text-ink leading-[1.65] whitespace-pre-wrap"
							style="padding-left:28px;"
						>
							{pendingAssistant}
						</div>
					</div>
				{/if}

				{#if chat.length === 0 && !pendingAssistant}
					<div class="flex flex-col gap-3">
						<Mono>{t.notebook.tryAsking.toUpperCase()}</Mono>
						{#each questions() as q, i (i)}
							<button
								type="button"
								onclick={() => pickSuggestion(q)}
								class="group text-left bg-transparent border-hair border-line rounded-sm px-4 py-3 cursor-pointer hover:bg-surface-2 transition-colors flex items-center gap-3"
							>
								<span class="font-mono text-meta text-dim shrink-0">
									{String(i + 1).padStart(2, '0')}
								</span>
								<span
									class="font-serif italic flex-1"
									style="font-size:15px; line-height:1.4;"
								>
									«{q}»
								</span>
								<span class="text-accent group-hover:translate-x-[2px] transition-transform" style="font-size:18px;">→</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{:else if tab === 'summary'}
			<div class="flex-1 overflow-auto" style="padding:24px 40px;">
				<div class="flex items-baseline justify-between mb-2">
					<Mono>
						{i18n.lang === 'ru'
							? `АВТО-САММАРИ · ${selectedCount} ИСТОЧНИКОВ`
							: `AUTO-SUMMARY · ${selectedCount} SELECTED`}
					</Mono>
					<Button
						variant="ghost"
						size="sm"
						onclick={runSummary}
						disabled={isSummarizing || selectedCount === 0}
					>
						{isSummarizing ? t.notebook.generating : t.notebook.generate}
					</Button>
				</div>
				<h2
					class="font-serif m-0 mb-5"
					style="font-size:26px; font-weight:400; letter-spacing:-0.015em;"
				>
					{t.notebook.literatureSays}
				</h2>
				{#if summaryOutput}
					<div
						class="bg-surface border-hair border-line rounded-md p-5 text-body text-ink whitespace-pre-wrap mb-6 leading-[1.65]"
					>
						{summaryOutput}
					</div>
				{:else}
					<p class="text-cap text-muted mb-6">
						{i18n.lang === 'ru'
							? 'Выберите источники слева и нажмите «Сгенерировать».'
							: 'Select sources on the left and press Generate.'}
					</p>
				{/if}
			</div>
		{/if}

		<div class="border-t-hair border-line bg-surface" style="padding:12px 24px;">
			<form
				onsubmit={sendChat}
				class="flex items-center gap-[10px] bg-paper border-hair border-line rounded-md"
				style="padding:8px 12px;"
			>
				<Sparkles class="w-4 h-4 text-muted" />
				<input
					bind:value={chatInput}
					data-chat-input
					disabled={isSending || !canWrite}
					placeholder={i18n.lang === 'ru'
						? `Спросите ${selectedCount} выбранных источников…`
						: `Ask the ${selectedCount} selected sources…`}
					class="flex-1 bg-transparent border-0 outline-none text-body-s text-ink font-sans placeholder:text-dim"
				/>
				<Kbd>⌘ ↵</Kbd>
				<Button type="submit" variant="primary" size="sm" disabled={isSending || !canWrite}>
					{isSending ? '…' : t.notebook.askCta}
				</Button>
			</form>
		</div>
	</main>

	<!-- NOTES -->
	<aside
		class="flex flex-col min-h-0 bg-surface border-l-hair border-line overflow-hidden"
		style="padding:20px 16px;"
	>
		<div class="flex justify-between items-baseline mb-3">
			<Mono>{i18n.lang === 'ru' ? `ЗАМЕТКИ · ${notes.length}` : `NOTES · ${notes.length}`}</Mono>
			<button
				type="button"
				onclick={() => (newNoteOpen = !newNoteOpen)}
				class="text-cap text-accent bg-transparent border-0 cursor-pointer p-0"
			>
				{t.notebook.newNote}
			</button>
		</div>
		{#if newNoteOpen}
			<form onsubmit={submitNewNote} class="mb-3">
				<textarea
					bind:value={newNoteBody}
					placeholder={i18n.lang === 'ru' ? 'Заметка…' : 'Note…'}
					rows="3"
					class="w-full bg-paper text-ink border-hair border-line focus:border-ink outline-none rounded-sm px-2 py-[6px] text-meta font-sans box-border resize-y mb-2"
				></textarea>
				<div class="flex gap-2 justify-end">
					<Button
						variant="ghost"
						size="sm"
						onclick={() => {
							newNoteOpen = false;
							newNoteBody = '';
						}}
					>
						{t.settings.cancel}
					</Button>
					<Button
						type="submit"
						variant="primary"
						size="sm"
						disabled={savingNote || !newNoteBody.trim()}
					>
						{savingNote ? '…' : t.settings.save}
					</Button>
				</div>
			</form>
		{/if}
		<div class="overflow-auto flex-1 flex flex-col gap-[10px]">
			{#each notes as n (n.id)}
				<div
					class="group bg-paper border-hair border-line rounded-[3px] relative"
					style="padding:12px; border-left: 2px solid var(--color-accent);"
				>
					{#if n.title}
						<div
							class="text-cap text-ink mb-[6px] leading-[1.3] pr-6"
							style="font-weight:500;"
						>
							{n.title}
						</div>
					{/if}
					<div class="text-meta text-muted leading-[1.55] mb-2 whitespace-pre-wrap pr-6">
						{n.body}
					</div>
					<div class="font-mono text-meta-s text-dim tracking-[0.04em]">
						{fmtNoteDate(n.created_at)}
					</div>
					<button
						type="button"
						onclick={(e) => dropNote(n, e)}
						class="absolute top-2 right-2 bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-ink opacity-0 group-hover:opacity-100 transition-opacity"
						aria-label="Delete"
					>
						<Trash2 class="w-3 h-3" />
					</button>
				</div>
			{/each}
			{#if notes.length === 0}
				<div class="text-cap text-muted">
					{i18n.lang === 'ru' ? 'Заметок пока нет.' : 'No notes yet.'}
				</div>
			{/if}
		</div>
		<button
			type="button"
			onclick={() => (newNoteOpen = true)}
			class="mt-3 bg-transparent text-muted text-cap font-sans cursor-pointer rounded-sm border-hair"
			style="padding:8px; border-style:dashed; border-color: var(--color-line);"
		>
			{t.notebook.addNote}
		</button>
	</aside>
</div>
