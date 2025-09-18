// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// --- Layouts & Wrappers (always loaded) ---
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import PersistLogin from "@/features/auth/components/PersistLogin";
import RequireAuth from "@/features/auth/components/RequireAuth";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import { MultiStepProvider } from "@/features/tours/context/multiStepForm";
import { ROLES } from "@/features/users/types/user.types";
import { Loadable } from "./components/common/Loadable";
import AuthCallback from "@/features/auth/components/AuthCallback";

// --- Lazy-loaded Pages ---
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const GuidesPage = lazy(() => import("@/features/guides/pages/GuidesPage"));
const AboutPage = lazy(() => import("@/features/home/pages/AboutPage"));
const ContactPage = lazy(() => import("@/features/home/pages/ContactPage"));
const Signup = lazy(() => import("@/features/auth/pages/Signup"));
const EmailVerification = lazy(
  () => import("@/features/auth/pages/EmailVerification")
);
const Login = lazy(() => import("@/features/auth/pages/Login"));
const ForgotPassword = lazy(
  () => import("@/features/auth/pages/ForgotPassword")
);
const ResetPassword = lazy(() => import("@/features/auth/pages/ResetPassword"));
const DashboardPage = lazy(
  () => import("@/features/admin/pages/DashboardPage")
);
const AdminToursPage = lazy(
  () => import("@/features/tours/pages/AdminToursPage")
);
const AdminTourDetailsPage = lazy(
  () => import("@/features/tours/pages/AdminTourDetailsPage")
);
const AdminUsersPage = lazy(
  () => import("@/features/users/pages/AdminUsersPage")
);
const AdminReviewsPage = lazy(
  () => import("@/features/reviews/pages/AdminReviewsPage")
);
const AdminBookingsPage = lazy(
  () => import("@/features/bookings/pages/AdminBookingsPage")
);
const AdminPaymentsPage = lazy(
  () => import("@/features/payments/pages/AdminPaymentsPage")
);
const SettingsPage = lazy(() => import("@/features/admin/pages/SettingsPage"));
const GuideTours = lazy(() => import("@/features/guides/pages/GuideTours"));
const Dashboard = lazy(() => import("@/features/guides/pages/Dashboard"));
const GuideCalendar = lazy(
  () => import("@/features/guides/pages/GuideCalendar")
);
const GuideProfile = lazy(() => import("@/features/guides/pages/GuideProfile"));
const PublicToursPage = lazy(
  () => import("@/features/tours/pages/PublicToursPage")
);
const PublicTourDetailPage = lazy(
  () => import("@/features/tours/pages/PublicTourDetailPage")
);
const ClientDashboard = lazy(
  () => import("@/features/users/pages/clients/ClientDashboard")
);
const ClientProfile = lazy(
  () => import("@/features/users/pages/clients/ClientProfile")
);
const GuideDetailPage = lazy(
  () => import("@/features/guides/pages/GuideDetailPage")
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: Loadable(HomePage) },
      { path: "tours", element: Loadable(PublicToursPage) },
      { path: "tours/:id", element: Loadable(PublicTourDetailPage) },
      { path: "guides", element: Loadable(GuidesPage) },
      { path: "guides/:id", element: Loadable(GuideDetailPage) },
      { path: "about", element: Loadable(AboutPage) },
      { path: "contact", element: Loadable(ContactPage) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: Loadable(Login) },
      { path: "signup", element: Loadable(Signup) },
      { path: "verify-email/:token", element: Loadable(EmailVerification) },
      { path: "forgot-password", element: Loadable(ForgotPassword) },
      { path: "reset-password/:token", element: Loadable(ResetPassword) },
      { path: "auth/callback", element: <AuthCallback /> },
    ],
  },
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            path: "admin",
            element: <AdminDashboardLayout />,
            children: [
              { index: true, element: Loadable(DashboardPage) },
              {
                path: "tours",
                children: [
                  {
                    index: true,
                    element: (
                      <MultiStepProvider>
                        {Loadable(AdminToursPage)}
                      </MultiStepProvider>
                    ),
                  },
                  { path: ":slug", element: Loadable(AdminTourDetailsPage) },
                ],
              },
              { path: "users", element: Loadable(AdminUsersPage) },
              { path: "reviews", element: Loadable(AdminReviewsPage) },
              { path: "bookings", element: Loadable(AdminBookingsPage) },
              { path: "payments", element: Loadable(AdminPaymentsPage) },
              { path: "settings", element: Loadable(SettingsPage) },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth allowedRoles={[ROLES.GUIDE, ROLES.LEADGUIDE]} />,
        children: [
          {
            path: "guide",
            element: <UserDashboardLayout />,
            children: [
              { index: true, element: Loadable(Dashboard) },
              { path: "my-tours", element: Loadable(GuideTours) },
              { path: "calendar", element: Loadable(GuideCalendar) },
              { path: "profile", element: Loadable(GuideProfile) },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth allowedRoles={[ROLES.CLIENT]} />,
        children: [
          {
            path: "me",
            element: <UserDashboardLayout />,
            children: [
              { index: true, element: Loadable(ClientDashboard) },
              { path: "profile", element: Loadable(ClientProfile) },
            ],
          },
        ],
      },
    ],
  },
]);
