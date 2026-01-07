<script>
	import LandingHeader from '$lib/widgets/landing-header/landing-header.svelte';
	import LandingFooter from '$lib/widgets/landing-footer/landing-footer.svelte';
	import Hero from '$lib/widgets/hero/hero.svelte';
	import FeatureCard from '$lib/widgets/feature-card/feature-card.svelte';
	import StepCard from '$lib/widgets/step-card/step-card.svelte';
	import CtaSection from '$lib/widgets/cta-section/cta-section.svelte';
</script>

<div class="min-h-screen flex flex-col font-sans">
	<LandingHeader />

	<main class="flex-grow pt-16">
		<Hero
			primaryAction={{ label: 'Начать исследование', href: '/app' }}
			secondaryAction={{ label: 'Как это работает?', href: '#how-it-works' }}
		>
			<svelte:fragment slot="title">
				Превратите хаос статей в <br />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
					>структурированное знание</span
				>
			</svelte:fragment>
			<svelte:fragment slot="subtitle">
				ArticleFusion — это интеллектуальный агрегатор. Он находит научные источники, объединяет
				их с вашими PDF-файлами и генерирует единый связный отчет без "воды" и дубликатов.
			</svelte:fragment>
		</Hero>

		<!-- FEATURES SECTION -->
		<section id="features" class="py-24 bg-white">
			<div class="container mx-auto px-6 max-w-6xl">
				<div class="text-center mb-16">
					<h2 class="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
						Больше, чем просто суммаризация
					</h2>
					<p class="text-gray-500 max-w-2xl mx-auto">
						Мы используем продвинутые алгоритмы NLP для понимания контекста, а не простого поиска
						ключевых слов.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<FeatureCard
						icon="🔍"
						title="Семантический поиск"
						description="Поиск статей по смыслу запроса. Система понимает научный контекст, даже если
							формулировки отличаются."
					/>
					<FeatureCard
						icon="📂"
						title="Гибридные источники"
						description="Загружайте собственные PDF статьи и комбинируйте их с найденными статьями из arXiv."
					/>
					<FeatureCard
						icon="🧬"
						title="Скрещивание идей"
						description="AI сопоставляет тезисы разных авторов, находя противоречия или подтверждения одной
							гипотезы."
					/>
					<FeatureCard
						icon="✂️"
						title="Умная дедупликация"
						description="Никаких повторов. Если факт упомянут в трех статьях, в отчете он появится один раз."
					/>
					<FeatureCard
						icon="💡"
						title="Контекстные выводы"
						description="Система генерирует новые инсайты на стыке прочитанного, помогая вам формулировать
							гипотезы."
					/>
					<FeatureCard
						icon="🔖"
						title="Точное цитирование"
						description="Каждое утверждение в итоговом тексте имеет кликабельную ссылку на исходный абзац
							источника."
					/>
				</div>
			</div>
		</section>

		<!-- HOW IT WORKS SECTION -->
		<section id="how-it-works" class="py-24 bg-gray-900 text-white rounded-t-[3rem]">
			<div class="container mx-auto px-6 max-w-5xl">
				<h2 class="text-3xl md:text-4xl font-medium text-center mb-16">
					Ваш путь к готовому исследованию
				</h2>

				<div class="grid md:grid-cols-4 gap-8 relative">
					<div
						class="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-700 -z-0 transform translate-y-4"
					></div>

					<StepCard number={1} title="Промт-запрос" description="Вы задаете тему исследования на естественном языке." color="blue" />
					<StepCard number={2} title="Анализ баз" description="AI сканирует миллионы статей и предлагает релевантные подборки." color="purple" />
					<StepCard number={3} title="Микс данных" description="Вы выбираете лучшие статьи и добавляете свои файлы." color="pink" />
					<StepCard number={4} title="Результат" description="Получаете структурированный синтез знаний без повторов." color="green" />
				</div>
			</div>
		</section>

		<CtaSection buttonLabel="Создать первый синтез" buttonHref="/app">
			<svelte:fragment slot="title">
				Экономьте до 20 часов на <br /> обзоре литературы
			</svelte:fragment>
			<svelte:fragment slot="subtitle">
				Присоединяйтесь к ученым и аналитикам, которые уже используют ArticleFusion.
			</svelte:fragment>
		</CtaSection>
	</main>

	<LandingFooter />
</div>

<style>
	/* Имитация шрифта Google Sans / Inter для стиля NotebookLM */
	:global(body) {
		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
		color: #1f2937; /* gray-800 */
		background-color: #ffffff;
	}
</style>
