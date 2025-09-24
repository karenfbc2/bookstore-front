import { create } from "zustand";
import { Book } from "../types/book";
import { api } from "../lib/api";

type State = {
  books: Book[];
  loaded: boolean;
  error?: string;
  fetchAll: () => Promise<void>;
  create: (a: Book) => Promise<Book>;
  update: (id: number, a: Book) => Promise<Book>;
  remove: (id: number) => Promise<void>;
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
    const created = await api<Book>("/books", {
      method: "POST",
      body: JSON.stringify(a),
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
}));
