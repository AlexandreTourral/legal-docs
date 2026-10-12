// Permet d'écrire un document en Markdown "brut", sans frontmatter :
//  - retire le titre `# ...` et la ligne « Dernière mise à jour : ... » (la page les affiche déjà) ;
//  - réécrit les liens relatifs `xxx.md` vers l'URL du document correspondant.

export const DATE_LINE = /^Dernière mise à jour\s*:\s*(.+)$/i;

// Noms de fichiers « longs » utilisés dans les liens → slug réel du document.
const ALIASES = {
  'conditions-generales-utilisation': 'cgu',
  'conditions-generales-de-vente': 'cgv',
  'politique-de-confidentialite': 'pc',
  "politique-d-utilisation": 'pu',
  'mentions-legales': 'ml',
};

const text = (node) =>
  node.value ?? (node.children ?? []).map(text).join('');

const walk = (node, fn) => {
  fn(node);
  (node.children ?? []).forEach((child) => walk(child, fn));
};

export function remarkLegalDocs({ base = '' } = {}) {
  return (tree, file) => {
    const first = tree.children[0];
    if (first?.type === 'heading' && first.depth === 1) tree.children.shift();
    const next = tree.children[0];
    if (next?.type === 'paragraph' && DATE_LINE.test(text(next))) tree.children.shift();

    const project = file.path?.split(/[\\/]/).at(-2);
    walk(tree, (node) => {
      if (node.type !== 'link' || /^[a-z][a-z0-9+.-]*:|^[#/]/i.test(node.url)) return;
      const match = node.url.match(/^(?:\.\/)?([^/#?]+)\.md(#.*)?$/);
      if (!match || !project) return;
      const [, name, hash = ''] = match;
      node.url = `${base}/${project}/${ALIASES[name] ?? name}${hash}`;
    });
  };
}
