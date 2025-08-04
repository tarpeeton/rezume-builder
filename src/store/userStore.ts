import { create } from "zustand";

interface IUserStore {
  fullName: string;
  email: string;
  name: string;
  picture: string;

  setFullName: (fullName: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPicture: (picture: string) => void;

  setUser: (user: Partial<IUserStore>) => void;
}

export const useUserStore = create<IUserStore>((set , get) => ({
  fullName: "",
  email: "",
  name: "",
  picture: "",

  setFullName: (fullName) => set({ fullName }),
  setEmail: (email) => set({ email }),
  setName: (name) => set({ name }),
  setPicture: (picture) => set({ picture }),

  setUser: (user) => set((state) => ({ ...state, ...user })),
}));
