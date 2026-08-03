import type { PageStatus } from "@prisma/client";

export type SectionItem = {
  title: string;
  text?: string;
  href?: string;
  label?: string;
  meta?: string;
  image?: string;
  icon?: string;
};

export type SiteSection = {
  id?: string;
  type: string;
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  mediaUrl?: string | null;
  settings?: Record<string, unknown> | null;
  items?: SectionItem[] | null;
  sortOrder: number;
};

export type SitePage = {
  id?: string;
  slug: string;
  title: string;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: PageStatus | "DRAFT" | "PUBLISHED";
  sortOrder: number;
  sections: SiteSection[];
};
