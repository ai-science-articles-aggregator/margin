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
			title: 'A simple graph contrastive learning framework for short text classification',
			author: 'Yonghao Liu, Fausto Giunchiglia, Lan Huang, Ximing Li, Xiaoyue Feng, Renchu Guan',
			year: 2025,
			snippet:
				'Short text classification has gained significant attention in the information age due to its prevalence and real-world applications...'
		},
		{
			id: 2,
			title: 'Graph-based multimodal contrastive learning for chart question answering',
			author: 'Yue Dai, Soyeon Caren Han, Wei Liu',
			year: 2015,
			snippet:
				'Chart question answering (ChartQA) is challenged by the heterogeneous composition of chart elements...'
		},
		{
			id: 3,
			title: 'What to align in multimodal contrastive learning?',
			author: 'Benoit Dufumier, Javiera Castillo-Navarro, Devis Tuia, Jean-Philippe Thiran',
			year: 2025,
			snippet: 'Humans perceive the world through multisensory integration, blending...'
		},
		{
			id: 4,
			title: 'Graph linearization methods for reasoning on graphs with large language models',
			author: 'Christos Xypolopoulos, Guokan Shang, Xiao Fei',
			year: 2025,
			snippet: 'Large language models have evolved to process multiple modalities beyond text...'
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
        In the era of information, we are surrounded by large amounts of short texts, such as tweets, news headlines, and product reviews. Efficiently extracting valuable information
from short texts is not easy. Compared to regular texts, on the one hand, short texts typically have limited contextual information and serious semantic sparsity issues (Wang
et al. 2021). They may only contain a few words, whichincreases the difficulty of correctly understanding their semantics (Phan, Nguyen, and Horiguchi 2008). On the otherhand, unlabeled short texts far outnumber labeled ones, leading to a severe label scarcity problems (Hu et al. 2019). Shorttext classification (STC), as a fundamental task of natural
language processing, has wide applications in real life, such as sentiment analysis (Liu et al. 2021; Li et al. 2024), social media analysis (Wu et al. 2014; Guan et al. 2021), and
intent recognition (Chen et al. 2019; Liu et al. 2023b). Compared to regular text classification, STC has sparked sig-
nificant research enthusiasm among researchers. Recently, some studies (Liu et al. 2024b) have explored the combination of graph neural networks (GNNs) and contrastive learning (CL) to address STC tasks, aiming to utilize the strengths
of both to learn informative text features, with impressive performance. These models generally start by constructing
a corpus-level heterogeneous graph and perform GNNs on it to obtain text embeddings. Subsequently, they leverage CL techniques to aim to maximize the utilization of valuable
information contained in numerous unlabeled short texts, which can facilitate the model to learn discriminative textrepresentations.
Despite their fruitful success, there are some limitations that hinder further performance improvements. First, these models almost need to perform explicit data augmentation
to generate contrastive views of short texts for CL. However, on the one hand, the optimal data augmentation configuration largely depends on extensive empirical trials, such as
selecting combinations of data augmentations and the hyperparameter settings (Li et al. 2023). Additionally, the increasing number of hyperparameters for data augmentation
exponentially expands the search space for data augmentation approaches, undoubtedly adding significant difficulty. Therefore, finding an optimal data augmentation configuration requires numerous time and computational resources.
On the other hand, an inappropriate data augmentation can even have a detrimental effect. Specifically, these models either perform random word insertion or deletion operations
on the original text to obtain augmented text (Chen et al. 2022), or they perform perturbation operations on nodes or
edges of the constructed text graph to obtain augmented one (Su et al. 2022). However, in either way, it inevitably damages the semantic information of the text and introduces
noise. For example, if we randomly insert a negation word into a short text like “this is a good movie”, it becomes “this is a not good movie”. This completely changes the original
semantics and even turning it into a negative sample with dissimilar semantics, which can have a negative impact on the subsequent CL, leading to suboptimal results. Hence, a
natural question arises: is there an elegant method to generate contrasting views of text without performing data augmentation?
      `;
		}, 2000);
	}

	function handleExport() {
		// TODO: integrate with backend - export to PDF
		console.log('Export to PDF');
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
