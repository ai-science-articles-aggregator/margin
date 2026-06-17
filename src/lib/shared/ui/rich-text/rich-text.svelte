<script lang="ts">
	import 'katex/dist/katex.min.css';
	import { renderRichText } from '$lib/shared/lib/markdown';

	let { text = '' }: { text?: string } = $props();

	const html = $derived(renderRichText(text));
</script>

<div class="rich">{@html html}</div>

<style>
	.rich {
		/* Reset block margins; spacing is controlled per element below. */
		overflow-wrap: anywhere;
	}

	/* First/last child shouldn't add outer gap — caller owns padding. */
	.rich :global(> :first-child) {
		margin-top: 0;
	}
	.rich :global(> :last-child) {
		margin-bottom: 0;
	}

	.rich :global(p) {
		margin: 0 0 0.75em;
	}

	.rich :global(ul),
	.rich :global(ol) {
		margin: 0 0 0.75em;
		padding-left: 1.4em;
	}
	.rich :global(li) {
		margin: 0.2em 0;
	}
	.rich :global(li::marker) {
		color: var(--color-dim);
	}

	.rich :global(h1),
	.rich :global(h2),
	.rich :global(h3),
	.rich :global(h4) {
		font-family: var(--font-serif);
		font-weight: 500;
		line-height: 1.3;
		letter-spacing: -0.01em;
		margin: 1.1em 0 0.5em;
	}
	.rich :global(h1) {
		font-size: 1.5em;
	}
	.rich :global(h2) {
		font-size: 1.3em;
	}
	.rich :global(h3) {
		font-size: 1.12em;
	}
	.rich :global(h4) {
		font-size: 1em;
	}

	.rich :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.rich :global(strong) {
		font-weight: 600;
	}
	.rich :global(em) {
		font-style: italic;
	}

	.rich :global(blockquote) {
		margin: 0 0 0.75em;
		padding-left: 0.9em;
		border-left: 2px solid var(--color-line);
		color: var(--color-muted);
	}

	.rich :global(code) {
		font-family: var(--font-mono);
		font-size: 0.88em;
		background: var(--color-surface-2);
		padding: 0.1em 0.34em;
		border-radius: 3px;
	}
	.rich :global(pre) {
		font-family: var(--font-mono);
		background: var(--color-surface-2);
		border: 1px solid var(--color-line);
		border-radius: 6px;
		padding: 0.85em 1em;
		overflow-x: auto;
		margin: 0 0 0.75em;
		line-height: 1.5;
	}
	.rich :global(pre code) {
		background: none;
		padding: 0;
		font-size: 0.85em;
	}

	.rich :global(hr) {
		border: 0;
		border-top: 1px solid var(--color-line);
		margin: 1.2em 0;
	}

	.rich :global(table) {
		border-collapse: collapse;
		margin: 0 0 0.75em;
		font-size: 0.95em;
	}
	.rich :global(th),
	.rich :global(td) {
		border: 1px solid var(--color-line);
		padding: 0.4em 0.7em;
		text-align: left;
	}
	.rich :global(th) {
		background: var(--color-surface-2);
		font-weight: 600;
	}

	/* KaTeX display blocks: give breathing room, allow horizontal scroll for
	   wide formulas instead of overflowing the column. */
	.rich :global(.katex-display) {
		margin: 0.6em 0;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 0.2em 0;
	}
</style>
