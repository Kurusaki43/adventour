import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Dispatch } from "react";
import NavigationLinks from "./NavigationLinks";
import { createPortal } from "react-dom";

export const MobileNavigation = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return createPortal(
    <nav
      className={`lg:hidden text-white fixed min-h-screen z-[9999999] inset-0 backdrop-blur-sm bg-black/80 transition-transform duration-500  ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Fixed close button */}
      <Button
        size="icon"
        variant="ghost"
        className="lg:hidden bg-background cursor-pointer absolute top-4 right-4 rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <X className="text-muted-foreground size-5" />
      </Button>

      {/* Scrollable content */}
      <div className="h-full overflow-y-auto grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-8 px-4 pt-20 pb-12">
          <NavigationLinks />
        </div>
      </div>
    </nav>,
    document.getElementById("modal")!
  );
};

export default MobileNavigation;
