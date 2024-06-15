import Axios from "@/services/axios";

const getCategory = async () => {
  try {
    const response = await Axios.get(`/category/getcategories`);
    return response;
  } catch (error) {
    throw error;
  }
};
const getnews = async (data) => {
  try {
    const response = await Axios.get(`/news/getnewsbysort`, {
      params: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getNewsById = async (id) => {
  try {
    const response = await Axios.get(`/news/getnewsbysort`, {
      params: { id },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getnewsWithToken = async (data) => {
  try {
    const response = await Axios.get(`/news/getnewsbysortwithtoken`, {
      params: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getNewsByIdWithToken = async (id) => {
  try {
    const response = await Axios.get(`/news/getnewsbysortwithtoken`, {
      params: { id },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const updateNews = async (data) => {
  console.log(data);
  try {
    const response = await Axios.put(`/news/update`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
const createNews = async (data) => {
  try {
    const response = await Axios.post(`/news/create`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  getCategory,
  getnews,
  getNewsById,
  updateNews,
  createNews,
  getnewsWithToken,
  getNewsByIdWithToken,
};
