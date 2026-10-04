import { PageStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { blogPostSchema } from "@/lib/blog-validation";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  const { id } = await context.params;
  const parsed = blogPostSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Form bilgilerini kontrol edin." }, { status: 422 });
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ message: "Yazı bulunamadı." }, { status: 404 });
  }

  try {
    const slugOwner = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });

    if (slugOwner && slugOwner.id !== id) {
      return NextResponse.json({ message: "Bu slug başka bir yazıda kullanılıyor." }, { status: 409 });
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...parsed.data,
        status: parsed.data.status as PageStatus,
        publishedAt: parsed.data.status === "PUBLISHED" ? existing.publishedAt ?? new Date() : null
      }
    });

    return NextResponse.json({ post });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
      return NextResponse.json({ message: "Blog tablosu bulunamadı. Lütfen Prisma migration çalıştırın." }, { status: 500 });
    }

    console.error("Blog post update failed", error);
    return NextResponse.json({ message: "Yazı kaydedilemedi." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  const { id } = await context.params;

  await prisma.blogPost.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
