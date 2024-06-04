import React, { useEffect, useState } from "react";
import { getClasses } from "@/services/class";
import {
  getSubjectIsTeaching,
  getClassOfSubjectIsTeaching,
} from "@/services/mark/teacher_mark";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import MarkTable from "./MarkTable";
import { useSelector } from "react-redux";

import { Select } from "antd";
function Transcript() {
  const auth = useSelector((state) => state.auth);
  const [allClass, setAllClass] = useState([{}]);
  const [allSubject, setAllSubject] = useState([{}]);
  const [selectClass, setSelectClass] = useState(0);
  const [selectSubject, setSelectSubject] = useState(0);
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState(0);
  const [selectSemester, setSelectSemester] = useState(0);
  const [allSemester, setAllSemester] = useState([{}]);

  const fetchClassOfSubjectIsTeaching = async () => {
    const res_class = await getClassOfSubjectIsTeaching(
      auth.id,
      selectSchoolyear,
      selectSemester
    );
    setAllClass(res_class?.data?.Teacher_Classes);
  };
  const fetchSubjectIsTeaching = async () => {
    const res_subject = await getSubjectIsTeaching(
      auth.id,
      selectSchoolyear,
      selectSemester
    );
    setAllSubject(res_subject?.data.User_Subjects);
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
    fetchSchoolyear();
    fetchSemester();
  }, []);

  useEffect(() => {
    fetchSubjectIsTeaching();
  }, [selectSemester]);
  useEffect(() => {
    fetchClassOfSubjectIsTeaching();
  }, [selectSubject]);
  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  const onClassChange = (value) => {
    setSelectClass(value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSubjectChange = (value) => {
    setSelectSubject(value);
  };

  const onSemesterChange = (value) => {
    setSelectSemester(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="space-y-3">
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
        <div className="flex space-x-2 items-center">
          <div>Chọn môn</div>
          <div>
            <Select
              showSearch
              placeholder="Chọn môn học"
              optionFilterProp="children"
              onChange={onSubjectChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={allSubject?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              style={{ width: 150 }}
            />
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <div>Chọn lớp</div>
          <div>
            <Select
              showSearch
              placeholder="Chọn lớp"
              optionFilterProp="children"
              onChange={onClassChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={allClass?.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
              style={{ width: 150 }}
            />
          </div>
        </div>
      </div>
      {
        <MarkTable
          class_id={selectClass}
          subject_id={selectSubject}
          schoolyear_id={selectSchoolyear}
          semester_id={selectSemester}
        />
      }
    </div>
  );
}

export default Transcript;
