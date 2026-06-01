<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}
	let { class: className = '', children }: Props = $props();
</script>

<kbd
	class="font-mono text-meta-s text-dim px-[5px] py-[1px] leading-none {className}"
	style="background: transparent;"
>
	{@render children()}
</kbd>
