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
