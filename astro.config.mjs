// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkLegalDocs } from './plugins/remark-legal-docs.mjs';

// Sur GitHub Pages, `base` doit correspondre au nom du repo GitHub.
const base = '/legals-doc';

export default defineConfig({
  base,
  trailingSlash: 'ignore',
  markdown: { processor: unified({ remarkPlugins: [[remarkLegalDocs, { base }]] }) },
});
