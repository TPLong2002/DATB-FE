import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { getFeesByStudentId } from "@/services/fee/studentOfFee";
import { getFeesHistory } from "@/services/fee/parent_fee";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const format = "HH:mm:ss DD/MM/YYYY";

const App = () => {
  const auth = useSelector((state) => state.auth);

  const [data, setData] = useState({});
  const [table, setTable] = useState([]);
  const getFees = async () => {
    try {
      if (auth.id) {
        const response = await getFeesByStudentId(auth.id);
        const dataTable = [];
        let User_Students = await Promise.all(
          response.data.User_Students.map(async (item, index) => {
            let paid = 0;
            let unpaid = 0;

            const User_Fees = await Promise.all(
              response.data.User_Fees.map(async (fee) => {
                const res = await getFeesHistory(
                  item.id,
                  response.data.id,
                  fee.id
                );
                console.log(res.data);
                if (+res.data.paymentstatus_id == 1) {
                  paid++;
                } else {
                  unpaid++;
                }
                return { ...fee, paymenthistory: res.data, key: fee.id };
              })
            );
            dataTable.push({
              key: index.toString(),
              parentName: item.Profile.firstName + " " + item.Profile.lastName,
              parent_id: item.id,
              studentName:
                response.data.Profile.firstName +
                " " +
                response.data.Profile.lastName,
              student_id: response.data.id,
              class: response.data.Student_Classes[0].name,
              schoolyear: response.data.Student_Classes[0].Schoolyear.name,
              paid: paid,
              unpaid: unpaid,
            });
            return { ...item, User_Fees };
          })
        );
        setData({ ...response.data, User_Students });
        setTable(dataTable);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFees();
  }, [auth.id]);
  console.log(data);
  const expandedRowRender = (record, index, indent, expanded) => {
    console.log(record);
    const columns = [
      { title: "Tên phí", dataIndex: "name", key: "name" },
      { title: "Số tiền", dataIndex: "amount", key: "amount" },
      {
        title: "Trạng thái",
        key: "paymenthstatus",
        render: (record) => (
          <Tag
            icon={
              +record.paymentstatus === 0 ? (
                <CheckCircleOutlined />
              ) : (
                <ClockCircleOutlined />
              )
            }
            color={+record.paymentstatus === 0 ? "success" : "warning"}
          >
            {+record.paymentstatus === 0 ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        ),
      },
      { title: "Thời gian nộp", dataIndex: "time", key: "time" },
      {
        title: "Phương thức thanh toán",
        dataIndex: "orderType",
        key: "orderType",
      },
      {
        title: "Dạng thanh toán",
        dataIndex: "payType",
        key: "payType",
      },
    ];

    let chillTable = [];
    if (expanded) {
      data.User_Students[0].User_Fees.map((fee) => {
        chillTable.push({
          key: fee.id,
          id: fee.paymenthistory.id,
          name: fee.name,
          amount: fee.price,
          fee_id: fee.id,
          paymentstatus: fee.paymenthistory.Paymentstatus.code,
          time: dayjs(fee.paymenthistory.time).format(format),
          payType: fee.paymenthistory.payType,
          orderType: fee.paymenthistory.orderType,
        });
      });
    }
    return (
      <Table columns={columns} dataSource={chillTable} pagination={false} />
    );
  };

  const columns = [
    { title: "Tên phụ huynh", dataIndex: "parentName", key: "parentName" },
    { title: "Tên học sinh", dataIndex: "studentName", key: "studentName" },
    { title: "Lớp", dataIndex: "class", key: "class" },
    { title: "Năm", dataIndex: "schoolyear", key: "schoolyear" },
    { title: "Số phi chưa thanh toán", dataIndex: "paid", key: "paid" },
    { title: "Số phi đã thanh toán", dataIndex: "unpaid", key: "unpaid" },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={table}
      />
    </>
  );
};

export default App;
