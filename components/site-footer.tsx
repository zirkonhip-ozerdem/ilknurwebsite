import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getContactSettings, getGeneralSettings } from "@/lib/settings";

export async function SiteFooter() {
  const [contactSettings, generalSettings] = await Promise.all([getContactSettings(), getGeneralSettings()]);

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <address className="footer-contact">
          <span>
            <Mail size={17} />
            {contactSettings.email}
          </span>
          <span>
            <Phone size={17} />
            {contactSettings.phone}
          </span>
          <span>
            <MapPin size={17} />
            {contactSettings.address}
          </span>
        </address>
        <div className="footer-logo-wrap">
          <Link href="/" className="brand-logo footer-logo" aria-label="İlknur Erdal Soydan anasayfa">
            <Image src="/assets/img/medivisis-logo-yatay-web.png" alt={generalSettings.logoAlt} width={420} height={141} />
          </Link>
        </div>
        <nav className="footer-links" aria-label="Footer bağlantıları">
          <a href="https://www.koclukmerkezi.com/kvkk/">KVKK Aydınlatma Metni</a>
          <a href="https://www.koclukmerkezi.com/kvkk/">Gizlilik Politikası</a>
          <a href="https://www.koclukmerkezi.com/iletisim/">İletişim</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>Tüm hakları saklıdır. © 2026 İlknur Erdal Soydan.</span>
        <span className="footer-credit">
          Bu web sitesi{" "}
          <a href="https://yengecyazilim.com" target="_blank" rel="noopener noreferrer">
            Yengeç Yazılım
          </a>{" "}
          tarafından yapılmıştır.
        </span>
      </div>
    </footer>
  );
}
