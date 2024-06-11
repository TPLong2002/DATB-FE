import React, { useEffect, useState } from "react";
import {
  countFeesByParentId,
  getFeesUnPaidByParentId,
} from "@/services/fee/parent_fee";
import { countStudentsByParentId } from "@/services/user/index";
import { useSelector } from "react-redux";
import UserCard from "@/components/pages/dashboard/components/UserCard";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PieChart from "./PieChart";

const format = "YYYY-MM-DD HH:mm:ss";

function Parent_DashBoard() {
  const auth = useSelector((state) => state.auth);
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState();
  const [feesUnPaid, setFeesUnPaid] = useState();
  const [feesExpiringSoon, setFeesExpiringSoon] = useState();

  const fetchData = async () => {
    const [fees, students, feesUnPaid] = await Promise.all([
      countFeesByParentId(auth.id),
      countStudentsByParentId(auth.id),
      getFeesUnPaidByParentId(auth.id),
    ]);
    setFees(fees.data);
    setStudents(students.data);

    setFeesUnPaid(feesUnPaid.data.length);

    // Lọc phí sắp hết hạn
    const today = dayjs();
    const expiringSoon = feesUnPaid.data.filter((fee) => {
      const dueDate = dayjs(fee.Fee.endDate);
      return dueDate.isBefore(today.add(7, "day")) && dueDate.isAfter(today);
    });
    setFeesExpiringSoon(expiringSoon.length);
  };

  useEffect(() => {
    if (auth.id) fetchData();
  }, [auth.id]);

  return (
    <div className="flex space-y-4">
      <div className="w-1/2 grid grid-cols-2 gap-5">
        <div>
          <UserCard
            userCount={students}
            icon={<UsergroupDeleteOutlined className="text-5xl text-white" />}
            bg={"bg-blue-400"}
            typeUser={"Học sinh"}
          ></UserCard>
        </div>
        <div>
          <UserCard
            userCount={fees.total_count}
            icon={<UsergroupDeleteOutlined className="text-5xl text-white" />}
            bg={"bg-yellow-400"}
            typeUser={"Khoảng phí"}
          ></UserCard>
        </div>
        <div>
          <UserCard
            userCount={feesExpiringSoon}
            icon={<UsergroupDeleteOutlined className="text-5xl text-white" />}
            bg={"bg-red-400"}
            typeUser={"Phí sắp hết hạn"}
          ></UserCard>
        </div>
        <div>
          <UserCard
            userCount={feesUnPaid}
            icon={<UsergroupDeleteOutlined className="text-5xl text-white" />}
            bg={"bg-gray-400"}
            typeUser={"Chưa thanh toán"}
          ></UserCard>
        </div>
      </div>
      <div className="w-1/2">
        <PieChart data={fees}></PieChart>
      </div>
    </div>
  );
}

export default Parent_DashBoard;
