"use client";

import { Author } from "../types/author";
import { useAuthors } from "../hooks/useAuthors";
import Link from "next/link";

export default function AuthorCard({ author }: { author: Author }) {
  const { remove } = useAuthors(false);

  return (
    <div className="rounded-2xl border p-4 flex gap-4 items-start">
      <img
        src={author.image || "/placeholder.png"}
        alt={author.name}
        width={96}
        height={96}
        className="rounded object-cover aspect-square"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{author.name}</h3>
        <p className="text-sm text-neutral-600">{author.description}</p>
        <p className="text-xs mt-1">Nació: {author.birthDate?.slice(0, 10)}</p>

        {author.books?.length > 0 && (
        <div className="mt-2 text-xs">
          <p className="font-semibold">Libros:</p>
          <ul className="list-disc list-inside">
            {author.books.map(b => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        </div>
      )}


        {author.prizes?.length > 0 && (
          <div className="mt-2 text-xs">
            <p className="font-semibold">Premios:</p>
            <ul className="list-disc list-inside">
              {author.prizes.map(p => (
                <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>
        )}


        {/* Botones de acción */}
        <div className="mt-3 flex gap-2">
          <Link
            href={`/authors/${author.id}/edit`}
            className="px-3 py-1 border rounded hover:bg-neutral-100"
          >
            Editar
          </Link>
          <button
            onClick={() => author.id && remove(author.id)}
            className="px-3 py-1 border rounded text-red-700 hover:bg-red-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
