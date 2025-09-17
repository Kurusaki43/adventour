import { useStore } from "zustand";
import { authStore } from "./auth.store";
import type { AuthState, AuthActions } from "./auth.types";

export const useAuthStore = <T>(
  selector: (state: AuthState & AuthActions) => T
): T => useStore(authStore, selector);

export const useAccessToken = () => useAuthStore((s) => s.accessToken);
export const useAuthUser = () => useAuthStore((s) => s.user);
export const useAuthError = () => useAuthStore((s) => s.error);
export const useAuthLoading = () => useAuthStore((s) => s.loading);

export const useLogin = () => useAuthStore((s) => s.login);
export const useLogout = () => useAuthStore((s) => s.logout);
export const useRegister = () => useAuthStore((s) => s.register);
export const useVerifyEmail = () => useAuthStore((s) => s.verifyEmail);
export const useResetPassword = () => useAuthStore((s) => s.resetPassword);
export const useForgotPassword = () => useAuthStore((s) => s.forgotPassword);
export const useSetAuth = () => useAuthStore((s) => s.setAuth);
export const useReset = () => useAuthStore((s) => s.reset);
