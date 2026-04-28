export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://pdx-spend.example'
).replace(/\/$/, '');

export function siteUrl(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
