import Login from "@/components/pages/auth/Login";
import ForgotPassword from "@/components/pages/auth/ForgotPassword";
import AuthLayout from "@/components/layouts/AuthLayout";
export const authRoutes = [
  { path: "/login", component: Login, layout: AuthLayout },
  { path: "/forgotpassword", component: ForgotPassword, layout: AuthLayout },
];
