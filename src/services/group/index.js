import Axios from "@/services/axios";
const getGroups = async () => {
  try {
    const res = await Axios.get("/group");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { getGroups };
