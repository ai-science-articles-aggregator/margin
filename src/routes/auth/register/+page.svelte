<script>
	import { fly } from 'svelte/transition';
	import Logo from '$lib/components/logo/logo.svelte';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let showPassword = false;

	// Реактивная переменная для проверки совпадения
	$: passwordsMatch = password === confirmPassword || confirmPassword === '';
	$: isFormValid = username && email && password && confirmPassword && password === confirmPassword;

	function handleRegister() {
		if (!isFormValid) return;
		console.log('Register:', { username, email, password });
	}
</script>

<div class="min-h-screen bg-white relative flex flex-col font-sans overflow-hidden">
	<!-- BACKGROUND DECOR -->
	<div
		class="absolute bottom-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tl from-purple-50 via-blue-50 to-white rounded-[100%] blur-3xl -z-10 opacity-70"
	></div>

	<!-- SIMPLE NAVBAR -->
	<header class="w-full p-6 absolute top-0 z-20">
		<div class="container mx-auto">
			<Logo />
		</div>
	</header>

	<!-- CONTENT -->
	<main class="flex-grow flex items-center justify-center p-4 z-10 pt-20">
		<div
			in:fly={{ y: 20, duration: 600 }}
			class="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative overflow-hidden"
		>
			<!-- Декор -->
			<div
				class="absolute top-0 left-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl -z-10 opacity-50 -translate-x-10 -translate-y-10"
			></div>

			<div class="text-center mb-8">
				<h1 class="text-3xl font-medium text-gray-900 mb-2 tracking-tight">Создать аккаунт</h1>
				<p class="text-gray-500 text-sm">Присоединяйтесь к научному комьюнити ArticleFusion</p>
			</div>

			<form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4">
				<!-- Username -->
				<div class="form-control">
					<label class="label pl-4 py-1">
						<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider"
							>Username</span
						>
					</label>
					<input
						type="text"
						placeholder="Researcher_01"
						class="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all h-12"
						bind:value={username}
						required
					/>
				</div>

				<!-- Email -->
				<div class="form-control">
					<label class="label pl-4 py-1">
						<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider"
							>Email</span
						>
					</label>
					<input
						type="email"
						placeholder="name@university.edu"
						class="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all h-12"
						bind:value={email}
						required
					/>
				</div>

				<!-- Password Group -->
				<div class="grid md:grid-cols-2 gap-4">
					<div class="form-control">
						<label class="label pl-4 py-1">
							<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider"
								>Пароль</span
							>
						</label>
						<div class="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								class="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all h-12"
								placeholder="••••••••"
								bind:value={password}
								required
							/>
						</div>
					</div>

					<div class="form-control">
						<label class="label pl-4 py-1">
							<span class="label-text text-gray-500 text-xs uppercase font-bold tracking-wider"
								>Повторите пароль</span
							>
						</label>
						<input
							type={showPassword ? 'text' : 'password'}
							class="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all h-12"
							class:input-error={!passwordsMatch}
							placeholder="••••••••"
							bind:value={confirmPassword}
							required
						/>
					</div>
				</div>

				<!-- Password hint/toggle -->
				<div class="flex justify-between items-center px-2">
					<label class="label cursor-pointer justify-start gap-2">
						<input
							type="checkbox"
							class="checkbox checkbox-xs rounded-md"
							bind:checked={showPassword}
						/>
						<span class="label-text text-xs text-gray-500">Показать пароль</span>
					</label>
					{#if !passwordsMatch}
						<span class="text-xs text-red-500 font-medium">Пароли не совпадают</span>
					{/if}
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={!isFormValid}
					class="btn btn-primary w-full rounded-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 border-none h-12 text-white text-lg font-normal normal-case shadow-lg mt-4 transition-all"
				>
					Зарегистрироваться
				</button>

				<!-- Terms -->
				<!-- <p class="text-center text-[10px] text-gray-400 px-4 leading-tight">
					Нажимая кнопку, вы соглашаетесь с <a href="#" class="underline">Условиями использования</a
					>
					и <a href="#" class="underline">Политикой конфиденциальности</a>.
				</p> -->

				<div class="divider my-0"></div>

				<p class="text-center text-sm text-gray-500">
					Уже есть аккаунт? <a
						href="/auth/login"
						class="text-black font-medium hover:underline decoration-blue-400 decoration-2 underline-offset-4"
						>Войти</a
					>
				</p>
			</form>
		</div>
	</main>
</div>
