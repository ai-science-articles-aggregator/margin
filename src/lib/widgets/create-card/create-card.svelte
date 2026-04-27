<script lang="ts">
	interface Props {
		onClick?: () => void;
	}

	let { onClick }: Props = $props();
</script>

<button
	class="group h-80 flex flex-col items-start justify-between p-8 rounded-[2rem] bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-left cursor-pointer overflow-hidden relative"
	onclick={onClick}
>
	<div
		class="absolute inset-0 bg-base-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
	></div>

	<div
		class="relative z-10 w-14 h-14 rounded-2xl bg-base-content text-base-100 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300"
	>
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
		</svg>
	</div>

	<div class="relative z-10 mt-auto w-full">
		<h3 class="text-xl font-medium text-base-content mb-1">Новое новый блокнот</h3>
		<p class="text-sm text-base-content/60">Создать с нуля или импорт</p>
	</div>
</button>
