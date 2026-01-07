<script lang="ts">
	import SearchPanel from '$lib/widgets/search-panel/search-panel.svelte';
	import FileUpload from '$lib/widgets/file-upload/file-upload.svelte';
	import ResultView from '$lib/widgets/result-view/result-view.svelte';

	// --- Состояние ---
	let searchQuery = '';
	let isSearching = false;
	let searchResults: Array<{
		id: number;
		title: string;
		author: string;
		year: number;
		snippet: string;
	}> = [];
	let selectedSources: number[] = [];

	let uploadedFiles: File[] = [];
	let isGenerating = false;
	let generatedResult = '';

	// TODO: integrate with backend - fetch articles from API
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

	function handleSearch(query: string) {
		if (!query) return;
		isSearching = true;

		// TODO: integrate with backend - call search API
		// Имитация API запроса
		setTimeout(() => {
			searchResults = mockDatabase.filter(
				(item) =>
					item.title.toLowerCase().includes(query.toLowerCase()) ||
					item.snippet.toLowerCase().includes(query.toLowerCase())
			);
			if (searchResults.length === 0) searchResults = mockDatabase;
			isSearching = false;
		}, 800);
	}

	function toggleSource(id: number) {
		if (selectedSources.includes(id)) {
			selectedSources = selectedSources.filter((s) => s !== id);
		} else {
			selectedSources = [...selectedSources, id];
		}
	}

	function handleFileUpload(files: File[]) {
		uploadedFiles = [...uploadedFiles, ...files];
	}

	function generateFusion() {
		isGenerating = true;
		// TODO: integrate with backend - call generation API
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

	function handleExport() {
		// TODO: integrate with backend - export to PDF
		console.log('Export to PDF');
	}
</script>

<div class="h-[92.5vh] flex flex-col bg-base-200 font-sans overflow-hidden">
	<main class="flex-1 flex gap-4 p-4 min-h-0">
		<div class="w-[400px] flex-none flex flex-col gap-4 min-w-[320px]">
			<SearchPanel
				bind:searchQuery
				{isSearching}
				{searchResults}
				{selectedSources}
				onSearch={handleSearch}
				onToggleSource={toggleSource}
			/>

			<FileUpload {uploadedFiles} onFileUpload={handleFileUpload} />
		</div>

		<ResultView
			selectedSourcesCount={selectedSources.length}
			uploadedFilesCount={uploadedFiles.length}
			{generatedResult}
			{isGenerating}
			onGenerate={generateFusion}
			onExport={handleExport}
		/>
	</main>
</div>
