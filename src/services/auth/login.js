import axios from "@/services/axios";

const Login = async (username, password) => {
  return axios.post(
    "/login",
    {
      username,
      password,
    },
    { withCredentials: true }
  );
};
export default Login;
