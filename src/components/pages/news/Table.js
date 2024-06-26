import React, { useState } from "react";
import { Button, Space, Table, Tooltip } from "antd";

import DeleteNews from "@/components/pages/news/DeleteNews";
import { useNavigate } from "react-router-dom";
import { ProfileOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const format = "YYYY-MM-DD HH:mm:ss";
const { Column } = Table;

const App = (props) => {
  const { data, pagination, setPagination, fetchNews } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [newsDelete, setNewsDelete] = useState(0);
  const { rows, count } = data;
  const navigate = useNavigate();
  console.log(data);
  const handleDelete = (id) => {
    setOpenDelete(true);
    setNewsDelete(id);
  };
  return (
    <>
      <DeleteNews
        open={openDelete}
        setOpen={setOpenDelete}
        id={newsDelete}
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
        <Column title="Tác giả" dataIndex="author_name" key="author_name" />
        <Column
          title="Danh mục"
          dataIndex="category_description"
          key="category_description"
        />
        <Column
          title="Tiêu đề"
          render={(record) => (
            <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[400px]">
              {record.title}
            </p>
          )}
        />
        <Column title="Ngày đăng" dataIndex="createdAt" key="createdAt" />
        <Column
          title="Năm học"
          dataIndex="schoolyear_name"
          key="schoolyear_name"
        />
        <Column
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Tooltip title={"Chi tiết " + record?.title}>
                <Button
                  onClick={() => navigate(`/admin/news/detail/${record.id}`)}
                  icon={<ProfileOutlined />}
                ></Button>
              </Tooltip>
              <Tooltip title={"Xóa " + record?.title}></Tooltip>
              <Button
                onClick={() => handleDelete(record.id)}
                danger
                icon={<DeleteOutlined />}
              ></Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
