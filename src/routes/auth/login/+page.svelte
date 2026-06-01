<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { login } from '$lib/shared/lib/api/auth';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import { MOCK_NOTEBOOKS } from '$lib/shared/lib/mock-data';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import AreaDot from '$lib/shared/ui/area-dot/area-dot.svelte';
	import LangSwitcher from '$lib/shared/ui/lang-switcher/lang-switcher.svelte';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	const t = $derived(i18n.t);
	const nb = MOCK_NOTEBOOKS[0];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email.trim() || !password) return;
		isLoading = true;
		error = null;
		try {
			await login({ email: email.trim(), password });
			const redirectTo = $page.url.searchParams.get('redirect') || '/app';
			await goto(redirectTo);
		} catch (err: any) {
			error =
				err.response?.data?.message ||
				err.response?.data?.detail ||
				err.message ||
				t.toast.loginFailed;
			toast.error(error ?? t.toast.loginFailed);
		} finally {
			isLoading = false;
		}
	}

	let hero = $derived(t.auth.heroAuth);
</script>

<div
	class="grid bg-paper text-ink font-sans overflow-hidden"
	style="min-height:100vh; grid-template-columns: 1fr 1.1fr;"
>
	<!-- Form pane -->
	<div
		class="flex flex-col bg-surface border-r-hair border-line"
		style="padding:48px 56px;"
	>
		<div class="flex items-center justify-between">
			<Logo size={20} href="/" />
			<LangSwitcher />
		</div>
		<div class="flex-1 flex flex-col justify-center" style="max-width:360px;">
			<Mono>{t.auth.signInLabel}</Mono>
			<h1
				class="font-serif m-0 mt-3 mb-2"
				style="font-size:40px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
			>
				{t.auth.signInTitle}<span class="text-accent">.</span>
			</h1>
			<p class="text-body text-muted m-0 mb-8 leading-[1.5]">{t.auth.signInSub}</p>

			<form onsubmit={handleSubmit}>
				<label class="block text-cap text-muted mb-[6px]">{t.auth.email}</label>
				<Input
					type="email"
					bind:value={email}
					placeholder="you@university.edu"
					required
					class="mb-4"
				/>

				<div class="flex justify-between items-center mb-[6px]">
					<label class="text-cap text-muted">{t.auth.password}</label>
					<a href="/" class="text-cap text-accent no-underline">{t.auth.forgot}</a>
				</div>
				<Input type="password" bind:value={password} required class="mb-6" />

				{#if error}
					<div
						class="border-hair rounded-sm px-3 py-2 mb-4 text-cap"
						style="border-color: var(--color-danger); color: var(--color-danger);"
					>
						{error}
					</div>
				{/if}

				<Button
					type="submit"
					variant="primary"
					fullWidth
					disabled={isLoading || !email.trim() || !password}
				>
					{isLoading ? (i18n.lang === 'ru' ? 'Вход…' : 'Signing in…') : t.auth.signInCta}
				</Button>
			</form>

			<div class="mt-8 text-body-s text-muted">
				{t.auth.noAccount}
				<a href="/auth/register" class="text-accent no-underline">{t.auth.createOne}</a>
			</div>
		</div>
		<div class="font-mono text-meta-s text-dim tracking-[0.06em]">
			{t.auth.footerEdition}
		</div>
	</div>

	<!-- Preview pane -->
	<div class="relative overflow-hidden" style="padding:48px 40px;">
		<div
			class="font-serif text-ink"
			style="margin-top:60px; font-size:56px; line-height:1.05; letter-spacing:-0.025em; max-width:520px; font-weight:400;"
		>
			{hero[0]}<em class="italic text-accent">{hero[1]}</em>{hero[2]}
		</div>
		<p class="text-muted m-0 mt-4" style="font-size:15px; line-height:1.5; max-width:440px;">
			{t.auth.heroAuthSub}
		</p>

		<!-- Mini preview card -->
		<div
			class="mt-12 bg-surface border-hair border-line rounded-md p-5"
			style="max-width:480px; box-shadow: var(--shadow-lg);"
		>
			<div class="flex items-center gap-2 mb-3">
				<AreaDot area={nb.areaId} />
				<Mono>{i18n.lang === 'ru' ? `${nb.areaId === 'ml' ? 'МАШИННОЕ ОБУЧЕНИЕ' : ''} · ${nb.sources} ИСТОЧНИКОВ` : `MACHINE LEARNING · ${nb.sources} SOURCES`}</Mono>
			</div>
			<div
				class="font-serif text-ink mb-2"
				style="font-size:20px; line-height:1.25; font-weight:400; letter-spacing:-0.01em;"
			>
				{i18n.lang === 'ru' ? nb.titleRu : nb.title}
			</div>
			<div class="text-cap text-muted leading-[1.5] mb-4">
				{i18n.lang === 'ru' ? nb.excerptRu : nb.excerpt}
			</div>
			<div class="bg-line my-3" style="height:0.5px;"></div>
			<div class="flex gap-4 font-mono text-meta-s text-muted tracking-[0.04em] uppercase">
				<span>{nb.sources} {i18n.lang === 'ru' ? 'ИСТОЧНИКОВ' : 'SOURCES'}</span>
				<span>{nb.notes} {i18n.lang === 'ru' ? 'ЗАМЕТОК' : 'NOTES'}</span>
				<span class="ml-auto text-accent">{t.home.open}</span>
			</div>
		</div>

	</div>
</div>
