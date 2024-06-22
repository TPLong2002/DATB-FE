import Axios from "@/services/axios";
const getAssignmentByTeacherId = async (
  teacher_id,
  limit,
  page,
  schoolyear_id,
  semester_id
) => {
  try {
    const res = await Axios.get("/teacher/assignmentbyteacherid", {
      params: { teacher_id, limit, page, schoolyear_id, semester_id },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const getAssignmentById = async (id) => {
  try {
    const res = await Axios.get(`/teacher/assignmentbyid`, { params: { id } });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const getClassesNotInAssignmentOfTeacher = async (
  teacher_id,
  subject_id,
  assignment_id
) => {
  try {
    const res = await Axios.get("/teacher/classesnotinassignment", {
      params: { assignment_id, teacher_id, subject_id },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const changeClass = async (assignment_id, class_id) => {
  try {
    const res = await Axios.put("/teacher/changeClass", {
      assignment_id,
      class_id,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const updateAssignment = async (data) => {
  try {
    const res = await Axios.put("/teacher/updateassignment", data);
    return res;
  } catch (error) {
    console.error(error);
  }
};
const createAssignment = async (data) => {
  try {
    const res = await Axios.post("/teacher/createassignment", data);
    return res;
  } catch (error) {
    console.error(error);
  }
};
const getClassesInAssignmentOfTeacher = async (
  assignment_id,
  teacher_id,
  subject_id
) => {
  try {
    const res = await Axios.get("/teacher/classesinassignment", {
      params: { assignment_id, teacher_id, subject_id },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const addClassToAssignment = async (data) => {
  try {
    const res = await Axios.post("/teacher/addclasstoassignment", data);
    return res;
  } catch (error) {
    console.error(error);
  }
};
const deleteClassFromAssignment = async (data) => {
  try {
    const res = await Axios.delete("/teacher/deleteclassfromassignment", {
      data,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
export {
  getAssignmentByTeacherId,
  getAssignmentById,
  getClassesNotInAssignmentOfTeacher,
  changeClass,
  updateAssignment,
  createAssignment,
  getClassesInAssignmentOfTeacher,
  addClassToAssignment,
  deleteClassFromAssignment,
};
