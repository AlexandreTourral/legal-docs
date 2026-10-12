// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkLegalDocs } from './plugins/remark-legal-docs.mjs';

// Sur GitHub Pages, `base` doit correspondre au nom du repo GitHub.
// En CI on le déduit de GITHUB_REPOSITORY (owner/repo), donc renommer le repo suffit.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'legal-docs';
const base = `/${repo}`;

export default defineConfig({
  base,
  trailingSlash: 'ignore',
  markdown: { processor: unified({ remarkPlugins: [[remarkLegalDocs, { base }]] }) },
});
