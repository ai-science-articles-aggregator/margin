<script lang="ts">
	interface Props {
		selectedSourcesCount?: number;
		uploadedFilesCount?: number;
		generatedResult?: string;
		isGenerating?: boolean;
		onGenerate?: () => void;
		onExport?: () => void;
	}

	let {
		selectedSourcesCount = 0,
		uploadedFilesCount = 0,
		generatedResult = '',
		isGenerating = false,
		onGenerate,
		onExport,
	}: Props = $props();

	let totalSources = $derived(selectedSourcesCount + uploadedFilesCount);

	let renderedHtml = $derived(
		generatedResult
			.replace(/\n/g, '<br/>')
			.replace(/# (.*)/, '<h1>$1</h1>')
			.replace(/## (.*)/, '<h2>$1</h2>')
	);
</script>

<div
	class="flex-1 bg-base-100 rounded-[2rem] border border-base-300 shadow-sm flex flex-col relative overflow-hidden"
>
	<div
		class="h-16 border-b border-base-200 flex items-center justify-between px-8 bg-base-100/50 backdrop-blur z-10"
	>
		<div class="text-sm text-base-content/50 font-medium">
			{#if totalSources > 0}
				Выбрано источников: <span class="text-primary font-bold">{totalSources}</span>
			{:else}
				Источники не выбраны
			{/if}
		</div>

		<div class="flex gap-2">
			<button class="btn btn-sm btn-ghost rounded-full" onclick={onExport}>
				Экспорт PDF
			</button>
			<button
				class="btn btn-sm btn-primary rounded-full px-6"
				disabled={totalSources === 0 || isGenerating}
				onclick={onGenerate}
			>
				{#if isGenerating}
					<span class="loading loading-dots loading-xs"></span>
					Генерация...
				{:else}
					✨ Сгенерировать
				{/if}
			</button>
		</div>
	</div>

	<div class="flex-1 overflow-y-auto p-8 md:p-12 bg-[#ffffff] dark:bg-base-100">
		{#if generatedResult || isGenerating}
			<article
				class="prose prose-lg max-w-4xl mx-auto prose-headings:font-medium prose-p:text-gray-600 prose-a:text-blue-600 dark:prose-invert"
			>
				{#if generatedResult}
					{@html renderedHtml}
				{/if}
				{#if isGenerating}
					<span class="streaming-cursor" aria-hidden="true">▍</span>
				{/if}
			</article>
		{:else}
			<div class="h-full flex flex-col items-center justify-center text-center opacity-40">
				<div class="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6">
					<svg
						class="w-10 h-10 text-base-content"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-medium mb-2">Пространство пусто</h3>
				<p class="max-w-md mx-auto">
					Выберите статьи в левой панели или загрузите свои файлы, чтобы ArticleFusion объединил
					их в единый отчет.
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.streaming-cursor {
		display: inline-block;
		margin-left: 2px;
		color: oklch(var(--p, 60% 0.2 250));
		font-weight: bold;
		animation: blink 1s steps(2, start) infinite;
		transform: translateY(2px);
	}
	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
