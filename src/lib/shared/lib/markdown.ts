import { marked } from 'marked';
import katex from 'katex';
import DOMPurify from 'dompurify';

/**
 * Render assistant text (markdown + LaTeX) to safe HTML.
 *
 * Delimiters: `$$…$$` → display block, `$…$` → inline.
 *
 * Pipeline:
 *   1. Protect closed math pairs with private-use sentinels so markdown
 *      can't mangle TeX syntax (underscores, backslashes, asterisks…).
 *   2. Render markdown with `marked`.
 *   3. Sanitize the markdown HTML with DOMPurify (defends against any raw
 *      HTML the model emits — sentinels are plain text and survive intact).
 *   4. Swap sentinels for KaTeX output. KaTeX with `trust: false` produces
 *      XSS-safe HTML, so it's injected after sanitization.
 *
 * Streaming: only *balanced* pairs are rendered. A trailing unclosed `$`/`$$`
 * (mid-stream) stays literal text until its closing delimiter arrives, so a
 * formula pops in whole instead of flickering as half-parsed TeX.
 */

// Private-use codepoints — won't appear in normal text and carry no markdown
// meaning, so they pass through marked/DOMPurify untouched. Built from char
// codes so no invisible bytes live in the source file.
const OPEN = String.fromCharCode(0xe000);
const CLOSE = String.fromCharCode(0xe001);

// Display `$$…$$` is tried first; inline `$…$` second. The inline branch
// guards against currency: opening `$` not preceded by `\`/`$`, not followed
// by whitespace; closing `$` not preceded by whitespace, not followed by a
// digit or `$`; content is single-line. Pure-number content (e.g. `$5$`) is
// rejected in the callback. An unpaired `$` (most currency) never matches.
const MATH_RE =
	/\$\$([\s\S]+?)\$\$|(?<![\\$])\$(?!\s)((?:\\.|[^$\n])+?)(?<![\s\\])\$(?![\d$])/g;
const CURRENCY_RE = /^[\d.,]+$/;
const SENTINEL_RE = new RegExp(`${OPEN}(\\d+)${CLOSE}`, 'g');

marked.setOptions({ gfm: true, breaks: true });

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderMath(tex: string, displayMode: boolean): string {
	try {
		return katex.renderToString(tex, {
			displayMode,
			throwOnError: false,
			trust: false
		});
	} catch {
		// Genuinely unparseable — fall back to the raw source, escaped.
		return escapeHtml(`$$${tex}$$`);
	}
}

export function renderRichText(src: string): string {
	if (!src) return '';

	// Server has no DOM for DOMPurify; chat content is loaded client-side, so
	// just escape on the server and let the browser do the rich render.
	if (typeof window === 'undefined') {
		return escapeHtml(src);
	}

	// 1. Protect closed math pairs.
	const math: { tex: string; display: boolean }[] = [];
	const protectedSrc = src.replace(
		MATH_RE,
		(match, displayTex: string | undefined, inlineTex: string | undefined) => {
			const display = displayTex !== undefined;
			const tex = display ? displayTex : (inlineTex as string);
			// `$5$`-style numeric content is currency, not math — keep it literal.
			if (!display && CURRENCY_RE.test(tex.trim())) return match;
			const idx = math.length;
			math.push({ tex, display });
			return `${OPEN}${idx}${CLOSE}`;
		}
	);

	// 2. Markdown -> 3. Sanitize.
	const rawHtml = marked.parse(protectedSrc) as string;
	const safeHtml = DOMPurify.sanitize(rawHtml, { ADD_ATTR: ['target', 'rel'] });

	// 4. Re-insert rendered math.
	return safeHtml.replace(SENTINEL_RE, (_, i: string) => {
		const m = math[Number(i)];
		return m ? renderMath(m.tex, m.display) : '';
	});
}
