import axios from "@/services/axios";
const forgotPassword = async (email) => {
  try {
    const res = await axios.post(
      "/forgotPassword",
      {
        email,
      },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { forgotPassword };
