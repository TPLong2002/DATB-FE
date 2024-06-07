import Axios from "@/services/axios";
const getFeesByParentId = async (id) => {
  try {
    const response = await Axios.get(`/parent/getfee`, { params: { id } });
    return response;
  } catch (error) {
    throw error;
  }
};

const getFeesHistory = async (parent_id, student_id, fee_id) => {
  try {
    const response = await Axios.post("/paymenthistory/feeOfStudent", {
      parent_id,
      student_id,
      fee_id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const createPayment = async (id, fee_id) => {
  try {
    const response = await Axios.post("/payment/create", {
      id: id,
      fee_id: fee_id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export { getFeesByParentId, getFeesHistory, createPayment };
