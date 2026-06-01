<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'ghost' | 'link' | 'danger' | 'accent' | 'outline-light';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<HTMLButtonAttributes, 'class'> {
		variant?: Variant;
		size?: Size;
		fullWidth?: boolean;
		loading?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		loading = false,
		type = 'button',
		class: className = '',
		disabled = false,
		children,
		...rest
	}: Props = $props();

	let base =
		'inline-flex items-center justify-center gap-[6px] font-sans cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

	let sizeCls = $derived(
		size === 'sm'
			? 'text-cap px-[10px] py-[5px] rounded-xs'
			: size === 'lg'
				? 'text-body px-[22px] py-[14px] rounded-sm'
				: 'text-body px-[16px] py-[12px] rounded-sm'
	);

	let variantCls = $derived(
		variant === 'primary'
			? 'bg-ink text-paper hover:opacity-90 border-0'
			: variant === 'accent'
				? 'bg-accent text-accent-ink hover:opacity-90 border-0'
				: variant === 'ghost'
					? 'bg-transparent text-ink border-hair border-line hover:bg-surface-2'
					: variant === 'outline-light'
						? 'bg-transparent text-paper hover:opacity-90'
						: variant === 'danger'
							? 'bg-transparent text-danger border-hair border-danger hover:bg-accent-tint'
							: 'bg-transparent text-accent border-0 hover:opacity-80 underline'
	);

	let outlineLightStyle = $derived(
		variant === 'outline-light' ? 'border: 0.5px solid rgba(255,255,255,0.2);' : ''
	);

	let widthCls = $derived(fullWidth ? 'w-full' : '');
</script>

<button
	{type}
	class="{base} {sizeCls} {variantCls} {widthCls} {className}"
	style={outlineLightStyle}
	disabled={disabled || loading}
	{...rest}
>
	{@render children()}
</button>
