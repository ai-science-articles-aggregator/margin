<script lang="ts">
	import FileLoader from "$lib/components/file-loader/file-loader.svelte";
  import Search from "$lib/components/search/search.svelte";


</script>

<div class="grid">
  <div class="search bg-base-300 p-2 rounded-2xl">
    <Search />
  </div>
  <div class="loader flex align-middle justify-center bg-neutral-content p-2 rounded-2xl">
    <FileLoader />
  </div>
  <div class="main bg-base-300 rounded-2xl">

  </div>
</div>

<style lang="css">
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 2fr 300px;
    grid-template-areas:
        "search main"
        "loader main";
    gap: 20px;
    min-height: calc(100vh - 6%);
    width: 100%;
    padding: 20px 20px;
  }

  .search {
    grid-area: search;
    /* background-color: #4CAF50; */
  }

  .loader {
    grid-area: loader;
  }

  .main {
    grid-area: main;
  }
</style>
