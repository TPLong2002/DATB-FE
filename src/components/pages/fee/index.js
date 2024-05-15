import React, { useState, useEffect } from "react";
import { getAllFee } from "@/services/fee";
import TableFee from "./TableFee";
import dayjs from "dayjs";
import { Typography } from "antd";
import CreateFee from "@/components/pages/fee/CreateFee";
const { Title } = Typography;
const format = "DD/MM/YYYY";
function Fee() {
  const [data, setData] = useState({
    rows: [{ name: "", price: "", startDate: "", endDate: "", key: 0 }],
    count: 1,
  });
  useEffect(() => {
    document.title = "Khoảng phí";
  }, []);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const fetchFee = async () => {
    const res = await getAllFee(pagination.limit, pagination.page);
    if (+res.code === 0) {
      setData({
        ...data,
        rows: res.data.rows.map((row, index) => ({
          ...row,
          startDate: dayjs(row.startDate).format(format),
          endDate: dayjs(row.endDate).format(format),
          key: index,
        })),
        count: res.data.count,
      });
    }
  };
  useEffect(() => {
    fetchFee();
  }, [pagination]);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-center">
        <Title>Các khoảng phí</Title>
        <CreateFee fetchFee={fetchFee}></CreateFee>
      </div>

      <TableFee
        data={data}
        fetchFee={fetchFee}
        pagination={pagination}
        setPagination={setPagination}
      ></TableFee>
    </div>
  );
}

export default Fee;
