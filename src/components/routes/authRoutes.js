import Login from "@/components/pages/auth/Login";
import AuthLayout from "@/components/layouts/AuthLayout";
export const authRoutes = [
  { path: "/login", component: Login, layout: AuthLayout },
];
