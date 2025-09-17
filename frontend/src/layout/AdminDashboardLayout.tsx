import DashboardBreadCrumb from "@/features/admin/components/BreadCrumb";
import DashboardNavigation from "@/features/admin/components/DashboardNavigation";
import { DASHBOARD_NAV_LINKS } from "@/constants/navigationLinks";
import { ThemeProvider } from "@/features/admin/context/themeContext";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "@/features/admin/components/DashboardHeader";

const AdminDashboardLayout = () => {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/").filter(Boolean).pop() || "";
  const formattedCurrPath = currentPath
    .replace(/-/g, " ")
    .replace("admin", "")
    .trim();

  return (
    <ThemeProvider defaultTheme="light">
      <div className="w-full h-screen flex overflow-hidden">
        <DashboardNavigation navLinks={DASHBOARD_NAV_LINKS["admin"]} />
        <main className="flex-1 h-screen">
          <DashboardHeader />
          <div className="p-2 xs:p-4 lg:p-6 h-[calc(100%-56px)] bg-primary-foreground overflow-y-auto scrollbar-hide">
            <div className="max-w-7xl mx-auto w-full mt-4 flex flex-col relative">
              <DashboardBreadCrumb pathname={pathname} />
              <h1 className="text-primary capitalize font-bold text-3xl lg:text-4xl mt-6 mb-8">
                {formattedCurrPath}
              </h1>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboardLayout;
