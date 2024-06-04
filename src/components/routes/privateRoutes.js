import User from "@/components/pages/user";
import Profile from "@/components/pages/profile";
import Class from "@/components/pages/class";
import ClassInfo from "@/components/pages/infoClass";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Subject from "@/components/pages/subject";
import SubjectInfo from "@/components/pages/subject/InfoSubject";
import Fee from "@/components/pages/fee";
import FeeDetail from "@/components/pages/fee/DetailFee";
import ClassSubject from "@/components/pages/classSubject";
import Mark from "@/components/pages/mark";
import Assignment from "@/components/pages/assignment";
import AssignmentDetail from "@/components/pages/assignment/DetailAssignment";
import Role from "@/components/pages/role";
import News from "@/components/pages/news";
import NewsDetail from "@/components/pages/detailNews";
import CreateNews from "@/components/pages/news/createNews";
export const privateRoutes = [
  { path: "/user", component: User, layout: DefaultLayout },
  { path: "/user/profile/:user_id", component: Profile, layout: DefaultLayout },
  { path: "/class", component: Class, layout: DefaultLayout },
  { path: "/classinfo", component: ClassInfo, layout: DefaultLayout },
  { path: "/subject", component: Subject, layout: DefaultLayout },
  {
    path: "/subject/info/:subject_id",
    component: SubjectInfo,
    layout: DefaultLayout,
  },
  { path: "/fee", component: Fee, layout: DefaultLayout },
  { path: "/fee/detail/:id", component: FeeDetail, layout: DefaultLayout },
  {
    path: "/class/subject/:class_id",
    component: ClassSubject,
    layout: DefaultLayout,
  },
  { path: "/mark", component: Mark, layout: DefaultLayout },
  { path: "/assignment", component: Assignment, layout: DefaultLayout },
  {
    path: "/assignment/detail/:id",
    component: AssignmentDetail,
    layout: DefaultLayout,
  },
  { path: "/role", component: Role, layout: DefaultLayout },
  { path: "/admin/news", component: News, layout: DefaultLayout },
  {
    path: "/admin/news/detail/:id",
    component: NewsDetail,
    layout: DefaultLayout,
  },
  {
    path: "/admin/news/create",
    component: CreateNews,
    layout: DefaultLayout,
  },
];
