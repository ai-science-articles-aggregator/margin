<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		getNotebooks,
		deleteNotebook,
		type NotebookListItem
	} from '$lib/shared/lib/api/notebooks';
	import { areasStore } from '$lib/shared/lib/stores/areas.svelte';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import CreateNotebook from '$lib/features/create-notebook/create-notebook.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import AreaDot from '$lib/shared/ui/area-dot/area-dot.svelte';
	import Rule from '$lib/shared/ui/rule/rule.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import Kbd from '$lib/shared/ui/kbd/kbd.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Search from 'lucide-svelte/icons/search';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Users from 'lucide-svelte/icons/users';
	import Globe from 'lucide-svelte/icons/globe';

	let notebooks = $state<NotebookListItem[]>([]);
	let isLoading = $state(true);
	let searchQuery = $state('');

	let editing = $state<NotebookListItem | null>(null);
	let deleting = $state<NotebookListItem | null>(null);
	let isSubmitting = $state(false);

	let searchInput: HTMLInputElement | null = $state(null);

	const t = $derived(i18n.t);
	const profile = $derived($page.data?.profile);
	const firstName = $derived(profile?.first_name ?? profile?.email?.split('@')[0] ?? '');

	// ─── URL-driven filter state ────────────────────────────────────────────────
	type FilterMode = 'all' | 'shared' | 'public';
	const filterMode = $derived<FilterMode>(
		$page.url.searchParams.get('shared_only') === 'true'
			? 'shared'
			: $page.url.searchParams.get('visibility') === 'public'
				? 'public'
				: 'all'
	);
	const areaIdFilter = $derived($page.url.searchParams.get('area_id'));
	const activeArea = $derived(areaIdFilter ? areasStore.byId(areaIdFilter) : undefined);

	/** Build a query string preserving the current area_id, swapping mode params. */
	function modeHref(mode: FilterMode): string {
		const sp = new URLSearchParams();
		if (mode === 'shared') sp.set('shared_only', 'true');
		else if (mode === 'public') sp.set('visibility', 'public');
		if (areaIdFilter) sp.set('area_id', areaIdFilter);
		const q = sp.toString();
		return q ? `/app?${q}` : '/app';
	}

	function clearArea(): string {
		const sp = new URLSearchParams($page.url.searchParams);
		sp.delete('area_id');
		const q = sp.toString();
		return q ? `/app?${q}` : '/app';
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMins / 60);
		const diffDays = Math.floor(diffHours / 24);

		if (i18n.lang === 'ru') {
			if (diffMins < 1) return 'только что';
			if (diffMins < 60) return `${diffMins} мин назад`;
			if (diffHours < 24) return `${diffHours} ч назад`;
			if (diffDays < 7) return `${diffDays} дн назад`;
			return date.toLocaleDateString('ru-RU');
		}
		if (diffMins < 1) return 'just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString('en-US');
	}

	async function load() {
		isLoading = true;
		try {
			notebooks = await getNotebooks();
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.toast.loadNotebooksFailed);
		} finally {
			isLoading = false;
		}
	}

	// Areas come from the shared store (loaded on app shell mount).

	function openEdit(n: NotebookListItem, e: Event) {
		e.stopPropagation();
		if (!n.is_owner) return;
		editing = n;
	}

	function openDelete(n: NotebookListItem, e: Event) {
		e.stopPropagation();
		if (!n.is_owner) return;
		deleting = n;
	}

	async function confirmDelete() {
		if (!deleting) return;
		isSubmitting = true;
		try {
			await deleteNotebook(deleting.id);
			toast.success(t.toast.notebookDeleted);
			deleting = null;
			await load();
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.toast.notebookDeleteFailed);
		} finally {
			isSubmitting = false;
		}
	}

	function focusSearch(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		const isTyping =
			target.tagName === 'INPUT' ||
			target.tagName === 'TEXTAREA' ||
			target.isContentEditable;
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !isTyping) {
			e.preventDefault();
			searchInput?.focus();
		}
	}

	function handleEditKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			editing = null;
			deleting = null;
		}
	}

	let visible = $derived.by(() => {
		let arr = notebooks;
		// mode (from URL)
		if (filterMode === 'shared') arr = arr.filter((n) => !n.is_owner);
		else if (filterMode === 'public') arr = arr.filter((n) => n.visibility === 'public');
		// area (from URL)
		if (areaIdFilter) arr = arr.filter((n) => n.area?.id === areaIdFilter);
		// search (local)
		const q = searchQuery.trim().toLowerCase();
		if (q) {
			arr = arr.filter(
				(n) =>
					n.name.toLowerCase().includes(q) ||
					(n.description ?? '').toLowerCase().includes(q) ||
					n.tags.some((tag) => tag.name.toLowerCase().includes(q))
			);
		}
		return arr;
	});

	function countLabel(n: number, kind: 'sources' | 'notes'): string {
		const padded = String(n).padStart(2, '0');
		if (i18n.lang === 'ru') {
			return kind === 'sources' ? `${padded} ИСТОЧНИКОВ` : `${padded} ЗАМЕТОК`;
		}
		return kind === 'sources' ? `${padded} SOURCES` : `${padded} NOTES`;
	}

	$effect(() => {
		load();
		areasStore.load();
	});
