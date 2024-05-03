import Axios from "@/services/axios";
export const getProfile = async (id) => {
  try {
    const res = await Axios.get("/profile", { params: { id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (data) => {
  try {
    const res = await Axios.put("/profile", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getRelativesProfile = async (id) => {
  try {
    const res = await Axios.get("/profile/relatives", { params: { id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};
