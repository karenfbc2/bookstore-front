"use client";

import { Book } from "../types/book";
import { useBooks } from "../hooks/useBooks";
import Link from "next/link";

export default function BookCard({ book }: { book: Book }) {
  const { remove } = useBooks(false);

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
        <p className="text-sm text-neutral-600">Description: {book.description}</p>
        <p className="text-xs mt-1">Publishing Date: {book.publishingDate?.slice(0, 10)}</p>

        {/* Botones de acción */}
        <div className="mt-3 flex gap-2">
          <Link
            href={`/books/${book.id}/detalle`}
            className="px-3 py-1 border rounded hover:bg-neutral-100"
          >
            Ver
          </Link>
        </div>
      </div>
    </div>
  );
}
