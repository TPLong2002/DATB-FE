import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Typography } from "antd";
import DeleteUser from "@/components/pages/infoClass/KickStrudent";
import AddStudent from "./AddStudent";
import { Link } from "react-router-dom";

const { Column } = Table;
const { Title } = Typography;
const tags = [
  { id: 1, name: "admin", color: "red" },
  { id: 2, name: "student", color: "green" },
  { id: 3, name: "parent", color: "geekblue" },
  { id: 4, name: "teacher", color: "gold" },
  { id: 5, name: "accountant", color: "purple" },
];

const App = (props) => {
  const { data, fetchStudent } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [userkick, setUserKick] = useState(0);
  const [class_id, setClass_id] = useState(0);
  const [schoolyear, setSchoolyear] = useState(0);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const datasrc = data?.Class_Students.map((student) => {
      return {
        id: student.id,
        username: student.Profile?.firstname + " " + student.Profile?.lastname,
        email: student.email,
      };
    });
    setClass_id(data?.id);
    setSchoolyear(data?.schoolyear?.substring(2, 4));
    setRows(datasrc);
  }, [data]);
  const handleDelete = (id) => {
    setOpenDelete(true);
    setUserKick(id);
  };

  return (
    <>
      <div className="text-right">
        <DeleteUser
          open={openDelete}
          setOpen={setOpenDelete}
          user_id={userkick}
          class_id={class_id}
          fetchData={fetchStudent}
        />
        <AddStudent
          fetchData={fetchStudent}
          class_id={class_id}
          schoolyear={schoolyear}
        />
      </div>

      <Title>Danh sách học sinh {data?.name}</Title>
      <Table
        dataSource={rows ? rows.map((row) => ({ ...row, key: row.id })) : []}
        pagination={false}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Username" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        {/* <Column
          title="Group"
          dataIndex="group_id"
          key="group_id"
          render={(group_id) => (
            <>
              {tags.map((tag, index) => {
                if (tag.id === group_id) {
                  return (
                    <Tag color={tag.color} key={index}>
                      {tag.name.toUpperCase()}
                    </Tag>
                  );
                }
              })}
            </>
          )}
        /> */}
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Link to="/profile" state={{ id: record.id }}>
                Profile {record.username}
              </Link>
              <a
                onClick={() => handleDelete(record.id)}
                className="hover:text-red-500"
              >
                Delete
              </a>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
