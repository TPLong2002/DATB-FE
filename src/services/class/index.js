import Axios from "@/services/axios";
export const getClasses = async (page, limit, grade_id, schoolyear_id) => {
  try {
    if (!page && !limit) {
      const res = await Axios.get(`/class`);
      return res;
    } else {
      const res = await Axios.get(`/class`, {
        params: {
          grade_id: grade_id,
          schoolyear_id: schoolyear_id,
          page: page,
          limit: limit,
        },
      });
      return res;
    }
  } catch (error) {
    throw error;
  }
};
export const getClassById = async (id) => {
  try {
    const res = await Axios.get(`/class`, {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const createClass = async (data) => {
  try {
    const res = await Axios.post(`/class`, data);
    return res;
  } catch (error) {
    throw error;
  }
};
export const updateClass = async (data) => {
  try {
    const res = await Axios.put(`/class`, data);
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteClass = async (id) => {
  try {
    const res = await Axios.put(`/class/hidden`, { id: id, ishidden: 1 });
    return res;
  } catch (error) {
    throw error;
  }
};
export const countClassesByGrade = async (grade_id) => {
  try {
    const res = await Axios.get(`/class/countclasses`, {
      params: {
        grade_id: grade_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const getGradeByClassId = async (class_id) => {
  try {
    const res = await Axios.get(`/class/grade`, {
      params: {
        class_id: class_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const getClassesBySchoolyear = async (schoolyear_id) => {
  try {
    const res = await Axios.get(`/class/schoolyear`, {
      params: {
        schoolyear_id: schoolyear_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
