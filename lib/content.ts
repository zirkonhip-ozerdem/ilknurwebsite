import { PageStatus } from "@prisma/client";
import { defaultPages, findDefaultPage } from "@/lib/default-content";
import { prisma } from "@/lib/prisma";
import type { SitePage, SiteSection } from "@/lib/types";

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function normalizeSection(section: {
  id?: string;
  type: string;
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  mediaUrl?: string | null;
  settings?: unknown;
  items?: unknown;
  sortOrder: number;
}): SiteSection {
  return {
    ...section,
    settings: (section.settings as Record<string, unknown> | null) ?? null,
    items: (section.items as SiteSection["items"]) ?? null
  };
}

export async function getPublishedPages() {
  if (!hasDatabase()) {
    return defaultPages.filter((page) => page.status === "PUBLISHED");
  }

  try {
    const pages = await prisma.page.findMany({
      where: { status: PageStatus.PUBLISHED },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      include: { sections: { orderBy: { sortOrder: "asc" } } }
    });

    return pages.map((page) => ({
      ...page,
      sections: page.sections.map(normalizeSection)
    }));
  } catch {
    return defaultPages.filter((page) => page.status === "PUBLISHED");
  }
}

export async function getPageBySlug(slug: string) {
  const normalizedSlug = slug === "" ? "anasayfa" : slug;

  if (!hasDatabase()) {
    return findDefaultPage(normalizedSlug) ?? null;
  }

  try {
    const page = await prisma.page.findUnique({
      where: { slug: normalizedSlug },
      include: { sections: { orderBy: { sortOrder: "asc" } } }
    });

    if (!page || page.status !== PageStatus.PUBLISHED) {
      return null;
    }

    return {
      ...page,
      sections: page.sections.map(normalizeSection)
    };
  } catch {
    return findDefaultPage(normalizedSlug) ?? null;
  }
}

export async function getAdminPages(): Promise<SitePage[]> {
  if (!hasDatabase()) {
    return defaultPages;
  }

  const pages = await prisma.page.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    include: { sections: { orderBy: { sortOrder: "asc" } } }
  });

  return pages.map((page) => ({
    ...page,
    sections: page.sections.map(normalizeSection)
  }));
}
