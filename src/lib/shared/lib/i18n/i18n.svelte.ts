import { browser } from '$app/environment';
import { dict, type Dict, type Lang } from './dict';
export type { Lang } from './dict';

const STORAGE_KEY = 'papyrus.lang';

function detectLang(): Lang {
	if (!browser) return 'en';
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'en' || saved === 'ru') return saved;
		if ((navigator.language || '').toLowerCase().startsWith('ru')) return 'ru';
	} catch {
		/* SSR or storage unavailable */
	}
	return 'en';
}

class I18n {
	lang: Lang = $state(detectLang());

	get t(): Dict {
		return dict[this.lang];
	}

	get other(): Lang {
		return this.lang === 'en' ? 'ru' : 'en';
	}

	set(lang: Lang) {
		this.lang = lang;
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, lang);
				document.documentElement.setAttribute('lang', lang);
			} catch {
				/* ignore */
			}
		}
	}

	toggle() {
		this.set(this.other);
	}
}

export const i18n = new I18n();
