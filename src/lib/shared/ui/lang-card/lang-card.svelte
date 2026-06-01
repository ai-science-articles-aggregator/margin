<script lang="ts">
	import type { Lang } from '$lib/shared/lib/i18n/dict';

	interface Props {
		code: Lang;
		name: string;
		sample: string;
		active: boolean;
		onSelect?: (l: Lang) => void;
	}

	let { code, name, sample, active, onSelect }: Props = $props();
</script>

<button
	type="button"
	class="flex-1 flex flex-col gap-[10px] text-left p-4 rounded-md cursor-pointer"
	style="background: {active ? 'var(--color-surface-2)' : 'var(--color-surface)'}; border: {active
		? '1px'
		: '0.5px'} solid {active ? 'var(--color-accent)' : 'var(--color-line)'};"
	aria-pressed={active}
	onclick={() => onSelect?.(code)}
>
	<div class="flex items-baseline justify-between">
		<span
			class="font-serif text-ink leading-none"
			style="font-size:28px; letter-spacing:-0.02em;"
		>
			{name}
		</span>
		<span class="font-mono text-meta-s text-muted tracking-[0.08em]">
			{code.toUpperCase()}
		</span>
	</div>
	<div class="text-cap text-muted leading-[1.5]">{sample}</div>
	{#if active}
		<div class="font-mono text-meta-s text-accent tracking-[0.06em]">✓ ACTIVE</div>
	{/if}
</button>
