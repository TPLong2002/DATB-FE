import Axios from "@/services/axios";
export const getAllSchoolyear = async () => {
  try {
    const res = await Axios.get("/schoolyear");
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const createSchoolyear = async (schoolyear) => {
  try {
    const res = await Axios.post("/schoolyear", { name: schoolyear });
    return res;
  } catch (error) {
    console.error(error);
  }
};
