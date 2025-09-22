import { create } from "zustand";
import { Author } from "../types/author";
import { api } from "../lib/api";

type State = {
  authors: Author[];
  loaded: boolean;
  error?: string;
  fetchAll: () => Promise<void>;
  create: (a: Author) => Promise<Author>;
  update: (id: number, a: Author) => Promise<Author>;
  remove: (id: number) => Promise<void>;
};

export const useAuthorsStore = create<State>((set, get) => ({
  authors: [],
  loaded: false,
  async fetchAll() {
    try {
      const data = await api<Author[]>("/authors");
      set({ authors: data, loaded: true, error: undefined });
    } catch (e: any) {
      set({ error: e.message, loaded: true });
    }
  },
  async create(a) {
    const created = await api<Author>("/authors", {
      method: "POST",
      body: JSON.stringify(a),
    });
    set({ authors: [created, ...get().authors] });
    return created;
  },
  async update(id, a) {
    const updated = await api<Author>(`/authors/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...a, id }),
    });
    set({
      authors: get().authors.map((x) => (x.id === id ? updated : x)),
    });
    return updated;
  },
  async remove(id) {
    await api<void>(`/authors/${id}`, { method: "DELETE" }); 
    set({ authors: get().authors.filter((x) => x.id !== id) });
  },
}));
