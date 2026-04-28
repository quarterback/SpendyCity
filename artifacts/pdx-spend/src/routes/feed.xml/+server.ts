import type { RequestHandler } from '@sveltejs/kit';
import { FUNDS } from '$lib/data/funds';
import { SITE_URL } from '$lib/config';

export const prerender = true;

const SITE_TITLE = 'PDX Spend';
const SITE_DESCRIPTION =
  'Seven Portland-area voter funds. What each one could pay for, and the named rule blocking it.';

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
      <description>${escapeXml(f.oneLineStatus)}</description>
      <pubDate>${lastBuild}</pubDate>
    </item>`;
  }).join('');

  const staticItems = [
    {
      title: 'PDX Spend — Seven Portland-area voter funds, in plain view',
      url: `${SITE_URL}/`,
      description:
        'What each of the seven funds could pay for, and the named rule that purports to stop it.'
    },
    {
      title: 'All seven funds, side by side',
      url: `${SITE_URL}/dashboard/`,
      description:
        'Three angles on the same dollars: balance, share re-aimed, share still on-mission.'
    },
    {
      title: 'Write a memo for any fund',
      url: `${SITE_URL}/agent/`,
      description: 'Pick a fund, pick a lens, get a one-page memo.'
    },
    {
      title: 'Methodology and glossary',
      url: `${SITE_URL}/methodology/`,
      description: 'What the figures mean, where they come from, and a glossary of every term.'
    },
    {
      title: 'Five levers that would unblock the seven funds',
      url: `${SITE_URL}/implications/`,
      description: 'Mechanical, not rhetorical. Each lever names who controls it.'
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
