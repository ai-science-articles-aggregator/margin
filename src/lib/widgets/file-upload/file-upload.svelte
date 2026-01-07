<script lang="ts">
	interface Props {
		uploadedFiles?: File[];
		onFileUpload?: (files: File[]) => void;
	}

	let { uploadedFiles = [], onFileUpload }: Props = $props();

	function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && onFileUpload) {
			const files = Array.from(target.files);
			onFileUpload(files);
		}
	}
</script>

<div
	class="h-[140px] flex-none bg-base-100 rounded-[2rem] border border-base-300 shadow-sm p-5 flex flex-col"
>
	<h2 class="text-sm font-semibold mb-2 flex items-center gap-2 text-base-content/70">
		Ваши файлы
	</h2>

	<div
		class="flex-1 border-2 border-dashed border-base-300 hover:border-secondary hover:bg-base-200/50 rounded-xl transition-all flex items-center justify-center relative cursor-pointer group overflow-hidden"
	>
		<input
			type="file"
			multiple
			accept=".pdf,.docx"
			class="absolute inset-0 opacity-0 cursor-pointer z-10"
			on:change={handleFileUpload}
		/>

		{#if uploadedFiles.length === 0}
			<div class="flex flex-col items-center gap-1">
				<span
					class="text-xs font-bold text-secondary group-hover:scale-110 transition-transform"
					>+ Загрузить</span
				>
				<span class="text-[10px] text-base-content/40">PDF, DOCX</span>
			</div>
		{:else}
			<div class="w-full h-full p-2 overflow-y-auto custom-scrollbar">
				<ul class="grid grid-cols-1 gap-1">
					{#each uploadedFiles as file}
						<li
							class="flex items-center gap-2 text-xs bg-base-200 px-2 py-1.5 rounded-lg border border-base-300"
						>
							<span class="text-red-500 shrink-0">📄</span>
							<span class="truncate">{file.name}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: rgba(156, 163, 175, 0.3);
		border-radius: 20px;
	}
</style>
