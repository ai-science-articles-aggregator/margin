<script lang="ts">
	interface Props {
		primaryAction?: {
			label: string;
			href?: string;
			onClick?: () => void;
		};
		secondaryAction?: {
			label: string;
			href?: string;
			onClick?: () => void;
		};
	}

	let { primaryAction, secondaryAction }: Props = $props();
</script>

<section class="relative pt-20 pb-32 overflow-hidden">
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-[100%] blur-3xl -z-10 opacity-60"
	></div>

	<div class="container mx-auto px-6 text-center max-w-4xl relative z-10">
		<h1
			class="text-5xl md:text-7xl font-medium tracking-tight leading-tight mb-8 text-gray-900"
		>
			<slot name="title" />
		</h1>

		<p class="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
			<slot name="subtitle" />
		</p>

		<div class="flex flex-col sm:flex-row justify-center gap-4">
			{#if primaryAction}
				{#if primaryAction.href}
					<a href={primaryAction.href}>
						<button
							class="btn btn-lg rounded-full bg-black text-white border-none hover:bg-gray-800 hover:scale-105 transition-transform shadow-xl"
						>
							{primaryAction.label}
						</button>
					</a>
				{:else}
					<button
						class="btn btn-lg rounded-full bg-black text-white border-none hover:bg-gray-800 hover:scale-105 transition-transform shadow-xl"
						on:click={primaryAction.onClick}
					>
						{primaryAction.label}
					</button>
				{/if}
			{/if}
			{#if secondaryAction}
				{#if secondaryAction.href}
					<a href={secondaryAction.href}>
						<button
							class="btn btn-lg btn-outline rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
						>
							{secondaryAction.label}
						</button>
					</a>
				{:else}
					<button
						class="btn btn-lg btn-outline rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
						on:click={secondaryAction.onClick}
					>
						{secondaryAction.label}
					</button>
				{/if}
			{/if}
		</div>

		<div
			class="mt-16 mx-auto max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 opacity-90 rotate-1 hover:rotate-0 transition-transform duration-500"
		>
			<div class="bg-gray-50 rounded-2xl p-6 text-left">
				<div class="flex gap-2 mb-4">
					<div class="h-3 w-3 rounded-full bg-red-400"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-400"></div>
					<div class="h-3 w-3 rounded-full bg-green-400"></div>
				</div>
				<div class="space-y-3">
					<div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
					<div class="h-4 bg-gray-200 rounded w-full animate-pulse delay-75"></div>
					<div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse delay-150"></div>
				</div>
			</div>
		</div>
	</div>
</section>
