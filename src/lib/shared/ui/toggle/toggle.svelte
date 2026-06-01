<script lang="ts">
	interface Props {
		checked: boolean;
		label?: string;
		disabled?: boolean;
		onToggle?: (v: boolean) => void;
	}

	let { checked = $bindable(false), label, disabled = false, onToggle }: Props = $props();

	function handle() {
		if (disabled) return;
		checked = !checked;
		onToggle?.(checked);
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={checked}
	aria-label={label}
	{disabled}
	onclick={handle}
	class="relative inline-block rounded-full p-0 border-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
	style="width:36px; height:20px; background: {checked
		? 'var(--color-accent)'
		: 'var(--color-line)'}; transition: background 0.15s;"
>
	<span
		class="absolute rounded-full"
		style="top:2px; left: {checked ? 18 : 2}px; width:16px; height:16px; background: var(--color-surface); box-shadow: 0 1px 2px rgba(0,0,0,0.25); transition: left 0.15s;"
	></span>
</button>
