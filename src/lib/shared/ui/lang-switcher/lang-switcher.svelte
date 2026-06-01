<script lang="ts">
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
</script>

<div class="inline-flex items-baseline gap-[6px] font-mono text-meta">
	<button
		type="button"
		onclick={() => i18n.set('en')}
		class="cursor-pointer p-0 bg-transparent border-0 {i18n.lang === 'en'
			? 'text-ink'
			: 'text-dim hover:text-muted'}"
		aria-pressed={i18n.lang === 'en'}
	>
		EN
	</button>
	<span class="text-dim">·</span>
	<button
		type="button"
		onclick={() => i18n.set('ru')}
		class="cursor-pointer p-0 bg-transparent border-0 {i18n.lang === 'ru'
			? 'text-ink'
			: 'text-dim hover:text-muted'}"
		aria-pressed={i18n.lang === 'ru'}
	>
		RU
	</button>
</div>
