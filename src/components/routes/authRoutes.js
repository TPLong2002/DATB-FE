import Login from "@/components/pages/auth/Login";
import Register from "@/components/pages/auth/Register";
import AuthLayout from "@/components/layouts/AuthLayout";
export const authRoutes = [
  { path: "/login", component: Login, layout: AuthLayout },
  { path: "/register", component: Register, layout: AuthLayout },
];
