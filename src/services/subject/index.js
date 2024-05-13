import Axios from "@/services/axios";
export const getAllSubject = async () => {
  try {
    const res = Axios.get("/subject/subjects");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectById = async (id) => {
  try {
    const res = Axios.get(`/subject/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createSubject = async (data) => {
  try {
    const res = Axios.post("/subject", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateSubject = async (id, data) => {
  try {
    const res = Axios.put(`/subject/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSubject = async (data) => {
  try {
    console.log(data);
    const res = Axios.put(`/subject/hidden`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
