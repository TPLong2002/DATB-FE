import Axios from "@/services/axios";
export const getAssignments = async () => {
  try {
    const res = await Axios.get("/assignment");
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const getAssignmentById = async (id) => {
  try {
    const res = await Axios.get(`/assignment`, { params: { id } });
    return res;
  } catch (error) {
    console.error(error);
  }
};
