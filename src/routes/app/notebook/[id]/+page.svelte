<script lang="ts">
	import { page } from '$app/stores';
	import SearchPanel from '$lib/widgets/search-panel/search-panel.svelte';
	import FileUpload from '$lib/widgets/file-upload/file-upload.svelte';
	import ResultView from '$lib/widgets/result-view/result-view.svelte';
	import { searchArticles, summarizeStream, type Article } from '$lib/shared/lib/api/notebooks';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';

	let searchQuery = $state('');
	let isSearching = $state(false);
	let searchResults = $state<Article[]>([]);
	let selectedSources = $state<string[]>([]);

	let uploadedFiles = $state<File[]>([]);
	let isGenerating = $state(false);
	let generatedResult = $state('');

	async function handleSearch(query: string) {
		if (!query.trim()) return;
		isSearching = true;
		try {
			const result = await searchArticles($page.params.id, query);
			searchResults = result.articles;
			if (result.articles.length === 0) {
				toast.info('По запросу ничего не найдено');
			}
		} catch (e) {
			toast.error('Не удалось выполнить поиск');
			console.error('Search failed', e);
		} finally {
			isSearching = false;
		}
	}

	function toggleSource(id: string) {
		if (selectedSources.includes(id)) {
			selectedSources = selectedSources.filter((s) => s !== id);
		} else {
			selectedSources = [...selectedSources, id];
		}
	}

	function handleFileUpload(files: File[]) {
		uploadedFiles = [...uploadedFiles, ...files];
	}

	async function generateFusion() {
		if (selectedSources.length === 0) return;
		isGenerating = true;
		generatedResult = '';
		try {
			await summarizeStream(
				$page.params.id,
				{ article_ids: selectedSources, query: searchQuery },
				(token) => {
					generatedResult += token;
				}
			);
			toast.success('Саммари готово');
		} catch (e) {
			toast.error('Ошибка генерации саммари');
			console.error('Summarize failed', e);
		} finally {
			isGenerating = false;
		}
	}

	function handleExport() {
		toast.info('Экспорт в PDF пока не реализован');
	}
</script>

<div class="h-[92.5vh] flex flex-col bg-base-100 font-sans overflow-hidden">
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
