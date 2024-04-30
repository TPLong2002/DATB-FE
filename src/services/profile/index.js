import Axios from "@/services/axios";
export const getProfile = async (id) => {
  try {
    const res = await Axios.get("/profile", { params: { id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};
