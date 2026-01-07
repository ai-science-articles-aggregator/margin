<script>
	import { fly } from 'svelte/transition';

	// Данные проектов с адаптированными цветами для светлой/темной темы
	let projects = [
		{
			id: 1,
			title: 'Архитектура LLM: Attention Is All You Need',
			updated: '15 мин назад',
			sources: 24,
			preview:
				'Разбор механизма Self-Attention. Сравнение архитектур Encoder-Only (BERT) и Decoder-Only (GPT). Проблема контекстного окна.',
			colorClass:
				'bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/10',
			icon: '🤖'
		},
		{
			id: 2,
			title: 'Zero-Knowledge Proofs в блокчейне',
			updated: '3 часа назад',
			sources: 7,
			preview:
				'Математические основы zk-SNARKs. Применение для анонимных транзакций и масштабирования Ethereum (Layer 2 solutions).',
			colorClass:
				'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/10',
			icon: '🔐'
		},
		{
			id: 3,
			title: 'Распределенные системы: CAP-теорема',
			updated: 'Вчера',
			sources: 11,
			preview:
				'Компромиссы между согласованностью и доступностью. Анализ баз данных Spanner, Cassandra и CockroachDB в условиях Network Partition.',
			colorClass:
				'bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/40 dark:to-cyan-900/10',
			icon: '🌐'
		},
		{
			id: 4,
			title: 'Безопасность памяти: Rust vs C++',
			updated: '2 дня назад',
			sources: 18,
			preview:
				"Анализ концепции Borrow Checker. Как Rust предотвращает ошибки 'Use-After-Free' и гонки данных без Garbage Collector.",
			colorClass:
				'bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-900/10',
			icon: '⚙️'
		},
		{
			id: 5,
			title: 'P vs NP: Проблема тысячелетия',
			updated: 'На прошлой неделе',
			sources: 5,
			preview:
				'Обзор текущего состояния доказательств. Влияние решения P=NP на современную криптографию (RSA, ECC).',
			colorClass:
				'bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-900/10',
			icon: '📐'
		},
		{
			id: 6,
			title: 'WebAssembly и будущее фронтенда',
			updated: '2 недели назад',
			sources: 9,
			preview:
				'Запуск тяжелых вычислений в браузере. Портирование Doom и Photoshop. Взаимодействие JS и WASM памяти.',
			colorClass:
				'bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/40 dark:to-violet-900/10',
			icon: '⚡️'
		},
		{
			id: 7,
			title: 'Квантовые алгоритмы: Гровер и Шор',
			updated: 'Месяц назад',
			sources: 14,
			preview:
				'Квантовое превосходство в задачах поиска и факторизации чисел. Угрозы для классического шифрования.',
			colorClass:
				'bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 dark:from-fuchsia-900/40 dark:to-fuchsia-900/10',
			icon: '⚛️'
		},
		{
			id: 8,
			title: 'DevOps: Kubernetes Patterns',
			updated: 'Архив',
			sources: 4,
			preview:
				'Паттерны Sidecar, Ambassador и Adapter. Управление состоянием (StatefulSets) и секретами в микросервисной архитектуре.',
			colorClass:
				'bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/10',
			icon: '⚓️'
		}
	];

	let searchQuery = '';

	$: filteredProjects = projects;
</script>

<main class="container mx-auto px-6 py-8">
	<div class="mb-8 pl-2">
		<h1 class="text-3xl font-medium text-base-content">Добро пожаловать</h1>
		<p class="text-base-content/60">Ваши интеллектуальные пространства</p>
	</div>

	<!--
      GRID CONFIGURATION
      auto-rows-fr: заставляет все ячейки грида быть одной высоты (по самой высокой, или по h-full вложенного)
    -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
		<!-- CARD 1: CREATE NEW -->
		<!-- Фиксированная минимальная высота (h-80 = 320px) гарантирует одинаковый размер -->
		<button
			class="group h-80 flex flex-col items-start justify-between p-8 rounded-[2rem] bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-left cursor-pointer overflow-hidden relative"
		>
			<!-- Background Hover Effect -->
			<div
				class="absolute inset-0 bg-base-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			></div>

			<div
				class="relative z-10 w-14 h-14 rounded-2xl bg-base-content text-base-100 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path></svg
				>
			</div>

			<div class="relative z-10 mt-auto w-full">
				<h3 class="text-xl font-medium text-base-content mb-1">Новое исследование</h3>
				<p class="text-sm text-base-content/60">Создать с нуля или импорт</p>
			</div>
		</button>

		<!-- PROJECT CARDS LOOP -->
		{#each projects as project, i (project.id)}
			<div
				in:fly={{ y: 20, delay: i * 50, duration: 400 }}
				class="group h-80 flex flex-col rounded-[2rem] bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-xl hover:shadow-base-content/5 transition-all duration-300 cursor-pointer overflow-hidden"
			>
				<!-- HEADER: Высота h-32 (128px), запрет сжатия shrink-0 -->
				<div
					class={`h-32 w-full shrink-0 ${project.colorClass} p-6 flex justify-between items-start transition-colors duration-300 relative`}
				>
					<div
						class="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300 origin-top-left"
					>
						{project.icon}
					</div>

					<button
						class="btn btn-circle btn-sm btn-ghost bg-base-100/40 hover:bg-base-100 border-none opacity-0 group-hover:opacity-100 transition-opacity text-base-content backdrop-blur-sm"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
							><path
								d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
							/></svg
						>
					</button>
				</div>

				<!-- BODY: Изменили отступы на px-6 py-5 (меньше по вертикали) -->
				<div class="flex-1 px-6 py-5 flex flex-col overflow-hidden relative">
					<!--
         Заголовок:
         min-h-[3.5rem] = резервирует место ровно под 2 строки (2 * 28px line-height).
         Даже если заголовок в 1 строку, блок займет место как под 2.
      -->
					<h3
						class="text-lg font-bold text-base-content mb-2 leading-7 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors"
					>
						{project.title}
					</h3>

					<!--
         Описание:
         Изменили на line-clamp-2. Теперь текст гарантированно влезет.
      -->
					<p class="text-sm text-base-content/70 mb-auto line-clamp-2 leading-relaxed">
						{project.preview}
					</p>

					<!-- Футер: mt-4 чтобы отодвинуть от описания -->
					<div class="flex items-center justify-between mt-4 pt-2 border-t border-base-200">
						<div class="flex items-center">
							<span
								class="badge badge-sm bg-base-200 border-none text-base-content/70 font-medium py-2.5 px-3 rounded-lg"
							>
								{project.sources} ист.
							</span>
						</div>
						<span class="text-xs text-base-content/40 font-medium whitespace-nowrap ml-2">
							{project.updated}
						</span>
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if filteredProjects.length === 0}
		<div class="flex flex-col items-center justify-center py-20 opacity-50">
			<svg
				class="w-16 h-16 mb-4 text-base-content/30"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<p class="text-lg">Ничего не найдено</p>
		</div>
	{/if}
</main>
