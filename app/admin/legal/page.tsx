import Link from "next/link";
import { FileText } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

const legalSlugs = ["kvkk-aydinlatma-metni", "gizlilik-politikasi"];

export default async function AdminLegalPage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const legalPages = pages.filter((page) => legalSlugs.includes(page.slug));

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>Yasal İçerikler</span>
        <h1>Yasal Sayfalar</h1>
        <p>Footer bağlantılarında kullanılan KVKK ve Gizlilik Politikası sayfalarını buradan düzenleyebilirsiniz.</p>
      </header>
      <section className="admin-panel">
        <div className="admin-page-list">
          {legalPages.map((page) => (
            <Link className="admin-list-row" href={`/admin/pages/${page.slug}`} key={page.slug}>
              <div>
                <strong>{page.title}</strong>
                <span>/{page.slug}</span>
              </div>
              <span>{page.status === "PUBLISHED" ? "Yayında" : "Taslak"}</span>
              <span>{page.sections.length} bölüm</span>
            </Link>
          ))}
          {legalPages.length === 0 && (
            <div className="admin-empty-state">
              <FileText size={24} />
              <strong>Yasal sayfalar henüz veritabanında yok.</strong>
              <p>Yeni sayfaları eklemek için sunucuda `npm run db:seed` çalıştırın.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
