<script lang="ts">
    import { Search } from 'lucide-svelte';

</script>

<div class="join gap-4">
    <label class="input rounded-lg w-120">
        <Search size={16} />
        <input type="search" class="grow" placeholder="Search" />
        <kbd class="kbd kbd-sm">⌘</kbd>
        <kbd class="kbd kbd-sm">K</kbd>
    </label>
    <button class="btn btn-primary join-item rounded-lg">Search</button>
</div>