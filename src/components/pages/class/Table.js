import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import DeleteUser from "@/components/pages/user/DeleteUser";
import CreateUser from "@/components/pages/user/CreateUser";
import { Link } from "react-router-dom";

const { Column } = Table;

const tags = [
  { id: 1, name: "admin", color: "red" },
  { id: 2, name: "student", color: "green" },
  { id: 3, name: "parent", color: "geekblue" },
  { id: 4, name: "teacher", color: "gold" },
  { id: 5, name: "accountant", color: "purple" },
];

const App = (props) => {
  const { data, pagination, setPagination, fetchUser } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [userDelete, setUserDelete] = useState(0);
  const { rows, count } = data;
  const handleDelete = (id) => {
    setOpenDelete(true);
    setUserDelete(id);
  };
  return (
    <>
      <div className="text-right">
        <DeleteUser
          open={openDelete}
          setOpen={setOpenDelete}
          id={userDelete}
          fetchData={fetchUser}
        />
        <CreateUser fetchData={fetchUser} />
      </div>

      <Table
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
          pageSizeOptions: ["5", "10", "50"],
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, page, limit: pageSize });
          },
        }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="GVCN" dataIndex="gvcn" key="gvcn" />
        <Column title="Schoolyear" dataIndex="schoolyear" key="schoolyear" />
      </Table>
    </>
  );
};

export default App;
