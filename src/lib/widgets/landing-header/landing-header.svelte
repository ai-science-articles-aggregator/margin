<script lang="ts">
	import Logo from '$lib/shared/ui/logo/logo.svelte';
</script>

<header
	class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all"
>
	<nav class="container mx-auto px-6 h-16 flex items-center justify-between">
		<Logo />

		<div class="hidden md:flex items-center gap-6">
			<a href="#features" class="text-sm font-medium text-gray-600 hover:text-black transition"
				>Возможности</a
			>
			<a
				href="#how-it-works"
				class="text-sm font-medium text-gray-600 hover:text-black transition">Методология</a
			>
		</div>

		<div class="flex items-center gap-3">
			<a href="/auth/login">
				<button class="btn btn-sm btn-ghost rounded-full font-normal hidden sm:inline-flex"
					>Войти</button
				>
			</a>
			<a href="/app">
				<button
					class="btn btn-sm btn-primary rounded-full px-6 font-normal normal-case bg-black text-white hover:bg-gray-800 border-none shadow-none"
				>
					Попробовать
				</button>
			</a>
		</div>
	</nav>
</header>
