import Link from "next/link";
import {
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  Contact,
  FileText,
  MessageSquareText,
  ScrollText,
  Settings,
  UserRound
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

const modules = [
  {
    href: "/admin/site-settings",
    title: "Site Genel Ayarları",
    text: "Site başlığı, genel açıklama, logo alt metni ve sosyal medya bağlantıları.",
    icon: Settings
  },
  {
    href: "/admin/contact-info",
    title: "İletişim Bilgileri",
    text: "Footer ve iletişim alanlarında kullanılan e-posta, telefon ve adres bilgileri.",
    icon: Contact
  },
  {
    href: "/admin/messages",
    title: "Form Mesajları",
    text: "İletişim formundan gelen başvuru ve talepleri görüntüleyin.",
    icon: MessageSquareText
  },
  {
    href: "/admin/about",
    title: "Hakkımda Yönetimi",
    text: "İlknur Kimdir sayfasının hikaye, değerler, timeline ve SEO içerikleri.",
    icon: UserRound
  },
  {
    href: "/admin/work-areas",
    title: "Çalışma Alanları",
    text: "Executive coaching, mentor coaching, nefes, kurumsal eğitim ve konuşmacı alanları.",
    icon: BriefcaseBusiness
  },
  {
    href: "/admin/blog",
    title: "Yazılar / Blog",
    text: "Yazılar, podcast/video, etkinlikler ve basın kiti içerikleri.",
    icon: BookOpenText
  },
  {
    href: "/admin/medivisis",
    title: "Medivisis",
    text: "Kurucu perspektifi, vizyon, kurum yönlendirmesi ve Medivisis sayfası.",
    icon: Building2
  },
  {
    href: "/admin/legal",
    title: "Yasal Sayfalar",
    text: "KVKK aydınlatma metni ve gizlilik politikası içerikleri.",
    icon: ScrollText
  }
];

export default async function AdminHomePage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const publishedCount = pages.filter((page) => page.status === "PUBLISHED").length;
  const sectionCount = pages.reduce((total, page) => total + page.sections.length, 0);

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>Yönetim Merkezi</span>
        <h1>Admin Paneli</h1>
        <p>Medivisis kişisel marka sitesinin içerik, SEO, iletişim ve yönetici ayarlarını buradan düzenleyin.</p>
      </header>
      {!process.env.DATABASE_URL && (
        <div className="admin-warning">
          Veritabanı bağlantısı henüz tanımlı değil. Taslak içerik görüntülenir; kaydetme için `.env` dosyasında `DATABASE_URL`
          ayarlanmalı ve Prisma migrate çalıştırılmalıdır.
        </div>
      )}
      <section className="admin-stat-grid" aria-label="Site özeti">
        <article className="admin-stat-card">
          <span>Sayfa</span>
          <strong>{pages.length}</strong>
          <p>Yönetilebilir ana sayfa</p>
        </article>
        <article className="admin-stat-card">
          <span>Yayında</span>
          <strong>{publishedCount}</strong>
          <p>Aktif görünen sayfa</p>
        </article>
        <article className="admin-stat-card">
          <span>Bölüm</span>
          <strong>{sectionCount}</strong>
          <p>Toplam içerik bloğu</p>
        </article>
      </section>
      <section className="admin-module-grid">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link className="admin-module-card" href={module.href} key={module.href}>
              <Icon size={24} />
              <strong>{module.title}</strong>
              <p>{module.text}</p>
            </Link>
          );
        })}
      </section>
      <section className="admin-panel">
        <div className="admin-section-heading">
          <div>
            <span>İleri Seviye</span>
            <h2>Tüm Sayfa İçerikleri</h2>
          </div>
          <FileText size={22} />
        </div>
        <div className="admin-page-list">
          {pages.map((page) => (
            <Link className="admin-list-row" href={`/admin/pages/${page.slug}`} key={page.slug}>
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
