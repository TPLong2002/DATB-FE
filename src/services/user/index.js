import Axios from "@/services/axios";
export const getUsers = async (page, limit, group_id, typeSelected, search) => {
  try {
    console.log(page, limit, group_id, typeSelected);
    const res = await Axios.get("/user/users", {
      params: {
        page: page,
        limit: limit,
        group_id: group_id,
        isdeleted: typeSelected,
        search: search,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id, ishidden) => {
  try {
    const res = await Axios.delete(`/user`, {
      data: {
        id: id,
        ishidden: ishidden,
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
