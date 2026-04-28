/**
 * Pre-generated agent memos for each fund.
 * Source files live as plain markdown in src/content/funds/<slug>.md so they
 * can be edited by non-engineers and version-controlled cleanly. They render
 * on /agent before the user clicks "regenerate" — and as a fallback when the
 * live endpoint is unavailable.
 *
 * Voice: dry, technical, public-finance-officer. No editorializing.
 */

const memoFiles = import.meta.glob('../../content/funds/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const m = path.match(/\/([^/]+)\.md$/);
  if (!m) throw new Error(`Could not derive slug from ${path}`);
  return m[1];
}

export const PREGENERATED_MEMOS: Record<string, string> = Object.fromEntries(
  Object.entries(memoFiles).map(([path, body]) => [slugFromPath(path), body.trimEnd()])
);
