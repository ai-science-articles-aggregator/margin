<script lang="ts">
	import ProjectCard from '$lib/widgets/project-card/project-card.svelte';
	import CreateNotebook from '$lib/features/create-notebook/create-notebook.svelte';

	// TODO: integrate with backend - fetch projects from API
	// Данные проектов с адаптированными цветами (цвета высчитывать из индекса проекта) для светлой/темной темы
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

	// TODO: integrate with backend - implement search functionality
	let filteredProjects = $derived(projects);

	function handleCreateProject() {
		// TODO: integrate with backend - create new project
		console.log('Create new project');
	}

	function handleProjectClick(projectId: number) {
		// TODO: integrate with backend - navigate to project
		console.log('Open project:', projectId);
	}
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
		<CreateNotebook />

		{#each filteredProjects as project, i (project.id)}
			<ProjectCard project={project} index={i} onClick={() => handleProjectClick(project.id)} />
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
