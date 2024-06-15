import { useEffect, useState } from "react";
import { getAllMarkType } from "@/services/markType";
import { getMatksOfStudentsInClass } from "@/services/mark";
import { Table, Space, Button } from "antd";
import EditMark from "./EditMark";

function MarkTable(props) {
  const {
    class_id,
    subject_id,
    fetchSubjectsByClassId,
    schoolyear_id,
    semester_id,
  } = props;
  const [markTypes, setMarkTypes] = useState([]);
  const [data, setData] = useState([]);
  const [student, setStudent] = useState();
  const [openEditMark, setOpenEditMark] = useState(false);

  const transformData = (data) => {
    const students = {};

    data?.forEach((item) => {
      const userId = item.user_id;
      if (!students[userId]) {
        students[userId] = {
          key: userId,
          id: userId,
          name: `${item.User.Profile.firstName} ${item.User.Profile.lastName}`,
        };
      }
      students[userId][item?.Marktype?.name] = item.mark;
    });

    return Object.values(students);
  };
  const fetchMarkType = async () => {
    const res = await getAllMarkType();
    setMarkTypes(res?.data);
    const res2 = await getMatksOfStudentsInClass(
      class_id,
      subject_id,
      schoolyear_id,
      semester_id
    );
    if (+res2?.code === 0) setData(transformData(res2?.data));
  };
  useEffect(() => {
    fetchMarkType();
  }, [class_id]);

  let columns = [{ title: "Tên học sinh", dataIndex: "name" }];

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
  const handleEditMark = (id) => {
    setStudent(id);
    setOpenEditMark(true);
  };
  columns = [
    ...columns,
    {
      title: "action",
      dataIndex: "total",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a onClick={() => handleEditMark(record.id)}>Edit</a>
          {/* <a className="hover:text-red-500">Delete</a> */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div>
        {student && (
          <EditMark
            openEditMark={openEditMark}
            setOpenEditMark={setOpenEditMark}
            student={student}
            class_id={class_id}
            subject_id={subject_id}
            semester_id={semester_id}
            schoolyear_id={schoolyear_id}
            markTypes={markTypes}
            fetchMarkType={fetchMarkType}
            fetchSubjectsByClassId={fetchSubjectsByClassId}
          ></EditMark>
        )}
      </div>
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
