import { create } from "zustand";

type Mode = "CREATE" | "UPDATE";

interface EntityModalState<T> {
  isOpen: boolean;
  mode: Mode;
  data?: T;
  openCreate: () => void;
  openUpdate: (data: T) => void;
  closeModal: () => void;
}

export const createEntityModal = <T>() =>
  create<EntityModalState<T>>((set) => ({
    isOpen: false,
    mode: "CREATE",
    data: undefined,
    openCreate: () => set({ isOpen: true, mode: "CREATE", data: undefined }),
    openUpdate: (data) => set({ isOpen: true, mode: "UPDATE", data }),
    closeModal: () => set({ isOpen: false, data: undefined }),
  }));
