import User from "@/components/pages/user";
import Profile from "@/components/pages/profile";
import Class from "@/components/pages/class";
import ClassInfo from "@/components/pages/infoClass";
import DefaultLayout from "@/components/layouts/DefaultLayout";
export const privateRoutes = [
  { path: "/user", component: User, layout: DefaultLayout },
  { path: "/profile", component: Profile, layout: DefaultLayout },
  { path: "/class", component: Class, layout: DefaultLayout },
  { path: "/classinfo", component: ClassInfo, layout: DefaultLayout },
];
