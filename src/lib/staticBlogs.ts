import type { Locale } from "@/lib/i18n/config";
import { getBlog1Data, BLOG1_SLUG, BLOG1_PATH } from "@/lib/i18n/getBlog1Data";
import { getBlog2Data, BLOG2_SLUG, BLOG2_PATH } from "@/lib/i18n/getBlog2Data";
import { getBlog3Data, BLOG3_SLUG, BLOG3_PATH } from "@/lib/i18n/getBlog3Data";
import { getBlog4Data, BLOG4_SLUG, BLOG4_PATH } from "@/lib/i18n/getBlog4Data";
import { getBlog5Data, BLOG5_SLUG, BLOG5_PATH } from "@/lib/i18n/getBlog5Data";
import { getBlog6Data, BLOG6_SLUG, BLOG6_PATH } from "@/lib/i18n/getBlog6Data";
import { getBlog7Data, BLOG7_SLUG, BLOG7_PATH } from "@/lib/i18n/getBlog7Data";

export type StaticBlogCard = {
  id: string;
  slug: string;
  path: string;
  title: string;
  description: string;
  featuredImage?: string;
  datePublished: string;
  dateModified: string;
};

export const STATIC_BLOG_SLUGS = [
  BLOG1_SLUG,
  BLOG2_SLUG,
  BLOG3_SLUG,
  BLOG4_SLUG,
  BLOG5_SLUG,
  BLOG6_SLUG,
  BLOG7_SLUG,
] as const;

export function getStaticBlogCards(locale: Locale = "en"): StaticBlogCard[] {
  const blog1 = getBlog1Data(locale);
  const blog2 = getBlog2Data(locale);
  const blog3 = getBlog3Data(locale);
  const blog4 = getBlog4Data(locale);
  const blog5 = getBlog5Data(locale);
  const blog6 = getBlog6Data(locale);
  const blog7 = getBlog7Data(locale);

  return [
    {
      id: "blog1",
      slug: BLOG1_SLUG,
      path: BLOG1_PATH,
      title: blog1.hero.title,
      description: blog1.meta.description,
      datePublished: blog1.meta.datePublished,
      dateModified: blog1.meta.dateModified,
    },
    {
      id: "blog2",
      slug: BLOG2_SLUG,
      path: BLOG2_PATH,
      title: blog2.hero.title,
      description: blog2.meta.description,
      datePublished: blog2.meta.datePublished,
      dateModified: blog2.meta.dateModified,
    },
    {
      id: "blog3",
      slug: BLOG3_SLUG,
      path: BLOG3_PATH,
      title: blog3.hero.title,
      description: blog3.meta.description,
      datePublished: blog3.meta.datePublished,
      dateModified: blog3.meta.dateModified,
    },
    {
      id: "blog4",
      slug: BLOG4_SLUG,
      path: BLOG4_PATH,
      title: blog4.hero.title,
      description: blog4.meta.description,
      datePublished: blog4.meta.datePublished,
      dateModified: blog4.meta.dateModified,
    },
    {
      id: "blog5",
      slug: BLOG5_SLUG,
      path: BLOG5_PATH,
      title: blog5.hero.title,
      description: blog5.meta.description,
      datePublished: blog5.meta.datePublished,
      dateModified: blog5.meta.dateModified,
    },
    {
      id: "blog6",
      slug: BLOG6_SLUG,
      path: BLOG6_PATH,
      title: blog6.hero.title,
      description: blog6.meta.description,
      datePublished: blog6.meta.datePublished,
      dateModified: blog6.meta.dateModified,
    },
    {
      id: "blog7",
      slug: BLOG7_SLUG,
      path: BLOG7_PATH,
      title: blog7.hero.title,
      description: blog7.meta.description,
      datePublished: blog7.meta.datePublished,
      dateModified: blog7.meta.dateModified,
    },
  ];
}

export function isStaticBlogSlug(slug: string): boolean {
  return STATIC_BLOG_SLUGS.includes(slug as (typeof STATIC_BLOG_SLUGS)[number]);
}
