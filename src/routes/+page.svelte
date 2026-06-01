<script lang="ts">
	import { i18n } from '$lib/shared/lib/i18n/i18n.svelte';
	import { MOCK_PUBLIC_NOTEBOOKS, MOCK_SOURCES } from '$lib/shared/lib/mock-data';
	import { AREAS } from '$lib/shared/lib/tokens';
	import Logo from '$lib/shared/ui/logo/logo.svelte';
	import Mono from '$lib/shared/ui/mono/mono.svelte';
	import Rule from '$lib/shared/ui/rule/rule.svelte';
	import Button from '$lib/shared/ui/button/button.svelte';
	import AreaDot from '$lib/shared/ui/area-dot/area-dot.svelte';
	import Avatar from '$lib/shared/ui/avatar/avatar.svelte';
	import LangSwitcher from '$lib/shared/ui/lang-switcher/lang-switcher.svelte';
	import ThemeSwitcher from '$lib/shared/ui/theme-switcher/theme-switcher.svelte';

	const L = $derived(i18n.t.landing);
	const PAD = 64;
	const finalWords = $derived(L.finalHd.split(' '));
	const quoteAuthorParts = $derived(L.quoteAuthor.split(/\s+/));

	function areaLabel(id: string): string {
		const a = AREAS.find((x) => x.id === id) ?? AREAS[0];
		return i18n.lang === 'ru' ? a.short_ru : a.short_en;
	}
</script>

