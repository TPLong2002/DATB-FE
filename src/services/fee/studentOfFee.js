import Axios from "@/services/axios";
export const getStudentsOfFee = async (id) => {
  try {
    const res = await Axios.get(`/fee/studentsoffee`, {
      params: { fee_id: id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUsersOfFee = async (data) => {
  try {
    const res = await Axios.delete(`/fee/studentsoffee`, { data });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getStudentNotInFee = async (id) => {
  try {
    const res = await Axios.get(`/fee/studentnotinfofee`, {
      params: { fee_id: id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addStudentToFee = async (data) => {
  try {
    const res = await Axios.post(`/fee/studentsoffee`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
