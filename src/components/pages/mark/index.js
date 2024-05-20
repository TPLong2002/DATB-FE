import React, { useEffect, useState } from "react";
import { getClasses } from "@/services/class";
import { getSubjectsByClassId } from "@/services/class/classSubject";
import MarkTable from "./MarkTable";

import { Select } from "antd";
function Transcript() {
  const [allClass, setAllClass] = useState([{}]);
  const [allSubject, setAllSubject] = useState([{}]);
  const [selectClass, setSelectClass] = useState(1);
  const [selectSubject, setSelectSubject] = useState(1);

  const fetchClasses = async () => {
    const res_class = await getClasses();
    setAllClass(res_class.data);
  };
  const fetchSubjectsByClassId = async () => {
    const res_subject = await getSubjectsByClassId(selectClass);
    setAllSubject(res_subject.data.Class_Subjects);
  };
  useEffect(() => {
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
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div>
      <div className="space-x-3">
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
      {selectSubject && (
        <MarkTable class_id={selectClass} subject_id={selectSubject} />
      )}
    </div>
  );
}

export default Transcript;
