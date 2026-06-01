<script lang="ts">
	import { onMount } from 'svelte';
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import {
		listShares,
		addShare,
		removeShare,
		type ShareRead,
		type ShareRole
	} from '$lib/shared/lib/api/shares';
	import { toast } from '$lib/shared/ui/toast/toast.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import Input from '$lib/shared/ui/input/input.svelte';
	import Avatar from '$lib/shared/ui/avatar/avatar.svelte';
	import X from 'lucide-svelte/icons/x';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	interface Props {
		notebookId: string;
		notebookName: string;
		onClose: () => void;
	}
	let { notebookId, notebookName, onClose }: Props = $props();

	let shares = $state<ShareRead[]>([]);
	let isLoading = $state(true);
	let isAdding = $state(false);
	let email = $state('');
	let role = $state<ShareRole>('viewer');

	const t = $derived(i18n.t.share);

	const roleOptions: { value: ShareRole; label: () => string }[] = [
		{ value: 'viewer', label: () => t.roleViewer },
		{ value: 'commenter', label: () => t.roleCommenter },
		{ value: 'editor', label: () => t.roleEditor }
	];

	async function load() {
		isLoading = true;
		try {
			shares = await listShares(notebookId);
		} catch (err: any) {
			console.warn('shares load failed', err);
		} finally {
			isLoading = false;
		}
	}

	async function handleAdd(e?: Event) {
		e?.preventDefault();
		const v = email.trim();
		if (!v || isAdding) return;
		isAdding = true;
		try {
			const created = await addShare(notebookId, { user_email: v, role });
			shares = [...shares, created];
			email = '';
			toast.success(t.shared);
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.addFailed);
		} finally {
			isAdding = false;
		}
	}

	async function handleRevoke(s: ShareRead) {
		try {
			await removeShare(notebookId, s.user.id);
			shares = shares.filter((x) => x.user.id !== s.user.id);
		} catch (err: any) {
			toast.error(err.response?.data?.detail ?? t.revokeFailed);
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}

	onMount(load);
</script>

<svelte:window on:keydown={handleKey} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center"
	style="background: rgba(20,16,10,0.45); backdrop-filter: blur(6px);"
	role="dialog"
	aria-modal="true"
	aria-label={t.title}
>
	<div
		class="bg-paper border-hair border-line rounded-md flex flex-col overflow-hidden"
		style="width: min(560px, calc(100vw - 32px)); max-height: calc(100vh - 48px); box-shadow: var(--shadow-lg);"
	>
		<!-- Header -->
		<header
			class="flex items-center justify-between px-6 py-4 border-b-hair border-line bg-surface shrink-0"
		>
			<Mono>§ {i18n.lang === 'ru' ? 'ПОДЕЛИТЬСЯ' : 'SHARE'}</Mono>
			<button
				type="button"
				aria-label={t.close}
				onclick={onClose}
				class="bg-transparent border-0 p-1 cursor-pointer text-muted hover:text-ink rounded-xs"
			>
				<X class="w-4 h-4" />
			</button>
		</header>

		<div class="px-6 pt-6 pb-3 shrink-0">
			<h2
				class="font-serif m-0"
				style="font-size:28px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
			>
				{t.title}<span class="text-accent">.</span>
			</h2>
			<p class="text-cap text-muted m-0 mt-2 leading-[1.55]">
				<span class="font-serif italic">«{notebookName}»</span> — {t.subtitle}
			</p>
		</div>

		<!-- Add form -->
		<form onsubmit={handleAdd} class="px-6 pt-2 pb-4 flex gap-2 items-end">
			<div class="flex-1">
				<label class="block text-cap text-muted mb-[6px]">{t.emailLabel}</label>
				<Input
					type="email"
					bind:value={email}
					placeholder={t.emailPlaceholder}
					required
					size="sm"
				/>
			</div>
			<div>
				<label class="block text-cap text-muted mb-[6px]">{t.roleLabel}</label>
				<select
					bind:value={role}
					class="bg-paper text-ink border-hair border-line outline-none rounded-sm px-2 py-[6px] text-cap font-sans box-border"
				>
					{#each roleOptions as opt (opt.value)}
						<option value={opt.value}>{opt.label()}</option>
					{/each}
				</select>
			</div>
			<Button
				type="submit"
				variant="primary"
				size="sm"
				disabled={isAdding || !email.trim()}
			>
				{isAdding ? t.adding : t.add}
			</Button>
		</form>

		<!-- Existing shares -->
		<div class="px-6 pb-6 pt-2 overflow-auto">
			<div class="mb-2">
				<Mono>{t.current.toUpperCase()}</Mono>
			</div>
			{#if isLoading}
				<div class="text-cap text-muted py-2">{i18n.t.common.loading}</div>
			{:else if shares.length === 0}
				<div class="text-cap text-muted py-2">{t.none}</div>
			{:else}
				<ul class="list-none p-0 m-0 flex flex-col gap-1">
					{#each shares as s (s.user.id)}
						<li class="flex items-center gap-3 py-2 px-2 rounded-xs hover:bg-surface-2 group">
							<Avatar
								firstName={s.user.first_name}
								lastName={s.user.last_name}
								email={s.user.email}
								size="sm"
							/>
							<div class="min-w-0 flex-1">
								<div class="text-body-s text-ink truncate" style="font-weight:500;">
									{`${s.user.first_name} ${s.user.last_name}`.trim() || s.user.email}
								</div>
								<div class="text-meta text-muted truncate">{s.user.email}</div>
							</div>
							<span class="font-mono text-meta-s text-dim tracking-[0.04em] uppercase">
								{s.role}
							</span>
							<button
								type="button"
								onclick={() => handleRevoke(s)}
								aria-label={t.revoke}
								title={t.revoke}
								class="bg-transparent border-0 p-1 cursor-pointer text-dim hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<Trash2 class="w-3.5 h-3.5" />
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
