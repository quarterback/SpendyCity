const FALLBACK_SITE_URL = "https://pdx-spend.example";
const raw = FALLBACK_SITE_URL.trim();
if (!/^https?:\/\/[^\s]+$/i.test(raw)) {
  throw new Error(
    `[pdx-spend] VITE_SITE_URL must be an absolute http(s) URL, got: ${JSON.stringify(raw)}`
  );
}
const SITE_URL = raw.replace(/\/$/, "");
function siteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
export {
  SITE_URL as S,
  siteUrl as s
};
