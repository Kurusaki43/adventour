import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";
import AuthForm from "./AuthForm";
import {
  useAuthError,
  useAuthLoading,
  useForgotPassword,
} from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema, type ForgotPasswordData } from "../auth.schema";
import RHFInput from "@/components/RHF/RHFInput";

const ForgotPasswordForm = () => {
  const loading = useAuthLoading();
  const error = useAuthError();
  const navigate = useNavigate();
  const forgotPassword = useForgotPassword();
  const form = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const handleSubmit = async (data: ForgotPasswordData) =>
    await forgotPassword(data, navigate);
  return (
    <AuthForm
      form={form}
      title="Forgot Password"
      description="Enter your email to reset your password."
      onSubmit={handleSubmit}
      buttonLabel="Send Reset Link"
      error={error ?? undefined}
      loading={loading}
    >
      <RHFInput
        control={form.control}
        name="email"
        type="email"
        className="glassy-input"
        icon={MdEmail}
        placeholder="Email"
      />
    </AuthForm>
  );
};

export default ForgotPasswordForm;
