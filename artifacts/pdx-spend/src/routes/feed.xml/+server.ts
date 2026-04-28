import type { RequestHandler } from '@sveltejs/kit';
import { FUNDS } from '$lib/data/funds';
import { SITE_URL } from '$lib/config';

export const prerender = true;

const SITE_TITLE = 'PDX Spend';
const SITE_DESCRIPTION =
  'Seven voter-passed funds in Portland and Multnomah County hold hundreds of millions in carry. This is what that looks like, drawn.';

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async () => {
  const lastBuild = new Date().toUTCString();

  const fundItems = FUNDS.map((f) => {
    const link = `${SITE_URL}/funds/${f.slug}/`;
    return `
    <item>
      <title>${escapeXml(f.name)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(f.scandal)}</description>
      <pubDate>${lastBuild}</pubDate>
    </item>`;
  }).join('');

  const staticItems = [
    {
      title: 'PDX Spend, Issue 01',
      url: `${SITE_URL}/`,
      description:
        'Seven Portland-area voter funds, their balances, and what those balances now do.'
    },
    {
      title: 'Cross-fund dashboard',
      url: `${SITE_URL}/dashboard/`,
      description: 'All seven funds in one frame: dollars, share restricted, and drift trajectory.'
    },
    {
      title: 'Agent demo',
      url: `${SITE_URL}/agent/`,
      description: 'Pick a fund and a lens. The agent writes a structured financial memo against the fund record.'
    },
    {
      title: 'Methodology',
      url: `${SITE_URL}/methodology/`,
      description: 'How figures are constructed, what modeling choices were made, and how audited numbers will replace them.'
    },
    {
      title: 'Implications',
      url: `${SITE_URL}/implications/`,
      description: 'The pattern across seven Portland-area restricted funds is consistent enough to name.'
    }
  ]
    .map(
      (e) => `
    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${e.url}</link>
      <guid isPermaLink="true">${e.url}</guid>
      <description>${escapeXml(e.description)}</description>
      <pubDate>${lastBuild}</pubDate>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${staticItems}${fundItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
};
