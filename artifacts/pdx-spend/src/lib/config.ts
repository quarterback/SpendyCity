const FALLBACK_SITE_URL = 'https://pdx-spend.example';
const raw = (import.meta.env.VITE_SITE_URL ?? FALLBACK_SITE_URL).trim();

if (!/^https?:\/\/[^\s]+$/i.test(raw)) {
  throw new Error(
    `[pdx-spend] VITE_SITE_URL must be an absolute http(s) URL, got: ${JSON.stringify(raw)}`
  );
}

export const SITE_URL = raw.replace(/\/$/, '');

export function siteUrl(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
