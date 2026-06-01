<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'accent' | 'verified';

	interface Props {
		variant?: Variant;
		class?: string;
		children: Snippet;
	}

	let { variant = 'default', class: className = '', children }: Props = $props();

	let style = $derived(
		variant === 'accent' || variant === 'verified'
			? 'color: var(--color-accent); border-color: var(--color-accent);'
			: 'color: var(--color-muted); border-color: var(--color-line);'
	);
</script>

<span
	class="inline-flex items-center font-mono text-meta-s uppercase tracking-[0.04em] px-[7px] py-[2px] rounded-xs border-hair {className}"
	{style}
>
	{@render children()}
</span>
