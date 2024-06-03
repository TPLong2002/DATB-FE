import { useEffect, useState } from "react";
import { getAllMarkType } from "@/services/markType";
import { getMarksOfStudent } from "@/services/mark/parent_mark";
import { Table, Space, Button } from "antd";
import { useSelector } from "react-redux";

function MarkTable(props) {
  const auth = useSelector((state) => state.auth);
  const { student_id, schoolyear_id, semester_id } = props;
  const [markTypes, setMarkTypes] = useState([]);
  const [data, setData] = useState([{}]);

  const transformData = (data) => {
    const subjects = {};

    data?.User_Parents[0]?.Marks.forEach((item) => {
      const Subject_id = item.subject_id;
      if (!subjects[Subject_id]) {
        subjects[Subject_id] = {
          key: Subject_id,
          id: Subject_id,
          subjectName: `${item.Subject.name}`,
        };
      }
      subjects[Subject_id][item?.Marktype?.name] = item.mark;
    });

    return Object.values(subjects);
  };
  // const fetchMark = async () => {
  //   const res =
  // }
  const fetchMarkType = async () => {
    const res = await getAllMarkType();
    setMarkTypes(res?.data);
    const res2 = await getMarksOfStudent(
      student_id,
      auth.id,
      schoolyear_id,
      semester_id
    );
    if (res2?.data != undefined) {
      setData(transformData(res2?.data));
    }
  };
  useEffect(() => {
    if (auth.id) fetchMarkType();
  }, [schoolyear_id, semester_id, auth.id]);

  let columns = [{ title: "Tên Môn học", dataIndex: "subjectName" }];

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
