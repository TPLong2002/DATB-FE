import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStudentsByParentId } from "@/services/mark/parent_mark";
import TableStudent from "@/components/parentPages/markOfStudent/TableStudent";
function MarkOfStudent() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([{}]);

  const fetchStudents = async () => {
    try {
      if (auth.id) {
        const response = await getStudentsByParentId(auth.id);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [auth.id]);
  return (
    <div>
      <TableStudent data={data}></TableStudent>
    </div>
  );
}

export default MarkOfStudent;
