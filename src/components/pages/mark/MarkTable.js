import { useEffect, useState } from "react";
import { getAllMarkType } from "@/services/markType";
import { getMatksOfStudentsInClass } from "@/services/mark";
import { Table, Space, Button, Tooltip } from "antd";
import EditMark from "./EditMark";
import { EditOutlined } from "@ant-design/icons";

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
      const userId = item.id;
      if (!students[userId]) {
        students[userId] = {
          key: userId,
          id: userId,
          name: `${item.Profile.firstname} ${item.Profile.lastname}`,
        };
      }
      console.log(item);
      item?.Marks?.forEach((mark) => {
        students[userId][mark?.Marktype?.name] = mark?.mark;
      });
    });

    return Object.values(students);
  };
  const fetchMarks = async () => {
    const res2 = await getMatksOfStudentsInClass(
      class_id,
      subject_id,
      schoolyear_id,
      semester_id
    );
    setData(transformData(res2.data));
  };
  const fetchMarkType = async () => {
    const res = await getAllMarkType();
    setMarkTypes(res.data);
  };
  useEffect(() => {
    fetchMarkType();
  }, []);
  useEffect(() => {
    if (class_id && subject_id) fetchMarks();
  }, [class_id, subject_id, schoolyear_id, semester_id]);

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
          <Tooltip title={"Sửa điểm " + record?.name}>
            <Button
              onClick={() => handleEditMark(record.id)}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>
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
            fetchMarks={fetchMarks}
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
