<script lang="ts">
	interface SearchResult {
		id: string;
		title: string;
		authors: string;
		score: number;
	}

	interface Props {
		searchQuery?: string;
		isSearching?: boolean;
		searchResults?: SearchResult[];
		selectedSources?: string[];
		onSearch?: (query: string) => void;
		onToggleSource?: (id: string) => void;
	}

	let {
		searchQuery = $bindable(''),
		isSearching = false,
		searchResults = [],
		selectedSources = [],
		onSearch,
		onToggleSource,
	}: Props = $props();

	function handleSearch() {
		if (onSearch) {
			onSearch(searchQuery);
		}
	}
</script>

<div
	class="flex-1 bg-base-100 rounded-[2rem] border border-base-300 shadow-sm flex flex-col overflow-hidden relative"
>
	<div class="p-6 pb-0 flex-none z-10 bg-base-100">
		<h2 class="text-lg font-semibold mb-3 flex items-center gap-2">Ваш запрос</h2>

		<div class="relative w-full group">
			<textarea
				class="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all resize-none pr-12 text-base leading-relaxed custom-scrollbar shadow-inner placeholder:text-base-content/30"
				placeholder="Опишите тему исследования подробно."
				bind:value={searchQuery}
				onkeydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						handleSearch();
					}
				}}
			></textarea>

			<button
				class="absolute bottom-3 right-3 btn btn-sm btn-circle btn-primary shadow-lg hover:scale-105 transition-transform"
				onclick={handleSearch}
				disabled={isSearching || !searchQuery.trim()}
			>
				{#if isSearching}
					<span class="loading loading-spinner loading-xs"></span>
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 10l7-7m0 0l7 7m-7-7v18"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<div class="divider my-2 text-xs text-base-content/30 uppercase tracking-widest font-bold">
			Результаты поиска
		</div>
	</div>

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
					onclick={() => {
						if (onToggleSource) {
							onToggleSource(item.id);
						}
					}}
				>
					<div class="flex justify-between items-start gap-2">
						<div>
							<h3 class="font-bold text-sm text-base-content leading-snug mb-1">
								{item.title}
							</h3>
							<p class="text-xs text-base-content/60 font-medium">
								{item.authors} · {(item.score * 100).toFixed(0)}% match
							</p>
						</div>
						<div
							class={`flex-none w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSources.includes(item.id) ? 'border-primary bg-primary' : 'border-base-content/20'}`}
						>
							{#if selectedSources.includes(item.id)}
								<svg
									class="w-3 h-3 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="3"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{:else if !isSearching}
			<div class="h-full flex flex-col items-center justify-center text-center text-base-content/40 pb-10">
				<div class="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center mb-3">
					<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<p class="text-sm max-w-[200px]">
					Опишите тему выше, чтобы AI нашел релевантные материалы.
				</p>
			</div>
		{:else}
			<div class="space-y-3 animate-pulse">
				{#each [1, 2, 3] as _}
					<div class="h-24 bg-base-200 rounded-2xl w-full"></div>
				{/each}
			</div>
		{/if}
	</div>

	<div
		class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-base-100 to-transparent pointer-events-none z-20"
	></div>
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
