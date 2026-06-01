import { browser } from '$app/environment';
import { getAreas, createArea, updateArea, deleteArea, type AreaRead, type AreaCreatePayload, type AreaUpdatePayload } from '$lib/shared/lib/api/areas';

class AreasStore {
	items = $state<AreaRead[]>([]);
	loading = $state(false);
	loaded = $state(false);

	async load(force = false): Promise<void> {
		if (!browser) return;
		if (this.loaded && !force) return;
		this.loading = true;
		try {
			this.items = await getAreas();
			this.loaded = true;
		} catch (e) {
			console.warn('[areas] load failed', e);
		} finally {
			this.loading = false;
		}
	}

	async create(payload: AreaCreatePayload): Promise<AreaRead> {
		const area = await createArea(payload);
		this.items = [...this.items, area].sort((a, b) => a.name.localeCompare(b.name));
		return area;
	}

	async update(id: string, payload: AreaUpdatePayload): Promise<AreaRead> {
		const area = await updateArea(id, payload);
		this.items = this.items.map((a) => (a.id === area.id ? area : a));
		return area;
	}

	async remove(id: string): Promise<void> {
		await deleteArea(id);
		this.items = this.items.filter((a) => a.id !== id);
	}

	byId(id: string | null | undefined): AreaRead | undefined {
		if (!id) return undefined;
		return this.items.find((a) => a.id === id);
	}
}

export const areasStore = new AreasStore();
