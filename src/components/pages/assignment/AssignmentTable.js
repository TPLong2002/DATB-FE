import { useState } from "react";
import { Table, Space, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

function InfoSubject(props) {
  const { data, fetchAssignments, pagination, setPagination } = props;
  const { rows, count } = data;
  const navigate = useNavigate();
  const handleDelete = (id, ishidden) => {};
  const columns = [
    {
      title: "Tên bài tập",
      dataIndex: "name",
    },
    {
      title: "Lớp",
      dataIndex: "class",
    },
    {
      title: "Giáo viên",
      dataIndex: "teacher",
    },
    {
      title: "Môn học",
      dataIndex: "subject",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "deadline",
    },
    {
      title: "Ẩn",
      dataIndex: "ishidden",
      render: (ishidden, record) => (
        <Checkbox
          checked={+ishidden === 1}
          onChange={() => handleDelete(record.id, record.ishidden)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a onClick={() => navigate(`/assignment/detail/${record.id}`)}>
            Detail
          </a>
        </Space>
      ),
    },
  ];
  const paginate = {
    total: count,
    defaultPageSize: pagination.limit,
    showSizeChanger: true,
    pageSizeOptions: ["1", "10", "50"],
    onChange: (page, pageSize) => {
      setPagination({ ...pagination, page, limit: pageSize });
    },
  };
  return (
    <div>
      <Table columns={columns} dataSource={rows} pagination={paginate} />
    </div>
  );
}

export default InfoSubject;
