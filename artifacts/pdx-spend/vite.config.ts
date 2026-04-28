import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 5173;
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Resolve the canonical site origin used in Open Graph / Twitter card
// meta tags and <link rel=canonical>. Precedence:
//   1. VITE_SITE_URL (explicit override; what we want in production)
//   2. https://<REPLIT_DEV_DOMAIN> (so the live preview links resolve
//      when shared on Bluesky / Twitter / etc. before custom domain is
//      configured)
//   3. The placeholder example URL — only used if no env signal at all,
//      and accompanied by a build-time warning so it never silently
//      ships to production.
const explicit = process.env.VITE_SITE_URL?.trim();
const replitDomain = process.env.REPLIT_DEV_DOMAIN?.trim();
let resolvedSiteUrl = 'https://pdx-spend.example';
if (explicit) {
  resolvedSiteUrl = explicit;
} else if (replitDomain) {
  resolvedSiteUrl = `https://${replitDomain}`;
} else {
  console.warn(
    '[pdx-spend] No VITE_SITE_URL or REPLIT_DEV_DOMAIN; OG/canonical URLs will use the placeholder origin.'
  );
}
process.env.VITE_SITE_URL = resolvedSiteUrl;

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true
  }
});
