import { NextResponse } from "next/server";
import { clearAdminSession, isValidAdminCredentials, setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!isValidAdminCredentials(body.email ?? "", body.password ?? "")) {
    return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
  }

  await setAdminSession(body.email ?? "");
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
