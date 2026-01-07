<script>
	// --- Состояние ---
	let searchQuery = '';
	let isSearching = false;
	let searchResults = []; // Найденные статьи
	let selectedSources = []; // Выбранные статьи (ID)

	let uploadedFiles = []; // Загруженные файлы
	let isGenerating = false;
	let generatedResult = ''; // Итоговый текст

	// --- Мок-данные для поиска ---
	const mockDatabase = [
		{
			id: 1,
			title: 'Attention Is All You Need',
			author: 'Vaswani et al.',
			year: 2017,
			snippet:
				'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...'
		},
		{
			id: 2,
			title: 'BERT: Pre-training of Deep Bidirectional Transformers',
			author: 'Devlin et al.',
			year: 2018,
			snippet: 'We introduce a new language representation model called BERT...'
		},
		{
			id: 3,
			title: 'GPT-4 Technical Report',
			author: 'OpenAI',
			year: 2023,
			snippet: 'We report the development of GPT-4, a large-scale, multimodal model...'
		},
		{
			id: 4,
			title: 'Llama 2: Open Foundation and Chat Models',
			author: 'Touvron et al.',
			year: 2023,
			snippet:
				'In this work, we develop and release Llama 2, a collection of pretrained and fine-tuned LLMs...'
		}
	];

	// --- Логика ---

	function handleSearch() {
		if (!searchQuery) return;
		isSearching = true;

		// Имитация API запроса
		setTimeout(() => {
			searchResults = mockDatabase.filter(
				(item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
			);
			// Если пусто, покажем все для демо
			if (searchResults.length === 0) searchResults = mockDatabase;

			isSearching = false;
		}, 800);
	}

	function toggleSource(id) {
		if (selectedSources.includes(id)) {
			selectedSources = selectedSources.filter((s) => s !== id);
		} else {
			selectedSources = [...selectedSources, id];
		}
	}

	function handleFileUpload(e) {
		const files = Array.from(e.target.files);
		uploadedFiles = [...uploadedFiles, ...files];
	}

	function generateFusion() {
		isGenerating = true;
		setTimeout(() => {
			isGenerating = false;
			generatedResult = `
        # Синтез знаний: ${searchQuery || 'Обзор темы'}

        На основе анализа ${selectedSources.length + uploadedFiles.length} источников, можно выделить следующие ключевые паттерны:

        ## 1. Эволюция архитектур
        Наблюдается переход от рекуррентных сетей к трансформерам. Как указано в [Vaswani et al.], механизм Self-Attention позволяет эффективно обрабатывать длинные последовательности, что подтверждается экспериментами в [OpenAI, 2023].

        ## 2. Проблемы масштабируемости
        Несмотря на успехи, модели требуют экспоненциального роста вычислительных ресурсов.
        > "We observe that performance scales as a power-law with model size..."

        ## 3. Открытость против Закрытости
        Существует явное разделение между проприетарными моделями (GPT-4) и открытыми инициативами (Llama 2), что влияет на доступность исследований.

        ### Вывод
        Дальнейшее развитие, вероятно, пойдет по пути оптимизации (Sparse Attention) и мультимодальности.
      `;
		}, 2000);
	}
</script>

<!-- LAYOUT CONTAINER: Фиксированная высота экрана -->
<div class="h-[92.5vh] flex flex-col bg-base-200 font-sans overflow-hidden">
	<!-- 2. WORKSPACE BODY -->
	<!-- calc(100vh - 4rem) = высота минус хедер. p-4 для отступов -->
	<main class="flex-1 flex gap-4 p-4 min-h-0">
		<!-- LEFT COLUMN: SIDEBAR -->
		<div class="w-[400px] flex-none flex flex-col gap-4 min-w-[320px]">
			<!-- BLOCK A: PROMPT & SEARCH RESULTS -->
			<!-- flex flex-col h-full чтобы растянуть на всю доступную высоту -->
			<div
				class="flex-1 bg-base-100 rounded-[2rem] border border-base-300 shadow-sm flex flex-col overflow-hidden relative"
			>
				<!-- Header + Text Area -->
				<div class="p-6 pb-0 flex-none z-10 bg-base-100">
					<h2 class="text-lg font-semibold mb-3 flex items-center gap-2">Ваш запрос</h2>

					<!-- Prompt Input Area -->
					<div class="relative w-full group">
						<textarea
							class="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all resize-none pr-12 text-base leading-relaxed custom-scrollbar shadow-inner"
							placeholder="Опишите тему исследования подробно."
							bind:value={searchQuery}
							on:keydown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									handleSearch();
								}
							}}
						></textarea>

						<!-- Floating Action Button inside Textarea -->
						<button
							class="absolute bottom-3 right-3 btn btn-sm btn-circle btn-primary shadow-lg hover:scale-105 transition-transform"
							on:click={handleSearch}
							disabled={isSearching || !searchQuery.trim()}
						>
							{#if isSearching}
								<span class="loading loading-spinner loading-xs"></span>
							{:else}
								<!-- Arrow Up Icon -->
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 10l7-7m0 0l7 7m-7-7v18"
									></path></svg
								>
							{/if}
						</button>
					</div>

					<div
						class="divider my-2 text-xs text-base-content/30 uppercase tracking-widest font-bold"
					>
						Результаты поиска
					</div>
				</div>

				<!-- Search Results List (Fills remaining space) -->
				<div class="flex-1 overflow-y-auto px-6 pb-6 space-y-3 custom-scrollbar relative">
					{#if searchResults.length > 0}
						<p class="text-xs text-base-content/50 mb-2 pl-1">
							Найдено {searchResults.length} релевантных статей:
						</p>
						{#each searchResults as item}
							<div
								class="card bg-base-200 border border-transparent hover:border-primary/50 cursor-pointer transition-all p-4 rounded-2xl group active:scale-[0.98] duration-200"
								class:ring-2={selectedSources.includes(item.id)}
								class:ring-primary={selectedSources.includes(item.id)}
								class:bg-blue-50={selectedSources.includes(item.id)}
								class:dark:bg-blue-900_20={selectedSources.includes(item.id)}
								on:click={() => toggleSource(item.id)}
							>
								<div class="flex justify-between items-start gap-2">
									<div>
										<h3 class="font-bold text-sm text-base-content leading-snug mb-1">
											{item.title}
										</h3>
										<p class="text-xs text-base-content/60 font-medium">
											{item.author}, {item.year}
										</p>
									</div>
									<!-- Checkbox stylization -->
									<div
										class={`flex-none w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSources.includes(item.id) ? 'border-primary bg-primary' : 'border-base-content/20'}`}
									>
										{#if selectedSources.includes(item.id)}
											<svg
												class="w-3 h-3 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="3"
													d="M5 13l4 4L19 7"
												/></svg
											>
										{/if}
									</div>
								</div>
								<!-- Snippet (optional, shown on hover or always) -->
								<p class="text-xs text-base-content/50 mt-2 line-clamp-2 leading-relaxed">
									{item.snippet}
								</p>
							</div>
						{/each}
					{:else if !isSearching}
						<div
							class="h-full flex flex-col items-center justify-center text-center text-base-content/40 pb-10"
						>
							<div class="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center mb-3">
								<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path></svg
								>
							</div>
							<p class="text-sm max-w-[200px]">
								Опишите тему выше, чтобы AI нашел релевантные материалы.
							</p>
						</div>
					{:else}
						<!-- Skeleton Loading State -->
						<div class="space-y-3 animate-pulse">
							{#each [1, 2, 3] as _}
								<div class="h-24 bg-base-200 rounded-2xl w-full"></div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Gradient Overlay at bottom for nice scroll fade -->
				<div
					class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-base-100 to-transparent pointer-events-none z-20"
				></div>
			</div>

			<!-- BLOCK B: FILE UPLOAD (Fixed small height) -->
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
		</div>

		<!-- CENTER/RIGHT COLUMN: RESULT AREA -->
		<div
			class="flex-1 bg-base-100 rounded-[2rem] border border-base-300 shadow-sm flex flex-col relative overflow-hidden"
		>
			<!-- Toolbar -->
			<div
				class="h-16 border-b border-base-200 flex items-center justify-between px-8 bg-base-100/50 backdrop-blur z-10"
			>
				<div class="text-sm text-base-content/50 font-medium">
					{#if selectedSources.length > 0 || uploadedFiles.length > 0}
						Выбрано источников: <span class="text-primary font-bold"
							>{selectedSources.length + uploadedFiles.length}</span
						>
					{:else}
						Источники не выбраны
					{/if}
				</div>

				<div class="flex gap-2">
					<button class="btn btn-sm btn-ghost rounded-full">Экспорт PDF</button>
					<button
						class="btn btn-sm btn-primary rounded-full px-6"
						disabled={selectedSources.length === 0 && uploadedFiles.length === 0}
						on:click={generateFusion}
					>
						{#if isGenerating}
							<span class="loading loading-dots loading-xs"></span>
						{:else}
							✨ Сгенерировать
						{/if}
					</button>
				</div>
			</div>

			<!-- Content Editor / View -->
			<div class="flex-1 overflow-y-auto p-8 md:p-12 bg-[#ffffff] dark:bg-base-100">
				{#if generatedResult}
					<!-- Render Markdown Result -->
					<article
						class="prose prose-lg max-w-4xl mx-auto prose-headings:font-medium prose-p:text-gray-600 prose-a:text-blue-600 dark:prose-invert"
					>
						<!-- Мы используем @html, в реальном проекте нужен парсер Markdown (например marked) -->
						{@html generatedResult
							.replace(/\n/g, '<br/>')
							.replace(/# (.*)/, '<h1>$1</h1>')
							.replace(/## (.*)/, '<h2>$1</h2>')}
					</article>
				{:else}
					<!-- Empty State -->
					<div class="h-full flex flex-col items-center justify-center text-center opacity-40">
						<div class="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6">
							<svg
								class="w-10 h-10 text-base-content"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
								></path></svg
							>
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
	</main>
</div>

<style>
	/* Кастомный скроллбар, чтобы было красиво внутри блоков */
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
