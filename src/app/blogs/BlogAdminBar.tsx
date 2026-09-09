"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { jost } from "@/lib/fonts";
import { useIsAdmin } from "./useIsAdmin";

export default function BlogAdminBar() {
  const isAdmin = useIsAdmin();

  if (!isAdmin) return null;

  return (
    <div className="flex justify-end mb-6">
      <Link
        href="/blogs/editor"
        className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-[#c89e3a] text-white hover:bg-[#b8922e] transition-all shadow-md hover:shadow-lg"
      >
        <Plus size={20} />
        <span className={`text-sm font-semibold ${jost.className}`}>Add Article</span>
      </Link>
    </div>
  );
}
