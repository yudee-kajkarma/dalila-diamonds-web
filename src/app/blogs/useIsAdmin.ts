"use client";

import { useEffect, useState } from "react";

// Reads admin status from localStorage on the client only.
// Returns false during SSR / first paint, so admin-only UI never appears
// in the server-rendered HTML (keeps it out of the indexable markup).
export function useIsAdmin(): boolean {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      setIsAdmin(user.role === "ADMIN" || user.role === "SUPER_ADMIN");
    } catch {
      setIsAdmin(false);
    }
  }, []);

  return isAdmin;
}
