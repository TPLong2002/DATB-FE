import axios from "@/services/axios";

const CP = async (data) => {
  try {
    const res = await axios.post(
      "/changePassword",
      {
        ...data,
      },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { CP };
