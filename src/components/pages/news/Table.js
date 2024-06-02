import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import DeleteClass from "@/components/pages/class/DeleteClass";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const format = "YYYY-MM-DD HH:mm:ss";
const { Column } = Table;

const App = (props) => {
  const { data, pagination, setPagination, fetchNews } = props;
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
        fetchData={fetchNews}
      />

      <Table
        bordered={true}
        className="shadow-xl"
        dataSource={
          rows
            ? rows.map((row) => {
                return {
                  ...row,
                  key: row.id,
                  schoolyear_name: row.schoolyear?.name,
                  category_description: row.category?.description,
                  author_name:
                    row.author?.Profile.firstName +
                    " " +
                    row.author?.Profile.lastName,
                  createdAt: dayjs(row.createdAt).format(format),
                };
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
        <Column title="Tác giả" dataIndex="author_name" key="author_name" />
        <Column
          title="Danh mục"
          dataIndex="category_description"
          key="category_description"
        />
        <Column title="Ngày đăng" dataIndex="createdAt" key="createdAt" />
        <Column
          title="Năm học"
          dataIndex="schoolyear_name"
          key="schoolyear_name"
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Link to={`/news/detail/${record.id}`}>Chi tiết</Link>

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
