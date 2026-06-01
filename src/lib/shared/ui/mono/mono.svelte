<script lang="ts">
	import type { Snippet } from 'svelte';

	type Size = 'meta-s' | 'meta' | 'cap';

	interface Props {
		size?: Size;
		tone?: 'muted' | 'dim' | 'ink' | 'accent';
		class?: string;
		children: Snippet;
	}

	let {
		size = 'meta',
		tone = 'muted',
		class: className = '',
		children
	}: Props = $props();

	let sizeClass = $derived(
		size === 'meta-s' ? 'text-meta-s' : size === 'cap' ? 'text-cap' : 'text-meta'
	);
	let toneClass = $derived(
		tone === 'accent'
			? 'text-accent'
			: tone === 'ink'
				? 'text-ink'
				: tone === 'dim'
					? 'text-dim'
					: 'text-muted'
	);
</script>

<span class="font-mono uppercase {sizeClass} {toneClass} {className}">
	{@render children()}
</span>
