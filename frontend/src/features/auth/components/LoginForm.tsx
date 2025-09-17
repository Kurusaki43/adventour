import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, Navigate, useLocation } from "react-router-dom";
import AuthForm from "./AuthForm";
import {
  useAuthError,
  useAuthLoading,
  useAuthUser,
  useLogin,
} from "../store/useAuth";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginData } from "../auth.schema";
import RHFInput from "@/components/RHF/RHFInput";

const LoginForm = () => {
  const location = useLocation();
  const emailFromSignUp = location.state?.email ?? "";
  const from = (location.state as { from?: string })?.from;
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromSignUp,
      password: "",
    },
  });
  const user = useAuthUser();
  const login = useLogin();
  const loading = useAuthLoading();
  const error = useAuthError();
  const handleSubmit = async (data: LoginData) => await login(data);

  if (user) {
    if (user.role === "admin" && !from) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to={from ?? "/"} replace />;
  }
  return (
    <AuthForm
      title="Log In"
      description="Please enter your credentials to login."
      form={form}
      onSubmit={handleSubmit}
      buttonLabel="Log In"
      error={error ?? undefined}
      loading={loading}
    >
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
      <div className="flex items-center justify-between text-sm text-white">
        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            checked={true}
            // onCheckedChange={(checked) => setPersist(!!checked)}
            className="data-[state=checked]:bg-lime-200 data-[state=checked]:text-black"
          />
          <Label htmlFor="terms">Remember me</Label>
        </div>
        <Link to="/forgot-password" className="hover:underline text-xs">
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
};

export default LoginForm;
