<script lang="ts">
	interface Props {
		class?: string;
		vertical?: boolean;
	}
	let { class: className = '', vertical = false }: Props = $props();
</script>

{#if vertical}
	<span class="inline-block bg-line {className}" style="width:0.5px;" aria-hidden="true"></span>
{:else}
	<hr class="border-0 bg-line {className}" style="height:0.5px;" aria-hidden="true" />
{/if}
