<script lang="ts">
	import AuthForm from '$lib/widgets/auth-form/auth-form.svelte';
	import { login } from '$lib/shared/lib/api/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let isLoading = $state(false);
	let error = $state<string | null>(null);

	async function handleLogin(data: { email: string; password: string }) {
		isLoading = true;
		error = null;

		try {
			await login({
				email: data.email,
				password: data.password,
			});

			// Получаем redirect параметр или перенаправляем на главную страницу app
			const redirectTo = $page.url.searchParams.get('redirect') || '/app';
			await goto(redirectTo);
		} catch (err: any) {
			error =
				err.response?.data?.message ||
				err.message ||
				'Произошла ошибка при входе. Проверьте email и пароль.';
			console.error('Login error:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<AuthForm
	title="С возвращением"
	subtitle="Продолжите работу с вашими исследованиями"
	submitLabel="Войти"
	linkLabel="Регистрация"
	linkHref="/auth/register"
	linkText="Нет аккаунта?"
	onSubmit={handleLogin}
	{isLoading}
	{error}
/>
