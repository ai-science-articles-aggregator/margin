<script lang="ts">
	import { onMount } from 'svelte';
	import { i18n, type Lang } from '$lib/shared/lib/i18n/i18n.svelte';
	import { theme, type ThemeMode } from '$lib/shared/lib/theme.svelte';
	import { areasStore } from '$lib/shared/lib/stores/areas.svelte';
	import { PALETTE_KEYS, type PaletteKey, type AreaRead } from '$lib/shared/lib/api/areas';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import Toggle from '$lib/shared/ui/toggle/toggle.svelte';
	import SectionHeader from '$lib/shared/ui/section-header/section-header.svelte';
	import ThemeCard from '$lib/shared/ui/theme-card/theme-card.svelte';
	import LangCard from '$lib/shared/ui/lang-card/lang-card.svelte';
	import AreaDot from '$lib/shared/ui/area-dot/area-dot.svelte';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Check from 'lucide-svelte/icons/check';
	import XIcon from 'lucide-svelte/icons/x';

	let notifDigest = $state(true);
	let notifCites = $state(true);
	let notifShared = $state(false);

	// Areas state
	let newAreaOpen = $state(false);
	let newAreaName = $state('');
	let newAreaPalette = $state<PaletteKey>('sienna');
	let editingAreaId = $state<string | null>(null);
	let editingName = $state('');
	let editingPalette = $state<PaletteKey>('sienna');
	let areaBusy = $state(false);
	let deletingArea = $state<AreaRead | null>(null);

	const t = $derived(i18n.t.settings);

	onMount(() => {
		areasStore.load();
	});

	function setThemeMode(m: ThemeMode) {
		theme.set(m);
	}

	function setLang(l: Lang) {
		i18n.set(l);
	}

	function openEditArea(a: AreaRead) {
		editingAreaId = a.id;
		editingName = a.name;
		editingPalette = a.palette_key;
	}

	function cancelEditArea() {
		editingAreaId = null;
		editingName = '';
	}

	async function saveEditArea() {
		if (!editingAreaId) return;
		const name = editingName.trim();
		if (!name) return;
		areaBusy = true;
		try {
			await areasStore.update(editingAreaId, { name, palette_key: editingPalette });
			toast.success(t.areasUpdated);
			cancelEditArea();
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.areasOperationFailed);
		} finally {
			areaBusy = false;
		}
	}

	async function submitNewArea() {
		const name = newAreaName.trim();
		if (!name) {
			newAreaOpen = false;
			return;
		}
		areaBusy = true;
		try {
			await areasStore.create({ name, palette_key: newAreaPalette });
			toast.success(t.areasCreated);
			newAreaName = '';
			newAreaPalette = 'sienna';
			newAreaOpen = false;
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.areasOperationFailed);
		} finally {
			areaBusy = false;
		}
	}

	async function confirmArchive() {
		if (!deletingArea) return;
		areaBusy = true;
		try {
			await areasStore.remove(deletingArea.id);
			toast.success(t.areasDeleted);
			deletingArea = null;
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.areasOperationFailed);
		} finally {
			areaBusy = false;
		}
	}
</script>

