import { useState } from "react";
import { Table, Space, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { updateAssignment } from "@/services/assignment/teacher_assignment";

function InfoSubject(props) {
  const { data, fetchAssignments, pagination, setPagination } = props;
  const { rows, count } = data;
  const navigate = useNavigate();
  const handleDelete = async (id, ishidden) => {
    try {
      const res = await updateAssignment({ id, ishidden: +!ishidden });
      if (+res.code === 0) {
        fetchAssignments();
      }
    } catch (error) {
      console.error(error);
    }
  };
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
          <a
            onClick={() => navigate(`/teacher/assignment/detail/${record.id}`)}
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

export default InfoSubject;
