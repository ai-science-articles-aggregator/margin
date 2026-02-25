<script lang="ts">
	interface Props {
		type?: string;
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		class?: string;
		rounded?: boolean;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(),
		disabled = false,
		required = false,
		rounded = true,
		class: className = '',
		...restProps
	}: Props = $props();

	let inputClasses = $derived(`
		input input-bordered w-full
		${rounded ? 'rounded-2xl' : ''}
		bg-base-200 border-base-300
		focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/20
		transition-all h-12 text-base-content placeholder:text-base-content/40
		${className}
	`.trim().replace(/\s+/g, ' '));
</script>

<input
	{type}
	{placeholder}
	bind:value
	{disabled}
	{required}
	class={inputClasses}
	{...restProps}
/>
