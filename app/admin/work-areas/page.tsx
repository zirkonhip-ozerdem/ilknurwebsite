import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

export default async function AdminWorkAreasPage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const page = pages.find((item) => item.slug === "calisma-alanlari");

  if (!page) {
    notFound();
  }

  return (
    <PageEditor
      initialPage={page}
      moduleLabel="Çalışma Alanları Yönetimi"
      moduleDescription="Hizmet kartları, SSS içerikleri, CTA metinleri ve sayfa SEO alanlarını buradan yönetin."
    />
  );
}
