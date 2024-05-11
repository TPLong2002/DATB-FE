import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStudentByClassId } from "@/services/class/classInfo";
import Table from "@/components/pages/infoClass/Table";
function App() {
  let { state } = useLocation();
  const [data, setData] = useState();
  const fetchStudent = async () => {
    try {
      const res = await getStudentByClassId(state.id);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudent();
  }, [state.id]);
  return (
    <div>
      <Table data={data} fetchStudent={fetchStudent}></Table>
    </div>
  );
}

export default App;
