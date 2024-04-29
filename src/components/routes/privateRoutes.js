import User from "@/components/pages/user";
import DefaultLayout from "@/components/layouts/DefaultLayout";
export const privateRoutes = [
  { path: "/user", component: User, layout: DefaultLayout },
];
