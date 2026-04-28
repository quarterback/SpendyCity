import { FUNDS } from '$lib/data/funds';
import { SITE_URL } from '$lib/config';

export interface ChartMeta {
  id: string;
  title: string;
  sub: string;
  source: string;
  sourcePage: string;
  chartType: 'hero' | 'dashboard' | 'cash' | 'promise' | 'reserve' | 'drift';
  fundSlug?: string;
  defaultWidth: number;
  defaultHeight: number;
}

function buildRegistry(): Map<string, ChartMeta> {
  const reg = new Map<string, ChartMeta>();

  reg.set('pdxspend-hero', {
    id: 'pdxspend-hero',
    title: 'Year-end carry across the seven funds',
    sub: 'Year-end balance by fund, split between original-intent and reclassified dollars.',
    source: 'PDX Spend — Modeled reconstruction',
    sourcePage: '/',
    chartType: 'hero',
    defaultWidth: 900,
    defaultHeight: 500
  });

  reg.set('dashboard', {
    id: 'dashboard',
    title: 'Cross-fund dashboard — carry, movable share, and drift',
    sub: 'All seven voter-restricted funds in one frame. Dollars view.',
    source: 'PDX Spend — Modeled reconstruction',
    sourcePage: '/dashboard/',
    chartType: 'dashboard',
    defaultWidth: 900,
    defaultHeight: 520
  });

  for (const fund of FUNDS) {
    reg.set(`${fund.slug}-cash`, {
      id: `${fund.slug}-cash`,
      title: `${fund.name} — cash position with audit annotations`,
      sub: 'Year-end balance, with auditor findings and council actions marked.',
      source: `PDX Spend — Modeled reconstruction · ${fund.enablingCode}`,
      sourcePage: `/funds/${fund.slug}/`,
      chartType: 'cash',
      fundSlug: fund.slug,
      defaultWidth: 900,
      defaultHeight: 460
    });

    reg.set(`${fund.slug}-promise`, {
      id: `${fund.slug}-promise`,
      title: `${fund.name} — promised vs. delivered`,
      sub: 'Committed plan dollars against actual disbursements, by cycle.',
      source: `PDX Spend — Modeled reconstruction · ${fund.enablingCode}`,
      sourcePage: `/funds/${fund.slug}/`,
      chartType: 'promise',
      fundSlug: fund.slug,
      defaultWidth: 900,
      defaultHeight: 400
    });

    reg.set(`${fund.slug}-reserve`, {
      id: `${fund.slug}-reserve`,
      title: `${fund.name} — unobligated reserve over time`,
      sub: 'Reserve not yet spent or formally committed — available headroom.',
      source: `PDX Spend — Modeled reconstruction · ${fund.enablingCode}`,
      sourcePage: `/funds/${fund.slug}/`,
      chartType: 'reserve',
      fundSlug: fund.slug,
      defaultWidth: 900,
      defaultHeight: 300
    });

    reg.set(`${fund.slug}-drift`, {
      id: `${fund.slug}-drift`,
      title: `${fund.name} — drift index vs. voter intent`,
      sub: '100% means every dollar maps to the original ballot text.',
      source: `PDX Spend — Modeled reconstruction · ${fund.enablingCode}`,
      sourcePage: `/funds/${fund.slug}/`,
      chartType: 'drift',
      fundSlug: fund.slug,
      defaultWidth: 900,
      defaultHeight: 320
    });
  }

  return reg;
}

export const CHART_REGISTRY = buildRegistry();

export function allChartIds(): string[] {
  return Array.from(CHART_REGISTRY.keys());
}

export function chartEmbedUrl(chartId: string): string {
  return `${SITE_URL}/embed/${chartId}`;
}

export function chartOembedUrl(chartId: string): string {
  return `${SITE_URL}/oembed/${chartId}`;
}

export function chartIframeSnippet(chartId: string, meta: ChartMeta): string {
  const src = chartEmbedUrl(chartId);
  return `<iframe src="${src}" loading="lazy" title="${meta.title}" width="100%" height="${meta.defaultHeight}" style="border:0;max-width:100%" allowfullscreen></iframe>`;
}
