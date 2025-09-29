"use client";

import { useState } from "react";

export default function ReviewForm({ onSubmit }: { onSubmit: (r: { source: string; text: string }) => void }) {
  const [source, setSource] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !text) return;
    onSubmit({ source, text });
    setSource("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
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
      <button type="submit" className="px-3 py-1 bg-black text-white rounded">
        Agregar Review
      </button>
    </form>
  );
}
