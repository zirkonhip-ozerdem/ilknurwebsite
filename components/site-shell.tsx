import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionRenderer } from "@/components/section-renderer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollToTop } from "@/components/scroll-to-top";
import type { SitePage } from "@/lib/types";

export function SiteShell({ page }: { page: SitePage }) {
  const sections = page.sections.filter(
    (section) =>
      !(page.slug === "iletisim" && section.type === "cta" && section.title === "Birlikte dönüşüm yolculuğuna başlayalım.") &&
      !(page.slug === "yazilar" && section.type === "hero")
  );

  return (
    <>
      <SiteHeader />
      <main>
        {sections.map((section, index) => (
          <ScrollReveal
            delay={Math.min(index * 70, 280)}
            direction={index % 2 === 0 ? "left" : "right"}
            key={section.id ?? `${section.type}-${index}`}
          >
            <SectionRenderer section={section} pageSlug={page.slug} />
          </ScrollReveal>
        ))}
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
