<script lang="ts">
	import AuthForm from '$lib/widgets/auth-form/auth-form.svelte';
	import { register } from '$lib/shared/lib/api/auth';
	import { goto } from '$app/navigation';

	let isLoading = $state(false);
	let error = $state<string | null>(null);

	function handleRegister(data: {
		username?: string;
		email: string;
		password: string;
		confirmPassword?: string;
	}) {
		handleSubmit(data);
	}

	async function handleSubmit(data: {
		username?: string;
		email: string;
		password: string;
	}) {
		isLoading = true;
		error = null;

		try {
			if (!data.username) {
				throw new Error('Username is required');
			}

			await register({
				username: data.username,
				email: data.email,
				password: data.password,
			});

			// После успешной регистрации перенаправляем на главную app
			await goto('/app');
		} catch (err: any) {
			error =
				err.response?.data?.detail ||
				err.response?.data?.message ||
				err.message ||
				'Произошла ошибка при регистрации. Попробуйте другой email или username.';
			console.error('Register error:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<AuthForm
	title="Создать аккаунт"
	subtitle="Присоединяйтесь к научному комьюнити ArticleFusion"
	showUsername={true}
	showPasswordConfirm={true}
	submitLabel="Зарегистрироваться"
	linkLabel="Войти"
	linkHref="/auth/login"
	linkText="Уже есть аккаунт?"
	onSubmit={handleRegister}
	{isLoading}
	{error}
/>
