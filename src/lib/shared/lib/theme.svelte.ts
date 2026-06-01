import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'system';
type Resolved = 'light' | 'dark';

const STORAGE_KEY = 'margin.theme';

function systemDark(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function loadMode(): ThemeMode {
	if (!browser) return 'light';
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === 'light' || v === 'dark' || v === 'system') return v;
	} catch {
		/* ignore */
	}
	return 'system';
}

function apply(resolved: Resolved) {
	if (!browser) return;
	document.documentElement.setAttribute('data-theme', resolved);
}

class Theme {
	mode: ThemeMode = $state(loadMode());
	systemPrefersDark: boolean = $state(systemDark());

	get resolved(): Resolved {
		if (this.mode === 'system') return this.systemPrefersDark ? 'dark' : 'light';
		return this.mode;
	}

	get isDark(): boolean {
		return this.resolved === 'dark';
	}

	set(mode: ThemeMode) {
		this.mode = mode;
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, mode);
			} catch {
				/* ignore */
			}
			apply(this.resolved);
		}
	}

	toggle() {
		this.set(this.isDark ? 'light' : 'dark');
	}

	/** Wire prefers-color-scheme change listener. Call once on root layout mount. */
	listen(): () => void {
		if (!browser) return () => {};
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			this.systemPrefersDark = e.matches;
			if (this.mode === 'system') apply(this.resolved);
		};
		mq.addEventListener('change', onChange);
		apply(this.resolved);
		return () => mq.removeEventListener('change', onChange);
	}
}

export const theme = new Theme();
