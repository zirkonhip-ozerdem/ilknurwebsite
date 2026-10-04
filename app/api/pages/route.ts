import { PageStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { pageSchema } from "@/lib/validation";

export async function GET() {
  await requireAdmin();
  return NextResponse.json({ pages: await getAdminPages() });
}

export async function POST(request: Request) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  try {
    const parsed = pageSchema.parse(await request.json());
    const page = await prisma.page.create({
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

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Lütfen sayfa alanlarını kontrol edin." }, { status: 422 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Bu slug başka bir sayfada kullanılıyor." }, { status: 409 });
      }

      if (error.code === "P2021") {
        return NextResponse.json({ message: "Sayfa tabloları bulunamadı. Lütfen Prisma migration çalıştırın." }, { status: 500 });
      }
    }

    console.error("Page create failed", error);
    return NextResponse.json({ message: "Sayfa kaydedilemedi. Veritabanı bağlantısını kontrol edin." }, { status: 500 });
  }
}
