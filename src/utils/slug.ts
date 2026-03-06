import type { CollectionEntry } from 'astro:content';

export function getPostSlug(post: CollectionEntry<'blog'>): string {
  return post.data.slug ?? post.id;
}
