import { useEffect, useState } from "react";
import { getAllMarkType } from "@/services/markType";
import { getMarkByStudentId } from "@/services/mark";
import { Table, Space, Button } from "antd";

function MarkTable(props) {
  const { student_id, schoolyear_id, semester_id } = props;
  const [markTypes, setMarkTypes] = useState([]);
  const [data, setData] = useState([]);

  const transformData = (data) => {
    const students = {};

    data?.forEach((item) => {
      const subject_id = item.subject_id;
      console.log(subject_id);
      if (!students[subject_id]) {
        students[subject_id] = {
          key: subject_id,
          id: subject_id,
          name: item.Subject?.name,
        };
      }
      students[subject_id][item?.Marktype?.name] = item.mark;
    });
    console.log(Object.values(students));
    return Object.values(students);
  };
  const fetchMarkType = async () => {
    const res = await getAllMarkType();
    setMarkTypes(res.data);
    const res2 = await getMarkByStudentId(
      student_id,
      schoolyear_id,
      semester_id
    );
    console.log(res2);
    setData(transformData(res2?.data?.Marks));
  };
  useEffect(() => {
    if (schoolyear_id && semester_id) fetchMarkType();
  }, [schoolyear_id, semester_id]);

  let columns = [{ title: "Tên môn học", dataIndex: "name" }];

  markTypes?.map(
    (markType) =>
      (columns = [
        ...columns,
        {
          title: markType.name,
          dataIndex: markType.name,
          key: markType.name,
        },
      ])
  );
  return (
    <div>
      <div></div>
      {data && (
        <Table
          className="shadow-lg"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={true}
        ></Table>
      )}
    </div>
  );
}

export default MarkTable;
