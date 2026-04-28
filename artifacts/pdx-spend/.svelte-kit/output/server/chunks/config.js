const raw = "https://3774176a-206f-4cee-888e-8688c6144ca0-00-43dsz18dma51.picard.replit.dev".trim();
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
