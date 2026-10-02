import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionRenderer } from "@/components/section-renderer";
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
          <SectionRenderer key={section.id ?? `${section.type}-${index}`} section={section} pageSlug={page.slug} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
