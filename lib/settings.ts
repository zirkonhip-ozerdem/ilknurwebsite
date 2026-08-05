import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type ContactSettings = {
  email: string;
  phone: string;
  address: string;
};

export type GeneralSettings = {
  siteTitle: string;
  siteDescription: string;
  logoAlt: string;
  instagram: string;
  linkedin: string;
};

export const defaultContactSettings: ContactSettings = {
  email: "info@ilknursoydan.com",
  phone: "+90 (___) ___ __ __",
  address: "İstanbul, Türkiye"
};

export const defaultGeneralSettings: GeneralSettings = {
  siteTitle: "İlknur Erdal Soydan",
  siteDescription: "PCC Mentor Coach, ICF Eğitmeni ve Medivisis Coaching School Kurucusu.",
  logoAlt: "Medivisis Coaching School",
  instagram: "",
  linkedin: ""
};

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  if (!hasDatabase()) {
    return fallback;
  }

  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    return setting ? (setting.value as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function setSetting<T>(key: string, value: T) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value: value as Prisma.InputJsonValue },
    create: { key, value: value as Prisma.InputJsonValue }
  });
}

export function getContactSettings() {
  return getSetting<ContactSettings>("contact", defaultContactSettings);
}

export function getGeneralSettings() {
  return getSetting<GeneralSettings>("general", defaultGeneralSettings);
}
