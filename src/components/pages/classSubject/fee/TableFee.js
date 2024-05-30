import { useState } from "react";
import { Table, Space, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import DeleteFee from "@/components/pages/fee/DeleteFee";

function InfoSubject(props) {
  const { data, fetchFee, pagination, setPagination } = props;
  const { rows, count } = data;
  const [feeDetele, setFeeDetele] = useState({ id: 0, ishidden: 0 });
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (id, ishidden) => {
    setFeeDetele({ id, ishidden: ishidden ^ 1 });
    setOpenDelete(true);
  };
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
  return (
    <div>
      <DeleteFee
        open={openDelete}
        setOpen={setOpenDelete}
        feeDetele={feeDetele}
        fetchData={fetchFee}
      />
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
