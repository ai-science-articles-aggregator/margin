<script lang="ts">
	import ThemeSwitch from './theme-switcher/ThemeSwitch.svelte';
	import Avatar from './avatar/avatar.svelte';

</script>

<header class="navbar bg-base-100 shadow-sm flex justify-between px-6 py-3">
    <a href="/" aria-label="Перейти на главную страницу">
        LOGO
    </a>

    <div class="flex align-middle gap-4 justify-between">
        <ThemeSwitch />
        <Avatar />
    </div>
</header>