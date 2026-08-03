import { z } from "zod";

const sectionItemSchema = z.object({
  title: z.string().min(1),
  text: z.string().optional(),
  href: z.string().optional(),
  label: z.string().optional(),
  meta: z.string().optional(),
  image: z.string().optional(),
  icon: z.string().optional()
});

const sectionSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1),
  eyebrow: z.string().nullable().optional(),
  title: z.string().min(1),
  subtitle: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  ctaLabel: z.string().nullable().optional(),
  ctaHref: z.string().nullable().optional(),
  mediaUrl: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  items: z.array(sectionItemSchema).nullable().optional(),
  sortOrder: z.coerce.number().int().default(0)
});

export const pageSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  sortOrder: z.coerce.number().int().default(0),
  sections: z.array(sectionSchema).default([])
});

export const contactSchema = z.object({
  name: z.string().min(2),
  surname: z.string().optional(),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10)
});
