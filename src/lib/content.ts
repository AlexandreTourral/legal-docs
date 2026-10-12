import { getCollection, type CollectionEntry } from 'astro:content';
import { DATE_LINE } from '../../plugins/remark-legal-docs.mjs';

export type Doc = CollectionEntry<'docs'>;

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export const projectSlug = (doc: Doc) => doc.id.split('/')[0];
export const docSlug = (doc: Doc) => doc.id.split('/')[1];

/** Préfixe un chemin avec le `base` configuré (ex. /legal-docs). */
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

// Ordre d'affichage par défaut, selon le slug du document (surchargé par `order` du frontmatter).
const DEFAULT_ORDER: Record<string, number> = { ml: 1, cgu: 2, cgv: 3, pu: 4, pc: 5, cookies: 6 };

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function parseFrenchDate(value: string): Date | undefined {
  const m = value.trim().toLowerCase().match(/^(\d{1,2})(?:er)?\s+(\S+)\s+(\d{4})$/);
  const month = m ? MONTHS.indexOf(m[2]) : -1;
  return m && month >= 0 ? new Date(Date.UTC(+m[3], month, +m[1])) : undefined;
}

/** Titre et date d'un document : frontmatter si présent, sinon déduits du Markdown. */
export function getMeta(doc: Doc): { title: string; updatedAt?: Date } {
  const body = doc.body ?? '';
  const heading = body.match(/^#\s+(.+)$/m)?.[1].trim();
  const dateLine = body.match(/^Dernière mise à jour\s*:.*$/im)?.[0].match(DATE_LINE)?.[1];
  return {
    title: doc.data.title ?? heading ?? docSlug(doc),
    updatedAt: doc.data.updatedAt ?? (dateLine ? parseFrenchDate(dateLine) : undefined),
  };
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

/** Projets = dossiers contenant des documents ; `project.json` est facultatif (nom, description). */
export async function getProjects(): Promise<Project[]> {
  const [docs, configs] = await Promise.all([getCollection('docs'), getCollection('projects')]);
  const slugs = new Set([...docs.map(projectSlug), ...configs.map((c) => c.id)]);
  return [...slugs]
    .map((id) => {
      const config = configs.find((c) => c.id === id)?.data;
      return { id, name: config?.name ?? capitalize(id), description: config?.description };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

export async function getDocs(project?: string): Promise<Doc[]> {
  const docs = await getCollection('docs', (d) => !project || projectSlug(d) === project);
  const order = (d: Doc) => d.data.order ?? DEFAULT_ORDER[docSlug(d)] ?? Infinity;
  return docs.sort(
    (a, b) => order(a) - order(b) || getMeta(a).title.localeCompare(getMeta(b).title, 'fr'),
  );
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
