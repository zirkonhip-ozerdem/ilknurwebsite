"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/default-content";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className={isOpen ? "site-header menu-open" : "site-header"}>
      <Link href="/" className="brand-logo" aria-label="İlknur Erdal Soydan anasayfa">
        <Image
          src="/assets/img/ilknur-erdal-soydan-logopng.png"
          alt="İlknur Erdal Soydan"
          width={360}
          height={150}
          priority
        />
      </Link>
      <nav className="desktop-nav" aria-label="Ana menü">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="button button-small button-dark" href="/iletisim">
        Randevu Al
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className="mobile-nav" aria-label="Mobil menü">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link className="button button-dark" href="/iletisim" onClick={closeMenu}>
          Randevu Al
        </Link>
      </nav>
    </header>
  );
}
