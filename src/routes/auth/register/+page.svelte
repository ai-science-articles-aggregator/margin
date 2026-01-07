<script lang="ts">
	import AuthForm from '$lib/widgets/auth-form/auth-form.svelte';

	function handleRegister(data: {
		username?: string;
		email: string;
		password: string;
		confirmPassword?: string;
	}) {
		// TODO: integrate with backend - send registration request
		console.log('Register:', data);
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
/>
