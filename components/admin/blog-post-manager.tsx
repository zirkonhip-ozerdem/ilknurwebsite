"use client";

import { useMemo, useState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type AdminBlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  category?: string | null;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: "DRAFT" | "PUBLISHED";
  updatedAt?: string | null;
};

type BlogPostManagerProps = {
  initialPosts: AdminBlogPost[];
};

const emptyPost: AdminBlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "",
  image: "",
  seoTitle: "",
  seoDescription: "",
  status: "PUBLISHED"
};

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogPostManager({ initialPosts }: BlogPostManagerProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedId, setSelectedId] = useState<string | "new">(initialPosts[0]?.id ?? "new");
  const [draft, setDraft] = useState<AdminBlogPost>(initialPosts[0] ?? emptyPost);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const selectedPost = useMemo(() => posts.find((post) => post.id === selectedId), [posts, selectedId]);

  function selectPost(post: AdminBlogPost) {
    setSelectedId(post.id ?? "new");
    setDraft(post);
    setStatus("idle");
  }

  function createPost() {
    setSelectedId("new");
    setDraft(emptyPost);
    setStatus("idle");
  }

  function updateDraft(patch: Partial<AdminBlogPost>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  async function savePost() {
    setStatus("saving");
    const payload = {
      ...draft,
      slug: draft.slug || slugify(draft.title)
    };

    const response = await fetch(draft.id ? `/api/admin/blog-posts/${draft.id}` : "/api/admin/blog-posts", {
      method: draft.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const body = (await response.json()) as { post: AdminBlogPost };
    setDraft(body.post);
    setSelectedId(body.post.id ?? "new");
    setPosts((current) => {
      const existingIndex = current.findIndex((post) => post.id === body.post.id);
      if (existingIndex === -1) {
        return [body.post, ...current];
      }

      const nextPosts = [...current];
      nextPosts[existingIndex] = body.post;
      return nextPosts;
    });
    setStatus("saved");
  }

  async function deletePost() {
    if (!draft.id) {
      createPost();
      return;
    }

    const confirmed = window.confirm("Bu yazıyı silmek istiyor musunuz?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/blog-posts/${draft.id}`, { method: "DELETE" });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const nextPosts = posts.filter((post) => post.id !== draft.id);
    setPosts(nextPosts);
    setSelectedId(nextPosts[0]?.id ?? "new");
    setDraft(nextPosts[0] ?? emptyPost);
    setStatus("saved");
  }

  return (
    <div className="admin-editor-grid admin-blog-editor">
      <aside className="admin-panel admin-sidebar">
        <div className="admin-section-heading compact-heading">
          <div>
            <h2>Yazılar</h2>
            <p>Blog kayıtları public yazılar sayfasında listelenir.</p>
          </div>
          <button className="admin-primary-button" type="button" onClick={createPost}>
            Yeni Yazı
          </button>
        </div>

        <div className="admin-blog-list">
          {posts.map((post) => (
            <button className={post.id === selectedPost?.id ? "admin-blog-row active" : "admin-blog-row"} key={post.id ?? post.slug} type="button" onClick={() => selectPost(post)}>
              <strong>{post.title}</strong>
              <span>{post.status === "PUBLISHED" ? "Yayında" : "Taslak"}</span>
            </button>
          ))}
          {posts.length === 0 && <p className="admin-muted">Henüz yazı eklenmedi.</p>}
        </div>
      </aside>

      <section className="admin-panel admin-form">
        <div className="admin-section-heading">
          <div>
            <h2>{draft.id ? "Yazıyı Düzenle" : "Yeni Yazı"}</h2>
            <p>Yazı içeriği, liste kartı ve SEO bilgileri buradan yönetilir.</p>
          </div>
          <div className="admin-actions">
            <button className="admin-secondary-button" type="button" onClick={deletePost}>
              Sil
            </button>
            <button className="admin-primary-button" type="button" onClick={savePost} disabled={status === "saving"}>
              {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>

        {status === "saved" && <p className="admin-success compact">Yazı kaydedildi.</p>}
        {status === "error" && <p className="admin-warning compact">Kaydedilemedi. Slug benzersiz olmalı ve veritabanı bağlantısı aktif olmalı.</p>}

        <div className="admin-two-col">
          <label>
            Başlık
            <input
              value={draft.title}
              onChange={(event) => {
                const title = event.target.value;
                updateDraft({ title, slug: draft.id || draft.slug ? draft.slug : slugify(title) });
              }}
            />
          </label>
          <label>
            Slug
            <input value={draft.slug} onChange={(event) => updateDraft({ slug: slugify(event.target.value) })} />
          </label>
        </div>

        <div className="admin-two-col">
          <label>
            Kategori
            <input value={draft.category ?? ""} onChange={(event) => updateDraft({ category: event.target.value })} />
          </label>
          <label>
            Durum
            <select value={draft.status} onChange={(event) => updateDraft({ status: event.target.value as AdminBlogPost["status"] })}>
              <option value="PUBLISHED">Yayında</option>
              <option value="DRAFT">Taslak</option>
            </select>
          </label>
        </div>

        <label>
          Kısa Özet
          <textarea rows={3} value={draft.excerpt ?? ""} onChange={(event) => updateDraft({ excerpt: event.target.value })} />
        </label>

        <ImageUploadField
          label="Yazı Görseli"
          value={draft.image}
          onChange={(value) => updateDraft({ image: value })}
          hint="Önerilen ölçü: 1200x800 px, maksimum 8 MB. Sistem görseli otomatik WebP formatına çevirir."
        />

        <label>
          İçerik
          <textarea rows={14} value={draft.content} onChange={(event) => updateDraft({ content: event.target.value })} />
        </label>

        <div className="admin-two-col">
          <label>
            SEO Başlık
            <input value={draft.seoTitle ?? ""} onChange={(event) => updateDraft({ seoTitle: event.target.value })} />
          </label>
          <label>
            SEO Açıklama
            <textarea rows={4} value={draft.seoDescription ?? ""} onChange={(event) => updateDraft({ seoDescription: event.target.value })} />
          </label>
        </div>
      </section>
    </div>
  );
}
