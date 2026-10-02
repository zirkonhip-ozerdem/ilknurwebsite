import { SliderManager } from "@/components/admin/slider-manager";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/content";

export default async function AdminSlidersPage() {
  await requireAdmin();
  const pages = await getAdminPages();
  const pagesWithHero = pages.filter((page) => page.sections.some((section) => section.type === "hero"));

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>Görsel Yönetimi</span>
        <h1>Slider Yönetimi</h1>
        <p>
          Anasayfa ve iç sayfalardaki banner görsellerini buradan güncelleyin. Görseller dosya olarak yüklenir ve sistem
          otomatik olarak WebP formatına çevirir.
        </p>
      </header>
      <section className="admin-panel">
        <SliderManager initialPages={pagesWithHero} />
      </section>
    </main>
  );
}
