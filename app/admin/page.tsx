import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";
import { AdminLogout } from "@/components/admin/logout";

export default async function AdminHomePage() {
  await requireAdmin();
  const pages = await getAdminPages();

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <span className="eyebrow">Admin Paneli</span>
          <h1>Sayfalar</h1>
          <p>Web sitesindeki tüm ana sayfaları ve bölümlerini yönetin.</p>
        </div>
        <div className="admin-actions">
          <Link className="button button-light" href="/">
            Siteyi Gör
          </Link>
          <AdminLogout />
        </div>
      </header>
      {!process.env.DATABASE_URL && (
        <div className="admin-warning">
          Veritabanı bağlantısı henüz tanımlı değil. Taslak içerik görüntülenir; kaydetme için `.env` dosyasında `DATABASE_URL`
          ayarlanmalı ve Prisma migrate çalıştırılmalıdır.
        </div>
      )}
      <section className="admin-card">
        <div className="admin-table">
          {pages.map((page) => (
            <Link className="admin-row" href={`/admin/pages/${page.slug}`} key={page.slug}>
              <div>
                <strong>{page.title}</strong>
                <span>/{page.slug === "anasayfa" ? "" : page.slug}</span>
              </div>
              <span>{page.status === "PUBLISHED" ? "Yayında" : "Taslak"}</span>
              <span>{page.sections.length} bölüm</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
