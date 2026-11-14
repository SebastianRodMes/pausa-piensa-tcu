// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pausa-piensa-tcu.vercel.app',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
