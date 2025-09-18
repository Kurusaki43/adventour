import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAuth } from "@/features/auth/store/useAuth"; // adjust import

function AuthCallback() {
  const navigate = useNavigate();
  const setAuth = useSetAuth();

  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");

        if (!accessToken) {
          console.error("No access token in callback URL");
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:3000/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
          credentials: "include", // in case your API uses cookies too
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();

        // persist auth info (optional: use cookies or secure storage instead of localStorage)
        localStorage.setItem("user", JSON.stringify(data.user));

        // update auth store
        setAuth(accessToken, data.user);

        navigate("/me", { replace: true });
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login");
      }
    };

    run();
  }, [navigate, setAuth]);

  return null;
}

export default AuthCallback;
