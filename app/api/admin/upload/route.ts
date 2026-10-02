import { mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const maxFileSize = 8 * 1024 * 1024;

export async function POST(request: Request) {
  await requireAdmin();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Görsel dosyası bulunamadı." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Lütfen geçerli bir görsel yükleyin." }, { status: 400 });
  }

  if (file.size > maxFileSize) {
    return NextResponse.json({ message: "Görsel en fazla 8 MB olabilir." }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${randomUUID()}.webp`;
  const outputPath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await sharp(buffer)
      .rotate()
      .resize({ width: 2400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(outputPath);
  } catch {
    return NextResponse.json({ message: "Görsel WebP formatına çevrilemedi. Lütfen JPG, PNG veya WebP yükleyin." }, { status: 400 });
  }

  return NextResponse.json({ url: `/uploads/${filename}` });
}
