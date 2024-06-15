import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

import {
  UserOutlined,
  UsergroupDeleteOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import Chart from "./Chart";
import { countUsersOfGroup } from "@/services/user";
import { countFeeAvailable } from "@/services/fee";
import {
  countStudentsByGrade,
  countStudentBySchoolyear,
} from "@/services/user";
import BarChart from "./BarChart";
import TeacherBySubjects from "./TeacherBySubjects";
import { countTeacherBySubject } from "@/services/user";

function HomeDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [countStudentGrade, setCountStudentGrade] = useState();
  const [countStudentSchoolyear, setCountStudentSchoolyear] = useState();
  const [countTeacherSubject, setCountTeacherSubject] = useState();

  const [feeCount, setFeeCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const studentCount = await countUsersOfGroup(2);
      const parentCount = await countUsersOfGroup(3);
      const teacherCount = await countUsersOfGroup(4);
      const studentsCountGrade = await countStudentsByGrade();
      const studentsCountSchoolyear = await countStudentBySchoolyear();
      const teacherBySubject = await countTeacherBySubject();

      console.log(teacherBySubject.data);

      setCountStudentGrade(studentsCountGrade.data);
      setTeacherCount(teacherCount.data);
      setStudentCount(studentCount.data);
      setParentCount(parentCount.data);
      setCountStudentSchoolyear(studentsCountSchoolyear.data);
      setCountTeacherSubject(teacherBySubject.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFee = async () => {
    try {
      const res = await countFeeAvailable();
      setFeeCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Dashboard";
    Promise.all([fetchCounts(), fetchFee()]);
  }, []);
  return (
    <div className="flex-col space-y-5">
      <div className="flex space-x-4 ">
        <div className="w-1/4">
          <UserCard
            userCount={studentCount}
            bg={"bg-green-500"}
            typeUser={"Học sinh"}
            icon={<UsergroupDeleteOutlined className="text-5xl text-white" />}
          ></UserCard>
        </div>
        <div className="w-1/4">
          <UserCard
            userCount={parentCount}
            bg={"bg-yellow-400"}
            icon={<UserOutlined className="text-5xl text-white" />}
            typeUser={"Phụ huynh"}
          ></UserCard>
        </div>
        <div className="w-1/4">
          <UserCard
            userCount={teacherCount}
            bg={"bg-blue-400"}
            icon={<UserOutlined className="text-5xl text-white" />}
            typeUser={"Giáo viên"}
          ></UserCard>
        </div>
        <div className="w-1/4">
          <UserCard
            userCount={feeCount}
            bg={"bg-red-400"}
            icon={<DollarOutlined className="text-5xl text-white" />}
            typeUser={"Khoảng phí"}
          ></UserCard>
        </div>
      </div>
      <div className="flex border space-x-2">
        <div className="w-1/3 shadow-lg">
          <Chart data={countStudentGrade}></Chart>
        </div>
        <div className="border-2"></div>
        <div className="w-2/3 shadow-lg">
          <BarChart data={countStudentSchoolyear}></BarChart>
        </div>
      </div>
      <div className="">
        {countTeacherSubject && (
          <TeacherBySubjects data={countTeacherSubject}></TeacherBySubjects>
        )}
      </div>
    </div>
  );
}

export default HomeDashboard;
