import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import DeleteClass from "@/components/pages/class/DeleteClass";
import { Link, useNavigate } from "react-router-dom";

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
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="GVCN" dataIndex="gvcn" key="gvcn" />
        <Column title="Schoolyear" dataIndex="schoolyear" key="schoolyear" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Link to="/classinfo" state={{ id: record.id }}>
                Danh sách {record.username}
              </Link>
              <a
                onClick={() => {
                  navigate(`/class/subject/${record.id}`);
                }}
              >
                Môn học
              </a>
              <a
                onClick={() => handleDelete(record.id)}
                className="hover:text-red-500"
              >
                Delete
              </a>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
