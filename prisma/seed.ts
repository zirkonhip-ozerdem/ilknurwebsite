import { config } from "dotenv";
import { PrismaClient, PageStatus, Prisma } from "@prisma/client";
import { hashPassword } from "../lib/password";
import { defaultBlogPosts } from "../lib/blog";
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
    const existingPage = await prisma.page.findUnique({ where: { slug: defaultPage.slug } });

    if (existingPage) {
      continue;
    }

    const page = await prisma.page.create({
      data: {
        slug: defaultPage.slug,
        title: defaultPage.title,
        description: defaultPage.description,
        seoTitle: defaultPage.seoTitle,
        seoDescription: defaultPage.seoDescription,
        status: defaultPage.status as PageStatus,
        sortOrder: defaultPage.sortOrder
      }
    });

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

  for (const post of defaultBlogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.image,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        status: post.status as PageStatus,
        publishedAt: post.publishedAt
      }
    });
  }

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
