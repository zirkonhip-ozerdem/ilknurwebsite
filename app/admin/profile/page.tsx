import { AdminProfileForm } from "@/components/admin/settings-forms";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getInitialAdminEmail() {
  if (!process.env.DATABASE_URL) {
    return process.env.ADMIN_EMAIL ?? "admin@ilknursoydan.com";
  }

  try {
    const admin = await prisma.adminCredential.findFirst();
    return admin?.email ?? process.env.ADMIN_EMAIL ?? "admin@ilknursoydan.com";
  } catch {
    return process.env.ADMIN_EMAIL ?? "admin@ilknursoydan.com";
  }
}

export default async function AdminProfilePage() {
  await requireAdmin();
  const email = await getInitialAdminEmail();

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>Güvenlik</span>
        <h1>Admin Bilgileri</h1>
        <p>Admin giriş e-postasını ve şifresini güncelleyin. Yeni şifre boş bırakılırsa mevcut şifre korunur.</p>
      </header>
      <section className="admin-panel narrow">
        <AdminProfileForm initialEmail={email} />
      </section>
    </main>
  );
}
