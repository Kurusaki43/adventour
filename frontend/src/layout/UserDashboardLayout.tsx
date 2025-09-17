import UserDashboardNavigation from "@/components/dashboard/UserDashboardNavigation";
import { DASHBOARD_NAV_LINKS } from "@/constants/navigationLinks";
import ThemeSwitcher from "@/features/admin/components/ThemeSwitcher";
import { ThemeProvider } from "@/features/admin/context/themeContext";
import { useAuthUser } from "@/features/auth/store/useAuth";
import { Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  const user = useAuthUser();
  return (
    <ThemeProvider>
      <div className="w-full h-screen auth-bg">
        <div className="fixed inset-0 w-full h-screen flex items-center justify-center backdrop-blur-md">
          <section className="max-w-7xl w-full bg-background h-screen lg:h-[90vh] lg:rounded-2xl lg:flex p-0 overflow-hidden">
            {/* Sidebar */}
            <UserDashboardNavigation
              navLinks={user ? DASHBOARD_NAV_LINKS[user.role] : []}
            />

            {/* Main Content */}
            <main className="p-3 sm:p-6 w-full flex flex-col h-full">
              {/* Header */}
              <div className="ml-auto">
                <ThemeSwitcher />
              </div>

              {/* Scrollable Outlet */}
              <div className="mt-10 overflow-y-auto scrollbar-hide py-2">
                <Outlet />
              </div>
            </main>
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserDashboardLayout;
