import Axios from "@/services/axios";
const getStudentsByParentId = async (id) => {
  try {
    const res = await Axios.get(`/parent/getstudents`, {
      params: { id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const getMarksOfStudent = async (
  student_id,
  parent_id,
  schoolyear_id,
  semester_id
) => {
  try {
    const res = await Axios.get(`/parent/getmarksofstudent`, {
      params: { student_id, parent_id, schoolyear_id, semester_id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { getStudentsByParentId, getMarksOfStudent };
