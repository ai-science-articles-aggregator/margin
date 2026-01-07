<script>
	import Logo from '$lib/components/logo/logo.svelte';
	// Скрипт здесь пока минимальный, так как это Landing Page.
	// Можно добавить fade-in анимации при скролле, если потребуется.
</script>

<div class="min-h-screen flex flex-col font-sans">
	<!-- HEADER / NAVBAR -->
	<!-- Используем <header> и <nav> для семантики -->
	<header
		class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all"
	>
		<nav class="container mx-auto px-6 h-16 flex items-center justify-between">
			<!-- Логотип -->
			<Logo />

			<!-- Навигация -->
			<div class="hidden md:flex items-center gap-6">
				<a href="#features" class="text-sm font-medium text-gray-600 hover:text-black transition"
					>Возможности</a
				>
				<a
					href="#how-it-works"
					class="text-sm font-medium text-gray-600 hover:text-black transition">Методология</a
				>
			</div>

			<!-- CTA в меню -->
			<div class="flex items-center gap-3">
				<button class="btn btn-sm btn-ghost rounded-full font-normal hidden sm:inline-flex"
					>Войти</button
				>
				<button
					class="btn btn-sm btn-primary rounded-full px-6 font-normal normal-case bg-black text-white hover:bg-gray-800 border-none shadow-none"
				>
					Попробовать
				</button>
			</div>
		</nav>
	</header>

	<main class="flex-grow pt-16">
		<!-- HERO SECTION -->
		<section class="relative pt-20 pb-32 overflow-hidden">
			<!-- Фоновый декоративный элемент -->
			<div
				class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-[100%] blur-3xl -z-10 opacity-60"
			></div>

			<div class="container mx-auto px-6 text-center max-w-4xl relative z-10">
				<h1
					class="text-5xl md:text-7xl font-medium tracking-tight leading-tight mb-8 text-gray-900"
				>
					Превратите хаос статей в <br />
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
						>структурированное знание</span
					>
				</h1>

				<p class="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
					ArticleFusion — это интеллектуальный агрегатор. Он находит научные источники, объединяет
					их с вашими PDF-файлами и генерирует единый связный отчет без "воды" и дубликатов.
				</p>

				<div class="flex flex-col sm:flex-row justify-center gap-4">
					<button
						class="btn btn-lg rounded-full bg-black text-white border-none hover:bg-gray-800 hover:scale-105 transition-transform shadow-xl"
					>
						Начать исследование
					</button>
					<button
						class="btn btn-lg btn-outline rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
					>
						Как это работает?
					</button>
				</div>

				<!-- Небольшой визуальный "пруф" интерфейса -->
				<div
					class="mt-16 mx-auto max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 opacity-90 rotate-1 hover:rotate-0 transition-transform duration-500"
				>
					<div class="bg-gray-50 rounded-2xl p-6 text-left">
						<div class="flex gap-2 mb-4">
							<div class="h-3 w-3 rounded-full bg-red-400"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-400"></div>
							<div class="h-3 w-3 rounded-full bg-green-400"></div>
						</div>
						<div class="space-y-3">
							<div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
							<div class="h-4 bg-gray-200 rounded w-full animate-pulse delay-75"></div>
							<div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse delay-150"></div>
						</div>
					</div>
				</div>
			</div>
		</section>

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

				<!-- Bento Grid Layout -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<!-- Feature 1 -->
					<article
						class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
						>
							🔍
						</div>
						<h3 class="text-xl font-semibold mb-3 text-gray-900">Семантический поиск</h3>
						<p class="text-gray-500 leading-relaxed">
							Поиск статей по смыслу запроса. Система понимает научный контекст, даже если
							формулировки отличаются.
						</p>
					</article>

					<!-- Feature 2 -->
					<article
						class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
						>
							📂
						</div>
						<h3 class="text-xl font-semibold mb-3 text-gray-900">Гибридные источники</h3>
						<p class="text-gray-500 leading-relaxed">
							Загружайте собственные PDF статьи и комбинируйте их с найденными статьями из arXiv.
						</p>
					</article>

					<!-- Feature 3 -->
					<article
						class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
						>
							🧬
						</div>
						<h3 class="text-xl font-semibold mb-3 text-gray-900">Скрещивание идей</h3>
						<p class="text-gray-500 leading-relaxed">
							AI сопоставляет тезисы разных авторов, находя противоречия или подтверждения одной
							гипотезы.
						</p>
					</article>

					<!-- Feature 4 -->
					<article
						class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
						>
							✂️
						</div>
						<h3 class="text-xl font-semibold mb-3 text-gray-900">Умная дедупликация</h3>
						<p class="text-gray-500 leading-relaxed">
							Никаких повторов. Если факт упомянут в трех статьях, в отчете он появится один раз.
						</p>
					</article>

					<!-- Feature 5 -->
					<article
						class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
						>
							💡
						</div>
						<h3 class="text-xl font-semibold mb-3 text-gray-900">Контекстные выводы</h3>
						<p class="text-gray-500 leading-relaxed">
							Система генерирует новые инсайты на стыке прочитанного, помогая вам формулировать
							гипотезы.
						</p>
					</article>

					<!-- Feature 6 -->
					<article
						class="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-300 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
						>
							🔖
						</div>
						<h3 class="text-xl font-semibold mb-3 text-gray-900">Точное цитирование</h3>
						<p class="text-gray-500 leading-relaxed">
							Каждое утверждение в итоговом тексте имеет кликабельную ссылку на исходный абзац
							источника.
						</p>
					</article>
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
					<!-- Линия процесса (только для десктопа) -->
					<div
						class="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-700 -z-0 transform translate-y-4"
					></div>

					<!-- Step 1 -->
					<div class="relative z-10 flex flex-col items-center text-center">
						<div
							class="w-14 h-14 rounded-full bg-blue-600 border-4 border-gray-900 flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-900/50"
						>
							1
						</div>
						<h3 class="text-lg font-bold mb-2">Промт-запрос</h3>
						<p class="text-gray-400 text-sm">Вы задаете тему исследования на естественном языке.</p>
					</div>

					<!-- Step 2 -->
					<div class="relative z-10 flex flex-col items-center text-center">
						<div
							class="w-14 h-14 rounded-full bg-purple-600 border-4 border-gray-900 flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-purple-900/50"
						>
							2
						</div>
						<h3 class="text-lg font-bold mb-2">Анализ баз</h3>
						<p class="text-gray-400 text-sm">
							AI сканирует миллионы статей и предлагает релевантные подборки.
						</p>
					</div>

					<!-- Step 3 -->
					<div class="relative z-10 flex flex-col items-center text-center">
						<div
							class="w-14 h-14 rounded-full bg-pink-600 border-4 border-gray-900 flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-pink-900/50"
						>
							3
						</div>
						<h3 class="text-lg font-bold mb-2">Микс данных</h3>
						<p class="text-gray-400 text-sm">Вы выбираете лучшие статьи и добавляете свои файлы.</p>
					</div>

					<!-- Step 4 -->
					<div class="relative z-10 flex flex-col items-center text-center">
						<div
							class="w-14 h-14 rounded-full bg-green-500 border-4 border-gray-900 flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-green-900/50"
						>
							4
						</div>
						<h3 class="text-lg font-bold mb-2">Результат</h3>
						<p class="text-gray-400 text-sm">
							Получаете структурированный синтез знаний без повторов.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA SECTION -->
		<section class="py-32 bg-white">
			<div class="container mx-auto px-6 max-w-4xl text-center">
				<h2 class="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8">
					Экономьте до 20 часов на <br /> обзоре литературы
				</h2>
				<p class="text-xl text-gray-500 mb-10 font-light">
					Присоединяйтесь к ученым и аналитикам, которые уже используют ArticleFusion.
				</p>
				<button
					class="btn btn-primary btn-lg rounded-full px-12 bg-black text-white hover:bg-gray-800 border-none h-16 text-lg shadow-2xl hover:-translate-y-1 transition-transform"
				>
					Создать первый синтез
				</button>
			</div>
		</section>
	</main>

	<!-- FOOTER -->
	<footer class="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
		<div class="container mx-auto px-6">
			<div class="flex flex-col md:flex-row justify-between items-center mb-8">
				<div class="mb-4 md:mb-0">
					<span class="text-lg font-bold text-gray-900">ArticleFusion</span>
					<p class="text-sm text-gray-500 mt-2">Интеллектуальный помощник исследователя</p>
				</div>
			</div>
			<div
				class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400"
			>
				<p>© 2026 ArticleFusion Inc. Все права защищены.</p>
				<div class="flex gap-4 mt-4 md:mt-0">
					<a href="#" class="hover:text-gray-600">Политика конфиденциальности</a>
					<a href="#" class="hover:text-gray-600">Условия использования</a>
				</div>
			</div>
		</div>
	</footer>
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
