import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Chaque fichier projects/<projet>/<doc>.md → id "<projet>/<doc>"
const docs = defineCollection({
  loader: glob({
    pattern: '*/*.md',
    base: './projects',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    updatedAt: z.coerce.date(),
    order: z.number().optional(),
  }),
});

// Chaque projects/<projet>/project.json → id "<projet>"
const projects = defineCollection({
  loader: glob({
    pattern: '*/project.json',
    base: './projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { docs, projects };
