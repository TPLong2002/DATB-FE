import { useEffect, useState } from "react";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import { getCategory, getnews } from "@/services/news";
import Table from "@/components/pages/news/Table";
import { Button, Select } from "antd";
import { useNavigate } from "react-router-dom";

function News() {
  const navigate = useNavigate();
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [selectSemester, setSelectSemester] = useState();
  const [allSemester, setAllSemester] = useState([{}]);
  const [selectCategory, setSelectCategory] = useState();
  const [allCategory, setAllCategory] = useState([{}]);

  const [data, setData] = useState({
    rows: [{ key: 1, id: 0 }],
    count: 1,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const fetchNews = async () => {
    const res_news = await getnews({
      page: pagination.page,
      limit: pagination.limit,
      schoolyear_id: selectSchoolyear,
      semester_id: selectSemester,
      category_id: selectCategory,
    });
    setData(res_news.data);
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
    fetchNews();
    fetchSemester();
    fetchSchoolyear();
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchNews();
  }, [pagination, selectSchoolyear, selectSemester, selectCategory]);
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
    <div className="flex-col space-y-5">
      <div className="flex justify-between">
        <div className="flex space-x-3">
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
          <Select
            showSearch
            placeholder="Chọn mục lục"
            optionFilterProp="children"
            onChange={onCategoryChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={allCategory?.map((item) => ({
              value: item.id,
              label: item.description,
            }))}
            style={{ width: 150 }}
          />
        </div>
        <div>
          <Button type="primary" onClick={() => navigate("/admin/news/create")}>
            Tạo tin
          </Button>
        </div>
      </div>
      <div>
        <Table
          data={data}
          pagination={pagination}
          setPagination={setPagination}
          setData={setData}
          fetchNews={fetchNews}
        ></Table>
      </div>
    </div>
  );
}

export default News;
