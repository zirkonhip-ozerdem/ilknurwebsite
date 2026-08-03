import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/content";
import { SiteShell } from "@/components/site-shell";

export default async function HomePage() {
  const page = await getPageBySlug("anasayfa");

  if (!page) {
    notFound();
  }

  return <SiteShell page={page} />;
}
