import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReset } from "../store/useAuth";

export const useResetAuthOnNavigate = () => {
  const reset = useReset();
  const location = useLocation();
  useEffect(() => {
    reset();
  }, [location.pathname, reset]); // reset whenever the route changes
};
