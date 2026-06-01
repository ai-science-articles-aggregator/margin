<script lang="ts">
	let { children } = $props();
</script>

<div class="min-h-screen bg-paper text-ink font-sans">
	{@render children()}
</div>
