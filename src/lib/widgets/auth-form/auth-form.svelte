<script lang="ts">
	import { fly } from 'svelte/transition';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import FormField from '$lib/shared/ui/form-field/form-field.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import PasswordInput from '$lib/shared/ui/password-input/password-input.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';

	interface Props {
		title: string;
		subtitle?: string;
		showSocialLogin?: boolean;
		showUsername?: boolean;
		showPasswordConfirm?: boolean;
		submitLabel: string;
		linkLabel?: string;
		linkHref?: string;
		linkText?: string;
		isLoading?: boolean;
		error?: string | null;
		onSubmit?: (data: {
			username?: string;
			email: string;
			password: string;
			confirmPassword?: string;
		}) => void;
	}

	let {
		title,
		subtitle,
		showSocialLogin = true,
		showUsername = false,
		showPasswordConfirm = false,
		submitLabel,
		linkLabel,
		linkHref,
		linkText,
		isLoading = false,
		error = null,
		onSubmit,
	}: Props = $props();

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);

	let passwordsMatch = $derived(password === confirmPassword || confirmPassword === '');
	let isFormValid = $derived(
		showUsername
			? username && email && password && (!showPasswordConfirm || (password === confirmPassword))
			: email && password && (!showPasswordConfirm || (password === confirmPassword))
	);

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (onSubmit && isFormValid) {
			onSubmit({
				username: showUsername ? username : undefined,
				email,
				password,
				confirmPassword: showPasswordConfirm ? confirmPassword : undefined,
			});
		}
	}

	function handleSocialLogin() {
		// TODO: integrate with backend - Google OAuth
		console.log('Social login clicked');
	}
</script>

<div class="min-h-screen bg-white relative flex flex-col font-sans overflow-hidden">
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 rounded-[100%] blur-3xl -z-10 opacity-70"
	></div>

	<header class="w-full p-6 absolute top-0 z-20">
		<div class="container mx-auto">
			<Logo />
		</div>
	</header>

	<main class="flex-grow flex items-center justify-center p-4 z-10">
		<div
			in:fly={{ y: 20, duration: 600 }}
			class="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden"
		>
			<div
				class="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -z-10 opacity-50 translate-x-10 -translate-y-10"
			></div>

			<div class="text-center mb-10">
				<h1 class="text-3xl font-medium text-gray-900 mb-2 tracking-tight">{title}</h1>
				{#if subtitle}
					<p class="text-gray-500 text-sm">{subtitle}</p>
				{/if}
			</div>

			<form on:submit={handleSubmit} class="flex flex-col gap-5">
				{#if showSocialLogin}
					<button
						type="button"
						class="btn btn-outline rounded-full w-full border-gray-200 font-normal hover:bg-gray-50 hover:border-gray-300 normal-case flex gap-2 h-12"
						on:click={handleSocialLogin}
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24">
							<path
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
				{/if}

				{#if showUsername}
					<FormField label="Username" required>
						<Input
							type="text"
							placeholder="Researcher_01"
							bind:value={username}
							required
						/>
					</FormField>
				{/if}

				<FormField label="Email" required>
					<Input type="email" placeholder="name@example.com" bind:value={email} required />
				</FormField>

				{#if showPasswordConfirm}
					<div class="grid md:grid-cols-2 gap-4">
						<FormField label="Пароль" required>
							<PasswordInput bind:value={password} bind:showPassword required />
						</FormField>

						<FormField label="Повторите пароль" required error={!passwordsMatch ? 'Пароли не совпадают' : ''}>
							<PasswordInput bind:value={confirmPassword} bind:showPassword required />
						</FormField>
					</div>

					<div class="flex justify-between items-center px-2">
						<label class="label cursor-pointer justify-start gap-2">
							<input
								type="checkbox"
								class="checkbox checkbox-xs rounded-md"
								bind:checked={showPassword}
							/>
							<span class="label-text text-xs text-gray-500">Показать пароль</span>
						</label>
					</div>
				{:else}
					<FormField label="Пароль" required>
						<PasswordInput bind:value={password} bind:showPassword required />
					</FormField>
				{/if}

				{#if error}
					<div class="alert alert-error mt-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span class="text-sm">{error}</span>
					</div>
				{/if}

				<Button
					type="submit"
					variant="primary"
					rounded
					fullWidth
					disabled={!isFormValid || isLoading}
					class="bg-black hover:bg-gray-800 border-none h-12 text-white text-lg font-normal normal-case shadow-lg mt-2"
				>
					{#if isLoading}
						<span class="loading loading-spinner loading-sm"></span>
						Загрузка...
					{:else}
						{submitLabel}
					{/if}
				</Button>

				{#if linkText && linkHref}
					<p class="text-center text-sm text-gray-500 mt-4">
						{linkText} <a
							href={linkHref}
							class="text-black font-medium hover:underline decoration-blue-400 decoration-2 underline-offset-4"
							>{linkLabel}</a
						>
					</p>
				{/if}
			</form>
		</div>
	</main>
</div>
