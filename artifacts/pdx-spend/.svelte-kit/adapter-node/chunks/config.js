const SITE_URL = "https://pdx-spend.example".replace(/\/$/, "");
function siteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
export {
  SITE_URL as S,
  siteUrl as s
};
