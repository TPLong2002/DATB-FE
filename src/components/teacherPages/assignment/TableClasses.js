import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Tag, Typography, Select } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getClassesInAssignmentOfTeacher,
  getClassesNotInAssignmentOfTeacher,
  addClassToAssignment,
  deleteClassFromAssignment,
} from "@/services/assignment/teacher_assignment";
import { toast } from "react-toastify";
const { Title } = Typography;
const App = (props) => {
  const { assignment_id, subject_id, teacher_id } = props;
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Loading");

  const fetchClasses = async () => {
    const res = await getClassesInAssignmentOfTeacher(
      assignment_id,
      teacher_id,
      subject_id
    );
    // console.log(res.data);
    setClasses(
      res?.data?.map((item, index) => ({
        ...item,
        key: item.id,
        schoolyear: item.Schoolyear.name,
      }))
    );
  };
  const fetchAllClasses = async () => {
    const res = await getClassesNotInAssignmentOfTeacher(
      teacher_id,
      subject_id,
      assignment_id
    );
    setAllClasses(
      res.data.map((item) => ({ value: item.id, label: item.name }))
    );
  };
  useEffect(() => {
    if (assignment_id && subject_id && teacher_id) {
      fetchClasses();
      fetchAllClasses();
    }
  }, [assignment_id, subject_id, teacher_id]);
  const handleDelete = async (record) => {
    const res = await deleteClassFromAssignment({
      id: record.Class_Assignments[0].Assignment_Class.id,
    });
    if (+res.code === 0) {
      toast.success("Xóa lớp thành công");
      Promise.all([fetchClasses(), fetchAllClasses()]);
    }
  };
  const expandedRowRender = (record, index, indent, expanded) => {
    const columns = [
      { title: "Tên học sinh", dataIndex: "name", key: "name" },
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
        title: "Action",
        key: "operation",
        render: (record) => (
          <Space size="middle">
            {+record.paymentstatus == -1 ? (
              <Button>Thanh toán ngay</Button>
            ) : (
              <></>
            )}
          </Space>
        ),
      },
    ];

    let chillTable = [];
    // if (expanded) {
    //   data?.User_Parents.map((item) => {
    //     if (record.student_id == item.id) {
    //       item.User_Fees.map((fee) => {
    //         chillTable.push({
    //           key: fee.id,
    //           id: fee.paymenthistory.id,
    //           name: fee.name,
    //           amount: fee.price,
    //           fee_id: fee.id,
    //           parent_student_id: item.Parent_Student.id,
    //           paymentstatus: fee.paymenthistory.Paymentstatus.code,
    //           time: dayjs(fee.paymenthistory.time).format(format),
    //           payType: fee.paymenthistory.payType,
    //           orderType: fee.paymenthistory.orderType,
    //         });
    //       });
    //     }
    //   });
    // }
    return (
      <Table columns={columns} dataSource={chillTable} pagination={false} />
    );
  };

  const columns = [
    { title: "Lớp", dataIndex: "name", key: "name" },
    { title: "Năm học", dataIndex: "schoolyear", key: "schoolyear" },
    {
      title: "Action",
      key: "operation",
      render: (record) => (
        <Button
          danger
          onClick={() => handleDelete(record)}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await addClassToAssignment(
      selectedClasses.map((item) => ({
        assignment_id: +assignment_id,
        class_id: item,
      }))
    );
    if (+res?.code === 0) {
      setModalText(res.message);
      setTimeout(async () => {
        Promise.all([fetchClasses(), fetchAllClasses()]);
        toast.success("Thêm lớp thành công");
        setOpen(false);
        setConfirmLoading(false);
      }, 1000);
    }
  };
  const onClassesChange = (value) => {
    setSelectedClasses(value);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="flex-col">
      <Modal
        open={open}
        title="Thêm lớp vào bài tập"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div>
            <Select
              showSearch
              mode="multiple"
              allowClear
              placeholder="Chọn Lớp học"
              optionFilterProp="children"
              onChange={onClassesChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={allClasses}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </Modal>
      <div className="flex justify-between">
        <Title level={2}>Danh sách lớp</Title>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>

      <Table
        columns={columns}
        // expandable={{ expandedRowRender }}
        dataSource={classes}
      />
    </div>
  );
};

export default App;
