import Axios from "@/services/axios";
export const getSubjectsByClassId = async (class_id) => {
  try {
    const res = await Axios.get(`/class/subjects`, {
      params: {
        class_id: class_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteSubject = async (data) => {
  try {
    const res = await Axios.delete(`class/subjects`, { data });
    return res;
  } catch (error) {
    throw error;
  }
};
