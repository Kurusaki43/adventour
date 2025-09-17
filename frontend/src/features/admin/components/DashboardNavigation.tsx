import Logo from "@/components/Logo";
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
import { useAuthUser, useLogout } from "@/features/auth/store/useAuth";
import type { NavItem } from "@/constants/navigationLinks";
import ProfileBadge from "./ProfileBadge";

const DashboardNavigation = ({ navLinks }: { navLinks: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const user = useAuthUser();
  const MenuContent = () => (
    <div className="flex flex-col gap-14 h-full overflow-y-auto scrollbar-hide w-full px-4 bg-inherit">
      <Logo />
      <ProfileBadge
        avatar={`/uploads/users/${user?.avatar}`}
        fullName={user?.name ?? "Guest User"}
        role="administrator"
      />
      <nav className="w-full space-y-1 mt-2">
        {navLinks.map(({ icon: Icon, label, link }) => (
          <NavLink
            key={link}
            to={link}
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              clsx(
                "flex items-center text-sm gap-4 px-3 py-2 rounded-sm rounded-l-none border-l-4 text-foreground",
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
      <div className="hidden xl:flex h-screen w-64 py-4 flex-col items-center gap-12 border-r border-border bg-background">
        <MenuContent />
      </div>

      {/* Mobile Sheet Drawer using ShadCN */}
      <div className="xl:hidden">
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
              className="fixed top-2.5 right-2 z-50 border-1 border-border bg-background cursor-pointer"
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

export default DashboardNavigation;
