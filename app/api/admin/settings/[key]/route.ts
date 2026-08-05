import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { setSetting } from "@/lib/settings";

type RouteContext = {
  params: Promise<{ key: string }>;
};

const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1)
});

const generalSchema = z.object({
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  logoAlt: z.string().min(1),
  instagram: z.string(),
  linkedin: z.string()
});

export async function PUT(request: Request, context: RouteContext) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  const { key } = await context.params;
  const body = await request.json();
  const schema = key === "contact" ? contactSchema : key === "general" ? generalSchema : null;

  if (!schema) {
    return NextResponse.json({ message: "Bilinmeyen ayar alanı." }, { status: 404 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Lütfen alanları kontrol edin." }, { status: 400 });
  }

  const value = parsed.data;

  try {
    await setSetting(key, value);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
      return NextResponse.json(
        { message: "Ayar tablosu bulunamadı. Lütfen Prisma migration çalıştırın: npm run prisma:migrate" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Ayar kaydedilemedi. Veritabanı bağlantısını kontrol edin." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
