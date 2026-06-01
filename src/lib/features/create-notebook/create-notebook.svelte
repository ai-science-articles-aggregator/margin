<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		createNotebook,
		updateNotebook,
		type Visibility,
		type NotebookListItem
	} from '$lib/shared/lib/api/notebooks';
	import { areasStore } from '$lib/shared/lib/stores/areas.svelte';
	import type { AreaRead, PaletteKey } from '$lib/shared/lib/api/areas';
	import { PALETTE_KEYS } from '$lib/shared/lib/api/areas';
	import { getTags, type TagWithCount } from '$lib/shared/lib/api/tags';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Kbd from '$lib/shared/ui/kbd/kbd.svelte';
	import AreaDot from '$lib/shared/ui/area-dot/area-dot.svelte';
	import X from 'lucide-svelte/icons/x';
	import Lock from 'lucide-svelte/icons/lock';
	import Users from 'lucide-svelte/icons/users';
	import Globe from 'lucide-svelte/icons/globe';
	import Check from 'lucide-svelte/icons/check';
	import { onMount } from 'svelte';

	interface Props {
		/** When provided, the modal switches to "edit" mode. */
		notebook?: NotebookListItem | null;
		onClose: () => void;
		/** Called after successful save (used by callers to refresh lists). */
		onSaved?: (notebook: NotebookListItem) => void;
	}
	let { notebook = null, onClose, onSaved }: Props = $props();

	const isEdit = $derived(!!notebook);

	const MAX_NAME = 100;
	const MAX_DESC = 1000;
	const MAX_TAGS = 12;

	// — Form state ──────────────────────────────────────────────────────────────
	let name = $state(notebook?.name ?? '');
	let description = $state(notebook?.description ?? '');
	let areaId = $state<string | null>(notebook?.area?.id ?? null);
	let tags = $state<string[]>(notebook?.tags.map((t) => t.name) ?? []);
	let visibility = $state<Visibility>(notebook?.visibility ?? 'private');

	let newAreaOpen = $state(false);
	let newAreaName = $state('');
	let creatingArea = $state(false);

	let tagDraft = $state('');
	let tagSuggestions = $state<TagWithCount[]>([]);
	let suggestOpen = $state(false);
	let suggestTimer: ReturnType<typeof setTimeout> | null = null;

	let isLoading = $state(false);
	let error = $state<string | null>(null);

	const t = $derived(i18n.t.createNotebook);
	const allAreas = $derived<AreaRead[]>(areasStore.items);
	const selectedArea = $derived(allAreas.find((a) => a.id === areaId) ?? null);
	const canCreate = $derived(name.trim().length > 0 && !isLoading);

	onMount(() => {
		areasStore.load();
	});

	// — New area inline ─────────────────────────────────────────────────────────
	async function commitNewArea() {
		const raw = newAreaName.trim();
		if (!raw) {
			newAreaOpen = false;
			return;
		}
		creatingArea = true;
		try {
			// Round-robin pick from palette based on current count
			const palette: PaletteKey = PALETTE_KEYS[allAreas.length % PALETTE_KEYS.length];
			const a = await areasStore.create({ name: raw, palette_key: palette });
			areaId = a.id;
			newAreaName = '';
			newAreaOpen = false;
		} catch (err: any) {
			toast.error(
				err.response?.data?.detail ??
					err.message ??
					(i18n.lang === 'ru' ? 'Не удалось создать область' : 'Could not create area')
			);
		} finally {
			creatingArea = false;
		}
	}

	// — Tags ────────────────────────────────────────────────────────────────────
	function addTagName(raw: string) {
		const v = raw.trim().replace(/^#+/, '').slice(0, 32);
		if (!v) return;
		if (tags.length >= MAX_TAGS) return;
		if (tags.includes(v)) return;
		tags = [...tags, v];
	}

	function addTag() {
		addTagName(tagDraft);
		tagDraft = '';
		tagSuggestions = [];
		suggestOpen = false;
	}

	function pickSuggestion(s: TagWithCount) {
		addTagName(s.name);
		tagDraft = '';
		tagSuggestions = [];
		suggestOpen = false;
	}

	function removeTag(tag: string) {
		tags = tags.filter((x) => x !== tag);
	}

	function onTagKey(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag();
		} else if (e.key === 'Escape') {
			suggestOpen = false;
		} else if (e.key === 'Backspace' && !tagDraft && tags.length > 0) {
			tags = tags.slice(0, -1);
		}
	}

	function onTagInput() {
		if (suggestTimer) clearTimeout(suggestTimer);
		const q = tagDraft.trim().replace(/^#+/, '');
		if (!q) {
			tagSuggestions = [];
			suggestOpen = false;
			return;
		}
		suggestTimer = setTimeout(async () => {
			try {
				const results = await getTags(q);
				tagSuggestions = results.filter((r) => !tags.includes(r.name)).slice(0, 8);
				suggestOpen = tagSuggestions.length > 0;
			} catch {
				tagSuggestions = [];
				suggestOpen = false;
			}
		}, 200);
	}

	// — Visibility ──────────────────────────────────────────────────────────────
	const visibilityOptions: {
		value: Visibility;
		label: () => string;
		desc: () => string;
		icon: typeof Lock;
	}[] = [
		{ value: 'private', label: () => t.visibilityPrivate, desc: () => t.visibilityPrivateDesc, icon: Lock },
		{ value: 'shared', label: () => t.visibilityShared, desc: () => t.visibilitySharedDesc, icon: Users },
		{ value: 'public', label: () => t.visibilityPublic, desc: () => t.visibilityPublicDesc, icon: Globe }
	];

	function visibilityStatus(v: Visibility): string {
		switch (v) {
			case 'private': return t.statusPrivate;
			case 'shared':  return t.statusShared;
			case 'public':  return t.statusPublic;
		}
	}

	function areaStatus(): string {
		if (!selectedArea) return t.statusNoArea;
		return selectedArea.name.toUpperCase();
	}

	// — Submit ──────────────────────────────────────────────────────────────────
	async function handleSubmit(e?: Event) {
		e?.preventDefault();
		if (!canCreate) {
			error = t.nameRequired;
			return;
		}
		// stash any half-typed tag
		if (tagDraft.trim()) addTag();
		isLoading = true;
		error = null;
		try {
			const payload = {
				name: name.trim(),
				description: description.trim() || undefined,
				area_id: areaId,
				tags,
				visibility
			};
			if (notebook) {
				const updated = await updateNotebook(notebook.id, payload);
				toast.success(i18n.t.toast.notebookUpdated);
				onSaved?.(updated);
				onClose();
			} else {
				const created = await createNotebook(payload);
				toast.success(i18n.t.toast.notebookCreated);
				onSaved?.(created);
				onClose();
				goto(`/app/notebook/${created.id}`);
			}
		} catch (err: any) {
			error =
				err.response?.data?.detail ||
				err.response?.data?.message ||
				err.message ||
				(notebook
					? i18n.t.toast.notebookUpdateFailed
					: i18n.t.toast.notebookCreateFailed);
		} finally {
			isLoading = false;
		}
	}

	// — Keyboard ────────────────────────────────────────────────────────────────
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && !isLoading) {
			onClose();
			return;
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		}
	}
