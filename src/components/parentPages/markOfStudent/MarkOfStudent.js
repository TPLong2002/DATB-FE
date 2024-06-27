import React, { useEffect, useState } from "react";

import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import MarkTable from "./MarkTable";
import { useParams } from "react-router-dom";
import { getProfile } from "@/services/profile";
import { getRelativesProfile } from "@/services/profile";
import { useSelector } from "react-redux";

import { Select, Typography } from "antd";
const { Title } = Typography;
function Transcript() {
  const auth = useSelector((state) => state.auth);
  const { student_id } = useParams();
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [selectSemester, setSelectSemester] = useState();
  const [allSemester, setAllSemester] = useState([{}]);

  const [data, setData] = useState([{ firstName: "", lastName: "" }]);
  const fetchProfile = async () => {
    try {
      const res = await getRelativesProfile(auth.id);
      console.log("res", res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear(res_schoolyear.data);
  };
  const fetchSemester = async () => {
    const res_semester = await getAllSemester();
    setAllSemester(res_semester.data);
  };
  useEffect(() => {
    document.title = "Bảng điểm";
  }, []);
  useEffect(() => {
    fetchProfile();
    fetchSchoolyear();
    fetchSemester();
  }, [auth.id]);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  const onSemesterChange = (value) => {
    setSelectSemester(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className="flex-col space-y-3 ">
      <Title>
        Bảng điểm của {data[0]?.firstName + " " + data[0]?.lastName}
      </Title>
      <div className="flex space-x-3 mt-4 justify-center border rounded-md p-2">
        <div className="flex space-x-2 items-center">
          <div>Chọn năm học</div>
          <div>
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
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <div>Chọn học kỳ</div>
          <div>
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
        </div>
      </div>
      {
        <MarkTable
          student_id={student_id}
          schoolyear_id={selectSchoolyear}
          semester_id={selectSemester}
        />
      }
    </div>
  );
}

export default Transcript;
