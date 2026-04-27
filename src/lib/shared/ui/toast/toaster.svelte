<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toast } from './toast.svelte';
</script>

<div class="toast toast-end toast-bottom z-[100]">
	{#each toast.items as item (item.id)}
		<div
			in:fly={{ x: 50, duration: 250 }}
			out:fly={{ x: 50, duration: 200 }}
			class="alert shadow-lg max-w-sm flex items-center gap-2"
			class:alert-success={item.type === 'success'}
			class:alert-error={item.type === 'error'}
			class:alert-info={item.type === 'info'}
			class:alert-warning={item.type === 'warning'}
		>
			<span class="flex-1 text-sm">{item.message}</span>
			<button
				class="btn btn-ghost btn-xs btn-circle"
				onclick={() => toast.dismiss(item.id)}
				aria-label="Закрыть"
			>
				✕
			</button>
		</div>
	{/each}
</div>
