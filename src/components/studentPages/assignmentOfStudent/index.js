import React, { useEffect, useState } from "react";
import { getAssignmentByTeacherId } from "@/services/assignment/teacher_assignment";
import AssignmentTable from "./AssignmentTable";
import dayjs from "dayjs";
import CreateAssignment from "./CreateAssignment";
import { useSelector } from "react-redux";

const format = "YYYY/MM/DD HH:mm:ss";

function Assignment() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({ rows: [{ key: 0 }], count: 0 });
  const fetchAssignments = async () => {
    try {
      const res = await getAssignmentByTeacherId(
        auth.id,
        pagination.limit,
        pagination.page
      );
      console.log(res?.data?.rows);
      setData({
        rows: res?.data?.rows?.map((item, index) => ({
          ...item,
          key: index,
          subject: item.Subject.name,
          startdate: item.startdate ? dayjs(item.startdate).format(format) : "",
          deadline: item.deadline ? dayjs(item.deadline).format(format) : "",
          teacher:
            item.User.Profile.firstName + " " + item.User.Profile.lastName,
          class: item.Assignment_Classes.name,
        })),
        count: res?.data?.count,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    document.title = "Bài tập";
  }, []);
  useEffect(() => {
    if (auth.id) {
      fetchAssignments();
    }
  }, [pagination, auth.id]);

  return (
    <div className="flex-col space-y-3">
      <CreateAssignment fetchAssignments={fetchAssignments}></CreateAssignment>
      <AssignmentTable
        data={data}
        fetchAssignments={fetchAssignments}
        pagination={pagination}
        setPagination={setPagination}
      ></AssignmentTable>
    </div>
  );
}

export default Assignment;
