"use client";

import { useParams, useRouter } from "next/navigation";
import { useBooks } from "../../../../hooks/useBooks";
import { useBooksStore } from "../../../../store/books";
import { useState } from "react";

export default function BookDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { books, update } = useBooks(true);
  const { addReview } = useBooksStore();
  const router = useRouter();

  const book = books.find(a => a.id === id);
  const [source, setSource] = useState("");
  const [text, setText] = useState("");

  if (!book) return <p>Cargando libro...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !text) return;
    await addReview(id, { source, text });
    setSource("");
    setText("");
  };

  return (
    <div className="rounded-2xl border p-4 flex gap-4 items-start">
      <img
        src={book.image || "/placeholder.png"}
        alt={book.name}
        width={396}
        height={450}
        className="rounded object-cover aspect-auto"
      />
      <div className="flex-1 p-30">
        <h3 className="text-3xl font-semibold">{book.name}</h3>
        <h2 className="text-xl text-neutral-600 mt-10">Description: {book.description}</h2>
        <h2 className="text-xl mt-10">Publishing Date: {book.publishingDate?.slice(0, 10)}</h2>
        <h2 className="text-xl mt-10">Isbn: {book.isbn}</h2>

        {book.editorial && (
          <h2 className="text-xl mt-10">
            Editorial: {typeof book.editorial === "string" 
              ? book.editorial 
              : book.editorial.name}
          </h2>
        )}


        {book.reviews?.length > 0 && (
          <div className="mt-2 text-xs">
            <h2 className="text-xl mt-10">Reseñas:</h2>
            <ul className="list-disc list-inside">
              {book.reviews.map(b => (
                <li key={b.id}>{b.description}</li>
              ))}
            </ul>
          </div>
       )}

       {/* Formulario para nueva reseña */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-2">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 w-full"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <textarea
            placeholder="Escribe tu reseña..."
            className="border p-2 w-full"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1 bg-black text-white rounded"
          >
            Agregar Reseña
          </button>
        </form>
      
     </div>
  </div>
  );

}
