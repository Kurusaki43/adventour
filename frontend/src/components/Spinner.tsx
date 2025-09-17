import { Loader2 } from "lucide-react";
import Logo from "./Logo";

const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen w-full z-9999999 fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      {/* Logo or App Name */}
      <div className="flex items-center space-x-2">
        <Logo />
      </div>

      {/* Spinning loader */}
      <Loader2 className="w-10 h-10 text-primary animate-spin" />

      {/* Subtext */}
      <p className="text-gray-600 text-sm">Loading, please wait...</p>
    </div>
  </div>
);

export default Spinner;
