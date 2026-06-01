<script lang="ts">
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import Avatar from '$lib/shared/ui/avatar/avatar.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import AreaDot from '$lib/shared/ui/area-dot/area-dot.svelte';
	import Tag from '$lib/shared/ui/tag/tag.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import CreateNotebook from '$lib/features/create-notebook/create-notebook.svelte';
	import ShareNotebook from '$lib/features/share-notebook/share-notebook.svelte';
	import { logout } from '$lib/shared/lib/api/auth';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { areasStore } from '$lib/shared/lib/stores/areas.svelte';
	import { updateMyShare } from '$lib/shared/lib/api/shares';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import { displayName, type UserProfile } from '$lib/shared/lib/api/profile';
	import type { NotebookListItem } from '$lib/shared/lib/api/notebooks';
	import LogOut from 'lucide-svelte/icons/log-out';
	import User from 'lucide-svelte/icons/user';

	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(() => {
		areasStore.load();
	});

	let user = $derived<UserProfile | null>($page.data?.profile ?? null);
	let notebook = $derived<NotebookListItem | null>($page.data?.notebook ?? null);
	let isNotebookPage = $derived($page.url.pathname.includes('/notebook'));
	let isSettingsPage = $derived($page.url.pathname.startsWith('/app/settings'));

	// Sidebar uses URL params for filter state — same source of truth as Home pills.
	const onAppRoot = $derived($page.url.pathname === '/app');
	const params = $derived($page.url.searchParams);
	const activeAreaId = $derived(params.get('area_id'));
	const isSharedView = $derived(params.get('shared_only') === 'true');
	const isPublicView = $derived(params.get('visibility') === 'public');
	const isArchivedView = $derived(params.get('archived') === 'true');
	const isAllNotebooks = $derived(
		onAppRoot && !isSharedView && !isPublicView && !isArchivedView && !activeAreaId
	);

	function areaHref(id: string): string {
		const sp = new URLSearchParams();
		if (isSharedView) sp.set('shared_only', 'true');
		else if (isPublicView) sp.set('visibility', 'public');
		sp.set('area_id', id);
		return `/app?${sp.toString()}`;
	}

	let createOpen = $state(false);
	let shareOpen = $state(false);
	let sidebarMenuOpen = $state(false);
	let headerMenuOpen = $state(false);
	let updatingMyArea = $state(false);

	async function changeMyArea(areaId: string | null) {
		if (!notebook || updatingMyArea) return;
		updatingMyArea = true;
		try {
			await updateMyShare(notebook.id, areaId);
			// reload page data so the new area shows up in header & home
			await invalidateAll();
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? i18n.t.toast.notebookUpdateFailed);
		} finally {
			updatingMyArea = false;
		}
	}

	const t = $derived(i18n.t);

	async function handleLogout() {
		sidebarMenuOpen = false;
		headerMenuOpen = false;
		try {
			await logout();
		} catch (e) {
			console.error('Logout error:', e);
			toast.error(t.toast.logoutFailed);
		} finally {
			await goto('/auth/login');
		}
	}

	function gotoProfile() {
		sidebarMenuOpen = false;
		headerMenuOpen = false;
		goto('/app/profile');
	}

	function handleKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		const isTyping =
			target.tagName === 'INPUT' ||
			target.tagName === 'TEXTAREA' ||
			target.isContentEditable;

		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n' && !isTyping) {
			e.preventDefault();
			if (!isNotebookPage) createOpen = true;
		}
		if (e.key === 'Escape') {
			sidebarMenuOpen = false;
			headerMenuOpen = false;
		}
	}

	function handleWindowClick(e: MouseEvent) {
		const t = e.target as HTMLElement;
		if (!t.closest('[data-user-menu]')) {
			sidebarMenuOpen = false;
			headerMenuOpen = false;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:click={handleWindowClick} />

{#if isNotebookPage}
	<!-- Notebook header (52px) — sidebar replaced by top breadcrumb chrome -->
	<header
		class="flex items-center gap-4 px-5 border-b-hair border-line bg-surface shrink-0"
		style="height:52px;"
	>
		<Logo size={16} href="/app" />
		<span class="text-dim text-cap">/</span>
		{#if notebook}
			{#if notebook.area}
				<AreaDot paletteKey={notebook.area.palette_key} />
			{:else if !notebook.is_owner}
				<span
					class="inline-block rounded-full"
					style="width:6px; height:6px; background: var(--color-dim);"
					aria-hidden="true"
				></span>
			{/if}
			<span class="font-serif italic text-h3 truncate max-w-[420px]">{notebook.name}</span>
			{#if !notebook.is_owner && notebook.shared_by}
				<span class="font-mono text-meta-s text-dim tracking-[0.04em] uppercase">
					{i18n.lang === 'ru' ? 'ОТ' : 'BY'} {displayName(notebook.shared_by)}
				</span>
				<select
					value={notebook.area?.id ?? ''}
					onchange={(e) => changeMyArea((e.currentTarget as HTMLSelectElement).value || null)}
					disabled={updatingMyArea}
					class="bg-paper text-ink border-hair border-line rounded-xs px-2 py-[2px] font-mono text-meta uppercase tracking-[0.04em] outline-none cursor-pointer"
					title={i18n.t.share.recipientAreaHelper}
				>
					<option value="">{i18n.t.share.recipientAreaNone}</option>
					{#each areasStore.items as a (a.id)}
						<option value={a.id}>{a.name}</option>
					{/each}
				</select>
			{/if}
		{/if}
		<span class="ml-auto flex items-center gap-2">
			<Tag>{t.notebook.autosaved}</Tag>
			{#if notebook?.is_owner}
				<Button variant="ghost" size="sm" onclick={() => (shareOpen = true)}>
					{t.notebook.share}
				</Button>
			{/if}
			<div class="relative" data-user-menu>
				<button
					type="button"
					class="cursor-pointer bg-transparent border-0 p-0"
					onclick={() => (headerMenuOpen = !headerMenuOpen)}
					aria-haspopup="menu"
					aria-expanded={headerMenuOpen}
					aria-label="User menu"
				>
					{#if user}
						<Avatar
							firstName={user.first_name}
							lastName={user.last_name}
							email={user.email}
							size="sm"
						/>
					{:else}
						<Avatar size="sm" />
					{/if}
				</button>
				{#if headerMenuOpen && user}
					<div
						class="absolute right-0 mt-2 w-56 bg-surface border-hair border-line rounded-md p-2 z-40"
						style="box-shadow: var(--shadow-md);"
						role="menu"
					>
						<div class="px-3 py-2 text-meta text-muted font-mono uppercase tracking-[0.06em]">
							{displayName(user)}
						</div>
						<div class="px-3 pb-2 text-cap text-dim truncate">{user.email}</div>
						<hr class="my-1 border-0 bg-line" style="height:0.5px;" />
						<button
							type="button"
							onclick={gotoProfile}
							class="flex w-full items-center gap-2 px-3 py-2 text-body-s text-ink bg-transparent border-0 cursor-pointer hover:bg-surface-2 rounded-xs text-left"
						>
							<User class="w-4 h-4 text-muted" />
							{t.common.myProfile}
						</button>
						<button
							type="button"
							onclick={handleLogout}
							class="flex w-full items-center gap-2 px-3 py-2 text-body-s text-ink bg-transparent border-0 cursor-pointer hover:bg-surface-2 rounded-xs text-left"
						>
							<LogOut class="w-4 h-4 text-muted" />
							{t.common.logout}
						</button>
					</div>
				{/if}
			</div>
		</span>
	</header>

	<div class="flex-1 min-h-0 flex">
		{@render children()}
	</div>
{:else}
	<!-- Sidebar shell for /app and /app/settings -->
	<div
		class="flex-1 grid"
		style="grid-template-columns: 232px 1fr; min-height: 100vh;"
	>
		<aside
			class="flex flex-col bg-surface border-r-hair border-line"
			style="padding:20px 16px;"
		>
			<div class="px-1 pb-4">
				<Logo size={18} href="/app" />
			</div>

			<Button
				variant="primary"
				size="md"
				class="!justify-between w-full mb-6"
				onclick={() => (createOpen = true)}
			>
				<span>{t.home.newNotebook}</span>
				<span
					class="font-mono text-paper leading-none"
					style="font-size:12px; opacity:0.7; letter-spacing:0.02em;"
				>
					⌘ N
				</span>
			</Button>

			<div class="px-1 pb-2">
				<Mono>{t.home.library}</Mono>
			</div>
			{#each [{ l: t.home.allNotebooks, href: '/app', on: isAllNotebooks }, { l: t.home.recent, href: '/app', on: false }, { l: t.home.sharedWithMe, href: '/app?shared_only=true', on: isSharedView }, { l: t.home.archived, href: '/app?archived=true', on: isArchivedView }, { l: t.common.settings, href: '/app/settings', on: isSettingsPage }] as it (it.l)}
				<a
					href={it.href}
					class="px-[10px] py-[7px] text-body-s rounded-xs mb-[2px] flex justify-between no-underline transition-colors hover:bg-surface-2"
					style="background: {it.on
						? 'var(--color-surface-2)'
						: 'transparent'}; color: {it.on ? 'var(--color-ink)' : 'var(--color-muted)'}; font-weight:{it.on
						? 500
						: 400};"
				>
					<span>{it.l}</span>
				</a>
			{/each}

			<div class="px-1 pt-5 pb-2">
				<Mono>{t.home.areas}</Mono>
			</div>
			{#each areasStore.items as a (a.id)}
				{@const on = activeAreaId === a.id}
				<a
					href={areaHref(a.id)}
					class="px-[10px] py-[6px] text-body-s no-underline flex items-center gap-2 cursor-pointer hover:bg-surface-2 rounded-xs transition-colors"
					style="background: {on
						? 'var(--color-surface-2)'
						: 'transparent'}; color: {on ? 'var(--color-ink)' : 'var(--color-muted)'}; font-weight:{on
						? 500
						: 400};"
				>
					<AreaDot paletteKey={a.palette_key} />
					<span class="truncate">{a.name}</span>
				</a>
			{/each}

			<div class="flex-1"></div>

			<div class="relative pt-3 border-t-hair border-line" data-user-menu>
				{#if user}
					<button
						type="button"
						onclick={() => (sidebarMenuOpen = !sidebarMenuOpen)}
						aria-haspopup="menu"
						aria-expanded={sidebarMenuOpen}
						class="w-full flex items-center gap-2 px-[6px] py-[6px] rounded-sm bg-transparent border-0 cursor-pointer hover:bg-surface-2 text-left"
					>
						<Avatar
							firstName={user.first_name}
							lastName={user.last_name}
							email={user.email}
							size="md"
						/>
						<div class="min-w-0 flex-1">
							<div
								class="text-cap text-ink truncate"
								style="font-weight:500;"
							>
								{displayName(user)}
							</div>
							<div class="text-meta-s text-dim truncate">{user.email}</div>
						</div>
					</button>
				{/if}

				{#if sidebarMenuOpen && user}
					<div
						class="absolute left-0 right-0 bottom-full mb-2 bg-surface border-hair border-line rounded-md p-2 z-40"
						style="box-shadow: var(--shadow-md);"
						role="menu"
					>
						<button
							type="button"
							onclick={gotoProfile}
							class="flex w-full items-center gap-2 px-3 py-2 text-body-s text-ink bg-transparent border-0 cursor-pointer hover:bg-surface-2 rounded-xs text-left"
						>
							<User class="w-4 h-4 text-muted" />
							{t.common.myProfile}
						</button>
						<button
							type="button"
							onclick={handleLogout}
							class="flex w-full items-center gap-2 px-3 py-2 text-body-s text-ink bg-transparent border-0 cursor-pointer hover:bg-surface-2 rounded-xs text-left"
						>
							<LogOut class="w-4 h-4 text-muted" />
							{t.common.logout}
						</button>
					</div>
				{/if}
			</div>
		</aside>

		<main class="overflow-auto bg-paper">
			{@render children()}
		</main>
	</div>
{/if}

{#if createOpen}
	<CreateNotebook onClose={() => (createOpen = false)} />
{/if}

{#if shareOpen && notebook}
	<ShareNotebook
		notebookId={notebook.id}
		notebookName={notebook.name}
		onClose={() => (shareOpen = false)}
	/>
{/if}
