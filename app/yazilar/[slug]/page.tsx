import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main className="blog-detail">
        <article className="blog-detail-inner">
          <Link className="blog-back-link" href="/yazilar">
            <ArrowLeft size={16} /> Yazılara Dön
          </Link>
          <header className="blog-detail-head">
            {post.category && <span className="eyebrow">{post.category}</span>}
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
          </header>
          <div className="blog-detail-image">
            {post.image ? <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 980px) 100vw, 920px" /> : null}
          </div>
          <div className="blog-detail-content">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
