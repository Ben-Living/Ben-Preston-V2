import { defineCollection, z } from 'astro:content';

const fieldNotes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    connections: z.array(z.string()).default([]),
  }),
});

export const collections = { 'field-notes': fieldNotes };
