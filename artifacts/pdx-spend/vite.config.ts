import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 5173;
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

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
