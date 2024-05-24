import Axios from "@/services/axios";
export const getAllGrade = async () => {
  try {
    const res = await Axios.get("/grade");
    return res;
  } catch (error) {
    console.error(error);
  }
};
