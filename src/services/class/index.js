import Axios from "@/services/axios";
export const getClasses = async (page, limit) => {
  try {
    const res = await Axios.get(`/class?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    throw error;
  }
};
export const getClassById = async (id) => {
  try {
    const res = await Axios.get(`/class`, {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const createClass = async (data) => {
  try {
    const res = await Axios.post(`/class`, data);
    return res;
  } catch (error) {
    throw error;
  }
};
export const updateClass = async (data) => {
  try {
    const res = await Axios.put(`/class`, data);
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteClass = async (id) => {
  try {
    const res = await Axios.put(`/class/hidden`, { id: id, ishidden: 1 });
    return res;
  } catch (error) {
    throw error;
  }
};
