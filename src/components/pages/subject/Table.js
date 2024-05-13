import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Typography } from "antd";
import DeleteSubject from "@/components/pages/subject/DeleteSubject";
import { Link } from "react-router-dom";

const { Column } = Table;
const { Title } = Typography;

const App = (props) => {
  const { data, fetchSubject } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [subjectDetele, setSubjectDetele] = useState({ id: 0, ishidden: 0 });

  const handleDelete = (id, ishidden) => {
    setOpenDelete(true);
    setSubjectDetele({ id, ishidden: ishidden ^ 1 });
  };

  return (
    <>
      <DeleteSubject
        open={openDelete}
        setOpen={setOpenDelete}
        subjectDetele={subjectDetele}
        fetchData={fetchSubject}
      />
      <Title>Danh sách môn học</Title>
      <Table
        dataSource={data ? data.map((row) => ({ ...row, key: row.id })) : []}
        pagination={false}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
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
              <Link to="/" state={{ id: record.id }}>
                Detail
              </Link>
              <a
                onClick={() => handleDelete(record.id, record.ishidden)}
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
