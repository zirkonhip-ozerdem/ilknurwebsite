import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

export default async function AdminMedivisisPage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const page = pages.find((item) => item.slug === "medivisis");

  if (!page) {
    notFound();
  }

  return (
    <PageEditor
      initialPage={page}
      moduleLabel="Medivisis Sayfası"
      moduleDescription="Kurucu perspektifi, vizyon metni, program kartları ve Medivisis yönlendirme içeriklerini düzenleyin."
    />
  );
}
