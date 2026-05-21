"use server";

import { revalidatePath } from "next/cache";

// Invalidates the cached blog data (used by the server-rendered listing,
// the [slug] pages, and the sitemap) so admin create/edit/delete changes
// show up immediately instead of waiting for the time-based revalidation.
export async function refreshBlogs() {
  revalidatePath("/blogs");
  revalidatePath("/blogs/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
