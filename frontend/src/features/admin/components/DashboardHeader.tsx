import NotificationsPanel from "./NotificationsPanel";
import ThemeSwitcher from "./ThemeSwitcher";
import ProfilePanel from "./ProfilePanel";
import { useAuthUser } from "@/features/auth/store/useAuth";

const DashboardHeader = () => {
  const user = useAuthUser();
  return (
    <header className="w-full h-14 p-2 lg:p-6 border-b border-border flex items-center justify-between relative bg-background">
      <div className="space-x-4 flex items-center mr-12 xl:mr-0 flex-1 justify-center sm:flex-auto sm:justify-end">
        <NotificationsPanel />
        <ThemeSwitcher />
        <ProfilePanel user={user!} className="text-foreground" />
      </div>
    </header>
  );
};

export default DashboardHeader;
