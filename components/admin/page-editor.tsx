"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { SectionItem, SitePage, SiteSection } from "@/lib/types";

const sectionTypes = [
  "hero",
  "stats",
  "narrative",
  "manifesto",
  "cards",
  "feature",
  "articles",
  "testimonials",
  "timeline",
  "quote",
  "faq",
  "events",
  "press",
  "newsletter",
  "contact",
  "legal",
  "cta"
];

const sectionTypeLabels: Record<string, string> = {
  hero: "Banner / Hero",
  stats: "Güven Göstergeleri",
  narrative: "Orta Metin Alanı",
  manifesto: "Manifesto",
  cards: "Kart Listesi",
  feature: "Öne Çıkan Alan",
  articles: "Yazı Kartları",
  testimonials: "Yorumlar",
  timeline: "Zaman Akışı",
  quote: "Alıntı",
  faq: "SSS",
  events: "Etkinlikler",
  press: "Basın Kiti",
  newsletter: "Bülten",
  contact: "İletişim",
  legal: "Yasal Metin",
  cta: "CTA"
};

function createSection(sortOrder: number): SiteSection {
  return {
    type: "cards",
    eyebrow: "",
    title: "Yeni Bölüm",
    subtitle: "",
    body: "",
    ctaLabel: "",
    ctaHref: "",
    mediaUrl: "",
    sortOrder,
    items: []
  };
}

function createItem(): SectionItem {
  return {
    title: "Yeni Öğe",
    text: "",
    meta: "",
    href: ""
  };
}

type PageEditorProps = {
  initialPage: SitePage;
  moduleLabel?: string;
  moduleDescription?: string;
};

