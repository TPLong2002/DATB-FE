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
export const createFee = async (data) => {
  try {
    const response = await Axios.post("/fee", data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateFee = async (data) => {
  try {
    const response = await Axios.put("/fee", data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteFee = async (data) => {
  try {
    const response = await Axios.put("/fee", data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const countFeeAvailable = async () => {
  try {
    const response = await Axios.get("/fee/countfeeavailable");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllAmountByYear = async (sort) => {
  try {
    const response = await Axios.get("/paymenthistory/amountByYear", {
      params: { sort },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
