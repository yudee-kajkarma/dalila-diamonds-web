import BlogsManageTable from "./BlogsManageTable";

/**
 * Admin dashboard shell.
 *
 * The table fetches its own data from the admin endpoint, because that is the
 * only one that returns drafts and soft-deleted articles — the public endpoint
 * deliberately hides both. The admin endpoint authenticates with a bearer
 * token held in the browser, so the fetch has to happen client-side.
 */
export const dynamic = "force-dynamic";

export default function BlogsManagePage() {
  return <BlogsManageTable />;
}
