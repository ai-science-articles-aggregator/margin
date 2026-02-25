import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},

	// Настройки для suppression предупреждений
	onwarn: (warning, handler) => {
		// Игнорировать предупреждения о deprecated событиях
		if (warning.code.includes('event_directive_deprecated')) return;
		// Игнорировать предупреждения о slot
		if (warning.code.includes('slot_element_deprecated')) return;
		// Игнорировать accessibility предупреждения
		if (warning.code.includes('a11y_')) return;
		
		handler(warning);
	}
};

export default config;