<section class="mx-auto" style="max-width:880px; padding:32px 48px 80px;">
	<div class="mb-3">
		<Mono>§ {t.title.toUpperCase()}</Mono>
		<h1 class="font-serif m-0 mt-2" style="font-size:44px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;">
			{t.title}<span class="text-accent">.</span>
		</h1>
		<p class="text-body text-muted m-0 mt-2 leading-[1.55]">{t.subtitle}</p>
	</div>

	<!-- §01 Appearance -->
	<SectionHeader no="01" label={t.sectAppearance} />
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div>
			<div class="text-body-s text-ink" style="font-weight:500;">{t.themeLabel}</div>
			<div class="text-cap text-muted leading-[1.5] mt-1">{t.appearanceSub}</div>
		</div>
		<div class="grid grid-cols-3 gap-3">
			<ThemeCard
				mode="light"
				active={theme.mode === 'light'}
				label={t.themeLight}
				desc={t.themeLightDesc}
				mini={{
					bg: '#faf8f2',
					surface: '#ffffff',
					surfaceAlt: '#f4efe3',
					ink: '#1a1814',
					muted: '#6b6356',
					accent: '#b7613c'
				}}
				onSelect={setThemeMode}
			/>
			<ThemeCard
				mode="dark"
				active={theme.mode === 'dark'}
				label={t.themeDark}
				desc={t.themeDarkDesc}
				mini={{
					bg: '#1a1714',
					surface: '#221e1a',
					surfaceAlt: '#2a2520',
					ink: '#f1ecd9',
					muted: '#a89f8a',
					accent: '#d88b68'
				}}
				onSelect={setThemeMode}
			/>
			<ThemeCard
				mode="system"
				active={theme.mode === 'system'}
				label={t.themeAuto}
				desc={t.themeAutoDesc}
				mini={{
					bg: 'linear-gradient(90deg, #faf8f2 0 50%, #1a1714 50% 100%)',
					surface: '#88827a',
					surfaceAlt: '#88827a',
					ink: '#f1ecd9',
					muted: '#a89f8a',
					accent: '#b7613c'
				}}
				onSelect={setThemeMode}
			/>
		</div>
	</div>

	<!-- §02 Language -->
	<SectionHeader no="02" label={t.sectLanguage} />
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div>
			<div class="text-body-s text-ink" style="font-weight:500;">{t.langLabel}</div>
			<div class="text-cap text-muted leading-[1.5] mt-1">{t.langSub}</div>
		</div>
		<div class="flex gap-3">
			<LangCard
				code="en"
				name="English"
				sample="Notebooks for researchers — search, cite, write."
				active={i18n.lang === 'en'}
				onSelect={setLang}
			/>
			<LangCard
				code="ru"
				name="Русский"
				sample="Тетради для исследователей — поиск, цитаты, заметки."
				active={i18n.lang === 'ru'}
				onSelect={setLang}
			/>
		</div>
	</div>
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.region}</div>
		<select
			class="bg-surface text-ink border-hair border-line rounded-sm px-3 py-[10px] text-body font-sans outline-none focus:border-ink"
			style="width:320px; box-sizing:border-box;"
		>
			<option>{i18n.lang === 'ru' ? 'Россия' : 'Russia'}</option>
			<option>{i18n.lang === 'ru' ? 'Великобритания' : 'United Kingdom'}</option>
			<option>{i18n.lang === 'ru' ? 'США' : 'United States'}</option>
		</select>
	</div>
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.timezone}</div>
		<select
			class="bg-surface text-ink border-hair border-line rounded-sm px-3 py-[10px] text-body font-sans outline-none focus:border-ink"
			style="width:320px; box-sizing:border-box;"
		>
			<option>Europe / Moscow · GMT+3</option>
			<option>Europe / London · GMT+0</option>
			<option>America / New York · GMT-5</option>
		</select>
	</div>

	<!-- §03 Areas -->
	<SectionHeader no="03" label={t.sectAreas} />
	<div class="py-6 border-t-hair border-line">
		<p class="text-cap text-muted leading-[1.5] mb-4">{t.areasHelper}</p>

		{#if areasStore.items.length === 0 && !areasStore.loading}
			<div class="text-cap text-muted py-4">{t.areasEmpty}</div>
		{/if}

		<div class="flex flex-col gap-[2px]">
			{#each areasStore.items as a (a.id)}
				{#if editingAreaId === a.id}
					<!-- Edit row -->
					<div class="flex items-center gap-3 px-3 py-[10px] bg-surface-2 rounded-sm">
						<div class="flex gap-[6px]">
							{#each PALETTE_KEYS as p (p)}
								<button
									type="button"
									onclick={() => (editingPalette = p)}
									aria-label={p}
									class="rounded-full cursor-pointer p-0 border-0"
									style="width:14px; height:14px; background: var(--color-area-{p}); outline: {editingPalette === p ? '2px solid var(--color-ink)' : 'none'}; outline-offset: 1px;"
								></button>
							{/each}
						</div>
						<Input bind:value={editingName} size="sm" />
						<button
							type="button"
							onclick={saveEditArea}
							disabled={areaBusy || !editingName.trim()}
							class="bg-transparent border-0 p-1 cursor-pointer text-accent hover:opacity-80"
							aria-label="Save"
						>
							<Check class="w-4 h-4" />
						</button>
						<button
							type="button"
							onclick={cancelEditArea}
							class="bg-transparent border-0 p-1 cursor-pointer text-muted hover:text-ink"
							aria-label="Cancel"
						>
							<XIcon class="w-4 h-4" />
						</button>
					</div>
				{:else}
					<div
						class="flex items-center gap-3 px-3 py-[10px] rounded-sm hover:bg-surface-2 transition-colors"
					>
						<AreaDot paletteKey={a.palette_key} />
						<span class="text-body-s text-ink flex-1">{a.name}</span>
						<span class="font-mono text-meta-s text-dim tracking-[0.04em]">{a.slug}</span>
						<button
							type="button"
							onclick={() => openEditArea(a)}
							class="bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-ink"
							aria-label={t.areasRename}
							title={t.areasRename}
						>
							<Pencil class="w-3.5 h-3.5" />
						</button>
						<button
							type="button"
							onclick={() => (deletingArea = a)}
							class="bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-ink"
							aria-label={t.areasDelete}
							title={t.areasDelete}
						>
							<Trash2 class="w-3.5 h-3.5" />
						</button>
					</div>
				{/if}
			{/each}

			{#if newAreaOpen}
				<div class="flex items-center gap-3 px-3 py-[10px] bg-surface-2 rounded-sm">
					<div class="flex gap-[6px]">
						{#each PALETTE_KEYS as p (p)}
							<button
								type="button"
								onclick={() => (newAreaPalette = p)}
								aria-label={p}
								class="rounded-full cursor-pointer p-0 border-0"
								style="width:14px; height:14px; background: var(--color-area-{p}); outline: {newAreaPalette === p ? '2px solid var(--color-ink)' : 'none'}; outline-offset: 1px;"
							></button>
						{/each}
					</div>
					<Input
						bind:value={newAreaName}
						size="sm"
						placeholder={t.areasNewPlaceholder}
					/>
					<button
						type="button"
						onclick={submitNewArea}
						disabled={areaBusy || !newAreaName.trim()}
						class="bg-transparent border-0 p-1 cursor-pointer text-accent hover:opacity-80"
						aria-label="Save"
					>
						<Check class="w-4 h-4" />
					</button>
					<button
						type="button"
						onclick={() => {
							newAreaOpen = false;
							newAreaName = '';
						}}
						class="bg-transparent border-0 p-1 cursor-pointer text-muted hover:text-ink"
						aria-label="Cancel"
					>
						<XIcon class="w-4 h-4" />
					</button>
				</div>
			{:else}
				<button
					type="button"
					onclick={() => (newAreaOpen = true)}
					class="flex items-center gap-3 px-3 py-[10px] rounded-sm bg-transparent border-0 cursor-pointer text-body-s text-muted hover:text-ink text-left"
				>
					{t.areasNew}
				</button>
			{/if}
		</div>
	</div>

	<!-- §04 Notifications -->
	<SectionHeader no="04" label={t.sectNotifs} />
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div>
			<div class="text-body-s text-ink" style="font-weight:500;">{t.notifDigest}</div>
			<div class="text-cap text-muted leading-[1.5] mt-1">{t.notifDigestDesc}</div>
		</div>
		<Toggle bind:checked={notifDigest} label={t.notifDigest} />
	</div>
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div>
			<div class="text-body-s text-ink" style="font-weight:500;">{t.notifCites}</div>
			<div class="text-cap text-muted leading-[1.5] mt-1">{t.notifCitesDesc}</div>
		</div>
		<Toggle bind:checked={notifCites} label={t.notifCites} />
	</div>
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div>
			<div class="text-body-s text-ink" style="font-weight:500;">{t.notifShared}</div>
			<div class="text-cap text-muted leading-[1.5] mt-1">{t.notifSharedDesc}</div>
		</div>
		<Toggle bind:checked={notifShared} label={t.notifShared} />
	</div>

	<!-- §05 Danger -->
	<SectionHeader no="05" label={t.sectDanger} />
	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div>
			<div class="text-body-s text-ink" style="font-weight:500;">{t.deleteAccount}</div>
			<div class="text-cap text-muted leading-[1.5] mt-1">{t.deleteSub}</div>
		</div>
		<div>
			<Button variant="danger" size="sm">{t.deleteAccount}</Button>
		</div>
	</div>
</section>

{#if deletingArea}
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
			<Mono tone="accent">§ {t.sectAreas.toUpperCase()}</Mono>
			<h2 class="font-serif text-h1 m-0 mt-2 mb-4" style="font-weight:400;">
				{t.areasDelete}<span class="text-accent">.</span>
			</h2>
			<p class="text-body text-muted mb-6 leading-[1.55]">
				{t.areasConfirmDelete(deletingArea.name)}
			</p>
			<div class="flex gap-3 justify-end">
				<Button
					variant="ghost"
					size="md"
					onclick={() => (deletingArea = null)}
					disabled={areaBusy}
				>
					{t.cancel}
				</Button>
				<Button variant="danger" size="md" onclick={confirmArchive} disabled={areaBusy}>
					{t.areasDelete}
				</Button>
			</div>
		</div>
	</div>
{/if}
