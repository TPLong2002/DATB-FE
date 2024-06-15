import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import DeleteClass from "@/components/pages/class/DeleteClass";
import { Link, useNavigate } from "react-router-dom";
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
  const { rows, count } = data;

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setOpenDelete(true);
    setUserDelete(id);
  };
  return (
    <>
      <DeleteClass
        open={openDelete}
        setOpen={setOpenDelete}
        id={userDelete}
        fetchData={fetchClass}
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
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="GVCN" dataIndex="gvcn" key="gvcn" />
        <Column title="Schoolyear" dataIndex="schoolyear" key="schoolyear" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Button
                icon={<OrderedListOutlined />}
                onClick={() => {
                  navigate(`/class/${record.id}`);
                }}
              ></Button>
              <Button
                type="primary"
                icon={<BookOutlined />}
                onClick={() => {
                  navigate(`/class/subject/${record.id}`);
                }}
              ></Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              ></Button>

              <Button icon={<EditOutlined />}></Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
