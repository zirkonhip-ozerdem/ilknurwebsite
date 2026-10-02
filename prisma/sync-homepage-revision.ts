import { config } from "dotenv";
import { PageStatus, Prisma, PrismaClient } from "@prisma/client";
import { defaultPages } from "../lib/default-content";

config({ path: ".env" });
config({ path: ".env.local", override: true });

const prisma = new PrismaClient();
const targetSlugs = ["anasayfa", "kamplar", "medivisis", "yazilar"];

async function syncPage(slug: string) {
  const defaultPage = defaultPages.find((page) => page.slug === slug);

  if (!defaultPage) {
    throw new Error(`${slug} varsayılan içerikte bulunamadı.`);
  }

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

async function main() {
  for (const slug of targetSlugs) {
    await syncPage(slug);
  }

  await prisma.page.updateMany({
    where: { slug: "calisma-alanlari" },
    data: { status: PageStatus.DRAFT }
  });
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
