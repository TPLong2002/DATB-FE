import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentByClassId } from "@/services/class/classInfo";
import Table from "@/components/pages/infoClass/Table";
function App() {
  let { class_id } = useParams();
  const [data, setData] = useState();
  const fetchStudent = async () => {
    try {
      const res = await getStudentByClassId(class_id);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudent();
  }, [class_id]);
  return (
    <div>
      <Table data={data} fetchStudent={fetchStudent}></Table>
    </div>
  );
}

export default App;
