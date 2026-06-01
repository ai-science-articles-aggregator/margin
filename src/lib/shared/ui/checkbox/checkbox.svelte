<script lang="ts">
	interface Props {
		checked: boolean;
		disabled?: boolean;
		ariaLabel?: string;
		onChange?: (v: boolean) => void;
	}

	let { checked = $bindable(false), disabled = false, ariaLabel, onChange }: Props = $props();

	function handle(e: Event) {
		if (disabled) return;
		e.stopPropagation();
		checked = !checked;
		onChange?.(checked);
	}
</script>

<button
	type="button"
	role="checkbox"
	aria-checked={checked}
	aria-label={ariaLabel}
	{disabled}
	onclick={handle}
	class="inline-flex items-center justify-center p-0 cursor-pointer disabled:cursor-not-allowed text-paper"
	style="width:14px; height:14px; border-radius:3px; border:1px solid {checked
		? 'var(--color-accent)'
		: 'var(--color-line)'}; background: {checked ? 'var(--color-accent)' : 'transparent'}; line-height:1;"
>
	{#if checked}
		<svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
			<path
				d="M2 6.5 L5 9 L10 3"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
</button>
