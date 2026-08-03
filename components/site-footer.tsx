import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/" className="brand-logo footer-logo" aria-label="İlknur Erdal Soydan anasayfa">
          <Image src="/assets/img/medivisis-logo-yatay-web.png" alt="Medivisis Coaching School" width={420} height={141} />
        </Link>
        <p>Liderlikte aydınlanmış titizlik. Koçluk eğitiminde etik ve akademik derinliğin adresi.</p>
        <small>© {year} İlknur Erdal Soydan.</small>
      </div>
      <div>
        <h3>Keşfet</h3>
        <Link href="/ilknur-kimdir">İlknur Kimdir?</Link>
        <Link href="/calisma-alanlari">Çalışma Alanları</Link>
        <Link href="/medivisis">Medivisis</Link>
        <Link href="/yazilar">Yazılar</Link>
      </div>
      <div>
        <h3>Yasal</h3>
        <Link href="/basin-kiti">Basın Kiti</Link>
        <Link href="/iletisim">İletişim</Link>
        <Link href="/admin">Admin</Link>
      </div>
      <div>
        <h3>Bülten</h3>
        <p>Liderlik ve dönüşüm üzerine aylık içgörüler alın.</p>
        <form className="newsletter-inline">
          <input aria-label="E-posta adresiniz" placeholder="E-posta adresiniz" type="email" />
          <button aria-label="Bültene kaydol" type="submit">
            →
          </button>
        </form>
      </div>
    </footer>
  );
}
