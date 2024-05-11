import Axios from "@/services/axios";
export const getStudentByClassId = async (id) => {
  try {
    const res = await Axios.get(`/class/students`, {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const kickUserFromClass = async (user_id, class_id) => {
  try {
    const res = await Axios.delete(`/class/students`, {
      data: {
        user_id: user_id,
        class_id: class_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const getStudentBySchoolyear = async (schoolyear) => {
  try {
    const res = await Axios.get(`/student/schoolyear`, {
      params: {
        schoolyear: schoolyear,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const addStudentToClass = async (data) => {
  try {
    const res = await Axios.post(`/class/students`, data);
    return res;
  } catch (error) {
    throw error;
  }
};
