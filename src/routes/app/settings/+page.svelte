<script lang="ts">
	import { page } from '$app/stores';
	import type { UserProfile } from '$lib/shared/lib/api/profile';
	import FormField from '$lib/shared/ui/form-field/form-field.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';

	let user = $state<UserProfile | null>($page.data?.profile ?? null);

	// Form state
	let username = $state('');
	let email = $state('');
	let fullName = $state('');
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);
	let success = $state<string | null>(null);

	// Initialize form with user data
	$effect(() => {
		if (user) {
			username = user.username;
			email = user.email;
			fullName = user.full_name || '';
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		error = null;
		success = null;

		try {
			const response = await fetch('/api/v1/auth/profile', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${$page.data?.token}`,
				},
				body: JSON.stringify({
					username: username.trim(),
					email: email.trim(),
					full_name: fullName.trim() || null,
				}),
			});

			if (response.ok) {
				const updatedUser = await response.json();
				user = updatedUser;
				success = 'Профиль успешно обновлён';
			} else {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.detail || errorData.message || 'Ошибка обновления профиля');
			}
		} catch (err: any) {
			error = err.message || 'Произошла ошибка при обновлении профиля';
			console.error('Update profile error:', err);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="container mx-auto px-6 py-8 max-w-2xl">
	<div class="mb-8">
		<h1 class="text-3xl font-medium text-base-content mb-2">Настройки профиля</h1>
		<p class="text-base-content/60">Управление данными вашего аккаунта</p>
	</div>

	{#if error}
		<div class="alert alert-error mb-6">
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
			<span>{error}</span>
		</div>
	{/if}

	{#if success}
		<div class="alert alert-success mb-6">
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
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{success}</span>
		</div>
	{/if}

	<form onsubmit={handleSubmit} class="space-y-6">
		<FormField label="Username" required>
			<Input
				type="text"
				placeholder="username"
				bind:value={username}
				required
			/>
		</FormField>

		<FormField label="Email" required>
			<Input
				type="email"
				placeholder="name@example.com"
				bind:value={email}
				required
			/>
		</FormField>

		<FormField label="Полное имя">
			<Input
				type="text"
				placeholder="Иван Иванов"
				bind:value={fullName}
			/>
		</FormField>

		<div class="pt-4">
			<Button
				type="submit"
				variant="primary"
				rounded
				disabled={!username.trim() || !email.trim() || isSubmitting}
				class="btn-primary"
			>
				{#if isSubmitting}
					<span class="loading loading-spinner loading-sm"></span>
					Сохранение...
				{:else}
					Сохранить изменения
				{/if}
			</Button>
		</div>
	</form>

	<!-- Account Info -->
	<div class="mt-12 pt-8 border-t border-base-300">
		<h2 class="text-xl font-medium text-base-content mb-4">Информация об аккаунте</h2>
		<div class="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p class="text-base-content/60 mb-1">Дата регистрации</p>
				<p class="text-base-content font-medium">
					{user?.created_at ? new Date(user.created_at).toLocaleDateString('ru-RU') : '—'}
				</p>
			</div>
			<div>
				<p class="text-base-content/60 mb-1">Последнее обновление</p>
				<p class="text-base-content font-medium">
					{user?.updated_at ? new Date(user.updated_at).toLocaleDateString('ru-RU') : '—'}
				</p>
			</div>
		</div>
	</div>
</div>
