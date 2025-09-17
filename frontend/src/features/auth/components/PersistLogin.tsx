/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuth";
import axiosInstance from "@/shared/api/axios";
import LoadingOnRefresh from "@/components/LoadingOnRefresh";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore((s) => s.accessToken);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const hasTriedRefreshing = useRef(false);
  const navigate = useNavigate();

  const validateAndRefresh = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/auth/refresh", {
        withCredentials: true,
      });

      const { accessToken, user } = res.data;
      setAuth(accessToken, user);
    } catch (err) {
      logout();
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [logout, setAuth, navigate]);

  useEffect(() => {
    if (hasTriedRefreshing.current) return;

    const init = async () => {
      hasTriedRefreshing.current = true;
      if (!accessToken) {
        await validateAndRefresh();
      } else {
        setLoading(false);
      }
    };

    init();
  }, [accessToken, validateAndRefresh]);

  if (loading) return <LoadingOnRefresh />;

  return <Outlet />;
};

export default PersistLogin;
