"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "../../../../hooks/useAuthors";
import AuthorForm from "../../../../components/AuthorForm";

export default function EditAuthorPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { authors, update } = useAuthors(true);
  const router = useRouter();

  const author = authors.find(a => a.id === id);
  if (!author) return <p>Cargando autor...</p>;

  async function onSubmit(data: any) {
    await update(id, data);
    router.push("/authors");
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Editar Autor</h2>
      <AuthorForm defaultValues={author} onSubmit={onSubmit} submitLabel="Guardar cambios" />
    </>
  );
}
