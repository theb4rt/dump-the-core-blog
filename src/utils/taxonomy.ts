import type { CollectionEntry } from 'astro:content';

export function getTagCounts(posts: CollectionEntry<'blog'>[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

export function getCategoryCounts(posts: CollectionEntry<'blog'>[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (post.data.category) {
      counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
    }
  }
  return counts;
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}

export function getUniqueTags(posts: CollectionEntry<'blog'>[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort();
}

export function getUniqueCategories(posts: CollectionEntry<'blog'>[]): string[] {
  return [...new Set(posts.map((p) => p.data.category).filter(Boolean) as string[])].sort();
}
