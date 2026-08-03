import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminEditPage({ params }: PageProps) {
  await requireAdmin();
  const { slug } = await params;
  const pages = await getAdminPages();
  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return <PageEditor initialPage={page} />;
}
