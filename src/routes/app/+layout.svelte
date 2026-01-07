<script lang="ts">
	import ThemeSwitcher from '$lib/components/header/theme-switcher/theme-switcher.svelte';
	let { children } = $props();

	let searchQuery = '';
</script>

<!-- Обертка всего дашборда -->
<!-- bg-base-200 и text-base-content автоматически меняются daisyUI -->
<div class="min-h-screen bg-base-200 text-base-content font-sans transition-colors duration-300">
	<!-- NAVBAR -->
	<header
		class="sticky top-0 z-30 bg-base-100/90 backdrop-blur-md border-b border-base-300 px-6 py-4 flex items-center justify-between"
	>
		<!-- Logo -->
		<div class="flex items-center gap-3">
			<div class="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex-shrink-0"></div>
			<span class="text-xl font-medium tracking-tight hidden md:block"
				>Article<span class="font-bold">Fusion</span></span
			>
		</div>

		<!-- Search Bar -->
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

		<!-- Actions & Theme Toggle -->
		<div class="flex items-center gap-3">
			<!-- Theme Switcher -->
			<ThemeSwitcher />

			<div class="avatar placeholder cursor-pointer">
				<div
					class="bg-primary text-primary-content rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold shadow-md hover:ring-2 ring-primary/30 transition"
				>
					IV
				</div>
			</div>
		</div>
	</header>
	{@render children()}
</div>
