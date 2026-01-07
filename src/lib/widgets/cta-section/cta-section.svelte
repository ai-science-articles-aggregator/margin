<script lang="ts">
	interface Props {
		buttonLabel: string;
		buttonHref?: string;
		onButtonClick?: () => void;
	}

	let { buttonLabel, buttonHref, onButtonClick }: Props = $props();
</script>

<section class="py-32 bg-white">
	<div class="container mx-auto px-6 max-w-4xl text-center">
		<h2 class="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8">
			<slot name="title" />
		</h2>
		{#if $$slots.subtitle}
			<p class="text-xl text-gray-500 mb-10 font-light">
				<slot name="subtitle" />
			</p>
		{/if}
		{#if buttonHref}
			<a href={buttonHref}>
				<button
					class="btn btn-primary btn-lg rounded-full px-12 bg-black text-white hover:bg-gray-800 border-none h-16 text-lg shadow-2xl hover:-translate-y-1 transition-transform"
				>
					{buttonLabel}
				</button>
			</a>
		{:else}
			<button
				class="btn btn-primary btn-lg rounded-full px-12 bg-black text-white hover:bg-gray-800 border-none h-16 text-lg shadow-2xl hover:-translate-y-1 transition-transform"
				on:click={onButtonClick}
			>
				{buttonLabel}
			</button>
		{/if}
	</div>
</section>
