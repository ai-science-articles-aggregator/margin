<script lang="ts">
	import ThemeSwitcher from '$lib/shared/ui/theme-switcher/theme-switcher.svelte';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import UserAvatar from '$lib/shared/ui/user-avatar/user-avatar.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/shared/lib/api/auth';
	import type { UserProfile } from '$lib/shared/lib/api/profile';
	import type { Notebook } from '$lib/shared/lib/api/notebooks';

	let { children } = $props();

	let searchQuery = $state('');
	let showUserMenu = $state(false);
	let user = $state<UserProfile | null>($page.data?.profile ?? null);
	let notebook = $state<Notebook | null>($page.data?.notebook ?? null);

	let isNotebookPage = $derived($page.url.pathname.includes('/notebook'));

	async function handleLogout() {
		try {
			await logout();
			await goto('/auth/login');
		} catch (error) {
			console.error('Logout error:', error);
			// Even if logout fails, redirect to login
			await goto('/auth/login');
		}
	}
</script>

<!-- Обертка всего дашборда -->
<div class="min-h-screen bg-base-100 text-base-content font-sans transition-colors duration-300">
	<!-- NAVBAR -->
	<header
		class="sticky top-0 z-30 bg-base-100/90 backdrop-blur-md border-b border-base-300 px-6 py-4 flex items-center justify-between"
	>
		<!-- Left: Logo + Notebook Title -->
		<div class="flex items-center gap-3">
			<!-- Logo (clickable to go back to /app) -->
			<a href="/app" class="text-base-content hover:opacity-80 transition">
				<Logo href="/app" />
			</a>
			
			<!-- Notebook Title (only on notebook page) -->
			{#if isNotebookPage && notebook}
				<div class="flex items-center gap-2">
					<svg class="w-4 h-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
					<span class="text-lg font-medium text-base-content truncate max-w-[200px] sm:max-w-md">
						{notebook.name}
					</span>
				</div>
			{/if}
		</div>

		<!-- Search Bar -->
		{#if !isNotebookPage}
			<div class="flex-1 max-w-2xl mx-4">
				<div class="relative group">
					<input
						type="text"
						placeholder="Поиск по исследованиям..."
						bind:value={searchQuery}
						class="w-full h-12 rounded-full bg-base-200 border border-base-300 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-base-content/40 text-base-content"
					/>
					<svg
						class="w-5 h-5 text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path></svg
					>
				</div>
			</div>
		{/if}

		<!-- Actions & Theme Toggle -->
		<div class="flex items-center gap-3">
			<!-- Theme Switcher -->
			<ThemeSwitcher />

			<!-- User Menu Dropdown -->
			<div class="dropdown dropdown-end">
				<div
					tabindex="0"
					role="button"
					class="cursor-pointer"
					onclick={() => (showUserMenu = !showUserMenu)}
				>
					{#if user}
						<UserAvatar
							username={user.username}
							fullName={user.full_name}
							size="md"
						/>
					{:else}
						<div class="w-9 h-9 rounded-full bg-error text-error-content flex items-center justify-center text-xs font-bold">
							?
						</div>
					{/if}
				</div>
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
				>
					{#if user}
						<li class="menu-title text-xs text-base-content/70 px-3 py-2">
							{user.full_name || user.username}
						</li>
						<li>
							<a class="text-sm">
								<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								{user.email}
							</a>
						</li>
					{/if}
					<li class="border-t border-base-200 my-1"></li>
					<li>
						<a href="/app/settings">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							Настройки
						</a>
					</li>
					<li>
						<a onclick={handleLogout}>
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							Выйти
						</a>
					</li>
				</ul>
			</div>
		</div>
	</header>
	{@render children()}
</div>
