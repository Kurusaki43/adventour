import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./AuthForm";
import {
  useAuthError,
  useAuthLoading,
  useResetPassword,
} from "../store/useAuth";

import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordSchema, type ResetPasswordData } from "../auth.schema";
import RHFInput from "@/components/RHF/RHFInput";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const error = useAuthError();
  const loading = useAuthLoading();
  const resetPassword = useResetPassword();
  const form = useForm<ResetPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });
  const handleSubmit = async (data: ResetPasswordData) => {
    if (token) await resetPassword(token, data, navigate);
  };
  return (
    <AuthForm
      form={form}
      title="Reset Password"
      description="Enter your new password."
      onSubmit={handleSubmit}
      buttonLabel="Reset Password"
      loading={loading}
      error={error ?? undefined}
    >
      <RHFInput
        control={form.control}
        name="password"
        type="password"
        className="glassy-input"
        placeholder="New Password"
      />
      <RHFInput
        control={form.control}
        name="confirmPassword"
        type="password"
        className="glassy-input"
        placeholder="Confirm Password"
      />
    </AuthForm>
  );
};

export default ResetPasswordForm;
