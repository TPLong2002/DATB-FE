import Axios from "@/services/axios";
export const getAllSubject = async () => {
  try {
    const res = await Axios.get("/subject");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createSubject = async (data) => {
  try {
    const res = await Axios.post("/subject", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateSubject = async (data) => {
  try {
    const res = await Axios.put(`/subject`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSubject = async (data) => {
  try {
    const res = await Axios.put(`/subject/hidden`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getTeachersNotInSubject = async (id) => {
  try {
    const res = await Axios.get(`/teacher/teachersnotinsubject`, {
      params: { subject_id: id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addTeacherToSubject = async (data) => {
  try {
    const res = await Axios.post("/teacher/addteachertosubject", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectByGradeId = async (id) => {
  try {
    const res = await Axios.get(`/subject/grade`, { params: { grade_id: id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectByClassId = async (class_id, schoolyear_id) => {
  try {
    const res = await Axios.get(`/subject/class`, {
      params: { class_id: class_id, schoolyear_id: schoolyear_id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
