<script lang="ts">
	import Header from '$lib/components/header/header.svelte';
	import Menu from "$lib/components/menu/menu.svelte";

	let { children } = $props();


</script>

<Header />
<Menu />

<div class="flex-1 overflow-hidden">
    {@render children()}
</div>
