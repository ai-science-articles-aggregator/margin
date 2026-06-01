<script lang="ts">
	interface Props {
		size?: number;
		href?: string | null;
	}

	let { size = 18, href = null }: Props = $props();
	const barH = Math.round(size * 0.95);
</script>

{#snippet body()}
	<span
		class="inline-block bg-accent"
		style="width:1.5px; height:{barH}px; transform: translateY(2px)"
		aria-hidden="true"
	></span>
	<span
		class="font-serif text-ink"
		style="font-size:{size}px; font-weight:500; letter-spacing:-0.01em; line-height:1"
	>
		Margin
	</span>
{/snippet}

{#if href}
	<a
		{href}
		class="inline-flex items-baseline gap-[6px] no-underline text-ink hover:opacity-90"
		aria-label="Margin"
	>
		{@render body()}
	</a>
{:else}
	<span class="inline-flex items-baseline gap-[6px]" aria-label="Margin">
		{@render body()}
	</span>
{/if}
