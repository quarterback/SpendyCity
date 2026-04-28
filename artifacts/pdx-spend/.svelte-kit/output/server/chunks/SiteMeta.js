import { h as head, e as escape_html, a as attr, d as derived } from "./root.js";
import { S as SITE_URL } from "./config.js";
function SiteMeta($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const DEFAULT_OG_IMAGE = "/og-default.png";
    const {
      title,
      description,
      path = "/",
      image = DEFAULT_OG_IMAGE,
      type = "article"
    } = $$props;
    function toAbsoluteUrl(p) {
      if (/^https?:\/\//i.test(p)) return p;
      const s = p.startsWith("/") ? p : `/${p}`;
      return `${SITE_URL}${s}`;
    }
    const fullUrl = derived(() => toAbsoluteUrl(path));
    const fullImage = derived(() => toAbsoluteUrl(image));
    head("73ena", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", description)}/> <link rel="canonical"${attr("href", fullUrl())}/> <meta property="og:site_name" content="PDX Spend"/> <meta property="og:type"${attr("content", type)}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:url"${attr("content", fullUrl())}/> <meta property="og:image"${attr("content", fullImage())}/> <meta property="og:image:type" content="image/png"/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta property="og:image:alt"${attr("content", title)}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", title)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", fullImage())}/> <meta name="twitter:image:alt"${attr("content", title)}/>`);
    });
  });
}
export {
  SiteMeta as S
};
