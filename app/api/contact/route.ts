import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Lütfen form alanlarını kontrol edin." }, { status: 400 });
  }

  if (process.env.DATABASE_URL) {
    try {
      await prisma.contactSubmission.create({ data: parsed.data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
        return NextResponse.json({ message: "Mesaj tablosu bulunamadı. Lütfen Prisma migration çalıştırın." }, { status: 500 });
      }

      console.error("Contact submission failed", error);
      return NextResponse.json({ message: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
