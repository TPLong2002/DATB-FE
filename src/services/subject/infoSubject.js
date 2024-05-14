import Axios from "@/services/axios";
export const getSubjectById = async (id) => {
  try {
    const res = Axios.get(`/subject`, { params: { id: id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};
