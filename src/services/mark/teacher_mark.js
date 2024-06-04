import Axios from "@/services/axios";
const getSubjectIsTeaching = async (teacher_id, schoolyear_id, semester_id) => {
  console.log(teacher_id, schoolyear_id, semester_id);
  try {
    const res = await Axios.get(`/teacher/subjectisteaching`, {
      params: { teacher_id, schoolyear_id, semester_id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const getClassOfSubjectIsTeaching = async (teacher_id, subject_id) => {
  try {
    const res = await Axios.get(`/teacher/classofsubjectisteaching`, {
      params: { teacher_id, subject_id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { getSubjectIsTeaching, getClassOfSubjectIsTeaching };
