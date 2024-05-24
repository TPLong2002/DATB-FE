import React, { useEffect, useState } from "react";
import { getAssignments } from "@/services/assignment";
import AssignmentTable from "@/components/pages/assignment/AssignmentTable";
import dayjs from "dayjs";
import CreateAssignment from "@/components/pages/assignment/CreateAssignment";

const format = "YYYY/MM/DD";

function Assignment() {
  const [data, setData] = useState({ rows: [{ key: 0 }], count: 0 });
  const fetchAssignments = async () => {
    try {
      const res = await getAssignments();
      setData({
        rows: res?.data?.rows?.map((item, index) => ({
          ...item,
          key: index,
          subject: item.Subject.name,
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
    fetchAssignments();
  }, [pagination]);

  return (
    <>
      <CreateAssignment></CreateAssignment>
      <AssignmentTable
        data={data}
        fetchAssignments={fetchAssignments}
        pagination={pagination}
        setPagination={setPagination}
      ></AssignmentTable>
    </>
  );
}

export default Assignment;
