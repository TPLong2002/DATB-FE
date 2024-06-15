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
  student_id,
  schoolyear_id,
  semester_id,
  subject_id
) => {
  try {
    const res = await Axios.get(`/mark/markofstudent`, {
      params: { student_id, semester_id, schoolyear_id, subject_id },
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
