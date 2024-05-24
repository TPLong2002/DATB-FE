import Axios from "@/services/axios";
export const getAllMarkType = async () => {
  try {
    const res = await Axios.get("/marktype");
    return res;
  } catch (error) {
    console.log(error);
  }
};
