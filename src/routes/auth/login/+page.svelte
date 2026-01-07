<script>
	import { fly } from 'svelte/transition';
	import Logo from '$lib/components/logo/logo.svelte';

	let email = '';
	let password = '';
	let showPassword = false;

	function handleLogin() {
		console.log('Login:', { email, password });
		// Логика отправки данных
	}
</script>

<div class="min-h-screen bg-white relative flex flex-col font-sans overflow-hidden">
	<!-- BACKGROUND DECOR (Общий стиль) -->
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 rounded-[100%] blur-3xl -z-10 opacity-70"
	></div>

	<!-- SIMPLE NAVBAR -->
	<header class="w-full p-6 absolute top-0 z-20">
		<div class="container mx-auto">
			<Logo />
		</div>
	</header>

	<!-- CONTENT -->
	<main class="flex-grow flex items-center justify-center p-4 z-10">
		<div
			in:fly={{ y: 20, duration: 600 }}
			class="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden"
		>
			<!-- Декоративный блик внутри карточки -->
			<div
				class="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -z-10 opacity-50 translate-x-10 -translate-y-10"
			></div>

			<div class="text-center mb-10">
				<h1 class="text-3xl font-medium text-gray-900 mb-2 tracking-tight">С возвращением</h1>
				<p class="text-gray-500 text-sm">Продолжите работу с вашими исследованиями</p>
			</div>

			<form on:submit|preventDefault={handleLogin} class="flex flex-col gap-5">
				<!-- Social Login -->
				<button
					type="button"
					class="btn btn-outline rounded-full w-full border-gray-200 font-normal hover:bg-gray-50 hover:border-gray-300 normal-case flex gap-2 h-12"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24"
						><path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/><path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/><path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
							fill="#FBBC05"
						/><path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/></svg
					>
					Войти через Google
				</button>

				<div class="divider text-xs text-gray-400 font-light my-0">ИЛИ</div>

				<!-- Email -->
				<div class="form-control">
					<label class="label pl-4 py-1">
						<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider"
							>Email</span
						>
					</label>
					<input
						type="email"
						placeholder="name@example.com"
						class="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all h-12"
						bind:value={email}
						required
					/>
				</div>

				<!-- Password -->
				<div class="form-control">
					<label class="label pl-4 py-1 flex justify-between">
						<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider"
							>Пароль</span
						>
						<a href="/forgot" class="link link-hover text-xs text-blue-600">Забыли?</a>
					</label>
					<div class="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							class="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all h-12 pr-10"
							bind:value={password}
							required
						/>
						<button
							type="button"
							class="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition"
							on:click={() => (showPassword = !showPassword)}
						>
							{#if showPassword}
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/></svg
								>
							{:else}
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/></svg
								>
							{/if}
						</button>
					</div>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					class="btn btn-primary w-full rounded-full bg-black hover:bg-gray-800 border-none h-12 text-white text-lg font-normal normal-case shadow-lg mt-2"
				>
					Войти
				</button>

				<p class="text-center text-sm text-gray-500 mt-4">
					Нет аккаунта? <a
						href="/auth/register"
						class="text-black font-medium hover:underline decoration-blue-400 decoration-2 underline-offset-4"
						>Регистрация</a
					>
				</p>
			</form>
		</div>
	</main>
</div>
