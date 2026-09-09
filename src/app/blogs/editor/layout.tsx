import { Metadata } from "next";

/**
 * The parent /blogs layout sets a canonical pointing at the public blog index.
 * This is an admin screen, so it overrides that and keeps itself out of the
 * index entirely.
 */
export const metadata: Metadata = {
  title: "Article editor - Dalila Diamonds",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {},
};

export default function BlogEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
