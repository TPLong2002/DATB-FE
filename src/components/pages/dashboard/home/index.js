import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

import {
  UserOutlined,
  UsergroupDeleteOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import LineChart from "../components/chart/LineChart";
import TableClass from "../components/tableClass";
import { countUsersOfGroup } from "@/services/user";
import { getnews } from "@/services/news";
import { Link } from "react-router-dom";

function HomeDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [news, setNews] = useState([]);
  const fetchCounts = async () => {
    try {
      const studentCount = await countUsersOfGroup(2);
      const parentCount = await countUsersOfGroup(3);
      const teacherCount = await countUsersOfGroup(4);
      setTeacherCount(teacherCount.data);
      setStudentCount(studentCount.data);
      setParentCount(parentCount.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNews = async () => {
    try {
      const res = await getnews({
        page: 1,
        limit: 10,
      });
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Promise.all([fetchCounts(), fetchNews()]);
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
            userCount={1234}
            bg={"bg-red-400"}
            icon={<DollarOutlined className="text-5xl text-white" />}
            typeUser={"Khoảng phí"}
          ></UserCard>
        </div>
      </div>
      <div className="flex border space-x-2">
        <div className="w-1/2">
          <LineChart></LineChart>
        </div>
        <div className="border"></div>
        <div className="w-1/2">
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {news?.rows?.slice(0, 2).map((row) => (
              <div
                key={row.id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <Link to={`/news/detail/${row.id}`}>
                  <img
                    src={row.thumbnail}
                    alt={row.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{row.title}</h3>
                    <p className="text-gray-600 line-clamp-1">{row.content}</p>
                    <p className="text-gray-400 text-sm">{row.createdAt}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/4 ">
          <UserCard
            userCount={"Khối lớp 12"}
            bg={"bg-blue-400"}
            icon={<UserOutlined className="text-5xl text-white" />}
            typeUser={8 + " Lớp"}
            h={16}
          ></UserCard>
          <UserCard
            userCount={"Khối lớp 11"}
            bg={"bg-blue-400"}
            icon={<UserOutlined className="text-5xl text-white" />}
            typeUser={8 + " Lớp"}
            h={16}
          ></UserCard>
          <UserCard
            userCount={"Khối lớp 10"}
            bg={"bg-blue-400"}
            icon={<UserOutlined className="text-5xl text-white" />}
            typeUser={8 + " Lớp"}
            h={16}
          ></UserCard>
        </div>
        <div className="w-3/4">
          <TableClass></TableClass>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
