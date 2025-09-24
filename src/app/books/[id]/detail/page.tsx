"use client";

import { useParams, useRouter } from "next/navigation";
import { useBooks } from "../../../../hooks/useBooks";

export default function BookDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { books, update } = useBooks(true);
  const router = useRouter();

  const book = books.find(a => a.id === id);
  if (!book) return <p>Cargando libro...</p>;

  return (
    <div className="rounded-2xl border p-4 flex gap-4 items-start">
      <img
        src={book.image || "/placeholder.png"}
        alt={book.name}
        width={96}
        height={96}
        className="rounded object-cover aspect-square"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{book.name}</h3>
        <h2 className="text-sm text-neutral-600">Description: {book.description}</h2>
        <h2 className="text-xs mt-1">Publishing Date: {book.publishingDate?.slice(0, 10)}</h2>
      </div>
    </div>
  
  );
}
