import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  const path = event.url.pathname;
  const isChartEmbed = /\/embed\/.+/.test(path) && !path.endsWith('/embed/');

  if (isChartEmbed) {
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Content-Security-Policy',
      [
        "frame-ancestors *",
        "default-src 'self'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "script-src 'self' 'unsafe-inline'"
      ].join('; ')
    );
    response.headers.delete('X-Frame-Options');
  } else if (path.startsWith('/oembed/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=86400');
  }

  return response;
};
