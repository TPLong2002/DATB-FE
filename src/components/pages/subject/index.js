import { useEffect, useState } from "react";
import { getAllSubject, getSubjectByGradeId } from "@/services/subject";
import Table from "@/components/pages/subject/Table";
import CreateSubject from "@/components/pages/subject/CreateSubject";
import { Select, Typography } from "antd";
import { getAllGrade } from "@/services/grade";
const { Title, Text } = Typography;
function Subject() {
  const [data, setData] = useState([{ key: 1, id: 0 }]);
  const [grade, setGrade] = useState([]);
  const [selectGrade, setSelectGrade] = useState();

  useEffect(() => {
    document.title = "Môn học";
  }, []);
  const fetchSubject = async () => {
    const res = await getAllSubject();
    setData(res.data);
  };
  const fetchGrade = async () => {
    const res = await getAllGrade();
    setGrade(res.data);
  };
  useEffect(() => {
    fetchSubject();
    fetchGrade();
  }, []);
  const fetchgetSubjectByGradeId = async () => {
    const res = await getSubjectByGradeId(selectGrade);
    setData(res.data);
  };
  useEffect(() => {
    fetchgetSubjectByGradeId();
  }, [selectGrade]);

  const onSelectGradeChange = (value) => {
    setSelectGrade(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div>
      <div className="flex flex-col h-full">
        <Title className="">Danh sách môn học</Title>
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Title level={3}>Chọn khối</Title>{" "}
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
          </div>
          <CreateSubject fetchSubject={fetchSubject}></CreateSubject>{" "}
        </div>
      </div>
      <Table data={data} fetchSubject={fetchSubject}></Table>
    </div>
  );
}

export default Subject;
