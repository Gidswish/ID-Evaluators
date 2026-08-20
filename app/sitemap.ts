import type { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/sectors",
    "/contact",
    "/case-studies",
    "/knowledge-hub",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [{ data: evaluations }, { data: posts }] = await Promise.all([
    supabaseAdmin
      .from("evaluations")
      .select("slug")
      .eq("is_published", true),
    supabaseAdmin
      .from("blog_posts")
      .select("slug, published_at")
      .eq("is_published", true),
  ]);

  const caseStudyRoutes: MetadataRoute.Sitemap = (evaluations || []).map(
    (ev) => ({
      url: `${SITE_URL}/case-studies/${ev.slug}`,
      lastModified: new Date(),
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${SITE_URL}/knowledge-hub/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
