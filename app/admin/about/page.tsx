import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

export default async function AdminAboutPage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const page = pages.find((item) => item.slug === "ilknur-kimdir");

  if (!page) {
    notFound();
  }

  return (
    <PageEditor
      initialPage={page}
      moduleLabel="Hakkımda Yönetimi"
      moduleDescription="İlknur Kimdir sayfasındaki hikaye akışı, değerler, alıntı alanları ve SEO bilgilerini düzenleyin."
    />
  );
}