</script>

<svelte:window
	on:keydown={(e) => {
		focusSearch(e);
		handleEditKey(e);
	}}
/>

<section style="padding:32px 48px;">
	<div class="flex items-end justify-between mb-7">
		<div>
			<Mono>{i18n.lang === 'ru' ? `БИБЛИОТЕКА · ${notebooks.length} ТЕТРАДЕЙ` : `LIBRARY · ${notebooks.length} NOTEBOOKS`}</Mono>
			<h1
				class="font-serif m-0 mt-[6px]"
				style="font-size:40px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
			>
				{t.home.greeting}{#if firstName}, {firstName}{/if}<span class="text-accent">.</span>
			</h1>
		</div>
		<div style="width:280px;">
			<Input
				bind:value={searchQuery}
				placeholder={t.home.searchHome}
				size="sm"
				bind:ref={searchInput}
			>
				{#snippet leading()}
					<Search class="w-3.5 h-3.5" />
				{/snippet}
				{#snippet trailing()}
					<Kbd>⌘ K</Kbd>
				{/snippet}
			</Input>
		</div>
	</div>

	<div class="flex gap-2 mb-6 items-center flex-wrap">
		{#each [{ mode: 'all' as FilterMode, label: t.home.filterAll, icon: null }, { mode: 'shared' as FilterMode, label: t.home.sharedWithMe, icon: Users }, { mode: 'public' as FilterMode, label: t.home.filterPublic, icon: Globe }] as opt (opt.mode)}
			{@const active = filterMode === opt.mode}
			<a
				href={modeHref(opt.mode)}
				class="px-[10px] py-[5px] text-cap rounded-full cursor-pointer transition-colors border-hair font-sans inline-flex items-center gap-[6px] no-underline"
				style="background: {active
					? 'var(--color-ink)'
					: 'transparent'}; color: {active
					? 'var(--color-paper)'
					: 'var(--color-muted)'}; border-color: {active
					? 'var(--color-ink)'
					: 'var(--color-line)'};"
			>
				{#if opt.icon}
					{@const Ic = opt.icon}
					<Ic class="w-3 h-3" />
				{/if}
				{opt.label}
			</a>
		{/each}

		{#if activeArea}
			<span class="font-mono text-meta-s text-dim tracking-[0.04em] uppercase ml-2">
				{t.home.filterAreaPrefix}
			</span>
			<a
				href={clearArea()}
				class="px-[10px] py-[5px] text-cap rounded-full cursor-pointer transition-colors border-hair font-sans inline-flex items-center gap-[6px] no-underline"
				style="background: var(--color-surface-2); color: var(--color-ink); border-color: var(--color-line);"
				title={t.home.filterClear}
			>
				<AreaDot paletteKey={activeArea.palette_key} />
				{activeArea.name}
				<span class="text-dim ml-1">×</span>
			</a>
		{/if}
		<span class="ml-auto font-mono text-meta-s text-muted tracking-[0.06em]">
			{t.home.sortRecent}
		</span>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#if isLoading}
			{#each Array(6) as _, i (i)}
				<div
					class="bg-surface border-hair border-line rounded-md animate-pulse"
					style="min-height:200px;"
				></div>
			{/each}
		{:else}
			{#each visible as n, i (n.id)}
				<div
					role="link"
					tabindex="0"
					onclick={() => goto(`/app/notebook/${n.id}`)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							goto(`/app/notebook/${n.id}`);
						}
					}}
					class="text-left bg-surface border-hair border-line rounded-md p-5 flex flex-col gap-3 cursor-pointer transition-colors hover:bg-surface-2"
					style="min-height:200px;"
				>
					<div class="flex justify-between items-center">
						<span class="inline-flex items-center gap-[6px]">
							{#if n.area}
								<AreaDot paletteKey={n.area.palette_key} />
								<Mono>{n.area.name}</Mono>
							{:else if !n.is_owner}
								<Mono tone="dim">{i18n.lang === 'ru' ? 'РАСШАРЕННАЯ' : 'SHARED'}</Mono>
							{:else}
								<Mono tone="dim">{i18n.lang === 'ru' ? 'БЕЗ ОБЛАСТИ' : 'NO AREA'}</Mono>
							{/if}
						</span>
						<span class="flex items-center gap-2">
							<span class="font-mono text-meta-s text-dim tracking-[0.04em]">
								№ {String(i + 1).padStart(2, '0')}
							</span>
							{#if n.is_owner}
								<button
									type="button"
									onclick={(e) => openEdit(n, e)}
									class="bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-ink"
									aria-label="Edit"
								>
									<Pencil class="w-3.5 h-3.5" />
								</button>
								<button
									type="button"
									onclick={(e) => openDelete(n, e)}
									class="bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-ink"
									aria-label="Delete"
								>
									<Trash2 class="w-3.5 h-3.5" />
								</button>
							{/if}
						</span>
					</div>
					<h3
						class="font-serif m-0"
						style="font-size:19px; line-height:1.2; font-weight:400; letter-spacing:-0.01em;"
					>
						{n.name}
					</h3>
					<p
						class="text-cap text-muted m-0 flex-1 line-clamp-2"
						style="line-height:1.55;"
					>
						{n.description || '—'}
					</p>
					{#if n.tags.length > 0}
						<div class="flex gap-1 flex-wrap">
							{#each n.tags.slice(0, 4) as tag (tag.id)}
								<span
									class="font-mono text-meta-s text-muted px-[6px] py-[1px] rounded-xs"
									style="background: var(--color-surface-2); letter-spacing:0.02em;"
								>
									<span class="text-accent">#</span>{tag.name}
								</span>
							{/each}
							{#if n.tags.length > 4}
								<span class="font-mono text-meta-s text-dim">+{n.tags.length - 4}</span>
							{/if}
						</div>
					{/if}
					<Rule />
					<div class="flex gap-3 font-mono text-meta-s text-muted tracking-[0.04em] uppercase">
						<span>{countLabel(n.sources_count, 'sources')}</span>
						<span>{countLabel(n.notes_count, 'notes')}</span>
						<span class="ml-auto text-dim">{formatDate(n.updated_at).toUpperCase()}</span>
					</div>
					{#if !n.is_owner && n.shared_by}
						<div class="font-mono text-meta-s text-dim tracking-[0.04em]">
							{i18n.lang === 'ru' ? 'ДЕЛИЛСЯ' : 'SHARED BY'}
							<span class="text-muted">{`${n.shared_by.first_name} ${n.shared_by.last_name}`.trim() || n.shared_by.email}</span>
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>

	{#if !isLoading && visible.length === 0}
		<div class="text-center py-20">
			<h2 class="font-serif text-h1 m-0" style="font-weight:400;">{t.home.emptyTitle}</h2>
			<p class="text-body text-muted mt-2">{t.home.emptySub}</p>
		</div>
	{/if}
</section>

<!-- Edit modal — reuses CreateNotebook in edit mode -->
{#if editing}
	<CreateNotebook
		notebook={editing}
		onClose={() => (editing = null)}
		onSaved={() => load()}
	/>
{/if}

<!-- Delete modal -->
{#if deleting}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="background: rgba(20,16,10,0.4); backdrop-filter: blur(6px);"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="bg-surface border-hair border-line rounded-md p-8 w-full max-w-md"
			style="box-shadow: var(--shadow-lg);"
		>
			<Mono tone="accent">{i18n.lang === 'ru' ? '§ ОПАСНАЯ ЗОНА' : '§ DANGER ZONE'}</Mono>
			<h2 class="font-serif text-h1 m-0 mt-2 mb-4" style="font-weight:400;">
				{i18n.lang === 'ru' ? 'Удалить тетрадь?' : 'Delete notebook?'}
			</h2>
			<p class="text-body text-muted mb-6 leading-[1.55]">
				{i18n.lang === 'ru'
					? 'Вы уверены, что хотите удалить'
					: 'Are you sure you want to delete'}
				<span class="text-ink font-medium font-serif italic">«{deleting.name}»</span>?
				{i18n.lang === 'ru' ? 'Это действие нельзя отменить.' : 'This cannot be undone.'}
			</p>
			<div class="flex gap-3 justify-end">
				<Button variant="ghost" size="md" onclick={() => (deleting = null)} disabled={isSubmitting}>
					{t.settings.cancel}
				</Button>
				<Button variant="danger" size="md" onclick={confirmDelete} disabled={isSubmitting}>
					{isSubmitting
						? i18n.lang === 'ru'
							? 'Удаление…'
							: 'Deleting…'
						: i18n.lang === 'ru'
							? 'Удалить'
							: 'Delete'}
				</Button>
			</div>
		</div>
	</div>
{/if}
