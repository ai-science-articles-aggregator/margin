<script lang="ts">
	import ProjectCard from '$lib/widgets/project-card/project-card.svelte';
	import CreateNotebook from '$lib/features/create-notebook/create-notebook.svelte';
	import { getNotebooks, deleteNotebook, type NotebookListResponse } from '$lib/shared/lib/api/notebooks';
	import { goto } from '$app/navigation';

	let notebooks = $state<NotebookListResponse[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// Modal states
	let isEditModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
	let selectedNotebook = $state<NotebookListResponse | null>(null);
	let editName = $state('');
	let editDescription = $state('');
	let isSubmitting = $state(false);

	// Цвета для блокнотов (циклически)
	const colorClasses = [
		'bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/10',
		'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/10',
		'bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/40 dark:to-cyan-900/10',
		'bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-900/10',
		'bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-900/10',
		'bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/40 dark:to-violet-900/10',
		'bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 dark:from-fuchsia-900/40 dark:to-fuchsia-900/10',
		'bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/10'
	];

	const icons = ['📚', '🔬', '💡', '📊', '🎯', '🚀', '⚡', '🌟'];

	function getNotebookData(notebook: NotebookListResponse, index: number) {
		const colorIndex = index % colorClasses.length;
		return {
			id: notebook.id,
			title: notebook.name,
			updated: formatDate(notebook.updated_at),
			sources: 0,
			preview: notebook.description || 'Нет описания',
			colorClass: colorClasses[colorIndex],
			icon: icons[colorIndex]
		};
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMins / 60);
		const diffDays = Math.floor(diffHours / 24);

		if (diffMins < 1) return 'Только что';
		if (diffMins < 60) return `${diffMins} мин назад`;
		if (diffHours < 24) return `${diffHours} ч назад`;
		if (diffDays < 7) return `${diffDays} дн назад`;
		return date.toLocaleDateString('ru-RU');
	}

	async function loadNotebooks() {
		isLoading = true;
		error = null;
		try {
			notebooks = await getNotebooks();
		} catch (err: any) {
			error = err.response?.data?.detail || err.message || 'Ошибка загрузки блокнотов';
			console.error('Load notebooks error:', err);
		} finally {
			isLoading = false;
		}
	}

	function handleEditClick(notebook: NotebookListResponse, event: Event) {
		event.stopPropagation();
		selectedNotebook = notebook;
		editName = notebook.name;
		editDescription = notebook.description || '';
		isEditModalOpen = true;
	}

	function handleDeleteClick(notebook: NotebookListResponse, event: Event) {
		event.stopPropagation();
		selectedNotebook = notebook;
		isDeleteModalOpen = true;
	}

	async function handleUpdateNotebook() {
		if (!selectedNotebook || !editName.trim()) return;

		isSubmitting = true;
		try {
			const { updateNotebook } = await import('$lib/shared/lib/api/notebooks');
			await updateNotebook(selectedNotebook.id, {
				name: editName.trim(),
				description: editDescription.trim() || undefined,
			});
			isEditModalOpen = false;
			selectedNotebook = null;
			await loadNotebooks();
		} catch (err: any) {
			error = err.response?.data?.detail || err.message || 'Ошибка обновления блокнота';
			console.error('Update notebook error:', err);
		} finally {
			isSubmitting = false;
		}
	}

	async function handleConfirmDelete() {
		if (!selectedNotebook) return;

		isSubmitting = true;
		try {
			await deleteNotebook(selectedNotebook.id);
			isDeleteModalOpen = false;
			selectedNotebook = null;
			await loadNotebooks();
		} catch (err: any) {
			error = err.response?.data?.detail || err.message || 'Ошибка удаления блокнота';
			console.error('Delete notebook error:', err);
		} finally {
			isSubmitting = false;
		}
	}

	// Загружаем ноутбуки при монтировании
	$effect(() => {
		loadNotebooks();
	});
</script>

