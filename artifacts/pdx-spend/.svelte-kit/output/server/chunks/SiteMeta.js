import { h as head, e as escape_html, a as attr } from "./root.js";
import { b as base } from "./server.js";
import "./url.js";
import "@sveltejs/kit/internal/server";
function SiteMeta($$renderer, $$props) {
  const {
    title,
    description,
    path = "/",
    image = `${base}/og-default.svg`,
    type = "article"
  } = $$props;
  const SITE_URL = "https://pdx-spend.example";
  const fullUrl = `${SITE_URL}${path}`;
  head("73ena", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(title)}</title>`);
    });
    $$renderer2.push(`<meta name="description"${attr("content", description)}/> <link rel="canonical"${attr("href", fullUrl)}/> <meta property="og:site_name" content="PDX Spend"/> <meta property="og:type"${attr("content", type)}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:url"${attr("content", fullUrl)}/> <meta property="og:image"${attr("content", `${SITE_URL}${image}`)}/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", title)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", `${SITE_URL}${image}`)}/>`);
  });
}
export {
  SiteMeta as S
};
