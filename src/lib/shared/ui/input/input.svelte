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
		bg-gray-50 border-gray-100
		focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50
		transition-all h-12
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
