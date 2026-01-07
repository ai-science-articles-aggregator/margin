<script lang="ts">
	interface Props {
		icon: string;
		title: string;
		description: string;
		class?: string;
	}

	let { icon, title, description, class: className = '' }: Props = $props();
</script>

<article
	class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group {className}"
>
	<div
		class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
	>
		{icon}
	</div>
	<h3 class="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
	<p class="text-gray-500 leading-relaxed">{description}</p>
</article>
