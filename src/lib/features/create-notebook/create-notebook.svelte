<script lang="ts">
	import CreateCard from '$lib/widgets/create-card/create-card.svelte';
	import { goto } from '$app/navigation';
	import { createNotebook } from '$lib/shared/lib/api/notebooks';

	let isModalOpen = $state(false);
	let name = $state('');
	let description = $state('');
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	function handleOpenModal() {
		isModalOpen = true;
		name = '';
		description = '';
		error = null;
	}

	function handleCloseModal() {
		isModalOpen = false;
		name = '';
		description = '';
		error = null;
	}

	async function handleCreate() {
		if (!name.trim()) {
			error = 'Название обязательно';
			return;
		}

		isLoading = true;
		error = null;

		try {
			const notebook = await createNotebook({
				name: name.trim(),
				description: description.trim() || undefined,
			});
			handleCloseModal();
			goto(`/app/notebook/${notebook.id}`);
		} catch (err: any) {
			error =
				err.response?.data?.detail ||
				err.response?.data?.message ||
				err.message ||
				'Ошибка при создании блокнота';
			console.error('Create notebook error:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<CreateCard onClick={handleOpenModal} />

{#if isModalOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div
			role="dialog"
			aria-modal="true"
			class="bg-base-100 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-base-300"
		>
			<h2 class="text-2xl font-medium text-base-content mb-6">Новый блокнот</h2>

			<form
				on:submit={(e) => {
					e.preventDefault();
					handleCreate();
				}}
			>
				<div class="form-control w-full mb-4">
					<label class="label">
						<span class="label-text text-base-content">Название *</span>
					</label>
					<input
						type="text"
						placeholder="Введите название блокнота"
						bind:value={name}
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
						bind:value={description}
						class="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
					></textarea>
				</div>

				{#if error}
					<div class="alert alert-error mb-4 py-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current shrink-0 h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span class="text-sm">{error}</span>
					</div>
				{/if}

				<div class="flex gap-3 justify-end">
					<button
						type="button"
						class="btn btn-ghost"
						on:click={handleCloseModal}
						disabled={isLoading}
					>
						Отмена
					</button>
					<button
						type="submit"
						class="btn btn-primary"
						disabled={!name.trim() || isLoading}
					>
						{#if isLoading}
							<span class="loading loading-spinner loading-sm"></span>
							Создание...
						{:else}
							Создать
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}