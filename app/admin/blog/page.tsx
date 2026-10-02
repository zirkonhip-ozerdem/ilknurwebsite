import { BlogPostManager } from "@/components/admin/blog-post-manager";
import { requireAdmin } from "@/lib/auth";
import { getAdminBlogPosts } from "@/lib/blog";

export default async function AdminBlogPage() {
  await requireAdmin();
  const posts = await getAdminBlogPosts();
  const serializablePosts = posts.map((post) => ({
    ...post,
    status: post.status as "DRAFT" | "PUBLISHED",
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt?.toISOString() ?? null,
    updatedAt: post.updatedAt?.toISOString() ?? null
  }));

  return (
    <div className="admin-content-stack">
      <div className="admin-title-block">
        <span>İçerik Yönetimi</span>
        <h1>Yazılar / Blog</h1>
        <p>Yazılar sayfasında görünen blog içeriklerini, detay sayfalarını ve SEO alanlarını yönetin.</p>
      </div>
      <BlogPostManager initialPosts={serializablePosts} />
    </div>
  );
}
