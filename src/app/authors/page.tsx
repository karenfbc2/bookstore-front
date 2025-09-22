"use client";

import { useAuthors } from "../../hooks/useAuthors";
import AuthorCard from "../../components/AuthorCard";

export default function AuthorsPage() {
  const { authors, loaded, error } = useAuthors(true);

  if (!loaded) return <p>Cargando…</p>;
  if (error)   return <p className="text-red-600">Error: {error}</p>;
  if (!authors?.length) return <p>No hay autores.</p>;

  return (
    <div className="grid gap-4">
      {authors.map(a => <AuthorCard key={a.id} author={a} />)}
    </div>
  );
}
