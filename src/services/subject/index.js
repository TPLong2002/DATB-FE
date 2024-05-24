import Axios from "@/services/axios";
export const getAllSubject = async () => {
  try {
    const res = Axios.get("/subject");
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
export const updateSubject = async (data) => {
  try {
    console.log(data);
    const res = Axios.put(`/subject`, data);
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
export const getTeachersNotInSubject = async (id) => {
  try {
    const res = Axios.get(`/teacher/teachersnotinsubject`, {
      params: { subject_id: id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addTeacherToSubject = async (data) => {
  try {
    const res = Axios.post("/teacher/addteachertosubject", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectByGradeId = async (id) => {
  try {
    const res = Axios.get(`/subject/grade`, { params: { grade_id: id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};
