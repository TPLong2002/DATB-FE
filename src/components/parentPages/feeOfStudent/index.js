import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  getFeesByParentId,
  getFeesHistory,
  createPayment,
} from "@/services/fee/parent_fee";
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
        const response = await getFeesByParentId(auth.id);
        console.log("response", response);
        const dataTable = [];
        let User_Parents = await Promise.all(
          response.data.User_Parents.map(async (item, index) => {
            let paid = 0;
            let unpaid = 0;

            const User_Fees = await Promise.all(
              item.User_Fees.map(async (fee) => {
                const res = await getFeesHistory(
                  response.data.id,
                  item.id,
                  fee.id
                );
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
              parentName:
                response.data.Profile.firstName +
                " " +
                response.data.Profile.lastName,
              parent_id: response.data.id,
              studentName: item.Profile.firstName + " " + item.Profile.lastName,
              student_id: item.id,
              class: item.Student_Classes[0].name,
              schoolyear: item.Student_Classes[0].Schoolyear.name,
              paid: paid,
              unpaid: unpaid,
            });
            return { ...item, User_Fees };
          })
        );
        setData({ ...response.data, User_Parents });
        setTable(dataTable);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFees();
  }, [auth.id]);

  const handleCreatePayment = async (id, parent_student_id) => {
    try {
      const response = await createPayment(id, parent_student_id);
      if (+response.data.resultCode === 0) {
        window.open(response.data.payUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const expandedRowRender = (record, index, indent, expanded) => {
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
      {
        title: "Thời gian nộp",
        dataIndex: "time",
        key: "time",
      },
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
      {
        key: "operation",
        render: (record) => (
          <Space size="middle">
            {+record.paymentstatus == -1 ? (
              <Button
                onClick={() => handleCreatePayment(record.id, record.fee_id)}
              >
                Thanh toán ngay
              </Button>
            ) : (
              <></>
            )}
          </Space>
        ),
      },
    ];

    let chillTable = [];
    if (expanded) {
      data?.User_Parents.map((item) => {
        if (record.student_id == item.id) {
          item.User_Fees.map((fee) => {
            chillTable.push({
              key: fee.id,
              id: fee.paymenthistory.id,
              name: fee.name,
              amount: fee.price,
              fee_id: fee.id,
              parent_student_id: item.Parent_Student.id,
              paymentstatus: fee.paymenthistory.Paymentstatus.code,
              time: fee.paymenthistory.time
                ? dayjs(fee.paymenthistory.time).format(format)
                : null,
              payType: fee.paymenthistory.payType,
              orderType: fee.paymenthistory.orderType,
            });
          });
        }
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
    { title: "Số phí đã thanh toán", dataIndex: "paid", key: "paid" },
    { title: "Số phí chưa thanh toán", dataIndex: "unpaid", key: "unpaid" },
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
