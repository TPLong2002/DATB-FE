import Axios from "@/services/axios";
export const getUsers = async (page, limit) => {
  try {
    const res = await Axios.get("/user/users", {
      params: {
        page: page,
        limit: limit,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id) => {
  try {
    const res = await Axios.delete(`/user`, {
      data: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (data) => {
  try {
    const res = await Axios.post(`/user`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
