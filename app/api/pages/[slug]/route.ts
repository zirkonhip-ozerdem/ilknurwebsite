import { PageStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pageSchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  const { slug } = await context.params;
  const parsed = pageSchema.parse(await request.json());
  const existing = await prisma.page.findUnique({ where: { slug } });

  const page = await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.section.deleteMany({ where: { pageId: existing.id } });

      return tx.page.update({
        where: { id: existing.id },
        data: {
          slug: parsed.slug,
          title: parsed.title,
          description: parsed.description,
          seoTitle: parsed.seoTitle,
          seoDescription: parsed.seoDescription,
          status: parsed.status as PageStatus,
          sortOrder: parsed.sortOrder,
          sections: {
            create: parsed.sections.map((section, index) => ({
              type: section.type,
              eyebrow: section.eyebrow,
              title: section.title,
              subtitle: section.subtitle,
              body: section.body,
              ctaLabel: section.ctaLabel,
              ctaHref: section.ctaHref,
              mediaUrl: section.mediaUrl,
              settings: (section.settings ?? Prisma.JsonNull) as Prisma.InputJsonValue,
              items: (section.items ?? Prisma.JsonNull) as Prisma.InputJsonValue,
              sortOrder: section.sortOrder ?? index
            }))
          }
        },
        include: { sections: { orderBy: { sortOrder: "asc" } } }
      });
    }

    return tx.page.create({
      data: {
        slug: parsed.slug,
        title: parsed.title,
        description: parsed.description,
        seoTitle: parsed.seoTitle,
        seoDescription: parsed.seoDescription,
        status: parsed.status as PageStatus,
        sortOrder: parsed.sortOrder,
        sections: {
          create: parsed.sections.map((section, index) => ({
            type: section.type,
            eyebrow: section.eyebrow,
            title: section.title,
            subtitle: section.subtitle,
            body: section.body,
            ctaLabel: section.ctaLabel,
            ctaHref: section.ctaHref,
            mediaUrl: section.mediaUrl,
            settings: (section.settings ?? Prisma.JsonNull) as Prisma.InputJsonValue,
            items: (section.items ?? Prisma.JsonNull) as Prisma.InputJsonValue,
            sortOrder: section.sortOrder ?? index
          }))
        }
      },
      include: { sections: { orderBy: { sortOrder: "asc" } } }
    });
  });

  return NextResponse.json({ page });
}
