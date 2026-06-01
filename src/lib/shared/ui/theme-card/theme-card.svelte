<script lang="ts">
	type Mode = 'light' | 'dark' | 'system';

	interface MiniColors {
		bg: string;
		surface: string;
		surfaceAlt: string;
		ink: string;
		muted: string;
		accent: string;
	}

	interface Props {
		mode: Mode;
		active: boolean;
		label: string;
		desc: string;
		mini: MiniColors;
		onSelect?: (m: Mode) => void;
	}

	let { mode, active, label, desc, mini, onSelect }: Props = $props();
</script>

<button
	type="button"
	onclick={() => onSelect?.(mode)}
	class="flex flex-col gap-2 text-left bg-transparent p-0 cursor-pointer"
	aria-pressed={active}
>
	<div
		class="relative overflow-hidden rounded-md p-[10px]"
		style="height:100px; background:{mini.bg}; border: {active
			? '1.5px'
			: '0.5px'} solid {active ? 'var(--color-accent)' : 'var(--color-line)'};"
	>
		<!-- mini chrome -->
		<div
			class="rounded-xs mb-[6px]"
			style="height:6px; width:36px; background:{mini.surface};"
		></div>
		<div class="flex gap-1">
			<div
				class="rounded-xs"
				style="width:18px; height:24px; background:{mini.surface};"
			></div>
			<div
				class="flex-1 rounded-xs flex flex-col gap-[2px] p-[3px]"
				style="height:24px; background:{mini.surfaceAlt};"
			>
				<div
					class="rounded-[1px]"
					style="height:3px; width:70%; background:{mini.ink}; opacity:0.6;"
				></div>
				<div
					class="rounded-[1px]"
					style="height:3px; width:50%; background:{mini.muted}; opacity:0.4;"
				></div>
			</div>
		</div>
		<span
			class="absolute rounded-full"
			style="bottom:8px; left:10px; width:6px; height:6px; background:{mini.accent};"
		></span>
		{#if active}
			<span
				class="absolute flex items-center justify-center rounded-full text-paper"
				style="top:8px; right:8px; width:16px; height:16px; background: var(--color-accent); font-size:10px; line-height:1;"
			>
				✓
			</span>
		{/if}
	</div>
	<div>
		<div class="text-body-s text-ink" style="font-weight:500;">{label}</div>
		<div class="text-meta text-muted leading-[1.4] mt-[2px]" style="letter-spacing:0;">{desc}</div>
	</div>
</button>