<div class="bg-paper text-ink font-sans" style="overflow-x:hidden;">
	<!-- NAV -->
	<header
		class="sticky top-0 z-30 flex items-center justify-between bg-paper border-b-hair border-line"
		style="padding:20px {PAD}px; backdrop-filter: blur(8px);"
	>
		<Logo size={20} href="/" />
		<nav class="flex gap-7 font-sans text-body-s text-muted">
			<a href="/" class="text-inherit no-underline cursor-pointer">{i18n.t.nav.library}</a>
			<a href="/" class="text-inherit no-underline cursor-pointer">{i18n.t.nav.how}</a>
			<a href="/" class="text-inherit no-underline cursor-pointer">{i18n.t.nav.faculties}</a>
			<a href="/" class="text-inherit no-underline cursor-pointer">{i18n.t.nav.pricing}</a>
			<a href="/" class="text-inherit no-underline cursor-pointer">{i18n.t.nav.help}</a>
		</nav>
		<div class="flex gap-3 items-center">
			<LangSwitcher />
			<ThemeSwitcher />
			<a href="/auth/login" class="text-body-s text-muted no-underline cursor-pointer">
				{i18n.t.auth.signIn}
			</a>
			<a href="/auth/register" class="no-underline">
				<Button variant="primary" size="sm">{i18n.t.auth.signUp}</Button>
			</a>
		</div>
	</header>

	<!-- HERO -->
	<section
		class="grid items-start border-b-hair border-line"
		style="padding:48px {PAD}px 64px; grid-template-columns: 1.05fr 1fr; gap:56px;"
	>
		<div>
			<h1
				class="font-serif m-0 mb-7 text-ink"
				style="font-size:104px; line-height:0.95; letter-spacing:-0.04em; font-weight:400;"
			>
				{L.heroPre}<em class="italic text-accent">{L.heroAccent}</em>{L.heroPost}
			</h1>
			<p
				class="font-serif italic text-muted m-0 mb-9"
				style="font-size:22px; line-height:1.45; letter-spacing:-0.01em; max-width:580px;"
			>
				{L.heroSub}
			</p>
			<div class="flex gap-[10px] items-center mb-3">
				<a href="/auth/register" class="no-underline">
					<Button variant="primary" size="lg">{i18n.t.auth.signUp} →</Button>
				</a>
				<a href="/auth/login" class="no-underline">
					<Button variant="ghost" size="lg">{i18n.t.auth.signIn}</Button>
				</a>
			</div>
		</div>

		<!-- Preview window -->
		<div class="relative">
			<div
				class="bg-surface border-hair border-line rounded-lg overflow-hidden"
				style="margin-top:28px; box-shadow: 0 30px 80px -30px rgba(20,16,10,0.18);"
			>
				<div
					class="flex items-center gap-[6px] bg-surface-2 border-b-hair border-line"
					style="padding:10px 12px;"
				>
					<span class="rounded-full" style="width:9px; height:9px; background:#ff5f57;"></span>
					<span class="rounded-full" style="width:9px; height:9px; background:#febc2e;"></span>
					<span class="rounded-full" style="width:9px; height:9px; background:#28c840;"></span>
					<span
						class="font-mono text-meta-s text-muted"
						style="margin-left:12px; letter-spacing:0.02em;"
					>
						margin.app/notebook/attention-mechanisms
					</span>
				</div>
				<div class="grid" style="grid-template-columns:140px 1fr 110px; height:360px;">
					<div class="border-r-hair border-line overflow-hidden" style="padding:12px 10px;">
						<Mono>{i18n.lang === 'ru' ? 'ИСТОЧНИКИ · 8' : 'SOURCES · 8'}</Mono>
						<div class="flex flex-col gap-2 mt-3">
							{#each MOCK_SOURCES.slice(0, 5) as s (s.id)}
								<div class="flex gap-[6px] items-start">
									<div
										class="rounded-[2px] shrink-0 flex items-center justify-center text-paper"
										style="width:10px; height:10px; margin-top:2px; border:1px solid {s.selected
											? 'var(--color-accent)'
											: 'var(--color-line)'}; background:{s.selected
											? 'var(--color-accent)'
											: 'transparent'}; font-size:7px;"
									>
										{s.selected ? '✓' : ''}
									</div>
									<div class="min-w-0">
										<div class="text-ink line-clamp-2" style="font-size:10px; line-height:1.3;">
											{s.title}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="bg-paper flex flex-col overflow-hidden" style="padding:12px 16px;">
						<div
							class="flex gap-3 mb-3 border-b-hair border-line"
							style="font-size:10px; padding-bottom:8px;"
						>
							<span
								class="text-ink"
								style="font-weight:500; border-bottom:1.5px solid var(--color-ink); padding-bottom:6px; margin-bottom:-8px;"
							>
								{i18n.lang === 'ru' ? 'Чат' : 'Chat'}
							</span>
							<span class="text-muted">{i18n.lang === 'ru' ? 'Саммари' : 'Summary'}</span>
							<span class="text-muted">{i18n.lang === 'ru' ? 'Вопросы' : 'Questions'}</span>
						</div>
						<div class="flex justify-end mb-[10px]">
							<div
								class="bg-surface-2 rounded-[10px]"
								style="max-width:80%; padding:6px 10px; font-size:10px; line-height:1.4;"
							>
								{i18n.lang === 'ru'
									? 'Что лучше масштабируется на 4K?'
									: 'Which scales best to 4K imagery?'}
							</div>
						</div>
						<div class="flex gap-[6px] mb-[6px]">
							<div
								class="flex items-center justify-center font-serif"
								style="width:14px; height:14px; background:var(--color-ink); color:var(--color-paper); font-size:9px;"
							>
								M
							</div>
							<Mono>{i18n.lang === 'ru' ? 'MARGIN · 1 ЦИТАТА' : 'MARGIN · 1 CITATION'}</Mono>
						</div>
						<div class="text-ink" style="font-size:10px; line-height:1.55; padding-left:20px;">
							{#if i18n.lang === 'ru'}
								Сетевая dual-attention MaxViT даёт лучшее масштабирование на высоком разрешении<sup
									class="text-accent font-mono"
									style="font-size:7px;">[1]</sup
								>, сохраняя широкое рецептивное поле.
							{:else}
								MaxViT's grid-window dual attention shows the most favorable scaling for
								high-resolution inputs<sup class="text-accent font-mono" style="font-size:7px;"
									>[1]</sup
								>, preserving long-range receptive fields.
							{/if}
						</div>
						<div
							class="bg-surface border-hair border-line rounded-[3px] flex items-center gap-[6px] font-mono text-muted"
							style="margin-top:8px; padding:4px 8px; font-size:9px; margin-left:20px;"
						>
							<span class="text-accent" style="font-weight:600;">[1]</span>
							Tu et al., 2022 · Sec. 4.2
						</div>
					</div>
					<div class="border-l-hair border-line overflow-hidden" style="padding:12px 10px;">
						<Mono>{i18n.lang === 'ru' ? 'ПОЛЯ' : 'MARGINS'}</Mono>
						<div
							class="bg-paper border-hair border-line rounded-[2px]"
							style="padding:8px; margin-top:8px; border-left:2px solid var(--color-accent);"
						>
							<div class="text-ink" style="font-size:9px; font-weight:500; margin-bottom:4px;">
								{i18n.lang === 'ru' ? 'Свип размера окна' : 'Window size sweep'}
							</div>
							<div class="text-muted" style="font-size:9px; line-height:1.45;">
								M=7→12: +0.8 acc, 2.1× память. Оптимум M=10.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- PILLARS -->
	<section class="border-b-hair border-line" style="padding:80px {PAD}px;">
		<div class="grid items-baseline mb-12" style="grid-template-columns:120px 1fr; gap:32px;">
			<Mono>{L.pillarsLabel}</Mono>
			<h2
				class="font-serif m-0"
				style="font-size:56px; line-height:1.0; letter-spacing:-0.03em; font-weight:400; max-width:880px;"
			>
				{L.pillarsHd}
			</h2>
		</div>
		<div class="grid" style="grid-template-columns:repeat(3,1fr); gap:0;">
			{#each L.pillars as p, i (p.n)}
				<div
					style="padding:28px 28px 28px {i === 0 ? '0' : '28px'}; border-left:{i === 0
						? 'none'
						: '0.5px solid var(--color-line)'};"
				>
					<div
						class="font-serif text-accent mb-3"
						style="font-size:56px; line-height:1; letter-spacing:-0.03em;"
					>
						{p.n}
					</div>
					<h3
						class="font-serif m-0 mb-3"
						style="font-size:32px; line-height:1.1; letter-spacing:-0.02em; font-weight:400;"
					>
						{p.t}
					</h3>
					<p class="text-body text-muted m-0" style="line-height:1.65; max-width:360px;">
						{p.d}
					</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- STATS -->
	<section class="border-b-hair border-line" style="padding:64px {PAD}px;">
		<Mono>{L.statsLabel}</Mono>
		<div class="grid mt-7" style="grid-template-columns:repeat(4,1fr); gap:0;">
			{#each L.stats as s, i (s.l)}
				<div
					style="padding:0 24px; border-left:{i === 0 ? 'none' : '0.5px solid var(--color-line)'};"
				>
					<div
						class="font-serif text-ink"
						style="font-size:84px; line-height:1; letter-spacing:-0.04em; font-weight:400;"
					>
						{s.v}
					</div>
					<div
						class="font-mono text-muted uppercase mt-2"
						style="font-size:11px; letter-spacing:0.06em;"
					>
						{s.l}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- HOW IT WORKS -->
	<section class="border-b-hair border-line" style="padding:80px {PAD}px;">
		<div class="grid items-baseline mb-12" style="grid-template-columns:120px 1fr; gap:32px;">
			<Mono>{L.howLabel}</Mono>
			<h2
				class="font-serif m-0"
				style="font-size:56px; line-height:1.0; letter-spacing:-0.03em; font-weight:400; max-width:880px;"
			>
				{L.howHd}
			</h2>
		</div>
		<div class="grid" style="grid-template-columns:repeat(4,1fr); gap:24px;">
			{#each L.how as s (s.n)}
				<div class="flex flex-col gap-[14px]">
					<div class="flex items-center gap-[10px]">
						<span class="font-mono text-accent" style="font-size:11px; letter-spacing:0.06em;">
							{i18n.lang === 'ru' ? 'ШАГ' : 'STEP'}
							{s.n}
						</span>
						<div class="flex-1 bg-line" style="height:0.5px;"></div>
					</div>
					<h3
						class="font-serif m-0"
						style="font-size:24px; line-height:1.15; letter-spacing:-0.02em; font-weight:400;"
					>
						{s.t}
					</h3>
					<p class="text-body-s text-muted m-0 leading-[1.6]">{s.d}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- FEATURED NOTEBOOKS -->
	<section class="border-b-hair border-line" style="padding:80px {PAD}px;">
		<div class="grid items-baseline mb-8" style="grid-template-columns:120px 1fr; gap:32px;">
			<Mono>{L.featuredLabel}</Mono>
			<div>
				<h2
					class="font-serif m-0"
					style="font-size:44px; line-height:1.05; letter-spacing:-0.025em; font-weight:400;"
				>
					{L.featuredHd}
				</h2>
				<p class="text-body text-muted m-0 mt-2 leading-[1.55]" style="max-width:620px;">
					{L.featuredSub}
				</p>
			</div>
		</div>
		<div class="grid" style="grid-template-columns:repeat(5,1fr); gap:12px;">
			{#each MOCK_PUBLIC_NOTEBOOKS as n, i (n.id)}
				<div
					class="bg-surface border-hair border-line rounded-md flex flex-col gap-[10px]"
					style="padding:18px; min-height:220px; cursor:pointer;"
				>
					<div class="flex items-center justify-between">
						<span class="inline-flex items-center gap-[6px]">
							<AreaDot area={n.areaId} />
							<Mono>{areaLabel(n.areaId)}</Mono>
						</span>
						<span class="font-mono text-meta-s text-dim">№ 0{i + 1}</span>
					</div>
					<h3
						class="font-serif m-0"
						style="font-size:17px; line-height:1.2; font-weight:400; letter-spacing:-0.01em;"
					>
						{i18n.lang === 'ru' ? n.titleRu : n.title}
					</h3>
					<p class="text-muted m-0 flex-1 line-clamp-3" style="font-size:11px; line-height:1.55;">
						{i18n.lang === 'ru' ? n.excerptRu : n.excerpt}
					</p>
					<Rule />
					<div class="flex gap-[10px] font-mono text-dim tracking-[0.04em]" style="font-size:9px;">
						<span class="text-muted">{n.sources} SRC</span>
						<span class="text-muted">{n.notes} NOTES</span>
						<span class="ml-auto text-accent">→</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- QUOTE -->
	<section class="border-b-hair border-line bg-surface-2" style="padding:96px {PAD}px;">
		<div class="mx-auto" style="max-width:1080px;">
			<Mono>{L.quoteLabel}</Mono>
			<div class="relative mt-6">
				<span
					aria-hidden="true"
					class="absolute font-serif text-accent"
					style="left:-64px; top:-28px; font-size:200px; line-height:1; opacity:0.18;"
				>
					"
				</span>
				<p
					class="font-serif italic m-0 text-ink"
					style="font-size:44px; line-height:1.18; letter-spacing:-0.02em; font-weight:400;"
				>
					{L.quoteText}
				</p>
			</div>
			<div class="mt-9 flex items-center gap-3">
				<Avatar
					firstName={quoteAuthorParts[0] ?? ''}
					lastName={quoteAuthorParts[quoteAuthorParts.length - 1] ?? ''}
					size="lg"
				/>
				<div>
					<div class="text-body text-ink" style="font-weight:500;">{L.quoteAuthor}</div>
					<div class="font-mono text-meta text-muted tracking-[0.04em]">{L.quoteRole}</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="border-b-hair border-line" style="padding:80px {PAD}px;">
		<div class="grid items-baseline mb-9" style="grid-template-columns:120px 1fr; gap:32px;">
			<Mono>{L.faqLabel}</Mono>
			<h2
				class="font-serif m-0"
				style="font-size:48px; line-height:1.05; letter-spacing:-0.025em; font-weight:400; max-width:720px;"
			>
				{L.faqHd}
			</h2>
		</div>
		<div class="grid" style="grid-template-columns:120px 1fr; gap:32px;">
			<div></div>
			<div>
				{#each L.faq as f, i (f.q)}
					<div
						class="grid items-baseline"
						style="grid-template-columns:40px 1fr 24px; gap:20px; padding:24px 0; border-top:0.5px solid var(--color-line);"
					>
						<span class="font-mono text-accent" style="font-size:11px; letter-spacing:0.06em;">
							{String(i + 1).padStart(2, '0')}
						</span>
						<div>
							<h3
								class="font-serif m-0 mb-[10px]"
								style="font-size:22px; line-height:1.25; letter-spacing:-0.015em; font-weight:400;"
							>
								{f.q}
							</h3>
							<p class="text-body text-muted m-0 leading-[1.65]" style="max-width:760px;">
								{f.a}
							</p>
						</div>
						<span class="text-muted" style="font-size:18px;">→</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section
		class="border-b-hair border-line bg-ink"
		style="padding:120px {PAD}px; color: var(--color-paper);"
	>
		<div class="grid items-end" style="grid-template-columns:1.3fr 1fr; gap:56px;">
			<div>
				<div
					class="font-mono text-accent uppercase mb-3"
					style="font-size:11px; letter-spacing:0.08em;"
				>
					{L.finalLabel}
				</div>
				<h2
					class="font-serif m-0"
					style="font-size:104px; line-height:0.95; letter-spacing:-0.04em; font-weight:400;"
				>
					{#each finalWords as w, i (i)}
						{#if i === finalWords.length - 1}<em class="italic text-accent">{w}</em>
						{:else}<span>{w} </span>{/if}
					{/each}
				</h2>
			</div>
			<div>
				<p
					class="font-serif italic m-0 mb-7"
					style="font-size:22px; line-height:1.45; letter-spacing:-0.01em; color: rgba(255,255,255,0.65); max-width:460px;"
				>
					{L.finalSub}
				</p>
				<div class="flex gap-[10px] items-center" style="max-width:460px;">
					<a href="/auth/register" class="no-underline">
						<Button variant="accent" size="lg">{i18n.t.auth.signUp} →</Button>
					</a>
					<a href="/auth/login" class="no-underline">
						<Button variant="outline-light" size="lg">{i18n.t.auth.signIn}</Button>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- FOOTER -->
	<footer style="padding:40px {PAD}px 28px;">
		<div class="grid mb-8" style="grid-template-columns:1.4fr 1fr 1fr 1fr; gap:32px;">
			<div>
				<Logo size={20} />
				<p
					class="font-serif italic text-muted m-0 mt-[14px]"
					style="font-size:16px; line-height:1.45; max-width:320px;"
				>
					{i18n.t.tagline}.
				</p>
			</div>
			{#each [{ hd: L.footerNav.product, items: L.footerCols.product }, { hd: L.footerNav.company, items: L.footerCols.company }, { hd: L.footerNav.resources, items: L.footerCols.resources }] as col (col.hd)}
				<div>
					<Mono>{col.hd}</Mono>
					<ul class="list-none p-0 m-0 mt-3 flex flex-col gap-2">
						{#each col.items as it (it)}
							<li>
								<a href="/" class="text-body-s text-muted no-underline cursor-pointer">
									{it}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<Rule />
		<div
			class="flex justify-between items-center mt-[18px] font-mono text-meta-s text-dim tracking-[0.04em]"
		>
			<span>{L.footerCopy}</span>
			<span>
				<span style="color: {i18n.lang === 'en' ? 'var(--color-ink)' : 'var(--color-dim)'};"
					>EN</span
				>
				<span class="text-dim mx-[6px]">·</span>
				<span style="color: {i18n.lang === 'ru' ? 'var(--color-ink)' : 'var(--color-dim)'};"
					>RU</span
				>
			</span>
		</div>
	</footer>
</div>
