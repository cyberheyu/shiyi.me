import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; 

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    isDraft: z.boolean(), 
    isFeatured: z.boolean(), 
    title: z.string(), 
    abstract: z.string(), 
    date: z.string().transform((str) => new Date(str)),
    author: z.string().default('Anonymous'), 
    tags: z.array(z.string()), 
    coverImage: z.string(),
  })
});

export const collections = { blog };