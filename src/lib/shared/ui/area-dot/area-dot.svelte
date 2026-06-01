<script lang="ts">
	import { areaById, type AreaId } from '$lib/shared/lib/tokens';
	import { PALETTE_KEYS, type PaletteKey } from '$lib/shared/lib/api/areas';

	interface Props {
		/** Static area id from local AREAS (legacy / mock data). */
		area?: AreaId;
		/** Palette key from backend Area.palette_key — preferred when available. */
		paletteKey?: PaletteKey | string | null;
		size?: number;
	}

	let { area, paletteKey, size = 6 }: Props = $props();

	// Robust resolve: known palette key → its CSS var,
	// unknown / null → fall back via CSS var() default to accent (never blank dot).
	let color = $derived.by(() => {
		if (paletteKey) {
			const isKnown = (PALETTE_KEYS as string[]).includes(paletteKey);
			// CSS fallback covers backend palette keys we haven't declared yet.
			return isKnown
				? `var(--color-area-${paletteKey})`
				: `var(--color-area-${paletteKey}, var(--color-accent))`;
		}
		if (area) return areaById(area).colorVar;
		return 'var(--color-dim)';
	});
</script>

<span
	class="inline-block rounded-full"
	style="width:{size}px; height:{size}px; background:{color}"
	aria-hidden="true"
></span>
