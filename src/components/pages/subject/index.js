import { useEffect, useState } from "react";
import { getAllSubject } from "@/services/subject";
import Table from "@/components/pages/subject/Table";
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
      <Table data={data} fetchSubject={fetchSubject}></Table>
    </div>
  );
}

export default Subject;
