import { error } from '@sveltejs/kit';
import { INVESTIGATIONS, INVESTIGATION_BY_SLUG } from '$lib/data/investigations';
import { renderMarkdown } from '$lib/server/markdown';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return INVESTIGATIONS.map((i) => ({ slug: i.slug }));
};

// Bundle the authored markdown at build time. Same import.meta.glob pattern
// used by the agent-memo loader — the markdown source travels with the
// server bundle so prerender doesn't need to read from disk.
const INVESTIGATION_FILES = import.meta.glob('/src/content/investigations/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export const load: PageServerLoad = async ({ params }) => {
  const investigation = INVESTIGATION_BY_SLUG[params.slug];
  if (!investigation) throw error(404, 'Investigation not found');

  const key = `/src/content/investigations/${params.slug}.md`;
  const markdown = INVESTIGATION_FILES[key];
  if (!markdown) throw error(404, 'Investigation content missing');

  return {
    investigation,
    bodyHtml: renderMarkdown(markdown)
  };
};
