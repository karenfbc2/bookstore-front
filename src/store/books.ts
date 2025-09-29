import { create } from "zustand";
import { Book } from "../types/book";
import { api } from "../lib/api";
import { Review } from "../types/review";

type State = {
  books: Book[];
  loaded: boolean;
  error?: string;
  fetchAll: () => Promise<void>;
  create: (a: Book) => Promise<Book>;
  update: (id: number, a: Book) => Promise<Book>;
  remove: (id: number) => Promise<void>;

  fetchReviews: (bookId: number) => Promise<void>;
  addReview: (bookId: number, r: Review) => Promise<Review>;
  removeReview: (bookId: number, reviewId: number) => Promise<void>;
};

export const useBooksStore = create<State>((set, get) => ({
  books: [],
  loaded: false,
  async fetchAll() {
    try {
      const data = await api<Book[]>("/books");
      set({ books: data, loaded: true, error: undefined });
    } catch (e: any) {
      set({ error: e.message, loaded: true });
    }
  },
  async create(a) {
    const bookWithEditorial = {
    ...a,
    editorial: "Norma"
    };
    
    const created = await api<Book>("/books", {
    method: "POST",
    body: JSON.stringify(bookWithEditorial),
    });
    set({ books: [created, ...get().books] });
    return created;
  },
  async update(id, a) {
    const updated = await api<Book>(`/books/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...a, id }),
    });
    set({
      books: get().books.map((x) => (x.id === id ? updated : x)),
    });
    return updated;
  },
  async remove(id) {
    await api<void>(`/books/${id}`, { method: "DELETE" }); 
    set({ books: get().books.filter((x) => x.id !== id) });
  },

  async fetchReviews(bookId) {
    const reviews = await api<Review[]>(`/books/${bookId}/reviews`);
    set({
      books: get().books.map((b) =>
        b.id === bookId ? { ...b, reviews } : b
      ),
    });
  },

  async addReview(bookId, r) {
    const created = await api<Review>(`/books/${bookId}/reviews`, {
      method: "POST",
      body: JSON.stringify(r),
    });
    set({
      books: get().books.map((b) =>
        b.id === bookId
          ? { ...b, reviews: [...(b.reviews || []), created] }
          : b
      ),
    });
    return created;
  },

  async removeReview(bookId, reviewId) {
    await api<void>(`/books/${bookId}/reviews/${reviewId}`, {
      method: "DELETE",
    });
    set({
      books: get().books.map((b) =>
        b.id === bookId
          ? { ...b, reviews: (b.reviews || []).filter((r) => r.id !== reviewId) }
          : b
      ),
    });
  },
  
}));
