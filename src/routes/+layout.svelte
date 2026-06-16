<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Toaster from '$lib/shared/ui/toast/toaster.svelte';
	import { theme } from '$lib/shared/lib/theme.svelte';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';

	let { children } = $props();

	onMount(() => {
		const off = theme.listen();
		document.documentElement.setAttribute('lang', i18n.lang);
		return off;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen overflow-hidden flex flex-col bg-paper text-ink font-sans">
	{@render children()}
</div>

<Toaster />
