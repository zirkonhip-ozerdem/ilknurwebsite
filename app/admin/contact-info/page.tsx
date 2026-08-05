import { ContactInfoForm } from "@/components/admin/settings-forms";
import { requireAdmin } from "@/lib/auth";
import { getContactSettings } from "@/lib/settings";

export default async function AdminContactInfoPage() {
  await requireAdmin();
  const settings = await getContactSettings();

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>Ayarlar</span>
        <h1>İletişim Bilgileri</h1>
        <p>Footer ve iletişim sayfasında kullanılan e-posta, telefon ve adres bilgilerini güncelleyin.</p>
      </header>
      <section className="admin-panel narrow">
        <ContactInfoForm initialSettings={settings} />
      </section>
    </main>
  );
}
