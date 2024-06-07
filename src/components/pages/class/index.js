import React, { useEffect, useState } from "react";
import Table from "@/components/pages/class/Table";
import { getClasses } from "@/services/class";
import CreateClass from "@/components/pages/class/CreateClass";
import { Select } from "antd";
import { getAllGrade } from "@/services/grade";
import { getAllSchoolyear } from "@/services/schoolyear";
function App() {
  const [data, setData] = useState({
    rows: [{ key: 1, id: 0 }],
    count: 1,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [grade, setGrade] = useState([]);
  const [selectGrade, setSelectGrade] = useState();
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const fetchClass = async () => {
    try {
      const res = await getClasses(
        pagination.page,
        pagination.limit,
        selectGrade,
        selectSchoolyear
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGrade = async () => {
    const res = await getAllGrade();
    setGrade([{ id: null, name: "Tất cả" }, ...res.data]);
  };
  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear(res_schoolyear.data);
  };
  useEffect(() => {
    document.title = "Lớp học";
    fetchSchoolyear();
    fetchGrade();
  }, []);
  useEffect(() => {
    fetchClass();
  }, [pagination, selectGrade, selectSchoolyear]);
  const onSelectGradeChange = (value) => {
    setSelectGrade(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  return (
    <div className="flex flex-col space-y-3">
      <div className=" flex mt-3 justify-between">
        <div className="flex space-x-2">
          <Select
            showSearch
            placeholder="Chọn khối"
            optionFilterProp="children"
            onChange={onSelectGradeChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={grade?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ width: 150 }}
          />
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
        <CreateClass fetchData={fetchClass} />
      </div>

      <Table
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        setData={setData}
        fetchClass={fetchClass}
      ></Table>
    </div>
  );
}

export default App;
