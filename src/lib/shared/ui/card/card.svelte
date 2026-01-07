<script lang="ts">
	interface Props {
		hoverable?: boolean;
		class?: string;
	}

	let {
		hoverable = false,
		class: className = '',
		...restProps
	}: Props = $props();

	let cardClasses = $derived(`
		${hoverable ? 'hover:shadow-xl transition-all duration-300' : ''}
		${className}
	`.trim().replace(/\s+/g, ' '));
</script>

<div class={cardClasses} {...restProps}>
	<slot />
</div>
