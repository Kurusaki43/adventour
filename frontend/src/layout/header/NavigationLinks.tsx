import { PUBLIC_NAV_LINKS } from "@/constants/navigationLinks";
import { NavLink } from "react-router-dom";

const NavigationLinks = () => {
  return (
    <>
      {PUBLIC_NAV_LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.href}
          className={({ isActive }) =>
            isActive
              ? "text-inherit font-semibold capitalize tracking-wider"
              : "text-inherit font-semibold duration-300 group capitalize tracking-wider"
          }
        >
          {({ isActive }) => (
            <div>
              <span>{link.label}</span>
              <span
                className={`h-1 bg-primary block transition-all duration-300 
              ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </div>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default NavigationLinks;
