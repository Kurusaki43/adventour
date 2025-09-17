import { useResetAuthOnNavigate } from "@/features/auth/hooks/useResetAuthOnNavigate";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  useResetAuthOnNavigate();
  return (
    <div className="w-full min-h-screen auth-bg relative">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <div className="p-2 relative z-10 flex items-center justify-center min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
