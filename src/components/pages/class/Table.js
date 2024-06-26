import React, { useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import DeleteClass from "@/components/pages/class/DeleteClass";
import { Link, useNavigate } from "react-router-dom";
import EditClass from "@/components/pages/class/EditClass";
import {
  EditOutlined,
  OrderedListOutlined,
  DeleteOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Column } = Table;

const App = (props) => {
  const { data, pagination, setPagination, fetchClass } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [userDelete, setUserDelete] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [classEdit, setClassEdit] = useState();
  const { rows, count } = data;

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setOpenDelete(true);
    setUserDelete(id);
  };
  const handleEdit = (id) => {
    setOpenEdit(true);
    setClassEdit(id);
  };
  return (
    <>
      <DeleteClass
        open={openDelete}
        setOpen={setOpenDelete}
        id={userDelete}
        fetchData={fetchClass}
      />
      <EditClass
        fetchData={fetchClass}
        class_id={classEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />
      <Table
        bordered={true}
        className="shadow-xl"
        dataSource={
          rows
            ? rows.map((row) => {
                if (
                  row?.GVCN?.Profile?.firstname &&
                  row?.GVCN?.Profile?.lastname
                ) {
                  row.gvcn =
                    row?.GVCN?.Profile?.firstname +
                    " " +
                    row?.GVCN?.Profile?.lastname;
                } else {
                  row.gvcn = "chưa có GVCN";
                }
                row.schoolyear = row?.Schoolyear?.name;
                return { ...row, key: row.id };
              })
            : []
        }
        pagination={{
          total: count,
          defaultPageSize: pagination.limit,
          showSizeChanger: true,
          pageSizeOptions: ["1", "10", "50"],
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, page, limit: pageSize });
          },
        }}
      >
        <Column title="Tên lớp" dataIndex="name" key="name" />
        <Column title="Giáo viên chủ nhiệm" dataIndex="gvcn" key="gvcn" />
        <Column title="Năm học" dataIndex="schoolyear" key="schoolyear" />
        <Column
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Tooltip title={"Danh sách học sinh " + record.name}>
                <Button
                  icon={<OrderedListOutlined />}
                  onClick={() => {
                    navigate(`/class/${record.id}`);
                  }}
                ></Button>
              </Tooltip>
              <Tooltip title={"Danh sách môn học " + record.name}>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  onClick={() => {
                    navigate(`/class/subject/${record.id}`);
                  }}
                ></Button>
              </Tooltip>
              <Tooltip title={"Xóa " + record.name}>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.id)}
                ></Button>
              </Tooltip>
              <Tooltip title={"Sửa thông tin " + record.name}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    handleEdit(record.id);
                  }}
                ></Button>
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
