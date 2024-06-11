import Axios from "@/services/axios";
export const getUsers = async (page, limit, group_id, typeSelected, search) => {
  try {
    const res = await Axios.get("/user/users", {
      params: {
        page: page,
        limit: limit,
        group_id: group_id,
        isdeleted: typeSelected,
        search: search,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id, ishidden) => {
  try {
    const res = await Axios.delete(`/user`, {
      data: {
        id: id,
        ishidden: ishidden,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (data) => {
  try {
    const res = await Axios.post(`/user`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getTeaherBySubjectClass = async (subject_id, class_id) => {
  try {
    const res = await Axios.get(`/teacher/teacherbyclasssubject`, {
      params: {
        subject_id: subject_id,
        class_id: class_id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const countUsersOfGroup = async (group_id) => {
  try {
    const res = await Axios.get(`/user/countusersofgroup`, {
      params: {
        group_id: group_id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const countStudentsByGrade = async () => {
  try {
    const res = await Axios.get(`/student/countgrade`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const countStudentBySchoolyear = async () => {
  try {
    const res = await Axios.get(`/student/countschoolyear`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const countTeacherBySubject = async () => {
  try {
    const res = await Axios.get(`/teacher/countteacherbysubject`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const countStudentsByParentId = async (parent_id) => {
  try {
    const res = await Axios.get(`/parent/countstudents`, {
      params: {
        parent_id: parent_id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
