import Axios from "@/services/axios";
export const getAllFee = async (limit, page) => {
  try {
    const response = await Axios.get("/fee", { params: { limit, page } });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getFeeById = async (id) => {
  try {
    const response = await Axios.get(`/fee`, { params: { id } });
    return response;
  } catch (error) {
    throw error;
  }
};
