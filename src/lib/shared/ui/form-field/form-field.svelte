<script lang="ts">
	interface Props {
		label?: string;
		error?: string;
		required?: boolean;
		class?: string;
	}

	let {
		label = '',
		error = '',
		required = false,
		class: className = '',
		...restProps
	}: Props = $props();
</script>

<div class="form-control {className}" {...restProps}>
	{#if label}
		<label class="label pl-4 py-1">
			<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider">
				{label}
				{#if required}
					<span class="text-red-500">*</span>
				{/if}
			</span>
		</label>
	{/if}
	<slot />
	{#if error}
		<label class="label">
			<span class="label-text-alt text-red-500">{error}</span>
		</label>
	{/if}
</div>
