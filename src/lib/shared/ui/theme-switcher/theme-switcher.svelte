<script lang="ts">
	import { onMount } from 'svelte';

	let currentTheme = $state<'light' | 'dark'>('light');

	function toggleTheme() {
		currentTheme = currentTheme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('theme', currentTheme);
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme) {
			currentTheme = savedTheme;
		} else if (systemPrefersDark) {
			currentTheme = 'dark';
		} else {
			currentTheme = 'light';
		}

		document.documentElement.setAttribute('data-theme', currentTheme);
	});
</script>

<button class="btn btn-circle btn-ghost btn-sm" on:click={toggleTheme} aria-label="Переключить тему">
	{#if currentTheme === 'light'}
		<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	{:else}
		<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	{/if}
</button>
