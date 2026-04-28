import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const basePath = process.env.BASE_PATH ?? '/';
const normalizedBase = basePath === '/' ? '' : basePath.replace(/\/$/, '');

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'dist/public',
      assets: 'dist/public',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: normalizedBase
    },
    prerender: {
      handleHttpError: 'warn',
      entries: [
        '*'
      ]
    },
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;
