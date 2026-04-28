import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const basePath = process.env.BASE_PATH ?? '/';
const normalizedBase = basePath === '/' ? '' : basePath.replace(/\/$/, '');

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      out: 'dist/server',
      precompress: false
    }),
    paths: {
      base: normalizedBase
    },
    prerender: {
      handleHttpError: 'warn',
      entries: ['*']
    },
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;
