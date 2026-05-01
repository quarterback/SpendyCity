import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Render markdown to sanitized HTML. Used by both the agent-memo pipeline
 * (untrusted LLM output) and the investigations route (authored markdown
 * stored in the repo). Sanitizing the authored markdown costs nothing
 * and means the consumers can use a single {@html} pattern without
 * having to reason about which source is trusted.
 */
export function renderMarkdown(md: string): string {
  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(md, { async: false }) as string;
  return DOMPurify.sanitize(html);
}
