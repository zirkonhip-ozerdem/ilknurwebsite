"use client";

import Link from "next/link";
import { useState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { SitePage } from "@/lib/types";

export function SliderManager({ initialPages }: { initialPages: SitePage[] }) {
  const [pages, setPages] = useState(initialPages);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [errorBySlug, setErrorBySlug] = useState<Record<string, string>>({});

  function updateHeroImage(slug: string, mediaUrl: string) {
    setPages((current) =>
      current.map((page) => ({
        ...page,
        sections:
          page.slug === slug
            ? page.sections.map((section) => (section.type === "hero" ? { ...section, mediaUrl } : section))
            : page.sections
      }))
    );
  }

  async function savePage(page: SitePage) {
    setSavingSlug(page.slug);
    setSavedSlug(null);
    setErrorBySlug((current) => ({ ...current, [page.slug]: "" }));

    const response = await fetch(`/api/pages/${page.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...page,
        sections: page.sections.map((section, index) => ({
          ...section,
          sortOrder: index,
          eyebrow: section.eyebrow ?? "",
          subtitle: section.subtitle ?? "",
          body: section.body ?? "",
          ctaLabel: section.ctaLabel ?? "",
          ctaHref: section.ctaHref ?? "",
          mediaUrl: section.mediaUrl ?? "",
          items: section.items ?? []
        }))
      })
    });

    setSavingSlug(null);
    if (response.ok) {
      setSavedSlug(page.slug);
      return;
    }

    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    setErrorBySlug((current) => ({
      ...current,
      [page.slug]: body?.message ?? "Banner kaydedilemedi. Veritabanı bağlantısını ve oturumu kontrol edin."
    }));
  }

  return (
    <div className="admin-slider-grid">
      {pages.map((page) => {
        const hero = page.sections.find((section) => section.type === "hero");
        const publicHref = page.slug === "anasayfa" ? "/" : `/${page.slug}`;

        if (!hero) {
          return null;
        }

        return (
          <article className="admin-slider-card" key={page.slug}>
            <div className="admin-message-head">
              <div>
                <span>{publicHref}</span>
                <h2>{page.title}</h2>
              </div>
              <Link className="admin-secondary-button" href={publicHref}>
                Önizle
              </Link>
            </div>
            <ImageUploadField
              label="Banner Görseli"
              value={hero.mediaUrl ?? ""}
              onChange={(value) => updateHeroImage(page.slug, value)}
              hint="Önerilen banner ölçüsü: 2400x1200 px. En fazla 8 MB. JPG, PNG, HEIC gibi görseller yüklense de sistem WebP’ye çevirir."
            />
            <button className="admin-primary-button" type="button" onClick={() => savePage(page)} disabled={savingSlug === page.slug}>
              {savingSlug === page.slug ? "Kaydediliyor" : "Bannerı Kaydet"}
            </button>
            {savedSlug === page.slug && <div className="admin-success compact">Banner güncellendi.</div>}
            {errorBySlug[page.slug] && <div className="admin-warning compact">{errorBySlug[page.slug]}</div>}
          </article>
        );
      })}
    </div>
  );
}