<main class="container mx-auto px-6 py-8">
	<div class="mb-8 pl-2">
		<h1 class="text-3xl font-medium text-base-content">Добро пожаловать</h1>
		<p class="text-base-content/60">Ваши интеллектуальные пространства</p>
	</div>

	{#if error}
		<div class="alert alert-error mb-6">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{error}</span>
		</div>
	{/if}

	<!--
      GRID CONFIGURATION
      auto-rows-fr: заставляет все ячейки грида быть одной высоты (по самой высокой, или по h-full вложенного)
    -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
		<CreateNotebook />

		{#if isLoading}
			{#each Array(4) as _, i}
				<div class="h-80 rounded-[2rem] bg-base-200/50 animate-pulse"></div>
			{/each}
		{:else}
			{#each notebooks as notebook, i (notebook.id)}
				{@const project = getNotebookData(notebook, i)}
				<ProjectCard
					project={project}
					index={i}
					onClick={() => goto(`/app/notebook/${notebook.id}`)}
					onEdit={(e: Event) => handleEditClick(notebook, e)}
					onDelete={(e: Event) => handleDeleteClick(notebook, e)}
				/>
			{/each}
		{/if}
	</div>

	{#if !isLoading && notebooks.length === 0}
		<div class="flex flex-col items-center justify-center py-20 opacity-50">
			<svg
				class="w-16 h-16 mb-4 text-base-content/30"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<p class="text-lg">У вас пока нет блокнотов</p>
			<p class="text-sm mt-2">Создайте первый блокнот, нажав на кнопку выше</p>
		</div>
	{/if}
</main>

<!-- Edit Modal -->
{#if isEditModalOpen && selectedNotebook}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div
			role="dialog"
			aria-modal="true"
			class="bg-base-100 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-base-300"
		>
			<h2 class="text-2xl font-medium text-base-content mb-6">Редактировать блокнот</h2>

			<form
				on:submit={(e) => {
					e.preventDefault();
					handleUpdateNotebook();
				}}
			>
				<div class="form-control w-full mb-4">
					<label class="label">
						<span class="label-text text-base-content">Название *</span>
					</label>
					<input
						type="text"
						placeholder="Введите название блокнота"
						bind:value={editName}
						class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
						required
					/>
				</div>

				<div class="form-control w-full mb-6">
					<label class="label">
						<span class="label-text text-base-content">Описание</span>
					</label>
					<textarea
						placeholder="Введите описание (опционально)"
						bind:value={editDescription}
						class="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
					></textarea>
				</div>

				<div class="flex gap-3 justify-end">
					<button
						type="button"
						class="btn btn-ghost"
						on:click={() => {
							isEditModalOpen = false;
							selectedNotebook = null;
						}}
						disabled={isSubmitting}
					>
						Отмена
					</button>
					<button
						type="submit"
						class="btn btn-primary"
						disabled={!editName.trim() || isSubmitting}
					>
						{#if isSubmitting}
							<span class="loading loading-spinner loading-sm"></span>
							Сохранение...
						{:else}
							Сохранить
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Delete Confirmation Modal -->
{#if isDeleteModalOpen && selectedNotebook}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div
			role="dialog"
			aria-modal="true"
			class="bg-base-100 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-base-300"
		>
			<h2 class="text-2xl font-medium text-base-content mb-4">Удалить блокнот?</h2>
			<p class="text-base-content/70 mb-6">
				Вы уверены, что хотите удалить блокнот <strong class="text-base-content">{selectedNotebook.name}</strong>? Это действие
				нельзя отменить.
			</p>

			<div class="flex gap-3 justify-end">
				<button
					type="button"
					class="btn btn-ghost"
					on:click={() => {
						isDeleteModalOpen = false;
						selectedNotebook = null;
					}}
					disabled={isSubmitting}
				>
					Отмена
				</button>
				<button
					type="button"
					class="btn btn-error"
					on:click={handleConfirmDelete}
					disabled={isSubmitting}
				>
					{#if isSubmitting}
						<span class="loading loading-spinner loading-sm"></span>
						Удаление...
					{:else}
						Удалить
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
