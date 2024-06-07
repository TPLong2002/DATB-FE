import React, { useEffect, useState } from "react";
import { getAssignmentsByStudentId } from "@/services/assignment/student_assignment";
import AssignmentTable from "./AssignmentTable";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const format = "YYYY/MM/DD HH:mm:ss";

function Assignment() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({ rows: [{ key: 0 }], count: 0 });
  const fetchAssignments = async () => {
    try {
      const res = await getAssignmentsByStudentId(
        auth.id,
        pagination.limit,
        pagination.page
      );
      console.log(res?.data?.rows[0]?.Student_Classes[0].Class_Assignments);
      setData({
        rows: res?.data?.rows[0]?.Student_Classes[0].Class_Assignments.map(
          (item, index) => {
            const deadline = item.deadline
              ? dayjs(item.deadline).format(format)
              : "";
            let status = "";
            if (item.deadline) {
              const now = dayjs();
              const deadlineDate = dayjs(item.deadline);
              const diffDays = deadlineDate.diff(now, "day");
              if (diffDays < 0) {
                status = "quá hạn";
              } else if (diffDays <= 1) {
                status = "sắp đến hạn";
              }
            }
            return {
              ...item,
              key: index,
              subject: item.Subject.name,
              startdate: item.startdate
                ? dayjs(item.startdate).format(format)
                : "",
              deadline,
              status,
              teacher:
                item.User.Profile.firstname + " " + item.User.Profile.lastname,
            };
          }
        ),
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
