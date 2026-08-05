import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

const cookieName = "ilknur_admin_session";
const maxAge = 60 * 60 * 8;

function getSecret() {
  return process.env.AUTH_SECRET ?? "local-development-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function verifyToken(token: string) {
  const [value, signature] = token.split(".");
  if (!value || !signature) {
    return false;
  }

  const expected = sign(value);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createSessionToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, issuedAt: Date.now() })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  return token && verifyToken(token) ? token : null;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
}

export async function setAdminSession(email: string) {
  const store = await cookies();
  store.set(cookieName, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/"
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isValidAdminCredentials(email: string, password: string) {
  if (process.env.DATABASE_URL) {
    try {
      const admin = await prisma.adminCredential.findUnique({ where: { email } });
      if (admin) {
        return verifyPassword(password, admin.passwordHash);
      }
    } catch {
      // Fall through to environment credentials.
    }
  }

  const expectedEmail = process.env.ADMIN_EMAIL ?? "admin@ilknursoydan.com";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "admin";
  return email === expectedEmail && password === expectedPassword;
}
