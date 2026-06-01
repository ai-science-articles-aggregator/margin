export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
	id: number;
	type: ToastType;
	message: string;
}

let nextId = 0;
const toasts = $state<ToastItem[]>([]);

function push(type: ToastType, message: string, ttl = 4000) {
	const id = ++nextId;
	toasts.push({ id, type, message });
	setTimeout(() => {
		const idx = toasts.findIndex((t) => t.id === id);
		if (idx !== -1) toasts.splice(idx, 1);
	}, ttl);
}

export const toast = {
	get items() {
		return toasts;
	},
	success: (msg: string) => push('success', msg),
	error: (msg: string) => push('error', msg),
	info: (msg: string) => push('info', msg),
	warning: (msg: string) => push('warning', msg),
	dismiss: (id: number) => {
		const idx = toasts.findIndex((t) => t.id === id);
		if (idx !== -1) toasts.splice(idx, 1);
	}
};
