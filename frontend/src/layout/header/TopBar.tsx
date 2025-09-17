import { useAuthUser } from "@/features/auth/store/useAuth";
import { FaFacebook, FaInstagram, FaTwitter, FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineLock, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

export const TopBar = () => {
  const user = useAuthUser();
  return (
    <div className="border-b border-gray-300/20 bg-black/20 backdrop-blur-md relative z-99">
      <div className="main-container flex items-center justify-between py-3 text-white">
        <div className="hidden md:flex gap-8 items-center text-sm">
          <div className="flex items-center gap-2">
            <MdPhone className="size-4" />
            <span>+213 0659582387</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="size-4" />
            <span>adventour.support@gmail.com</span>
          </div>
        </div>
        {/* Social Links Info + Sign in buttons */}
        <div className="flex items-center justify-between gap-10 w-full md:w-fit">
          <div className="flex gap-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary duration-300"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary duration-300"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://twitter.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary duration-300"
            >
              <FaTwitter size={18} />
            </a>
          </div>
          {!user && (
            <div className="flex gap-4">
              <Link to={"/login"} className="flex gap-2 text-sm items-center">
                <MdOutlineLock />
                Login
              </Link>
              <Link to={"/signup"} className="flex gap-2 text-sm items-center">
                <FaUser />
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
