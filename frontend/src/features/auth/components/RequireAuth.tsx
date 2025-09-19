import { useAccessToken, useAuthUser } from "@/features/auth/store/useAuth";
import type { Role } from "@/features/users/types/user.types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type RequireAuthProps = {
  allowedRoles: Role[];
  redirectTo?: string;
};

const RequireAuth = ({ allowedRoles, redirectTo = "/" }: RequireAuthProps) => {
  const accessToken = useAccessToken();
  const user = useAuthUser();
  const location = useLocation();

  if (!accessToken || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
