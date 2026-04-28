/**
 * Pre-generated memos for each fund.
 * Source files live as plain markdown in src/content/funds/<slug>.md so they
 * can be edited by non-engineers and version-controlled cleanly. They are
 * bundled at build time and rendered into the static fund pages — the site
 * has no live regeneration endpoint.
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
