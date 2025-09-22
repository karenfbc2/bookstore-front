import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  description: z.string().min(1, "Descripción requerida"),
  image: z.string().url("URL de imagen inválida"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato AAAA-MM-DD"),
});
export type AuthorFormData = z.infer<typeof authorSchema>;
