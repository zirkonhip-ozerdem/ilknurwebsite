import "dotenv/config";
import { PrismaClient, PageStatus, Prisma } from "@prisma/client";
import { defaultPages } from "../lib/default-content";

const prisma = new PrismaClient();

async function main() {
  for (const defaultPage of defaultPages) {
    const page = await prisma.page.upsert({
      where: { slug: defaultPage.slug },
      update: {
        title: defaultPage.title,
        description: defaultPage.description,
        seoTitle: defaultPage.seoTitle,
        seoDescription: defaultPage.seoDescription,
        status: defaultPage.status as PageStatus,
        sortOrder: defaultPage.sortOrder
      },
      create: {
        slug: defaultPage.slug,
        title: defaultPage.title,
        description: defaultPage.description,
        seoTitle: defaultPage.seoTitle,
        seoDescription: defaultPage.seoDescription,
        status: defaultPage.status as PageStatus,
        sortOrder: defaultPage.sortOrder
      }
    });

    await prisma.section.deleteMany({ where: { pageId: page.id } });

    await prisma.section.createMany({
      data: defaultPage.sections.map((section, index) => ({
        pageId: page.id,
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
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
