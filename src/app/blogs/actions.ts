"use server";

import { revalidatePath } from "next/cache";

// Invalidates the cached blog data (used by the server-rendered listing,
// the [slug] pages, and the sitemap) so admin create/edit/delete changes
// show up immediately instead of waiting for the time-based revalidation.
export async function refreshBlogs() {
  revalidatePath("/blogs");
  // The admin dashboard reads uncached, but this keeps its rendered output
  // from being served stale after an edit made elsewhere.
  revalidatePath("/blogs/manage");
  revalidatePath("/blogs/[slug]", "page");
  revalidatePath("/[locale]/blogs", "page");
  revalidatePath("/[locale]/blogs/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
