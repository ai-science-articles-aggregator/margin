<script lang="ts">
	interface Props {
		firstName?: string | null;
		lastName?: string | null;
		email?: string | null;
		size?: 'sm' | 'md' | 'lg';
	}

	let { firstName, lastName, email, size = 'md' }: Props = $props();

	function initials(): string {
		const f = (firstName ?? '').trim();
		const l = (lastName ?? '').trim();
		if (f && l) return (f[0] + l[0]).toUpperCase();
		if (f) return f.slice(0, 2).toUpperCase();
		if (l) return l.slice(0, 2).toUpperCase();
		const local = (email ?? '').split('@')[0] ?? '';
		return local.slice(0, 2).toUpperCase() || '?';
	}

	function label(): string {
		const full = `${firstName ?? ''} ${lastName ?? ''}`.trim();
		return full || email || '';
	}

	let dim = $derived(size === 'sm' ? 22 : size === 'lg' ? 36 : 28);
	let font = $derived(size === 'sm' ? 9 : size === 'lg' ? 13 : 11);
</script>

<span
	class="inline-flex items-center justify-center rounded-full font-sans font-medium"
	style="width:{dim}px; height:{dim}px; font-size:{font}px; background:var(--color-accent); color:var(--color-accent-ink);"
	aria-label={label()}
>
	{initials()}
</span>
