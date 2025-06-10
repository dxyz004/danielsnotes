import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    featured: z.boolean().optional(),
    coverImage: z.string().optional()
  })
});

export const collections = {
  'blog': blogCollection,
};
