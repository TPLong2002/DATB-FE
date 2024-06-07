import { useState } from "react";
import { Table, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";

function AssignmentTable(props) {
  const { data, pagination, setPagination } = props;
  const { rows, count } = data;
  const navigate = useNavigate();
  console.log(data);
  const columns = [
    {
      title: "Tên bài tập",
      dataIndex: "name",
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
      title: "Ngày bắt đầu",
      dataIndex: "startdate",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "deadline",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        if (record.status === "quá hạn") {
          return <Tag color="red">Quá hạn</Tag>;
        } else if (record.status === "sắp đến hạn") {
          return <Tag color="orange">Sắp đến hạn</Tag>;
        } else {
          return <Tag color="green">Làm ngay</Tag>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a
            onClick={() => navigate(`/student/assignment/detail/${record.id}`)}
          >
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
      <Table
        className="shadow-lg"
        bordered={true}
        columns={columns}
        dataSource={rows}
        pagination={paginate}
      />
    </div>
  );
}

export default AssignmentTable;
