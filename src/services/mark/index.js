import Axios from "@/services/axios";
export const getMatksOfStudentsInClass = async (class_id, subject_id) => {
  try {
    const res = await Axios.get(`/mark/subjectclass`, {
      params: {
        class_id,
        subject_id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getMarkByStudentId = async (class_id, subject_id, user_id) => {
  console.log(class_id, subject_id, user_id);
  try {
    const res = await Axios.get(`/mark/studentsubjectclass`, {
      params: { user_id, class_id, subject_id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
