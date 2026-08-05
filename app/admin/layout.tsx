import type { Metadata } from "next";
import { AdminFrame } from "@/components/admin/admin-frame";

export const metadata: Metadata = {
  title: "Admin Paneli | İlknur Erdal Soydan"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <AdminFrame>{children}</AdminFrame>
    </div>
  );
}
