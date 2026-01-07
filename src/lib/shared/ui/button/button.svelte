<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		rounded?: boolean;
		fullWidth?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		rounded = false,
		fullWidth = false,
		disabled = false,
		type = 'button',
		class: className = '',
		...restProps
	}: Props = $props();

	let buttonClasses = $derived(`
		btn
		${variant === 'primary' ? 'btn-primary' : ''}
		${variant === 'secondary' ? 'btn-secondary' : ''}
		${variant === 'ghost' ? 'btn-ghost' : ''}
		${variant === 'outline' ? 'btn-outline' : ''}
		${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''}
		${rounded ? 'rounded-full' : ''}
		${fullWidth ? 'w-full' : ''}
		${className}
	`.trim().replace(/\s+/g, ' '));
</script>

<button
	type={type}
	class={buttonClasses}
	disabled={disabled}
	{...restProps}
>
	<slot />
</button>
