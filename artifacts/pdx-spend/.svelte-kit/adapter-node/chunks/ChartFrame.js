import { e as escape_html } from "./root.js";
function formatUSD(n, opts = {}) {
  const sign = opts.sign && n > 0 ? "+" : "";
  if (opts.compact !== false) {
    if (Math.abs(n) >= 1e9) return `${sign}$${(n / 1e9).toFixed(2)}B`;
    if (Math.abs(n) >= 1e6) return `${sign}$${(n / 1e6).toFixed(1)}M`;
    if (Math.abs(n) >= 1e3) return `${sign}$${(n / 1e3).toFixed(0)}K`;
  }
  return `${sign}$${Math.round(n).toLocaleString()}`;
}
function formatPct(n, digits = 0) {
  return `${(n * 100).toFixed(digits)}%`;
}
function ChartFrame($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      sub,
      source,
      csvName,
      csvHeaders,
      csvRows,
      pngName,
      children
    } = $$props;
    let svgEl = void 0;
    function register(s) {
      svgEl = s;
    }
    $$renderer2.push(`<figure class="chart-frame"><p class="chart-title">${escape_html(title)}</p> `);
    if (sub) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="chart-sub">${escape_html(sub)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    children($$renderer2, { register });
    $$renderer2.push(`<!----> `);
    if (source) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="chart-source">Source · ${escape_html(source)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (csvHeaders && csvRows || svgEl) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="chart-tools">`);
      if (svgEl) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button>Download PNG</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (csvHeaders && csvRows) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button>Download CSV</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></figure>`);
  });
}
export {
  ChartFrame as C,
  formatPct as a,
  formatUSD as f
};
