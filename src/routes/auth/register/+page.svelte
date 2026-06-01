<script lang="ts">
	import { goto } from '$app/navigation';
	import { register } from '$lib/shared/lib/api/auth';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import LangSwitcher from '$lib/shared/ui/lang-switcher/lang-switcher.svelte';

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let department = $state('');
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	const t = $derived(i18n.t);
	const hero = $derived(t.auth.heroReg);

	let domainVerified = $derived(/^[^@]+@[^@]+\.edu$/i.test(email.trim()));

	let passwordStrength = $derived.by(() => {
		const p = password;
		let s = 0;
		if (p.length >= 8) s++;
		if (/[A-Z]/.test(p)) s++;
		if (/[0-9]/.test(p)) s++;
		if (/[^A-Za-z0-9]/.test(p)) s++;
		if (p.length >= 12) s++;
		return Math.min(s, 5);
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email.trim() || !password || !firstName.trim() || !lastName.trim()) return;
		isLoading = true;
		error = null;
		try {
			await register({
				email: email.trim(),
				password,
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				department: department.trim() || undefined
			});
			await goto('/app');
		} catch (err: any) {
			error =
				err.response?.data?.detail ||
				err.response?.data?.message ||
				err.message ||
				t.toast.registerFailed;
			toast.error(error ?? t.toast.registerFailed);
		} finally {
			isLoading = false;
		}
	}
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
			<Mono>{t.auth.registerLabel}</Mono>
			<h1
				class="font-serif m-0 mt-3 mb-2"
				style="font-size:36px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
			>
				{t.auth.registerTitle}<span class="text-accent">.</span>
			</h1>
			<p class="text-body text-muted m-0 mb-7 leading-[1.5]">{t.auth.registerSub}</p>

			<form onsubmit={handleSubmit}>
				<div class="grid grid-cols-2 gap-3 mb-[14px]">
					<div>
						<label class="block text-cap text-muted mb-[6px]">{t.auth.firstName}</label>
						<Input bind:value={firstName} />
					</div>
					<div>
						<label class="block text-cap text-muted mb-[6px]">{t.auth.lastName}</label>
						<Input bind:value={lastName} />
					</div>
				</div>

				<label class="block text-cap text-muted mb-[6px]">{t.auth.email}</label>
				<Input
					type="email"
					bind:value={email}
					placeholder="you@university.edu"
					required
				/>
				{#if email && domainVerified}
					<div class="font-mono text-meta-s text-accent tracking-[0.04em] mt-1 mb-[14px]">
						{t.auth.domainVerified}
					</div>
				{:else}
					<div class="mb-[14px]"></div>
				{/if}

				<label class="block text-cap text-muted mb-[6px]">{t.auth.department}</label>
				<Input
					bind:value={department}
					placeholder={t.auth.departmentPlaceholder}
					class="mb-[14px]"
				/>

				<label class="block text-cap text-muted mb-[6px]">{t.auth.password}</label>
				<Input type="password" bind:value={password} required class="mb-2" />
				<div class="flex gap-1 mb-5">
					{#each [0, 1, 2, 3, 4] as i (i)}
						<div
							class="flex-1"
							style="height:2px; background: {i < passwordStrength
								? 'var(--color-accent)'
								: 'var(--color-line)'};"
						></div>
					{/each}
				</div>

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
					disabled={isLoading || !email.trim() || !password || !firstName.trim() || !lastName.trim()}
				>
					{isLoading ? (i18n.lang === 'ru' ? 'Создание…' : 'Creating…') : t.auth.createCta}
				</Button>

				<div class="mt-4 text-cap text-muted leading-[1.5]">{t.auth.terms}</div>
				<div class="mt-3 text-body-s text-muted">
					{t.auth.haveAccount}
					<a href="/auth/login" class="text-accent no-underline">{t.auth.signInCta}</a>
				</div>
			</form>
		</div>
	</div>

	<!-- Preview pane -->
	<div class="relative overflow-hidden" style="padding:48px 40px;">
		<div
			class="font-serif text-ink"
			style="margin-top:60px; font-size:48px; line-height:1.05; letter-spacing:-0.025em; max-width:520px; font-weight:400;"
		>
			{hero[0]}<em class="italic text-accent">{hero[1]}</em>{hero[2]}
		</div>
		<p class="text-muted m-0 mt-4" style="font-size:15px; line-height:1.5; max-width:440px;">
			{t.auth.heroRegSub}
		</p>

		<div
			class="mt-9 bg-surface border-hair border-line rounded-md p-6"
			style="max-width:480px; box-shadow: var(--shadow-lg);"
		>
			<div class="text-body-s text-muted mb-2">{t.auth.youAsked}</div>
			<div class="font-serif italic mb-5" style="font-size:16px; line-height:1.4;">
				«{t.auth.chatPreviewQ}»
			</div>
			<div class="bg-line mb-4" style="height:0.5px;"></div>
			<div class="text-body-s text-ink leading-[1.6]">
				{t.auth.chatPreviewA1}<span
					class="px-[2px]"
					style="background: var(--color-accent-tint);"
				>
					{t.auth.chatPreviewA2}<sup class="text-accent font-mono" style="font-size:9px;">[2]</sup>
				</span>{t.auth.chatPreviewA3}
			</div>
			<div class="mt-4 flex gap-[6px] items-center font-mono text-meta-s text-muted tracking-[0.04em]">
				<span class="text-accent">[2]</span>
				<span>{t.auth.citeMeta}</span>
			</div>
		</div>
	</div>
</div>
