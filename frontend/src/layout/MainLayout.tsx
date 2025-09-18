import { Outlet } from "react-router-dom";
import { TopBar } from "./header/TopBar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useResetTheme } from "@/hooks/useResetTheme";
import ScrollToTop from "@/components/common/ScrollToTop";

const MainLayout = () => {
  useResetTheme();
  return (
    <div>
      <ScrollToTop />
      <TopBar />
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
