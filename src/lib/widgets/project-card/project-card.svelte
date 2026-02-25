<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Project {
		id: string;
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
		onEdit?: (e: Event) => void;
		onDelete?: (e: Event) => void;
	}

	let { project, index = 0, onClick, onEdit, onDelete }: Props = $props();
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

		<div
			class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
			on:click|stopPropagation
		>
			<button
				class="btn btn-circle btn-sm btn-ghost bg-base-100/40 hover:bg-base-100 border-none text-base-content backdrop-blur-sm"
				title="Редактировать"
				on:click={(e) => onEdit?.(e)}
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
					/>
				</svg>
			</button>
			<button
				class="btn btn-circle btn-sm btn-ghost bg-base-100/40 hover:bg-error hover:text-error-content border-none text-base-content backdrop-blur-sm"
				title="Удалить"
				on:click={(e) => onDelete?.(e)}
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</button>
		</div>
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
