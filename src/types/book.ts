import { Review } from "./review";

export const DEFAULT_EDITORIAL = "Norma";

export interface Book {
  id?: number;
  name: string;
  isbn: string;
  description: string;
  image: string;
  publishingDate: string; // Formato "YYYY-MM-DD"
  editorial?: string;
  reviews?: Review[];
}
