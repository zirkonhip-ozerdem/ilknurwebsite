import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Lütfen form alanlarını kontrol edin." }, { status: 400 });
  }

  if (process.env.DATABASE_URL) {
    await prisma.contactSubmission.create({ data: parsed.data });
  }

  return NextResponse.json({ ok: true });
}
