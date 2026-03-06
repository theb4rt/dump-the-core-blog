import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = () =>
  z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    author: z.string().default('b4rt'),
    lang: z.enum(['en', 'es']).default('en'),
    translationKey: z.string().optional(),
  });

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/en' }),
  schema: postSchema(),
});

const blogEs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/es' }),
  schema: postSchema(),
});

export const collections = { blogEn, blogEs };
