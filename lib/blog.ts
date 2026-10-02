import { PageStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type BlogPostView = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  category?: string | null;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: PageStatus | "DRAFT" | "PUBLISHED";
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export const defaultBlogPosts: BlogPostView[] = [
  {
    slug: "yeni-nesil-liderlikte-duygusal-ceviklik",
    title: "Yeni Nesil Liderlikte Duygusal Çeviklik",
    excerpt: "Değişen iş dünyasında yöneticilerin en büyük yetkinliği, belirsizliğe karşı gösterebildiği duygusal dayanıklılık ve esnekliktir.",
    content:
      "Liderlik artık yalnızca karar almak, hedef belirlemek ve ekipleri yönetmekten ibaret değil. Yeni nesil liderlik; insanı, duyguyu ve belirsizliği yönetebilme becerisini de içeriyor.\n\nDuygusal çeviklik, liderin kendi iç dünyasını fark ederek değişen koşullar karşısında daha bilinçli yanıtlar verebilmesidir. Bu yaklaşım, ekip içinde güveni artırır ve karar süreçlerini daha sağlıklı hale getirir.\n\nKoçluk bakışıyla çalışan liderler, yalnızca sonuçlara değil, sonuçları doğuran insan deneyimine de alan açar.",
    category: "Liderlik",
    status: PageStatus.PUBLISHED,
    publishedAt: new Date("2026-03-12T09:00:00.000Z")
  },
  {
    slug: "nefes-ve-odaklanma-stratejik-zihin",
    title: "Nefes ve Odaklanma: Stratejik Zihin",
    excerpt: "Karar alma mekanizmalarını optimize etmek için nefes tekniklerinin nörobilimsel etkileri ve günlük liderlik pratiğine katkısı.",
    content:
      "Nefes, zihinsel berraklığın en sade ama en güçlü kapılarından biridir. Düzenli nefes farkındalığı, sinir sistemini düzenleyerek odağı ve karar kalitesini destekler.\n\nStratejik düşünen bir zihin önce sakinleşebilen bir bedene ihtiyaç duyar. Bu nedenle nefes çalışmaları, liderlik ve koçluk pratiklerinde yalnızca rahatlama aracı değil, aynı zamanda performans ve farkındalık alanıdır.\n\nMedivisis yaklaşımında nefes; bilgi, uygulama ve etik eşlik becerileriyle birlikte ele alınır.",
    category: "Nefes",
    status: PageStatus.PUBLISHED,
    publishedAt: new Date("2026-03-05T09:00:00.000Z")
  },
  {
    slug: "koclukta-sessizligin-gucu",
    title: "Koçlukta Sessizliğin Gücü",
    excerpt: "Gerçek dönüşüm, soruların bittiği ve derin dinlemenin başladığı o sessiz boşlukta filizlenir.",
    content:
      "Koçlukta sessizlik, konuşmanın yokluğu değil; danışanın kendi cevabını duyabilmesi için açılan güçlü bir alandır.\n\nProfesyonel bir koç, sessizliği aceleyle doldurmak yerine danışanın içsel ritmine saygı duyar. Bu alan, farkındalığın derinleşmesine ve gerçek dönüşümün başlamasına hizmet eder.\n\nSessizliğin gücü, koçun varlığında ve danışanın kendi potansiyeline temas etmesinde saklıdır.",
    category: "Koçluk",
    status: PageStatus.PUBLISHED,
    publishedAt: new Date("2026-02-28T09:00:00.000Z")
  }
];

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getPublishedBlogPosts(take = 9): Promise<BlogPostView[]> {
  if (!hasDatabase()) {
    return defaultBlogPosts.slice(0, take);
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: PageStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take
    });

    return posts.length > 0 ? posts : defaultBlogPosts.slice(0, take);
  } catch {
    return defaultBlogPosts.slice(0, take);
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostView | null> {
  if (!hasDatabase()) {
    return defaultBlogPosts.find((post) => post.slug === slug) ?? null;
  }

  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
      return defaultBlogPosts.find((fallbackPost) => fallbackPost.slug === slug) ?? null;
    }

    return post.status === PageStatus.PUBLISHED ? post : null;
  } catch {
    return defaultBlogPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getAdminBlogPosts(): Promise<BlogPostView[]> {
  if (!hasDatabase()) {
    return defaultBlogPosts;
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }]
    });

    return posts.length > 0 ? posts : defaultBlogPosts;
  } catch {
    return defaultBlogPosts;
  }
}
