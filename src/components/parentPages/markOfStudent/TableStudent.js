import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Typography } from "antd";

import { Link } from "react-router-dom";

const { Column } = Table;
const { Title } = Typography;

const App = (props) => {
  const { data } = props;
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const datasrc = data?.User_Parents?.map((student) => {
      return {
        id: student.id,
        username: student.Profile?.firstName + " " + student.Profile?.lastName,
        email: student.email,
        class: student.Student_Classes[0]?.name,
        schoolyear: student.Student_Classes[0]?.Schoolyear?.name,
        parent_id: data.id,
      };
    });
    setRows(datasrc);
  }, [data]);

  return (
    <>
      <Title>Danh sách học sinh {data?.name}</Title>
      <Table
        className="shadow-lg"
        dataSource={rows ? rows.map((row) => ({ ...row, key: row.id })) : []}
        pagination={false}
      >
        <Column title="Tên học sinh" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Lớp học" dataIndex="class" key="class" />
        <Column title="Năm học" dataIndex="schoolyear" key="schoolyear" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Link to={`/parent/mark/${record.id}`}>Xem điểm</Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
