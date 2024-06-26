import { useState } from "react";
import { Table, Space, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import DeleteFee from "@/components/pages/fee/DeleteFee";
import { Button, Tooltip } from "antd";
import { ProfileOutlined } from "@ant-design/icons";

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
  const convertVND = (price) => {
    let value = price;

    // Định dạng lại số
    if (value) {
      value = parseInt(value, 10).toLocaleString("vi-VN");
      return value;
    }
  };
  const columns = [
    {
      title: "Tên phí",
      dataIndex: "name",
    },
    {
      title: "Năm học",
      dataIndex: "schoolyear",
    },
    {
      title: "Học kỳ",
      dataIndex: "semester",
    },
    {
      title: "Số tiền",
      align: "right",
      render: (record) => (
        <span className="">{convertVND(record.price)} VNĐ</span>
      ),
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
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <Tooltip title={"Chi tiết " + record?.name}>
            <Button
              onClick={() => navigate(`/fee/detail/${record.id}`)}
              icon={<ProfileOutlined />}
            ></Button>
          </Tooltip>
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
