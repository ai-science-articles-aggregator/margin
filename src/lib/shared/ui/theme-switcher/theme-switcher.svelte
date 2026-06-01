<script lang="ts">
	import { theme } from '$lib/shared/lib/theme.svelte';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	let label = $derived(theme.isDark ? i18n.t.settings.themeLight : i18n.t.settings.themeDark);
</script>

<button
	type="button"
	class="inline-flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-surface-2 cursor-pointer text-muted"
	onclick={() => theme.toggle()}
	aria-label={label}
	title={label}
>
	{#if theme.isDark}
		<Sun class="w-4 h-4" />
	{:else}
		<Moon class="w-4 h-4" />
	{/if}
</button>
