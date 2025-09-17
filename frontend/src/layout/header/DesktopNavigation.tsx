import NavigationLinks from "./NavigationLinks";

const DesktopNavigation = () => {
  return (
    <nav className="hidden lg:flex items-center gap-12 ml-auto">
      <NavigationLinks />
    </nav>
  );
};

export default DesktopNavigation;
