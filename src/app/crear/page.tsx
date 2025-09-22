"use client";

import { useRouter } from "next/navigation";
import AuthorForm from "../../components/AuthorForm";
import { useAuthors } from "../../hooks/useAuthors";

export default function CrearAutorPage() {
  const { create } = useAuthors(false);
  const router = useRouter();

  async function onSubmit(data: any) {
    await create(data);        
    router.push("/authors");   
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Crear Autor</h2>
      <AuthorForm onSubmit={onSubmit} submitLabel="Crear" />
    </>
  );
}
