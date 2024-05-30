import axios from "@/services/axios";

export const Logout = async () => {
  return axios.get("/logout", {
    withCredentials: true,
  });
};
