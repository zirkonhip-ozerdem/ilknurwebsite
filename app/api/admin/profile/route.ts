import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin, isValidAdminCredentials } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  email: z.string().email(),
  currentPassword: z.string().min(1),
  newPassword: z.union([z.string().min(6), z.literal("")]).optional()
});

export async function PUT(request: Request) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "DATABASE_URL tanımlı değil." }, { status: 503 });
  }

  const parsed = profileSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Lütfen alanları kontrol edin." }, { status: 400 });
  }

  try {
    const fallbackEmail = process.env.ADMIN_EMAIL ?? "admin@ilknursoydan.com";
    const existingAdmin = await prisma.adminCredential.findFirst();
    const currentEmail = existingAdmin?.email ?? fallbackEmail;
    const isCurrentPasswordValid = await isValidAdminCredentials(currentEmail, parsed.data.currentPassword);

    if (!isCurrentPasswordValid) {
      return NextResponse.json({ message: "Mevcut şifre hatalı." }, { status: 401 });
    }

    const passwordHash = parsed.data.newPassword
      ? hashPassword(parsed.data.newPassword)
      : existingAdmin?.passwordHash ?? hashPassword(parsed.data.currentPassword);

    await prisma.adminCredential.upsert({
      where: { id: "primary" },
      update: {
        email: parsed.data.email,
        passwordHash
      },
      create: {
        id: "primary",
        email: parsed.data.email,
        passwordHash
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
      return NextResponse.json({ message: "Admin tablosu bulunamadı. Lütfen Prisma migration çalıştırın." }, { status: 500 });
    }

    console.error("Admin profile update failed", error);
    return NextResponse.json({ message: "Admin bilgileri kaydedilemedi. Veritabanı bağlantısını kontrol edin." }, { status: 500 });
  }
}
