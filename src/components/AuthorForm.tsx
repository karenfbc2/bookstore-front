"use client";

import { Author, } from "../types/author";
import { authorSchema, AuthorFormData } from "../schemas/authorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  defaultValues?: Partial<Author>;
  onSubmit: (data: AuthorFormData) => Promise<void> | void;
  submitLabel?: string;
};

export default function AuthorForm({ defaultValues, onSubmit, submitLabel = "Guardar" }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<AuthorFormData>({
      resolver: zodResolver(authorSchema),
      defaultValues: {
        name: defaultValues?.name ?? "",
        description: defaultValues?.description ?? "",
        image: defaultValues?.image ?? "",
        birthDate: (defaultValues?.birthDate ?? "").slice(0, 10),
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input className="w-full border rounded p-2" {...register("name")} />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea className="w-full border rounded p-2" rows={3} {...register("description")} />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">URL Imagen</label>
        <input className="w-full border rounded p-2" {...register("image")} />
        {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Fecha de nacimiento</label>
        <input type="date" className="w-full border rounded p-2" {...register("birthDate")} />
        {errors.birthDate && <p className="text-red-600 text-sm">{errors.birthDate.message}</p>}
      </div>

      <button disabled={isSubmitting} className="px-4 py-2 rounded bg-black text-white">
        {submitLabel}
      </button>
    </form>
  );
}
