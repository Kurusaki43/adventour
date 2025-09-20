import Notification from "@/components/Notification";
import Spinner from "@/components/Spinner";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthError, useAuthLoading, useVerifyEmail } from "../store/useAuth";
import logo from "@/assets/logo-white.png";
import { Button } from "@/components/ui/button";

const EmailVerificationCard = () => {
  const [time, setTime] = useState(5);
  const { token } = useParams();
  const navigate = useNavigate();
  const loading = useAuthLoading();
  const runBefore = useRef(false);
  const error = useAuthError();
  const verifyEmail = useVerifyEmail();

  useEffect(() => {
    if (loading || error) return;
    if (time === 0) navigate("/login");
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, loading, error, time]);

  useEffect(() => {
    if (token && !runBefore.current) {
      runBefore.current = true;
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return (
    <div className="p-6 sm:p-8 rounded-lg shadow-white/10 shadow-xl drop-shadow-2xl drop-shadow-white/10 max-w-md bg-transparent backdrop-blur-sm text-white border border-white/30">
      <img
        src={logo}
        alt="Logo"
        className="mb-4 mx-auto text-center w-14 h-14 object-contain rounded-full drop-shadow-2xl drop-shadow-white/10"
      />
      <h1 className="text-left text-4xl font-black capitalize tracking-wide">
        Email verification
      </h1>
      {loading && (
        <div className="flex flex-col items-center mt-4 gap-2">
          <p className="tracking-wide text-center">
            We're verifying your account
          </p>
          <Spinner />
        </div>
      )}
      {!loading && !error && (
        <>
          <Notification
            type="Success"
            message="Your account was verified successfully"
          />
          <p className="text-sm text-center mt-4">
            We will redirect you to
            <span className="text-lime-300 font-bold"> Login</span> page in{" "}
            {time}s
          </p>
        </>
      )}
      {!loading &&
        error &&
        error !== "Invalid or expired verification code." && (
          <div className="flex flex-col items-center">
            <Notification type="Fail" message={error} className="mt-4" />
            <Link to="/signup" className="mt-4 underline">
              Register again
            </Link>
          </div>
        )}
      {!loading &&
        error &&
        error === "Invalid or expired verification code." && (
          <div className="flex flex-col items-center">
            <Notification type="Fail" message={error} className="mt-4" />
            <Button className="bg-white mt-4 text-black hover:bg-white hover:scale-105 duration-300">
              Resend code again
            </Button>
          </div>
        )}
    </div>
  );
};

export default EmailVerificationCard;
