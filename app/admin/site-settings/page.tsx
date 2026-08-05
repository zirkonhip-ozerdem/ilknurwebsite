import { GeneralSettingsForm } from "@/components/admin/settings-forms";
import { requireAdmin } from "@/lib/auth";
import { getGeneralSettings } from "@/lib/settings";

export default async function AdminSiteSettingsPage() {
  await requireAdmin();
  const settings = await getGeneralSettings();

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>Ayarlar</span>
        <h1>Site Genel Ayarları</h1>
        <p>Marka başlığı, açıklama, sosyal medya bağlantıları ve genel görünürlük metinlerini düzenleyin.</p>
      </header>
      <section className="admin-panel">
        <GeneralSettingsForm initialSettings={settings} />
      </section>
    </main>
  );
}
