"use client";

import { useEffect } from "react";
import { useBooksStore } from "../store/books";

export function useBooks(auto = true) {
  const { books, loaded, error, fetchAll, create, update, remove } = useBooksStore();
  useEffect(() => { if (auto && !loaded) fetchAll(); }, [auto, loaded, fetchAll]);
  return { books, loaded, error, fetchAll, create, update, remove };
}
