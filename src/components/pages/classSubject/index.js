import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Space, Table, Tag, Typography, Text } from "antd";
import { getSubjectsByClassId } from "@/services/class/classSubject";
import DeleteSubject from "@/components/pages/classSubject/DeleteSubject";
import { Link, useNavigate } from "react-router-dom";
import AddTeacherSubjectToClass from "@/components/pages/classSubject/AddTeacherSubjectToClass";

const { Column } = Table;
const { Title } = Typography;

const App = () => {
  const { class_id } = useParams();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [subjectDetele, setSubjectDetele] = useState({
    class_id: class_id,
    subject_id: 0,
  });
  const [data, setData] = useState([]);
  const fetchSubjectOfClass = async () => {
    try {
      const res = await getSubjectsByClassId(class_id);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubjectOfClass();
  }, [class_id]);
  const handleDelete = (id) => {
    setOpenDelete(true);
    setSubjectDetele({ ...subjectDetele, subject_id: id });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Giáo viên",
      dataIndex: "teacherName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a onClick={() => navigate(`/subject/info/${record.id}`)}>Detail</a>
          <a
            className="hover:text-red-500"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <AddTeacherSubjectToClass
        class_id={class_id}
        fetchData={fetchSubjectOfClass}
        grade_id={data?.grade_id}
      ></AddTeacherSubjectToClass>
      <DeleteSubject
        open={openDelete}
        setOpen={setOpenDelete}
        subjectDetele={subjectDetele}
        fetchData={fetchSubjectOfClass}
      />

      <Table
        className="shadow-lg"
        columns={columns}
        dataSource={
          data
            ? data.Class_Subjects?.map((row) => ({
                ...row,
                key: row.id,
                teacherName:
                  row.Subject_Users[0].Profile.firstname +
                  " " +
                  row.Subject_Users[0].Profile.lastname,
              }))
            : []
        }
      />
    </>
  );
};

export default App;
