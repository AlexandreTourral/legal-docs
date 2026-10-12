import { getCollection, type CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;
export type Project = CollectionEntry<'projects'>;

export const projectSlug = (doc: Doc) => doc.id.split('/')[0];
export const docSlug = (doc: Doc) => doc.id.split('/')[1];

/** Préfixe un chemin avec le `base` configuré (ex. /legals-doc). */
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.name.localeCompare(b.data.name, 'fr'));
}

export async function getDocs(project?: string): Promise<Doc[]> {
  const docs = await getCollection('docs', (d) => !project || projectSlug(d) === project);
  return docs.sort(
    (a, b) =>
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      a.data.title.localeCompare(b.data.title, 'fr'),
  );
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
