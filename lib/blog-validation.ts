import { z } from "zod";

export const blogPostSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(10),
  category: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED")
});
