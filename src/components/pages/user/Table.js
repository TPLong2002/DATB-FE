import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Select, Input } from "antd";
import DeleteUser from "@/components/pages/user/DeleteUser";
import CreateUser from "@/components/pages/user/CreateUser";
import { useNavigate } from "react-router-dom";

const { Column } = Table;

const tags = [
  { id: 1, name: "admin", color: "red" },
  { id: 2, name: "student", color: "green" },
  { id: 3, name: "parent", color: "geekblue" },
  { id: 4, name: "teacher", color: "gold" },
  { id: 5, name: "accountant", color: "purple" },
];

const App = (props) => {
  const {
    data,
    pagination,
    setPagination,
    fetchUser,
    groups,
    groupSelected,
    setGroupSelected,
    type,
    setTypeSelected,
    typeSelected,
    search,
    setSearch,
  } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [userDelete, setUserDelete] = useState({ id: 0, ishidden: 0 });
  const [textSearch, setTextSearch] = useState(search ? search : "");

  const { rows, count } = data;
  const navigate = useNavigate();
  const handleDelete = (id, isdeleted) => {
    setOpenDelete(true);
    setUserDelete({ id: id, ishidden: +isdeleted ^ 1 });
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onSelectChange = (value) => {
    setGroupSelected(value);
  };
  const onTypeChange = (value) => {
    setTypeSelected(value);
  };
  const handleChange = (e) => {
    setTextSearch(e.target.value);
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  return (
    <>
      <div className="flex justify-between py-4">
        <DeleteUser
          open={openDelete}
          setOpen={setOpenDelete}
          userDelete={userDelete}
          fetchData={fetchUser}
        />

        <div className="flex space-x-2">
          <Select
            showSearch
            value={groupSelected}
            placeholder="Chọn người dùng"
            optionFilterProp="children"
            onChange={onSelectChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={groups?.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
            style={{ width: 160 }}
          />
          <Select
            showSearch
            value={typeSelected}
            placeholder="Chọn loại tài khoảng"
            optionFilterProp="children"
            onChange={onTypeChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={type}
            style={{ width: 160 }}
          />
        </div>
        <div className="flex space-x-2">
          <Input.Search
            placeholder="search"
            value={textSearch}
            onSearch={handleSearch}
            onChange={handleChange}
          ></Input.Search>
          <CreateUser fetchData={fetchUser} />
        </div>
      </div>

      <Table
        bordered={true}
        dataSource={rows ? rows?.map((row) => ({ ...row, key: row.id })) : []}
        pagination={{
          total: count,
          defaultPageSize: pagination.limit,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "50"],
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, page, limit: pageSize });
          },
        }}
        className="shadow-xl"
      >
        <Column title="Username" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Group"
          dataIndex="group_id"
          key="group_id"
          render={(group_id) => (
            <>
              {tags.map((tag, index) => {
                if (tag.id === group_id) {
                  return (
                    <Tag color={tag.color} key={index}>
                      {tag.name.toUpperCase()}
                    </Tag>
                  );
                }
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <a onClick={() => navigate(`/user/profile/${record.id}`)}>
                Profile {record.username}
              </a>
              {record.isdeleted == 0 ? (
                <a
                  onClick={() => handleDelete(record.id, record.isdeleted)}
                  className="hover:text-red-500"
                >
                  Delete
                </a>
              ) : (
                <a
                  onClick={() => handleDelete(record.id, record.isdeleted)}
                  className="hover:text-green-500"
                >
                  Recover
                </a>
              )}
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
