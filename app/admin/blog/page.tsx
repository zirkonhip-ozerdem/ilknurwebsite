import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

export default async function AdminBlogPage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const page = pages.find((item) => item.slug === "yazilar");

  if (!page) {
    notFound();
  }

  return (
    <PageEditor
      initialPage={page}
      moduleLabel="Yazılar / Blog Yönetimi"
      moduleDescription="Öne çıkan yazılar, podcast/video, yaklaşan etkinlikler, basın kiti ve içerik SEO alanlarını yönetin."
    />
  );
}
