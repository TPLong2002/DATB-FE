import { useEffect, useState } from "react";
import { getAllSubject } from "@/services/subject";
import Table from "@/components/pages/subject/Table";
import CreateSubject from "@/components/pages/subject/CreateSubject";
import { Typography } from "antd";
const { Title, Text } = Typography;
function Subject() {
  const [data, setData] = useState([{ key: 1, id: 0 }]);
  useEffect(() => {
    document.title = "Môn học";
  }, []);
  const fetchSubject = async () => {
    const res = await getAllSubject();
    setData(res.data);
  };
  useEffect(() => {
    fetchSubject();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between h-full">
        <Title className="">Danh sách môn học</Title>
        <CreateSubject fetchSubject={fetchSubject}></CreateSubject>
      </div>
      <Table data={data} fetchSubject={fetchSubject}></Table>
    </div>
  );
}

export default Subject;
