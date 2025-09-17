import type { AuthState, AuthActions } from "./auth.types";
import type { StateCreator } from "zustand";
import toast from "react-hot-toast";
import { type User } from "@/features/users/types/user.types";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import axiosInstance from "@/shared/api/axios";
import { STORAGE_KEY } from "@/constants/globals";

export const createAuthSlice: StateCreator<
  AuthState & AuthActions,
  [],
  [],
  AuthState & AuthActions
> = (set) => ({
  accessToken: null,
  user: null,
  loading: false,
  error: null,
  persist: localStorage.getItem("persist") === "true",
  setAuth: (accessToken, user) => set({ accessToken, user }),
  reset: () => set({ error: null, loading: false }),
  register: async (data, navigate, resetForm) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      if (res.status === 201) {
        toast.success(
          "Registration successful, Check your email box to active your account"
        );
        resetForm?.();
        navigate?.("/login", { state: { email: data.email } });
      }
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post<{
        accessToken: string;
        user: User;
        message: string;
      }>("/auth/login", data);
      const { accessToken, user } = res.data;
      set({ accessToken, user });
      toast.success(`Hello, ${user.name}`);
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },

  logout: async (navigate) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.get("/auth/logout");
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      localStorage.removeItem(STORAGE_KEY);

      set({
        accessToken: null,
        user: null,
        loading: false,
        error: null,
      });
      navigate?.("/", { replace: true });
    }
  },

  forgotPassword: async (data, navigate) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      toast.success(res.data.message);
      navigate?.("/login");
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (token, data, navigate) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.patch(
        `/auth/reset-password/${token}`,
        data
      );
      toast.success(res.data.message);
      navigate?.("/login");
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },

  verifyEmail: async (token) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/auth/verify-email/${token}`);
      toast.success(res.data.message);
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },
});
