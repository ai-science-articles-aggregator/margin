<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Project {
		id: number;
		title: string;
		updated: string;
		sources: number;
		preview: string;
		colorClass: string;
		icon: string;
	}

	interface Props {
		project: Project;
		index?: number;
		onClick?: () => void;
	}

	let { project, index = 0, onClick }: Props = $props();
</script>

<div
	in:fly={{ y: 20, delay: index * 50, duration: 400 }}
	class="group h-80 flex flex-col rounded-[2rem] bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-xl hover:shadow-base-content/5 transition-all duration-300 cursor-pointer overflow-hidden"
	on:click={onClick}
	role="button"
	tabindex="0"
>
	<div class={`h-32 w-full shrink-0 ${project.colorClass} p-6 flex justify-between items-start transition-colors duration-300 relative`}>
		<div
			class="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300 origin-top-left"
		>
			{project.icon}
		</div>

		<button
			class="btn btn-circle btn-sm btn-ghost bg-base-100/40 hover:bg-base-100 border-none opacity-0 group-hover:opacity-100 transition-opacity text-base-content backdrop-blur-sm"
			on:click|stopPropagation={() => {
				// TODO: integrate with backend - open project menu
			}}
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
				/>
			</svg>
		</button>
	</div>

	<div class="flex-1 px-6 py-5 flex flex-col overflow-hidden relative">
		<h3
			class="text-lg font-bold text-base-content mb-2 leading-7 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors"
		>
			{project.title}
		</h3>

		<p class="text-sm text-base-content/70 mb-auto line-clamp-2 leading-relaxed">
			{project.preview}
		</p>

		<div class="flex items-center justify-between mt-4 pt-2 border-t border-base-200">
			<div class="flex items-center">
				<span
					class="badge badge-sm bg-base-200 border-none text-base-content/70 font-medium py-2.5 px-3 rounded-lg"
				>
					{project.sources} ист.
				</span>
			</div>
			<span class="text-xs text-base-content/40 font-medium whitespace-nowrap ml-2">
				{project.updated}
			</span>
		</div>
	</div>
</div>
