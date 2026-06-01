<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'class' | 'size'> {
		class?: string;
		leading?: Snippet;
		trailing?: Snippet;
		size?: 'sm' | 'md' | 'lg';
		dense?: boolean;
		ref?: HTMLInputElement | null;
	}

	let {
		class: className = '',
		leading,
		trailing,
		size = 'md',
		dense = false,
		type = 'text',
		value = $bindable(),
		ref = $bindable(null),
		...rest
	}: Props = $props();

	let padLeft = $derived(leading ? (size === 'sm' ? 'pl-7' : 'pl-9') : 'pl-3');
	let padRight = $derived(trailing ? (size === 'sm' ? 'pr-9' : 'pr-12') : 'pr-3');
	let sizeCls = $derived(
		size === 'sm'
			? 'text-cap py-[6px]'
			: size === 'lg'
				? 'text-body py-[12px]'
				: dense
					? 'text-body-s py-[8px]'
					: 'text-body py-[10px]'
	);
</script>

<div class="relative w-full {className}">
	{#if leading}
		<span
			class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted pointer-events-none"
			style="width:{size === 'sm' ? '28px' : '36px'};"
		>
			{@render leading()}
		</span>
	{/if}
	<input
		{type}
		bind:value
		bind:this={ref}
		class="w-full bg-paper text-ink rounded-sm outline-none border-hair border-line focus:border-ink transition-colors placeholder:text-dim font-sans box-border {sizeCls} {padLeft} {padRight}"
		{...rest}
	/>
	{#if trailing}
		<span
			class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-dim pointer-events-none"
		>
			{@render trailing()}
		</span>
	{/if}
</div>