export function PageEditor({ initialPage, moduleLabel, moduleDescription }: PageEditorProps) {
  const [page, setPage] = useState<SitePage>(initialPage);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const activeSection = page.sections[activeIndex];

  const publicHref = useMemo(() => (page.slug === "anasayfa" ? "/" : `/${page.slug}`), [page.slug]);

  function updatePageField<K extends keyof SitePage>(field: K, value: SitePage[K]) {
    setPage((current) => ({ ...current, [field]: value }));
  }

  function updateSection(index: number, patch: Partial<SiteSection>) {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section
      )
    }));
  }

  function updateItem(sectionIndex: number, itemIndex: number, patch: Partial<SectionItem>) {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, currentSectionIndex) => {
        if (currentSectionIndex !== sectionIndex) {
          return section;
        }

        const items = section.items ?? [];
        return {
          ...section,
          items: items.map((item, currentItemIndex) => (currentItemIndex === itemIndex ? { ...item, ...patch } : item))
        };
      })
    }));
  }

  function addSection() {
    setPage((current) => ({
      ...current,
      sections: [...current.sections, createSection(current.sections.length)]
    }));
    setActiveIndex(page.sections.length);
  }

  function removeSection(index: number) {
    setPage((current) => ({
      ...current,
      sections: current.sections.filter((_, sectionIndex) => sectionIndex !== index)
    }));
    setActiveIndex(0);
  }

  function moveSection(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= page.sections.length) {
      return;
    }

    setPage((current) => {
      const sections = [...current.sections];
      const [section] = sections.splice(index, 1);
      sections.splice(targetIndex, 0, section);
      return {
        ...current,
        sections: sections.map((item, itemIndex) => ({ ...item, sortOrder: itemIndex }))
      };
    });
    setActiveIndex(targetIndex);
  }

  async function save() {
    setStatus("saving");
    const response = await fetch(`/api/pages/${initialPage.slug}`, {
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

    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <main className="admin-editor">
      <header className="admin-title-block with-actions">
        <div>
          <Link className="admin-back" href="/admin">
            Dashboard&apos;a dön
          </Link>
          <span>İçerik Yönetimi</span>
          <h1>{moduleLabel ?? page.title}</h1>
          <p>{moduleDescription ?? "Sayfa bilgileri, SEO alanları, bölüm metinleri ve tekrar eden kart öğeleri."}</p>
        </div>
        <div className="admin-page-actions">
          <Link className="admin-secondary-button" href={publicHref}>
            Önizle
          </Link>
          <button className="admin-primary-button" type="button" onClick={save} disabled={status === "saving"}>
            {status === "saving" ? "Kaydediliyor" : "Kaydet"}
          </button>
        </div>
      </header>
      {status === "saved" && <div className="admin-success">Sayfa kaydedildi.</div>}
      {status === "error" && <div className="admin-warning">Kaydedilemedi. Veritabanı bağlantısını ve oturumu kontrol edin.</div>}
      <section className="admin-editor-grid">
        <aside className="admin-panel admin-editor-sidebar">
          <div className="admin-section-heading compact-heading">
            <div>
              <span>Sayfa Akışı</span>
              <h2>Bölümler</h2>
            </div>
          </div>
          <button className="admin-primary-button full" type="button" onClick={addSection}>
            Bölüm Ekle
          </button>
          <div className="section-tabs">
            {page.sections.map((section, index) => (
              <button
                className={index === activeIndex ? "active" : ""}
                key={`${section.type}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                <span>{index + 1}</span>
                <strong>{section.title}</strong>
                <small>{sectionTypeLabels[section.type] ?? section.type}</small>
              </button>
            ))}
          </div>
        </aside>
        <div className="admin-panel admin-form">
          <div className="admin-section-heading compact-heading">
            <div>
              <span>Sayfa & SEO</span>
              <h2>Genel Bilgiler</h2>
            </div>
          </div>
          <div className="admin-two-col">
            <label>
              Başlık
              <input value={page.title} onChange={(event) => updatePageField("title", event.target.value)} />
            </label>
            <label>
              Slug
              <input value={page.slug} onChange={(event) => updatePageField("slug", event.target.value)} />
            </label>
          </div>
          <label>
            Açıklama
            <textarea value={page.description ?? ""} onChange={(event) => updatePageField("description", event.target.value)} rows={3} />
          </label>
          <div className="admin-two-col">
            <label>
              SEO Başlığı
              <input value={page.seoTitle ?? ""} onChange={(event) => updatePageField("seoTitle", event.target.value)} />
            </label>
            <label>
              Durum
              <select value={page.status} onChange={(event) => updatePageField("status", event.target.value as SitePage["status"])}>
                <option value="PUBLISHED">Yayında</option>
                <option value="DRAFT">Taslak</option>
              </select>
            </label>
          </div>
          <label>
            SEO Açıklaması
            <textarea
              value={page.seoDescription ?? ""}
              onChange={(event) => updatePageField("seoDescription", event.target.value)}
              rows={3}
            />
          </label>
        </div>
        {activeSection && (
          <section className="admin-panel admin-form admin-section-editor">
            <div className="section-editor-head">
              <div className="admin-section-heading compact-heading">
                <div>
                  <span>{sectionTypeLabels[activeSection.type] ?? activeSection.type}</span>
                  <h2>Aktif Bölüm</h2>
                </div>
              </div>
              <div className="admin-mini-actions">
                <button type="button" onClick={() => moveSection(activeIndex, -1)}>
                  Yukarı
                </button>
                <button type="button" onClick={() => moveSection(activeIndex, 1)}>
                  Aşağı
                </button>
                <button type="button" onClick={() => removeSection(activeIndex)}>
                  Sil
                </button>
              </div>
            </div>
            <div className="admin-two-col">
              <label>
                Tip
                <select value={activeSection.type} onChange={(event) => updateSection(activeIndex, { type: event.target.value })}>
                  {sectionTypes.map((type) => (
                    <option key={type} value={type}>
                      {sectionTypeLabels[type] ?? type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Üst Etiket
                <input
                  value={activeSection.eyebrow ?? ""}
                  onChange={(event) => updateSection(activeIndex, { eyebrow: event.target.value })}
                />
              </label>
            </div>
            <label>
              Bölüm Başlığı
              <input value={activeSection.title} onChange={(event) => updateSection(activeIndex, { title: event.target.value })} />
            </label>
            <label>
              Alt Başlık
              <input value={activeSection.subtitle ?? ""} onChange={(event) => updateSection(activeIndex, { subtitle: event.target.value })} />
            </label>
            <label>
              Metin
              <textarea value={activeSection.body ?? ""} onChange={(event) => updateSection(activeIndex, { body: event.target.value })} rows={4} />
            </label>
            <ImageUploadField
              label="Bölüm / Banner Görseli"
              value={activeSection.mediaUrl ?? ""}
              onChange={(value) => updateSection(activeIndex, { mediaUrl: value })}
            />
            <div className="admin-two-col">
              <label>
                CTA Metni
                <input value={activeSection.ctaLabel ?? ""} onChange={(event) => updateSection(activeIndex, { ctaLabel: event.target.value })} />
              </label>
              <label>
                CTA Linki
                <input value={activeSection.ctaHref ?? ""} onChange={(event) => updateSection(activeIndex, { ctaHref: event.target.value })} />
              </label>
            </div>
            <div className="items-editor">
              <div className="section-editor-head">
                <div className="admin-section-heading compact-heading">
                  <div>
                    <span>Kart / Liste İçeriği</span>
                    <h3>Tekrar Eden Öğeler</h3>
                  </div>
                </div>
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={() => updateSection(activeIndex, { items: [...(activeSection.items ?? []), createItem()] })}
                >
                  Öğe Ekle
                </button>
              </div>
              {(activeSection.items ?? []).map((item, itemIndex) => (
                <div className="item-editor" key={`${item.title}-${itemIndex}`}>
                  <label>
                    Başlık
                    <input value={item.title} onChange={(event) => updateItem(activeIndex, itemIndex, { title: event.target.value })} />
                  </label>
                  <label>
                    Metin
                    <textarea value={item.text ?? ""} onChange={(event) => updateItem(activeIndex, itemIndex, { text: event.target.value })} rows={3} />
                  </label>
                  <div className="admin-two-col">
                    <label>
                      Meta / Tarih / Kategori
                      <input value={item.meta ?? ""} onChange={(event) => updateItem(activeIndex, itemIndex, { meta: event.target.value })} />
                    </label>
                    <label>
                      Link
                      <input value={item.href ?? ""} onChange={(event) => updateItem(activeIndex, itemIndex, { href: event.target.value })} />
                    </label>
                  </div>
                  <div className="admin-two-col">
                    <ImageUploadField
                      label="Öğe Görseli"
                      value={item.image ?? ""}
                      onChange={(value) => updateItem(activeIndex, itemIndex, { image: value })}
                      hint="Önerilen kart görseli: 1200x800 px. Maksimum 8 MB. Sistem WebP’ye çevirir."
                    />
                    <label>
                      SEO Etiketi
                      <input
                        value={item.label ?? ""}
                        onChange={(event) => updateItem(activeIndex, itemIndex, { label: event.target.value })}
                        placeholder="Örn: liderlik, koçluk, nefes"
                      />
                    </label>
                  </div>
                  <button
                    className="admin-danger-button"
                    type="button"
                    onClick={() =>
                      updateSection(activeIndex, {
                        items: (activeSection.items ?? []).filter((_, currentItemIndex) => currentItemIndex !== itemIndex)
                      })
                    }
                  >
                    Öğeyi Sil
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
