<script lang="ts">
    import CreateCard from '$lib/widgets/create-card/create-card.svelte';
    import { goto } from '$app/navigation';


    function handleCreateProject() {
		// TODO: integrate with backend - create new project
		console.log('Create new project');
        setTimeout(() => goto('/app/notebook/3c528380-be49-4487-a5cb-1edb906ad5e0'), 300)
	}
</script>

<CreateCard onClick={handleCreateProject} />