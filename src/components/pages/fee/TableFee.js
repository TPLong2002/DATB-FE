import { useEffect, useState } from "react";

import { Typography, Table, Space, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title } = Typography;
function InfoSubject(props) {
  const { data, fetchFee, pagination, setPagination } = props;
  const { rows, count } = data;
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên phí",
      dataIndex: "name",
    },

    {
      title: "Số tiền",
      dataIndex: "price",
    },
    {
      title: "Ngày bắt đầu thu",
      dataIndex: "startDate",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a onClick={() => navigate(`/fee/detail/${record.id}`)}>Detail</a>
        </Space>
      ),
    },
  ];
  const paginate = {
    total: count,
    defaultPageSize: pagination.limit,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "50"],
    onChange: (page, pageSize) => {
      setPagination({ ...pagination, page, limit: pageSize });
    },
  };
  const submit = async () => {};
  return <Table columns={columns} dataSource={rows} pagination={paginate} />;
}

export default InfoSubject;
