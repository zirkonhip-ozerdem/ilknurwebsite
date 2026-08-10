import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  GraduationCap,
  Mail,
  Quote,
  ShieldCheck,
  Sparkles,
  Timer,
  Users
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import type { SectionItem, SiteSection } from "@/lib/types";

const icons = {
  BadgeCheck,
  Building2,
  GraduationCap,
  Timer,
  Users,
  ShieldCheck,
  Sparkles,
  CalendarDays
};

function SectionHeading({ section, centered = false }: { section: SiteSection; centered?: boolean }) {
  return (
    <div className={centered ? "section-heading section-heading-center" : "section-heading"}>
      {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
      <h2>{section.title}</h2>
      {section.subtitle && <p>{section.subtitle}</p>}
      {section.body && <p>{section.body}</p>}
    </div>
  );
}

function SmartLink({ href, children, className }: { href?: string | null; children: React.ReactNode; className?: string }) {
  if (!href) {
    return null;
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

function PortraitFrame() {
  return (
    <div className="portrait-frame" aria-label="İlknur Erdal Soydan görsel alanı">
      <Image
        src="/assets/img/hero-banner-generated-v2.png"
        alt="İlknur Erdal Soydan"
        fill
        priority
        sizes="(max-width: 980px) 100vw, 58vw"
      />
    </div>
  );
}

function HeroTitle({ title }: { title: string }) {
  const signature = "sadece bir meslek değil, yaşam amacım.";
  const splitPoint = title.toLocaleLowerCase("tr").indexOf(signature);

  if (splitPoint === -1) {
    return <h1>{title}</h1>;
  }

  return (
    <h1 className="hero-title-special">
      <span>İnsanların potansiyelini</span>
      <span>ortaya çıkarmak,</span>
      <strong>{signature}</strong>
    </h1>
  );
}

function HeroSection({ section }: { section: SiteSection }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        <HeroTitle title={section.title} />
        {section.subtitle && <p className="hero-subtitle">{section.subtitle}</p>}
        {section.body && <p>{section.body}</p>}
        <div className="button-row">
          <SmartLink className="button button-dark" href={section.ctaHref}>
            {section.ctaLabel}
          </SmartLink>
          {section.items?.map((item) => (
            <SmartLink key={item.title} className="button button-light" href={item.href}>
              {item.title}
            </SmartLink>
          ))}
        </div>
      </div>
      <PortraitFrame />
    </section>
  );
}

function StatsSection({ section }: { section: SiteSection }) {
  return (
    <section className="stats-strip" aria-label={section.title}>
      {section.items?.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons] ?? BadgeCheck;
        return (
          <div key={item.title}>
            <Icon size={20} />
            <span>{item.title}</span>
          </div>
        );
      })}
    </section>
  );
}

