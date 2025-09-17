import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthActions, AuthState } from "./auth.types";
import { createAuthSlice } from "./auth.slice";
import { STORAGE_KEY } from "@/constants/globals";

export const authStore = create<AuthState & AuthActions>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
