<script lang="ts">
	interface Props {
		monoref?: string;
		no?: string;
		label: string;
	}
	let { monoref, no, label }: Props = $props();
	let prefix = $derived(monoref ?? (no ? `§ ${no}` : ''));
</script>

<div class="flex items-baseline gap-3 mt-9 mb-2">
	{#if prefix}
		<span class="font-mono text-meta text-muted tracking-[0.08em]">{prefix}</span>
	{/if}
	<h2 class="font-serif text-h1 m-0" style="font-weight:400;">{label}</h2>
</div>