</script>

<svelte:window on:keydown={onKey} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center"
	style="background: rgba(20,16,10,0.45); backdrop-filter: blur(6px);"
	role="dialog"
	aria-modal="true"
	aria-label={isEdit ? t.editTitle : t.title}
>
	<div
		class="bg-paper border-hair border-line rounded-md flex flex-col overflow-hidden"
		style="width: min(720px, calc(100vw - 32px)); max-height: calc(100vh - 48px); box-shadow: var(--shadow-lg);"
	>
		<!-- Header -->
		<header
			class="flex items-center justify-between px-6 py-4 border-b-hair border-line bg-surface shrink-0"
		>
			<div class="flex items-baseline gap-3">
				<Logo size={16} />
				<span class="text-dim text-cap">/</span>
				<Mono>{isEdit ? t.editSectionMonoref : t.sectionMonoref}</Mono>
			</div>
			<button
				type="button"
				aria-label="Close"
				onclick={onClose}
				class="bg-transparent border-0 p-1 cursor-pointer text-muted hover:text-ink rounded-xs"
			>
				<X class="w-4 h-4" />
			</button>
		</header>

		<!-- Title section -->
		<div class="px-8 pt-8 pb-3 shrink-0">
			<h2
				class="font-serif m-0"
				style="font-size:32px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
			>
				{isEdit ? t.editTitle : t.title}<span class="text-accent">.</span>
			</h2>
			<p class="text-body text-muted m-0 mt-2 leading-[1.55]" style="max-width:560px;">
				{isEdit ? t.editSubtitle : t.subtitle}
			</p>
		</div>

		<!-- Scrollable form area -->
		<div class="flex-1 overflow-auto px-8 py-4">
			<form onsubmit={handleSubmit} class="flex flex-col gap-7">
				<!-- ① Title -->
				<div>
					<div class="flex items-baseline justify-between mb-2">
						<label class="text-body-s text-ink" style="font-weight:500;">
							<span class="text-dim mr-1">①</span>
							{t.titleLabel}
						</label>
						<span class="font-mono text-meta-s text-dim tracking-[0.04em]">
							{name.length}/{MAX_NAME}
						</span>
					</div>
					<input
						type="text"
						bind:value={name}
						placeholder={t.titlePlaceholder}
						maxlength={MAX_NAME}
						class="w-full bg-paper text-ink border-hair border-line focus:border-ink outline-none rounded-sm px-3 py-[10px] text-body font-sans box-border"
						required
					/>
				</div>

				<!-- ② Short description -->
				<div>
					<div class="flex items-baseline justify-between mb-2">
						<label class="text-body-s text-ink" style="font-weight:500;">
							<span class="text-dim mr-1">②</span>
							{t.descLabel}
						</label>
						<span class="font-mono text-meta-s text-dim tracking-[0.04em]">
							{description.length}/{MAX_DESC}
						</span>
					</div>
					<p class="text-cap text-muted leading-[1.5] mb-2">{t.descHelper}</p>
					<textarea
						bind:value={description}
						placeholder={t.descPlaceholder}
						maxlength={MAX_DESC}
						rows="3"
						class="w-full bg-paper text-ink border-hair border-line focus:border-ink outline-none rounded-sm px-3 py-[10px] text-body font-sans box-border resize-y"
					></textarea>
				</div>

				<!-- ③ Discipline -->
				<div>
					<div class="flex items-baseline justify-between mb-2">
						<label class="text-body-s text-ink" style="font-weight:500;">
							<span class="text-dim mr-1">③</span>
							{t.areaLabel}
						</label>
					</div>
					<p class="text-cap text-muted leading-[1.5] mb-3">{t.areaHelper}</p>
					<div class="flex flex-col gap-[2px] max-h-[280px] overflow-auto">
						{#each allAreas as a (a.id)}
							{@const active = areaId === a.id}
							<button
								type="button"
								onclick={() => (areaId = active ? null : a.id)}
								class="flex items-center gap-3 px-3 py-[10px] rounded-sm bg-transparent border-0 cursor-pointer text-left transition-colors"
								style="background: {active ? 'var(--color-surface-2)' : 'transparent'};"
							>
								<AreaDot paletteKey={a.palette_key} />
								<span class="text-body-s text-ink flex-1">{a.name}</span>
								{#if active}
									<Check class="w-4 h-4 text-accent" />
								{/if}
							</button>
						{/each}

						{#if newAreaOpen}
							<div class="flex items-center gap-2 px-3 py-2">
								<span
									class="inline-block rounded-full"
									style="width:6px; height:6px; background: var(--color-dim);"
								></span>
								<input
									type="text"
									bind:value={newAreaName}
									placeholder={t.areaNewPlaceholder}
									disabled={creatingArea}
									onkeydown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											commitNewArea();
										} else if (e.key === 'Escape') {
											e.preventDefault();
											newAreaName = '';
											newAreaOpen = false;
										}
									}}
									class="flex-1 bg-transparent border-0 outline-none text-body-s text-ink font-sans placeholder:text-dim"
								/>
								<button
									type="button"
									onclick={commitNewArea}
									disabled={creatingArea}
									class="text-meta text-accent bg-transparent border-0 cursor-pointer p-0 font-mono uppercase tracking-[0.06em]"
								>
									{creatingArea ? '...' : 'ENTER'}
								</button>
							</div>
						{:else}
							<button
								type="button"
								onclick={() => (newAreaOpen = true)}
								class="flex items-center gap-3 px-3 py-[10px] rounded-sm bg-transparent border-0 cursor-pointer text-body-s text-muted hover:text-ink text-left"
							>
								{t.areaNew}
							</button>
						{/if}
					</div>
				</div>

				<!-- ④ Tags -->
				<div>
					<div class="flex items-baseline justify-between mb-2">
						<label class="text-body-s text-ink" style="font-weight:500;">
							<span class="text-dim mr-1">④</span>
							{t.tagsLabel}
						</label>
						<span class="font-mono text-meta-s text-dim tracking-[0.04em]">
							{tags.length}
						</span>
					</div>
					<p class="text-cap text-muted leading-[1.5] mb-3">{t.tagsHelper}</p>
					<div class="relative">
						<div
							class="flex flex-wrap gap-2 items-center px-3 py-[8px] bg-paper border-hair border-line rounded-sm"
						>
							{#each tags as tag (tag)}
								<span
									class="inline-flex items-center gap-1 px-2 py-[2px] bg-surface-2 rounded-xs font-mono text-meta text-ink"
									style="letter-spacing:0.02em;"
								>
									<span class="text-accent">#</span>{tag}
									<button
										type="button"
										aria-label={t.tagsRemove(tag)}
										onclick={() => removeTag(tag)}
										class="bg-transparent border-0 cursor-pointer text-dim hover:text-ink p-0 leading-none"
									>
										×
									</button>
								</span>
							{/each}
							<input
								type="text"
								bind:value={tagDraft}
								onkeydown={onTagKey}
								oninput={onTagInput}
								onblur={() => {
									setTimeout(() => (suggestOpen = false), 150);
								}}
								onfocus={() => {
									if (tagSuggestions.length > 0) suggestOpen = true;
								}}
								placeholder={tags.length === 0 ? t.tagsPlaceholder : ''}
								class="flex-1 min-w-[120px] bg-transparent border-0 outline-none text-body-s text-ink font-sans placeholder:text-dim"
							/>
						</div>
						{#if suggestOpen && tagSuggestions.length > 0}
							<div
								class="absolute left-0 right-0 mt-1 bg-surface border-hair border-line rounded-sm overflow-hidden z-10"
								style="box-shadow: var(--shadow-md);"
								role="listbox"
							>
								{#each tagSuggestions as s (s.id)}
									<button
										type="button"
										onclick={() => pickSuggestion(s)}
										onmousedown={(e) => e.preventDefault()}
										class="w-full flex items-center justify-between gap-2 px-3 py-[8px] bg-transparent border-0 cursor-pointer text-left hover:bg-surface-2"
									>
										<span class="font-mono text-meta text-ink" style="letter-spacing:0.02em;">
											<span class="text-accent">#</span>{s.name}
										</span>
										<span class="font-mono text-meta-s text-dim">
											{s.notebook_count}
										</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<!-- ⑤ Visibility -->
				<div>
					<div class="flex items-baseline mb-2">
						<label class="text-body-s text-ink" style="font-weight:500;">
							<span class="text-dim mr-1">⑤</span>
							{t.visibilityLabel}
						</label>
					</div>
					<div class="flex flex-col gap-2">
						{#each visibilityOptions as opt (opt.value)}
							{@const active = visibility === opt.value}
							{@const Icon = opt.icon}
							<button
								type="button"
								onclick={() => (visibility = opt.value)}
								class="flex items-start gap-3 px-3 py-3 rounded-sm cursor-pointer text-left border-hair transition-colors"
								style="border-color: {active
									? 'var(--color-accent)'
									: 'var(--color-line)'}; background: {active
									? 'var(--color-surface-2)'
									: 'transparent'};"
								aria-pressed={active}
							>
								<Icon
									class="w-4 h-4 {active ? 'text-accent' : 'text-muted'} shrink-0 mt-[2px]"
								/>
								<div class="flex-1">
									<div class="text-body-s text-ink" style="font-weight:500;">
										{opt.label()}
									</div>
									<div class="text-cap text-muted leading-[1.45] mt-[2px]">
										{opt.desc()}
									</div>
								</div>
								{#if active}
									<Check class="w-4 h-4 text-accent shrink-0 mt-[2px]" />
								{/if}
							</button>
						{/each}
					</div>
				</div>

				{#if error}
					<div
						class="border-hair rounded-sm px-3 py-2 text-cap"
						style="border-color: var(--color-danger); color: var(--color-danger);"
					>
						{error}
					</div>
				{/if}
			</form>
		</div>

		<!-- Footer -->
		<footer
			class="flex items-center gap-3 px-6 py-4 border-t-hair border-line bg-surface shrink-0"
		>
			<div class="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
				{#if selectedArea}
					<AreaDot paletteKey={selectedArea.palette_key} />
				{:else}
					<span
						class="inline-block rounded-full"
						style="width:6px; height:6px; background: var(--color-dim);"
					></span>
				{/if}
				<Mono>{areaStatus()}</Mono>
				<span class="text-dim text-meta-s">·</span>
				<Mono>{t.statusTags(tags.length)}</Mono>
				<span class="text-dim text-meta-s">·</span>
				<Mono>{visibilityStatus(visibility)}</Mono>
			</div>

			<Button variant="ghost" size="sm" onclick={onClose} disabled={isLoading}>
				<span class="flex items-center gap-2">
					{t.cancel}
					<Kbd>Esc</Kbd>
				</span>
			</Button>
			<Button
				variant="primary"
				size="sm"
				onclick={handleSubmit}
				disabled={!canCreate}
			>
				<span class="flex items-center gap-2">
					{isLoading
						? isEdit
							? t.saving
							: t.creating
						: isEdit
							? t.save
							: t.create}
					<Kbd class="!border-paper/30 !text-paper">⌘ ↵</Kbd>
				</span>
			</Button>
		</footer>
	</div>
</div>
