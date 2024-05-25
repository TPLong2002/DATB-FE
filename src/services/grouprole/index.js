import axios from "@/services/axios";
export const updateGroupRole = async (data) => {
  const res = await axios.post(`/grouprole/grouproles`, data);
  return res;
};
