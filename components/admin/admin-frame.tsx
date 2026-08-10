"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  Contact,
  FileText,
  Home,
  KeyRound,
  LayoutDashboard,
  Menu,
  ScrollText,
  Settings,
  UserRound,
  X
} from "lucide-react";
import { AdminLogout } from "@/components/admin/logout";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site-settings", label: "Site Genel Ayarları", icon: Settings },
  { href: "/admin/contact-info", label: "İletişim Bilgileri", icon: Contact },
  { href: "/admin/about", label: "Hakkımda Yönetimi", icon: UserRound },
  { href: "/admin/work-areas", label: "Çalışma Alanları", icon: BriefcaseBusiness },
  { href: "/admin/blog", label: "Yazılar / Blog", icon: BookOpenText },
  { href: "/admin/medivisis", label: "Medivisis", icon: Building2 },
  { href: "/admin/legal", label: "Yasal Sayfalar", icon: ScrollText },
  { href: "/admin/profile", label: "Admin Bilgileri", icon: KeyRound },
  { href: "/", label: "Siteyi Gör", icon: Home }
];

export function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const title = navigation.find((item) => item.href === pathname)?.label ?? "Yönetim Paneli";

  return (
    <div className="admin-frame">
      <button className="admin-mobile-trigger" type="button" onClick={() => setOpen(true)} aria-label="Menüyü aç">
        <Menu size={22} />
      </button>
      {open && <button className="admin-overlay" type="button" aria-label="Menüyü kapat" onClick={() => setOpen(false)} />}
      <aside className={open ? "admin-sidebar-panel open" : "admin-sidebar-panel"}>
        <div className="admin-sidebar-head">
          <Link href="/admin" className="admin-brand" onClick={() => setOpen(false)}>
            <Image src="/assets/img/medivisis-logo-yatay-web.png" alt="Medivisis Coaching School" width={210} height={70} />
          </Link>
          <button className="admin-close" type="button" onClick={() => setOpen(false)} aria-label="Menüyü kapat">
            <X size={20} />
          </button>
        </div>
        <nav className="admin-nav" aria-label="Admin menüsü">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/admin" ? pathname === item.href : item.href !== "/" && pathname.startsWith(item.href);
            return (
              <Link
                className={active ? "admin-nav-link active" : "admin-nav-link"}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <FileText size={18} />
          <span>Tek dil: Türkçe</span>
        </div>
      </aside>
      <div className="admin-content-shell">
        <header className="admin-topbar">
          <div>
            <span>İlknur Erdal Soydan</span>
            <strong>{title}</strong>
          </div>
          <AdminLogout />
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
