import Axios from "@/services/axios";
export const getClasses = async (page, limit) => {
  try {
    const res = await Axios.get(`/class?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    throw error;
  }
};
