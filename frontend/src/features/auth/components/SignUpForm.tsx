import AuthForm from "./AuthForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import RHFInput from "@/components/RHF/RHFInput";
import {
  useAuthError,
  useAuthLoading,
  useAuthUser,
  useRegister,
} from "../store/useAuth";
import { signUpSchema, type SignUpData } from "../auth.schema";

const SignUpForm = () => {
  const register = useRegister();
  const error = useAuthError();
  const loading = useAuthLoading();
  const navigate = useNavigate();
  const user = useAuthUser();
  const form = useForm<SignUpData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const handleSubmit = async (data: SignUpData) =>
    await register(data, navigate, form.reset);
  if (user) return <Navigate to="/" replace />;
  return (
    <AuthForm
      title="Sign Up"
      description="Please enter your details to create an account."
      form={form}
      onSubmit={handleSubmit}
      error={error ?? undefined}
      loading={loading}
      buttonLabel="Sign Up"
    >
      <RHFInput
        control={form.control}
        name="name"
        type="text"
        className="glassy-input"
        placeholder="Name"
        icon={FaUser}
      />
      <RHFInput
        control={form.control}
        name="email"
        type="email"
        className="glassy-input"
        placeholder="Email"
        icon={MdEmail}
      />
      <RHFInput
        control={form.control}
        name="password"
        type="password"
        className="glassy-input"
        placeholder="Password"
        icon={FaLock}
      />
      <RHFInput
        control={form.control}
        name="confirmPassword"
        type="password"
        className="glassy-input"
        placeholder="Confirm Password"
        icon={FaLock}
      />
    </AuthForm>
  );
};

export default SignUpForm;
