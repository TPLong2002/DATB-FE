import TeacherLayout from "@/components/layouts/TeacherLayout";
import TeacherMark from "@/components/teacherPages/mark";
import TeacherAssignment from "@/components/teacherPages/assignment";
import AssignmentDetail from "@/components/teacherPages/assignment/DetailAssignment";

export const teacherRoutes = [
  { path: "/teacher/mark", component: TeacherMark, layout: TeacherLayout },
  {
    path: "/teacher/assignment",
    component: TeacherAssignment,
    layout: TeacherLayout,
  },
  {
    path: "teacher/assignment/detail/:id",
    component: AssignmentDetail,
    layout: TeacherLayout,
  },
];
