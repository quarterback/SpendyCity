import { e as escape_html, f as derived } from "./root.js";
function ShareBlock($$renderer, $$props) {
  const { headline, summary, url } = $$props;
  const social = derived(() => `${headline}

${summary}

${url}`);
  $$renderer.push(`<aside class="share"><p class="kicker">SHARE THIS STORY</p> <pre class="share-copy">${escape_html(social())}</pre> <button type="button" class="share-copy-btn">${escape_html("Copy social text")}</button></aside>`);
}
export {
  ShareBlock as S
};
