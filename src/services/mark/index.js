import Axios from "@/services/axios";
export const getMatksOfStudentsInClass = async (
  class_id,
  subject_id,
  schoolyear_id,
  semester_id
) => {
  try {
    const res = await Axios.get(`/mark/subjectclass`, {
      params: {
        class_id,
        subject_id,
        schoolyear_id,
        semester_id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getMarkByStudentId = async (
  class_id,
  subject_id,
  user_id,
  semester_id,
  schoolyear_id
) => {
  try {
    const res = await Axios.get(`/mark/studentsubjectclass`, {
      params: { user_id, class_id, subject_id, semester_id, schoolyear_id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateOrCreateMark = async (data) => {
  try {
    const res = await Axios.post(`/mark/updateOrCreate`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
