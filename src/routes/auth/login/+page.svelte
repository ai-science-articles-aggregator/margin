<script lang="ts">
	import AuthForm from '$lib/widgets/auth-form/auth-form.svelte';

	function handleLogin(data: { email: string; password: string }) {
		// TODO: integrate with backend - send login request
		console.log('Login:', data);
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
/>
