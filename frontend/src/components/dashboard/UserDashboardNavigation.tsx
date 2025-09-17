import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Logo from "@/components/Logo";
import { useLogout } from "@/features/auth/store/useAuth";
import type { NavItem } from "@/constants/navigationLinks";

const UserDashboardNavigation = ({ navLinks }: { navLinks: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const logout = useLogout();

  const MenuContent = () => (
    <div className="flex h-full bg-foreground-muted flex-col gap-8 overflow-y-auto scrollbar-hide w-full px-3 py-4">
      <Logo className="max-h-4" />
      <nav className="w-full space-y-1 mt-2">
        {navLinks.map(({ icon: Icon, label, link }) => (
          <NavLink
            key={link}
            to={link}
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              clsx(
                "flex items-center font-light text-sm gap-4 py-2 px-2 rounded-sm transition-colors rounded-l-none border-l-4",
                isActive
                  ? "bg-primary/10 text-primary group font-semibold border-primary"
                  : " hover:text-primary hover:bg-primary/10 border-transparent"
              )
            }
          >
            <Icon className="size-4" />
            <span className="capitalize">{label}</span>
          </NavLink>
        ))}
      </nav>
      <Button
        onClick={async () => await logout()}
        variant="default"
        className="mt-auto bg-primary/90 hover:bg-primary font-bold cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-full w-64 flex-col items-center gap-12 border-r border-border bg-slate-800 text-white dark:bg-slate-900">
        <MenuContent />
      </div>

      {/* Mobile Sheet Drawer using ShadCN */}
      <div className="lg:hidden w-52">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTitle>
            <VisuallyHidden>Navigation</VisuallyHidden>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden>Use this panel to show navigations</VisuallyHidden>
          </SheetDescription>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="fixed top-3 sm:top-6 left-3 sm:left-6 z-50 border-1 border-border bg-background cursor-pointer"
            >
              <FaBars className="text-muted-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 pt-6 pb-2 w-64 flex flex-col gap-6 bg-background"
          >
            <MenuContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default UserDashboardNavigation;
