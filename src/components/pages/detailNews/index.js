import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "@/services/news";
import { Avatar, Image, Input, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import { getCategory, getnews } from "@/services/news";

function DetailNews() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [selectSemester, setSelectSemester] = useState();
  const [allSemester, setAllSemester] = useState([{}]);
  const [selectCategory, setSelectCategory] = useState();
  const [allCategory, setAllCategory] = useState([{}]);

  const fetchNews = async () => {
    const res_news = await getNewsById(id);
    setData(res_news?.data);
  };
  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear(res_schoolyear.data);
  };
  const fetchSemester = async () => {
    const res_semester = await getAllSemester();
    setAllSemester(res_semester.data);
  };
  const fetchCategory = async () => {
    const res_Category = await getCategory();
    setAllCategory(res_Category.data);
  };
  useEffect(() => {
    // fetchNews();
    fetchSemester();
    fetchSchoolyear();
    fetchCategory();
  }, []);
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
  const onCategoryChange = (value) => {
    setSelectCategory(value);
  };
  return (
    <div className="flex-col">
      <div className="mb-5 border-b-2">
        <Typography.Title editable level={1} style={{ marginBottom: 5 }}>
          Tiêu đề
        </Typography.Title>
      </div>
      <div className="flex space-x-5">
        <div className="flex-col w-1/4 space-y-5">
          <Typography.Title level={5}>Thông tin cơ bản</Typography.Title>
          <div className="flex items-center">
            <Typography.Title level={5} className="w-1/3">
              Danh mục:
            </Typography.Title>
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              onChange={onCategoryChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={allCategory?.map((item) => ({
                value: item.id,
                label: item.description,
              }))}
              style={{ width: 150 }}
              className="w-2/3 mx-auto"
            />
          </div>
          <div className="flex items-center">
            <Typography.Title level={5} className="w-1/3">
              Năm học:
            </Typography.Title>
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
              className="w-2/3 mx-auto"
            />
          </div>
          <div className="flex items-center">
            <Typography.Title level={5} className="w-1/3">
              Học kỳ:
            </Typography.Title>
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
              className="w-2/3 mx-auto"
            />
          </div>
          <div className="flex items-center">
            <Typography.Title level={5} className="w-1/3">
              Ảnh:
            </Typography.Title>
            <div className="w-2/3 mx-auto">
              <Image
                src={
                  "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870"
                }
              />
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <Typography.Title level={5}>Nội dung</Typography.Title>
          <TextArea placeholder="Nội dung" rows={10}></TextArea>
        </div>
      </div>
    </div>
  );
}

export default DetailNews;
