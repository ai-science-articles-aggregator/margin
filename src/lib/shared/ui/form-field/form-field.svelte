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
			<span class="label-text text-base-content/70 text-xs uppercase font-bold tracking-wider">
				{label}
				{#if required}
					<span class="text-error">*</span>
				{/if}
			</span>
		</label>
	{/if}
	<slot />
	{#if error}
		<label class="label">
			<span class="label-text-alt text-error">{error}</span>
		</label>
	{/if}
</div>
