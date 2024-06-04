import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createNews } from "@/services/news";
import { Button, Image, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import { getCategory } from "@/services/news";
import UploadThumbnail from "@/components/pages/news/createNews/UploadThumbnail";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const cloud_name = "depfh6rnw";
const preset_key = "rsnt801s";
function DetailNews() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [originalImg, setOriginalImg] = useState();
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [selectSemester, setSelectSemester] = useState();
  const [allSemester, setAllSemester] = useState([{}]);
  const [selectCategory, setSelectCategory] = useState();
  const [allCategory, setAllCategory] = useState([{}]);

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
  const handleChanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };
  const handleTitleChange = (newTitle) => {
    setData({ ...data, title: newTitle });
  };
  const handleSubmits = async () => {
    const formatData = {
      ...data,
      schoolyear_id: selectSchoolyear,
      semester_id: selectSemester,
      category_id: selectCategory,
      user_id: auth.id,
    };

    const formData = new FormData();
    formData.append("file", data.thumbnail);
    formData.append("upload_preset", preset_key);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const dataURL = await res.json();
      if (dataURL?.secure_url) {
        const response = await createNews({
          ...formatData,
          thumbnail: dataURL.secure_url,
        });
        if (+response.code === 0) {
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-col space-y-5">
      <div className="mb-5 border-b-2">
        <Typography.Title
          editable={{ onChange: handleTitleChange }}
          level={1}
          style={{ marginBottom: 5 }}
        >
          {data?.title}
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
              name="category_id"
              value={selectCategory}
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
              name="schoolyear_id"
              value={selectSchoolyear}
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
              name="semester_id"
              value={selectSemester}
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
              Ảnh
            </Typography.Title>
            <div className="w-2/3 flex items-center text-center justify-center">
              <UploadThumbnail news={data} setNews={setData} />
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <Typography.Title level={5}>Nội dung</Typography.Title>
          <TextArea
            placeholder="Nội dung"
            rows={10}
            value={data?.content}
            name="content"
            onChange={handleChanges}
          ></TextArea>
        </div>
      </div>
      <div className="flex items-center text-center justify-center">
        <Button onClick={handleSubmits}>Lưu</Button>
      </div>
    </div>
  );
}

export default DetailNews;
