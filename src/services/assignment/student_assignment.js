import Axios from "@/services/axios";
const getAssignmentsByStudentId = async (student_id, limit, page) => {
  try {
    const res = await Axios.get("/student/assignments", {
      params: { student_id, limit, page },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const getAssignment = async (id) => {
  try {
    const res = await Axios.get(`/student/assignment`, { params: { id } });
    return res;
  } catch (error) {
    console.error(error);
  }
};
export { getAssignmentsByStudentId, getAssignment };
