import { config } from "dotenv";
import { PrismaClient, PageStatus, Prisma } from "@prisma/client";
import { hashPassword } from "../lib/password";
import { defaultPages } from "../lib/default-content";

config({ path: ".env" });
config({ path: ".env.local", override: true });

const prisma = new PrismaClient();
const defaultContactSettings = {
  email: "info@ilknursoydan.com",
  phone: "+90 (___) ___ __ __",
  address: "İstanbul, Türkiye"
};
const defaultGeneralSettings = {
  siteTitle: "İlknur Erdal Soydan",
  siteDescription: "PCC Mentor Coach, ICF Eğitmeni ve Medivisis Coaching School Kurucusu.",
  logoAlt: "Medivisis Coaching School",
  instagram: "",
  linkedin: ""
};

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

  await prisma.siteSetting.upsert({
    where: { key: "contact" },
    update: {},
    create: {
      key: "contact",
      value: defaultContactSettings as Prisma.InputJsonValue
    }
  });

  await prisma.siteSetting.upsert({
    where: { key: "general" },
    update: {},
    create: {
      key: "general",
      value: defaultGeneralSettings as Prisma.InputJsonValue
    }
  });

  const existingAdmin = await prisma.adminCredential.findFirst();

  if (!existingAdmin) {
    await prisma.adminCredential.create({
      data: {
        id: "primary",
        email: process.env.ADMIN_EMAIL ?? "admin@ilknursoydan.com",
        passwordHash: hashPassword(process.env.ADMIN_PASSWORD ?? "admin")
      }
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
