// @ts-check
import { defineConfig } from 'astro/config';

// Sur GitHub Pages, `base` doit correspondre au nom du repo GitHub.
export default defineConfig({
  base: '/legals-doc',
  trailingSlash: 'ignore',
});
