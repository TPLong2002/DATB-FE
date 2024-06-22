import React, { useEffect, useState } from "react";
import { getClasses } from "@/services/class";
import { getSubjectsByClassId } from "@/services/class/classSubject";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import MarkTable from "./MarkTable";

import { Select } from "antd";
function Transcript() {
  const [allClass, setAllClass] = useState([{}]);
  const [allSubject, setAllSubject] = useState([{}]);
  const [selectClass, setSelectClass] = useState();
  const [selectSubject, setSelectSubject] = useState();
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [selectSemester, setSelectSemester] = useState();
  const [allSemester, setAllSemester] = useState([{}]);

  const fetchClasses = async () => {
    const res_class = await getClasses();
    setAllClass(res_class.data);
  };
  const fetchSubjectsByClassId = async () => {
    const res_subject = await getSubjectsByClassId(selectClass);
    setAllSubject(res_subject.data.Class_Subjects);
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
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchSubjectsByClassId();
  }, [selectClass]);

  const onClassChange = (value) => {
    setSelectClass(value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSubjectChange = (value) => {
    setSelectSubject(value);
  };
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
