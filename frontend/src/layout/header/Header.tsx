import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { useSticky } from "@/hooks/useSticky";
import ProfilePanel from "@/features/admin/components/ProfilePanel";
import { useAuthUser } from "@/features/auth/store/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSticky = useSticky();
  const user = useAuthUser();

  return (
    <>
      <header
        className={`w-full z-99999 ${
          isSticky
            ? "bg-white/80 backdrop-blur-2xl shadow-soft fixed top-0 rounded-2xl"
            : "bg-transparent shadow-none relative"
        }`}
      >
        <div
          className={`main-container flex items-center justify-between ${
            isSticky ? "text-black py-4" : "text-white py-8"
          }`}
        >
          <Logo
            className={`${isSticky ? "text-black" : "text-white"} max-w-32`}
          />
          <DesktopNavigation />
          <div className="flex items-center gap-4">
            {user && (
              <ProfilePanel
                user={user}
                className={isSticky ? "text-black border-black ml-14" : "ml-14"}
              />
            )}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden bg-background cursor-pointer rounded-full"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FaBars className="text-muted-foreground size-5" />
            </Button>
          </div>
          <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </header>
      {isSticky && <div className="h-[105px]" />}
    </>
  );
};

export default Header;
