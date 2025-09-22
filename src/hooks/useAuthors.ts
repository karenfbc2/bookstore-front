"use client";

import { useEffect } from "react";
import { useAuthorsStore } from "../store/authors";

export function useAuthors(auto = true) {
  const { authors, loaded, error, fetchAll, create, update, remove } = useAuthorsStore();
  useEffect(() => { if (auto && !loaded) fetchAll(); }, [auto, loaded, fetchAll]);
  return { authors, loaded, error, fetchAll, create, update, remove };
}
