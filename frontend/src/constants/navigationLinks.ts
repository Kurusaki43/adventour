import type { Role } from "@/features/users/types/user.types";
import type { IconType } from "react-icons";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaCommentsSolid } from "react-icons/lia";
import { LuUserPen } from "react-icons/lu";

export const PUBLIC_NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Tours",
    href: "/tours",
  },
  {
    label: "Guides",
    href: "/guides",
  },
  {
    label: "About Us",
    href: "/about",
  },

  {
    label: "Contact Us",
    href: "/contact",
  },
];

export type NavItem = {
  label: string;
  link: string;
  icon: IconType;
};

export const DASHBOARD_NAV_LINKS: Record<Role, NavItem[]> = {
  admin: [
    {
      label: "dashboard",
      link: "/admin",
      icon: IoHomeOutline,
    },
    {
      label: "tours",
      link: "/admin/tours",
      icon: CiLocationOn,
    },
    {
      label: "users",
      link: "/admin/users",
      icon: LuUserPen,
    },
    {
      label: "reviews",
      link: "/admin/reviews",
      icon: LiaCommentsSolid,
    },
    {
      label: "bookings",
      link: "/admin/bookings",
      icon: CiCalendarDate,
    },
    {
      label: "payments",
      link: "/admin/payments",
      icon: GiMoneyStack,
    },
    {
      label: "settings",
      link: "/admin/settings",
      icon: IoSettingsOutline,
    },
  ],
  guide: [
    {
      label: "dashboard",
      link: "/guide",
      icon: IoHomeOutline,
    },
    {
      label: "My Tours",
      link: "/guide/my-tours",
      icon: CiLocationOn,
    },
    {
      label: "Calendar",
      link: "/guide/calendar",
      icon: CiCalendarDate,
    },
    {
      label: "Profile",
      link: "/guide/profile",
      icon: LuUserPen,
    },
  ],
  client: [
    {
      label: "dashboard",
      link: "/me",
      icon: IoHomeOutline,
    },

    { label: "Profile", link: "/me/profile", icon: LuUserPen },
  ],
  "lead-guide": [
    {
      label: "dashboard",
      link: "/guide",
      icon: IoHomeOutline,
    },
    {
      label: "Profile",
      link: "/guide/profile",
      icon: LuUserPen,
    },
  ],
};
