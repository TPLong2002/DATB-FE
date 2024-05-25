import axios from "axios";
const baseURL = "http://localhost:3002/api/v1";
const instance = axios.create({
  baseURL: baseURL,
});
const token = localStorage.getItem("token");
instance.defaults.headers.common["Authorization"] =
  "Bearer " + (token ? token : "");

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.log("error", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);
export default instance;
