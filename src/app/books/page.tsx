"use client";

import { useBooks } from "../../hooks/useBooks";
import BookCard from "../../components/BookCard";

export default function BooksPage() {
  const { books, loaded, error } = useBooks(true);

  if (!loaded) return <p>Cargando…</p>;
  if (error)   return <p className="text-red-600">Error: {error}</p>;
  if (!books?.length) return <p>No hay libros.</p>;

  return (
    <div className="grid gap-4">
      {books.map(a => <BookCard key={a.id} book={a} />)}
    </div>
  );
}