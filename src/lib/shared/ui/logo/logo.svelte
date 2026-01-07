<script lang="ts">
	interface Props {
		href?: string;
		class?: string;
	}

	let { href = '/', class: className = '' }: Props = $props();
</script>

<a
	{href}
	class="text-xl font-medium tracking-tight flex items-center gap-2 text-base-content hover:opacity-80 transition {className}"
	aria-label="ArticleFusion - Главная страница"
>
	<div class="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
	<span class="hidden md:inline">Article<span class="font-bold">Fusion</span></span>
</a>
