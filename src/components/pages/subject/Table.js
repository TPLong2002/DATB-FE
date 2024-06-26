import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Space,
  Table,
  Tag,
  Typography,
  Text,
  Tooltip,
} from "antd";
import DeleteSubject from "@/components/pages/subject/DeleteSubject";
import { Link, useNavigate } from "react-router-dom";
import { OrderedListOutlined } from "@ant-design/icons";

const { Column } = Table;
const { Title } = Typography;

const App = (props) => {
  const navigate = useNavigate();
  const { data, fetchSubject } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [subjectDetele, setSubjectDetele] = useState({ id: 0, ishidden: 0 });

  const handleDelete = (id, ishidden) => {
    setOpenDelete(true);
    setSubjectDetele({ id, ishidden: ishidden ^ 1 });
  };
  const columns = [
    {
      title: "Tên môn học",
      dataIndex: "name",
    },
    {
      title: "Ẩn",
      dataIndex: "ishidden",
      render: (ishidden, record) => (
        <Checkbox
          checked={ishidden === 1}
          onChange={() => handleDelete(record.id, record.ishidden)}
        />
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <Tooltip title={"Danh sách giáo viên dạy môn " + record.name}>
            <Button
              onClick={() => navigate(`/subject/info/${record.id}`)}
              icon={<OrderedListOutlined />}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <DeleteSubject
        open={openDelete}
        setOpen={setOpenDelete}
        subjectDetele={subjectDetele}
        fetchData={fetchSubject}
      />

      <Table
        className="shadow-lg"
        columns={columns}
        bordered={true}
        dataSource={data ? data.map((row) => ({ ...row, key: row.id })) : []}
      />
    </>
  );
};

export default App;
