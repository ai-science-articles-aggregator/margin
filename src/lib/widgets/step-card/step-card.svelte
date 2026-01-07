<script lang="ts">
	interface Props {
		number: number;
		title: string;
		description: string;
		color?: 'blue' | 'purple' | 'pink' | 'green';
	}

	let { number, title, description, color = 'blue' }: Props = $props();
</script>

<div class="relative z-10 flex flex-col items-center text-center">
	<div
		class="w-14 h-14 rounded-full border-4 border-gray-900 flex items-center justify-center font-bold text-xl mb-6 shadow-lg {color === 'blue' ? 'bg-blue-600 shadow-blue-900/50' : color === 'purple' ? 'bg-purple-600 shadow-purple-900/50' : color === 'pink' ? 'bg-pink-600 shadow-pink-900/50' : 'bg-green-500 shadow-green-900/50'}"
	>
		{number}
	</div>
	<h3 class="text-lg font-bold mb-2">{title}</h3>
	<p class="text-gray-400 text-sm">{description}</p>
</div>
