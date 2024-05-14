import User from "@/components/pages/user";
import Profile from "@/components/pages/profile";
import Class from "@/components/pages/class";
import ClassInfo from "@/components/pages/infoClass";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Subject from "@/components/pages/subject";
import SubjectInfo from "@/components/pages/subject/InfoSubject";
export const privateRoutes = [
  { path: "/user", component: User, layout: DefaultLayout },
  { path: "/profile", component: Profile, layout: DefaultLayout },
  { path: "/class", component: Class, layout: DefaultLayout },
  { path: "/classinfo", component: ClassInfo, layout: DefaultLayout },
  { path: "/subject", component: Subject, layout: DefaultLayout },
  {
    path: "/subject/info/:subject_id",
    component: SubjectInfo,
    layout: DefaultLayout,
  },
];
