import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <section>
        <span className="eyebrow">Yönetim Paneli</span>
        <h1>İçerik merkezine giriş yapın.</h1>
        <p>Sayfaları, bölümleri, CTA metinlerini ve SEO alanlarını buradan yönetin.</p>
      </section>
      <LoginForm />
    </main>
  );
}
