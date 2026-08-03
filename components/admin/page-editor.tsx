"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SectionItem, SitePage, SiteSection } from "@/lib/types";

const sectionTypes = [
  "hero",
  "stats",
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
  "cta"
];

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

export function PageEditor({ initialPage }: { initialPage: SitePage }) {
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
      <header className="admin-header">
        <div>
          <Link className="admin-back" href="/admin">
            ← Sayfalara dön
          </Link>
          <h1>{page.title}</h1>
          <p>Sayfa bilgileri, SEO alanları, bölüm metinleri ve tekrar eden kart öğeleri.</p>
        </div>
        <div className="admin-actions">
          <Link className="button button-light" href={publicHref}>
            Önizle
          </Link>
          <button className="button button-dark" type="button" onClick={save} disabled={status === "saving"}>
            {status === "saving" ? "Kaydediliyor" : "Kaydet"}
          </button>
        </div>
      </header>
      {status === "saved" && <div className="admin-success">Sayfa kaydedildi.</div>}
      {status === "error" && <div className="admin-warning">Kaydedilemedi. Veritabanı bağlantısını ve oturumu kontrol edin.</div>}
      <section className="admin-editor-grid">
        <aside className="admin-card admin-sidebar">
          <h2>Bölümler</h2>
          <button className="button button-dark" type="button" onClick={addSection}>
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
                {section.title}
              </button>
            ))}
          </div>
        </aside>
        <div className="admin-card admin-form">
          <h2>Sayfa Ayarları</h2>
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
          <section className="admin-card admin-form admin-section-editor">
            <div className="section-editor-head">
              <h2>Aktif Bölüm</h2>
              <div>
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
                      {type}
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
                <h3>Tekrar Eden Öğeler</h3>
                <button
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
                      Meta
                      <input value={item.meta ?? ""} onChange={(event) => updateItem(activeIndex, itemIndex, { meta: event.target.value })} />
                    </label>
                    <label>
                      Link
                      <input value={item.href ?? ""} onChange={(event) => updateItem(activeIndex, itemIndex, { href: event.target.value })} />
                    </label>
                  </div>
                  <button
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
