import React, { useEffect, useState } from "react";
import { getAssignmentByTeacherId } from "@/services/assignment/teacher_assignment";
import AssignmentTable from "./AssignmentTable";
import dayjs from "dayjs";
import CreateAssignment from "./CreateAssignment";
import { useSelector } from "react-redux";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import { Select } from "antd";

const format = "YYYY/MM/DD HH:mm:ss";

function Assignment() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({ rows: [{ key: 0 }], count: 0 });
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [allSemester, setAllSemester] = useState();
  const [selectSemester, setSelectSemester] = useState();

  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear([{ id: null, name: "Tất cả" }, ...res_schoolyear.data]);
  };

  const fetchSemester = async () => {
    const res = await getAllSemester();
    setAllSemester([{ id: null, name: "Tất cả" }, ...res.data]);
  };

  const fetchAssignments = async () => {
    try {
      const res = await getAssignmentByTeacherId(
        auth.id,
        pagination.limit,
        pagination.page,
        selectSchoolyear,
        selectSemester
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
    fetchSchoolyear();
    fetchSemester();
  }, []);
  useEffect(() => {
    if (auth.id) {
      fetchAssignments();
    }
  }, [pagination, auth.id, selectSchoolyear, selectSemester]);
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };

  const onSemesterChange = (value) => {
    setSelectSemester(value);
  };
  return (
    <div className="flex-col space-y-3">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Select
            showSearch
            placeholder="Chọn năm học"
            optionFilterProp="children"
            onChange={onSchoolyearChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={allSchoolyear?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ width: 150 }}
          />

          <Select
            showSearch
            placeholder="Chọn học kỳ"
            optionFilterProp="children"
            onChange={onSemesterChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={allSemester?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ width: 150 }}
          />
        </div>
        <CreateAssignment
          fetchAssignments={fetchAssignments}
        ></CreateAssignment>
      </div>

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
