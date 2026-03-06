export type Lang = 'en' | 'es';

const en = {
  nav: {
    blog: 'Blog',
    categories: 'Categories',
    tags: 'Tags',
    about: 'About',
    search: 'Search',
  },
  footer: {
    navigate: 'Navigate',
    topics: 'Topics',
    tagline: 'A developer blog about systems, software,\nand the things that break at 3am.',
  },
  home: {
    siteDescription: 'A developer blog about Linux, systems programming, debugging, and the things that break at 3am.',
    latestPosts: 'Latest posts',
    viewAll: 'View all posts',
    readArticle: 'Read article',
  },
  blog: {
    title: 'Blog',
    description: 'All posts about Linux, systems programming, debugging, and software engineering.',
    countSuffix: 'and counting.',
  },
  categories: {
    title: 'Categories',
    back: 'All categories',
    pageTitle: (cat: string) => `${cat} — dumpthecore`,
    pageDescription: (cat: string) => `Posts in the ${cat} category on dumpthecore.`,
  },
  tags: {
    title: 'Tags',
    back: 'All tags',
    description: 'Browse all tags used on dumpthecore.',
    pageTitle: (tag: string) => `#${tag} — dumpthecore`,
    pageDescription: (tag: string) => `Posts tagged "${tag}" on dumpthecore.`,
  },
  about: {
    title: 'About',
  },
  post: {
    back: 'All posts',
    read: 'Read',
    updatedOn: 'Updated',
    by: 'by',
    tags: 'Tags:',
    series: 'Series',
    part: 'Part',
    likes: 'Likes',
    views: 'Views',
    comments: 'Comments',
  },
  common: {
    posts: (n: number) => `${n} post${n !== 1 ? 's' : ''}`,
    postsAndCounting: (n: number) => `${n} post${n !== 1 ? 's' : ''} and counting.`,
  },
};

const es: typeof en = {
  nav: {
    blog: 'Blog',
    categories: 'Categorías',
    tags: 'Etiquetas',
    about: 'Sobre mí',
    search: 'Buscar',
  },
  footer: {
    navigate: 'Navegar',
    topics: 'Temas',
    tagline: 'Un blog de desarrollador sobre sistemas, software\ny las cosas que se rompen a las 3am.',
  },
  home: {
    siteDescription: 'Un blog de desarrollador sobre Linux, programación de sistemas, debugging y las cosas que se rompen a las 3am.',
    latestPosts: 'Últimos posts',
    viewAll: 'Ver todos los posts',
    readArticle: 'Leer artículo',
  },
  blog: {
    title: 'Blog',
    description: 'Todos los posts sobre Linux, programación de sistemas, debugging e ingeniería de software.',
    countSuffix: 'y contando.',
  },
  categories: {
    title: 'Categorías',
    back: 'Todas las categorías',
    pageTitle: (cat: string) => `${cat} — dumpthecore`,
    pageDescription: (cat: string) => `Posts en la categoría ${cat} en dumpthecore.`,
  },
  tags: {
    title: 'Etiquetas',
    back: 'Todas las etiquetas',
    description: 'Explora todas las etiquetas en dumpthecore.',
    pageTitle: (tag: string) => `#${tag} — dumpthecore`,
    pageDescription: (tag: string) => `Posts etiquetados "${tag}" en dumpthecore.`,
  },
  about: {
    title: 'Sobre mí',
  },
  post: {
    back: 'Todos los posts',
    read: 'Leer',
    updatedOn: 'Actualizado',
    by: 'por',
    tags: 'Etiquetas:',
    series: 'Serie',
    part: 'Parte',
    likes: 'Me gusta',
    views: 'Vistas',
    comments: 'Comentarios',
  },
  common: {
    posts: (n: number) => `${n} post${n !== 1 ? 's' : ''}`,
    postsAndCounting: (n: number) => `${n} post${n !== 1 ? 's' : ''} y contando.`,
  },
};

const translations = { en, es };

export function useTranslations(lang: Lang) {
  return translations[lang];
}

/** Derive base path prefix from lang */
export function basePath(lang: Lang) {
  return lang === 'es' ? '/es' : '';
}
