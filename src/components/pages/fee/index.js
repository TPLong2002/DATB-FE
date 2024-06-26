import React, { useState, useEffect } from "react";
import { getAllFee } from "@/services/fee";
import TableFee from "./TableFee";
import dayjs from "dayjs";
import { Select, Typography } from "antd";
import CreateFee from "@/components/pages/fee/CreateFee";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
const { Title } = Typography;
const format = "DD/MM/YYYY";
function Fee() {
  const [data, setData] = useState({
    rows: [{ name: "", price: "", startDate: "", endDate: "", key: 0 }],
    count: 1,
  });
  const [allSchoolyear, setAllSchoolyear] = useState();
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [allSemester, setAllSemester] = useState();
  const [selectSemester, setSelectSemester] = useState();
  const fetchSchoolyear = async () => {
    const res = await getAllSchoolyear();
    setAllSchoolyear(res.data);
  };
  const fetchSemester = async () => {
    const res = await getAllSemester();
    setAllSemester(res.data);
  };
  useEffect(() => {
    document.title = "Khoảng phí";
    fetchSchoolyear();
    fetchSemester();
  }, []);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const fetchFee = async () => {
    const res = await getAllFee(
      pagination.limit,
      pagination.page,
      selectSchoolyear,
      selectSemester
    );
    console.log(res.data);
    if (+res.code === 0) {
      setData({
        ...data,
        rows: res?.data?.rows?.map((row, index) => ({
          ...row,
          startDate: dayjs(row.startDate).format(format),
          endDate: dayjs(row.endDate).format(format),
          key: index,
          schoolyear: row.Schoolyear.name,
          semester: row.Semester.name,
        })),
        count: res.data.count,
      });
    }
  };
  useEffect(() => {
    fetchFee();
  }, [pagination, selectSchoolyear, selectSemester]);

  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  const onSemesterChange = (value) => {
    setSelectSemester(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-center">
        <Title>Các khoảng phí</Title>
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Select
            showSearch
            placeholder="Chọn năm học"
            optionFilterProp="children"
            onChange={(value) => onSchoolyearChange(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            options={allSchoolyear?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            className="w-full"
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

        <CreateFee fetchFee={fetchFee}></CreateFee>
      </div>
      <TableFee
        data={data}
        fetchFee={fetchFee}
        pagination={pagination}
        setPagination={setPagination}
      ></TableFee>
    </div>
  );
}

export default Fee;
