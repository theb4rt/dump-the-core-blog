import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getPostSlug } from '../utils/slug';

export async function GET(context: APIContext) {
  const posts = await getCollection('blogEn', (p) => !p.data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'dumpthecore',
    description: 'A developer blog about Linux, systems programming, debugging, and the things that break at 3am.',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${getPostSlug(post)}`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: false,
  });
}
