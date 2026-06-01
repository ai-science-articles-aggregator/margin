<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toast, type ToastType } from './toast.svelte';

	function color(type: ToastType): string {
		switch (type) {
			case 'success':
				return 'var(--color-accent)';
			case 'error':
				return 'var(--color-danger)';
			case 'warning':
				return '#b8915a';
			default:
				return 'var(--color-muted)';
		}
	}
</script>

<div
	class="fixed flex flex-col gap-2 z-[100]"
	style="bottom:24px; right:24px; max-width: 360px;"
>
	{#each toast.items as item (item.id)}
		<div
			in:fly={{ x: 24, duration: 200 }}
			out:fly={{ x: 24, duration: 160 }}
			class="bg-surface border-hair border-line rounded-sm px-3 py-2 flex items-start gap-3"
			style="box-shadow: var(--shadow-md); border-left: 2px solid {color(item.type)};"
			role="status"
		>
			<span class="flex-1 text-body-s text-ink leading-snug">{item.message}</span>
			<button
				type="button"
				class="bg-transparent border-0 cursor-pointer text-dim hover:text-ink p-0 leading-none"
				onclick={() => toast.dismiss(item.id)}
				aria-label="Close"
			>
				✕
			</button>
		</div>
	{/each}
</div>
