import { Metadata } from "next";

/**
 * The parent /blogs layout sets a canonical pointing at the public blog index.
 * This is an admin screen, so it overrides that and stays out of the index.
 */
export const metadata: Metadata = {
  title: "Manage articles - Dalila Diamonds",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {},
};

export default function BlogsManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
