import Login from "@/components/pages/auth/Login";
import Register from "@/components/pages/auth/Register";
import DefaultLayout from "@/components/layouts/DefaultLayout";
export const authRoutes = [
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },
];
