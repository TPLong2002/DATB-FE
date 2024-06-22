import axios from "@/services/axios";

export const getRoles = async () => {
  const res = await axios.get(`/role/roles`);
  return res;
};
export const addRoles = async (data) => {
  const res = await axios.post(`/role/roles`, data);
  return res;
};
export const delRoles = async (id) => {
  const data = [id];
  const res = await axios.delete(`/role/roles`, {
    data,
  });
  return res;
};
export const getRolesByGroup = async (id) => {
  const res = await axios.get(`/role/rolesgroup`, {
    params: { id: id },
  });
  return res;
};
export const getRoleById = async (id) => {
  try {
    const res = await axios.get(`/role/getrolebyid`, {
      params: { id: id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateRole = async (data) => {
  try {
    const res = await axios.put(`/role/roles`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