function CardsSection({ section }: { section: SiteSection }) {
  return (
    <section className="section-container" id={section.eyebrow === "Hizmetler" ? "hizmetler" : undefined}>
      <div className="heading-with-action">
        <SectionHeading section={section} />
        <SmartLink href={section.ctaHref} className="text-link">
          {section.ctaLabel} <ArrowRight size={14} />
        </SmartLink>
      </div>
      <div className="card-grid">
        {section.items?.map((item, index) => (
          <article className={index % 3 === 1 ? "content-card muted-card" : "content-card"} key={item.title}>
            <Sparkles size={20} />
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function ManifestoSection({ section }: { section: SiteSection }) {
  return (
    <section className="manifesto-section">
      {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
      <Quote size={24} />
      <h2>“{section.title}”</h2>
      {section.body && <p>{section.body}</p>}
    </section>
  );
}

function FeatureSection({ section }: { section: SiteSection }) {
  return (
    <section className="feature-band" id={section.eyebrow === "Neden Medivisis?" ? "neden" : undefined}>
      <div className="feature-media" />
      <div className="feature-copy">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        <h2>{section.title}</h2>
        {section.body && <p>{section.body}</p>}
        <SmartLink href={section.ctaHref} className="button button-light">
          {section.ctaLabel} <ArrowRight size={16} />
        </SmartLink>
      </div>
      {section.items && (
        <div className="feature-list">
          {section.items.map((item) => (
            <article key={item.title}>
              <ShieldCheck size={20} />
              <h3>{item.title}</h3>
              {item.text && <p>{item.text}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ArticlesSection({ section }: { section: SiteSection }) {
  return (
    <section className="section-container" id="yazilar">
      <SectionHeading section={section} />
      <div className="article-grid">
        {section.items?.map((item, index) => (
          <article className="article-card" key={item.title}>
            <div className={`article-image article-image-${index + 1}`} />
            {item.meta && <span>{item.meta}</span>}
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
            <Link href="/yazilar">Okumaya Devam Et</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ section }: { section: SiteSection }) {
  return (
    <section className="section-container testimonials">
      <SectionHeading section={section} centered />
      <div className="testimonial-grid">
        {section.items?.map((item) => (
          <article key={item.title}>
            <Quote size={22} />
            {item.text && <p>“{item.text}”</p>}
            <strong>{item.title}</strong>
            {item.meta && <span>{item.meta}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ section }: { section: SiteSection }) {
  return (
    <section className="timeline-section" id="hikaye">
      <SectionHeading section={section} centered />
      <div className="timeline">
        {section.items?.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function QuoteSection({ section }: { section: SiteSection }) {
  return (
    <section className="quote-band">
      <Quote size={26} />
      <h2>{section.title}</h2>
      {section.body && <p>{section.body}</p>}
    </section>
  );
}

function FaqSection({ section }: { section: SiteSection }) {
  return (
    <section className="faq-section">
      <SectionHeading section={section} centered />
      <div className="faq-list">
        {section.items?.map((item, index) => (
          <details key={item.title} open={index === 0}>
            <summary>{item.title}</summary>
            {item.text && <p>{item.text}</p>}
          </details>
        ))}
      </div>
    </section>
  );
}

function EventsSection({ section }: { section: SiteSection }) {
  return (
    <section className="section-container">
      <SectionHeading section={section} centered />
      <div className="event-list">
        {section.items?.map((item) => (
          <article key={item.title}>
            <CalendarDays size={20} />
            <div>
              <h3>{item.title}</h3>
              {item.meta && <p>{item.meta}</p>}
            </div>
            <Link className="button button-small button-dark" href="/iletisim">
              Kayıt
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PressSection({ section }: { section: SiteSection }) {
  return (
    <section className="press-section">
      <div>
        <SectionHeading section={section} />
        <SmartLink href={section.ctaHref} className="button button-dark">
          {section.ctaLabel}
        </SmartLink>
      </div>
      <div className="press-grid">
        {section.items?.map((item) => (
          <article key={item.title}>
            <BadgeCheck size={18} />
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsletterSection({ section }: { section: SiteSection }) {
  return (
    <section className="newsletter-section">
      <SectionHeading section={section} centered />
      <form className="newsletter-form">
        <input aria-label="E-posta adresiniz" placeholder="E-posta adresiniz" type="email" />
        <button className="button button-dark" type="submit">
          Kayıt Ol
        </button>
      </form>
    </section>
  );
}

function ContactSection({ section }: { section: SiteSection }) {
  return (
    <section className="contact-section">
      <div className="contact-intro">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        <h1>{section.title}</h1>
        {section.body && <p>{section.body}</p>}
      </div>
      <div className="contact-layout">
        <ContactForm />
        <aside className="contact-aside">
          <h2>Direkt İletişim</h2>
          <p>Tüm talepler titizlikle incelenmekte olup, uzman ekibimiz tarafından 48 saat içinde dönüş sağlanmaktadır.</p>
          <div className="contact-method">
            <Mail size={18} />
            <div>
              <span>E-posta</span>
              <strong>info@ilknursoydan.com</strong>
            </div>
          </div>
          <div className="studio-box">
            <h3>Medivisis Stüdyo</h3>
            <p>Projelerinizi ve stratejik toplantılarınızı Medivisis bünyesindeki inovasyon merkezimizde gerçekleştirin.</p>
            <Link href="/medivisis">Medivisis&apos;i Keşfedin <ArrowRight size={14} /></Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: SiteSection }) {
  return (
    <section className="cta-section">
      <h2>{section.title}</h2>
      {section.body && <p>{section.body}</p>}
      <SmartLink className="button button-light" href={section.ctaHref}>
        {section.ctaLabel}
      </SmartLink>
    </section>
  );
}

function LegalSection({ section }: { section: SiteSection }) {
  return (
    <section className="legal-section">
      <div className="legal-heading">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        <h1>{section.title}</h1>
        {section.subtitle && <p>{section.subtitle}</p>}
      </div>
      <div className="legal-content">
        {section.body && <p>{section.body}</p>}
        {section.items?.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function SectionRenderer({ section }: { section: SiteSection; pageSlug: string }) {
  const renderers: Record<string, (section: SiteSection) => React.ReactNode> = {
    hero: (current) => <HeroSection section={current} />,
    stats: (current) => <StatsSection section={current} />,
    manifesto: (current) => <ManifestoSection section={current} />,
    cards: (current) => <CardsSection section={current} />,
    feature: (current) => <FeatureSection section={current} />,
    articles: (current) => <ArticlesSection section={current} />,
    testimonials: (current) => <TestimonialsSection section={current} />,
    timeline: (current) => <TimelineSection section={current} />,
    quote: (current) => <QuoteSection section={current} />,
    faq: (current) => <FaqSection section={current} />,
    events: (current) => <EventsSection section={current} />,
    press: (current) => <PressSection section={current} />,
    newsletter: (current) => <NewsletterSection section={current} />,
    contact: (current) => <ContactSection section={current} />,
    legal: (current) => <LegalSection section={current} />,
    cta: (current) => <CtaSection section={current} />
  };

  return renderers[section.type]?.(section) ?? <CardsSection section={section} />;
}
