import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import Notification from "@/components/Notification";
import LoadingButton from "@/components/LoadingButton";
import CustomForm from "@/components/common/Form";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

type AuthFormProps<T extends FieldValues> = {
  title: "Sign Up" | "Log In" | (string & {});
  buttonLabel: string;
  description: string;
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  error?: string;
  loading?: boolean;
};

const AuthForm = <T extends FieldValues>({
  title,
  buttonLabel,
  description,
  children,
  form,
  onSubmit,
  error,
  loading = false,
}: AuthFormProps<T>) => {
  return (
    <CustomForm
      form={form}
      className="p-6 sm:p-8 rounded-lg shadow-white/10 shadow-xl drop-shadow-2xl drop-shadow-white/10 max-w-sm bg-transparent backdrop-blur-xl text-white border border-white/30"
      onSubmit={onSubmit}
    >
      <Logo className="text-white mx-auto mb-8" />
      {error && <Notification type="Fail" message={error} className="my-3" />}

      <h1 className="text-left text-4xl font-black capitalize tracking-wide">
        {title}
      </h1>
      <p className="text-left text-sm mb-6 mt-2 tracking-wide">{description}</p>
      <div className="flex flex-col gap-4">
        {children}
        <LoadingButton loading={loading} className="mt-2 w-full glassy-btn">
          {buttonLabel}
        </LoadingButton>
      </div>
      <div className="flex justify-center">
        {title === "Log In" && (
          <Button
            className="mt-4 bg-white rounded-full size-8 hover:bg-white hover:scale-105 duration-300 p-0"
            type="button"
            onClick={() =>
              window.open("http://localhost:3000/api/v1/auth/google", "_self")
            }
          >
            <img className="size-6" src="/google.png" />
          </Button>
        )}
      </div>

      {(title === "Log In" || title === "Sign Up") && (
        <p className="text-sm text-white mt-4 text-center">
          Already have an account?
          <Link
            to={title === "Sign Up" ? "/login" : "/signup"}
            className="text-white font-black hover:underline ml-2"
          >
            {title === "Sign Up" ? "Login" : "Sign Up"}
          </Link>
        </p>
      )}
    </CustomForm>
  );
};

export default AuthForm;
