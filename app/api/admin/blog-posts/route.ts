import { PageStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { blogPostSchema } from "@/lib/blog-validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  const parsed = blogPostSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Form bilgilerini kontrol edin." }, { status: 422 });
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        ...parsed.data,
        status: parsed.data.status as PageStatus,
        publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null
      }
    });

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ message: "Yazı kaydedilemedi." }, { status: 500 });
  }
}
