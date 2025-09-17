import type { User } from "@/features/users/types/user.types";
import type {
  SignUpData,
  LoginData,
  ForgotPasswordData,
  ResetPasswordData,
} from "@/features/auth/auth.schema";
import type { NavigateFunction } from "react-router-dom";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  setAuth: (accessToken?: string | null, user?: User | null) => void;
  reset: () => void;
  login: (
    data: LoginData,
    navigate?: NavigateFunction,
    from?: string
  ) => Promise<void>;
  logout: (navigate?: NavigateFunction) => Promise<void>;
  register: (
    data: SignUpData,
    navigate?: NavigateFunction,
    resetForm?: () => void
  ) => Promise<void>;
  forgotPassword: (
    data: ForgotPasswordData,
    navigate?: NavigateFunction
  ) => Promise<void>;
  resetPassword: (
    token: string,
    data: ResetPasswordData,
    navigate?: NavigateFunction
  ) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}
