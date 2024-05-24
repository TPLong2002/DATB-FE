import Axios from "@/services/axios";
export const getAllSemester = async () => {
  try {
    const res = await Axios.get("/semester");
    return res;
  } catch (error) {
    console.error(error);
  }
};
