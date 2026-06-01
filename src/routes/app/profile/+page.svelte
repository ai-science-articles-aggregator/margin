<script lang="ts">
	import { page } from '$app/stores';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { updateProfile, type UserProfile } from '$lib/shared/lib/api/profile';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import SectionHeader from '$lib/shared/ui/section-header/section-header.svelte';

	let user = $state<UserProfile | null>($page.data?.profile ?? null);

	let firstName = $state(user?.first_name ?? '');
	let lastName = $state(user?.last_name ?? '');
	let department = $state(user?.department ?? '');
	let email = $state(user?.email ?? '');

	let isSaving = $state(false);

	const t = $derived(i18n.t.profile);

	let dirty = $derived(
		!!user &&
			(firstName.trim() !== user.first_name ||
				lastName.trim() !== user.last_name ||
				(department.trim() || null) !== (user.department ?? null) ||
				email.trim() !== user.email)
	);

	async function save() {
		if (!dirty || !user) return;
		isSaving = true;
		try {
			const updated = await updateProfile({
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				department: department.trim() || null,
				email: email.trim()
			});
			user = updated;
			toast.success(t.saved);
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? err.message ?? t.saveFailed);
		} finally {
			isSaving = false;
		}
	}

	function reset() {
		if (!user) return;
		firstName = user.first_name;
		lastName = user.last_name;
		department = user.department ?? '';
		email = user.email;
	}

	function fmtDate(iso?: string): string {
		if (!iso) return '—';
		const d = new Date(iso);
		return d.toLocaleDateString(i18n.lang === 'ru' ? 'ru-RU' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<section class="mx-auto" style="max-width:880px; padding:32px 48px 80px;">
	<div class="mb-3">
		<Mono>§ {t.title.toUpperCase()}</Mono>
		<h1
			class="font-serif m-0 mt-2"
			style="font-size:44px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
		>
			{t.title}<span class="text-accent">.</span>
		</h1>
		<p class="text-body text-muted m-0 mt-2 leading-[1.55]">{t.subtitle}</p>
	</div>

	{#if dirty}
		<div
			class="sticky top-0 z-10 mt-6 flex items-center gap-3 bg-surface border-hair border-line rounded-md px-[14px] py-[10px]"
			style="box-shadow: var(--shadow-sm);"
		>
			<span
				class="rounded-full"
				style="width:6px; height:6px; background: var(--color-accent);"
			></span>
			<span class="font-mono text-meta text-muted tracking-[0.04em]">{t.unsaved}</span>
			<div class="ml-auto flex gap-2">
				<Button variant="ghost" size="sm" onclick={reset} disabled={isSaving}>
					{t.cancel}
				</Button>
				<Button variant="primary" size="sm" onclick={save} disabled={isSaving}>
					{isSaving ? (i18n.lang === 'ru' ? 'Сохранение…' : 'Saving…') : t.save}
				</Button>
			</div>
		</div>
	{/if}

	<SectionHeader no="01" label={t.personalData} />

	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.firstName}</div>
		<Input bind:value={firstName} class="!w-[320px]" />
	</div>

	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.lastName}</div>
		<Input bind:value={lastName} class="!w-[320px]" />
	</div>

	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.department}</div>
		<Input bind:value={department} placeholder={t.departmentPlaceholder} class="!w-[320px]" />
	</div>

	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.email}</div>
		<Input type="email" bind:value={email} class="!w-[320px]" />
	</div>

	<SectionHeader no="02" label={t.accountInfo} />

	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.createdAt}</div>
		<div class="text-body text-muted">{fmtDate(user?.created_at)}</div>
	</div>

	<div class="grid grid-cols-[260px_1fr] gap-8 py-6 border-t-hair border-line">
		<div class="text-body-s text-ink" style="font-weight:500;">{t.updatedAt}</div>
		<div class="text-body text-muted">{fmtDate(user?.updated_at)}</div>
	</div>
</section>
