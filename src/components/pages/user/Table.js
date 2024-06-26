import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Select, Input, Button, Tooltip } from "antd";
import DeleteUser from "@/components/pages/user/DeleteUser";
import CreateUser from "@/components/pages/user/CreateUser";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  DownloadOutlined,
  ProfileOutlined,
  DeleteOutlined,
  RedoOutlined,
} from "@ant-design/icons";

const { Column } = Table;

const tags = [
  { id: 1, name: "admin", color: "red" },
  { id: 2, name: "student", color: "green" },
  { id: 3, name: "parent", color: "geekblue" },
  { id: 4, name: "teacher", color: "gold" },
  { id: 5, name: "accountant", color: "purple" },
];
const headers = [
  { label: "id", key: "id" },
  { label: "username", key: "username" },
  { label: "name", key: "name" },
];
const filename = "exported_data.csv";
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
    allSchoolyear,
    setSelectSchoolyear,
  } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [userDelete, setUserDelete] = useState({ id: 0, ishidden: 0 });
  const [textSearch, setTextSearch] = useState(search ? search : "");
  const [hovered, setHovered] = useState(false);

  const { rows, count } = data;
  const navigate = useNavigate();
  const handleDelete = (id, isdeleted) => {
    setOpenDelete(true);
    setUserDelete({ id: id, ishidden: +isdeleted ^ 1 });
  };
  console.log("rows", rows);
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
  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  const clearFilter = () => {
    setGroupSelected();
    setTypeSelected(0);
    setSelectSchoolyear();
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
            style={{ width: 140 }}
          />
          <Select
            showSearch
            placeholder="Chọn năm học"
            optionFilterProp="children"
            onChange={onSchoolyearChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={allSchoolyear?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ width: 140 }}
          />
          <Button danger type="primary" onClick={() => clearFilter()}>
            Xóa lọc
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button icon={<DownloadOutlined />}>
            <CSVLink
              data={rows?.map((row) => ({
                id: row?.id,
                username: row?.username,
                name: row?.Profile?.firstName + " " + row?.Profile?.lastName,
              }))}
              headers={headers}
              filename={filename}
            >
              Export to CSV
            </CSVLink>
          </Button>
          <Input.Search
            placeholder="search"
            value={textSearch}
            enterButton
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
        <Column title="Tên đăng nhập" dataIndex="username" key="username" />
        <Column
          title="Họ và tên"
          render={(record) => (
            <p>
              {record?.Profile?.firstName + " " + record?.Profile?.lastName}
            </p>
          )}
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Nhóm người dùng"
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
          key="action"
          render={(_, record) => (
            <Space size="middle" className="text-l">
              <Tooltip
                title={
                  "Xem thông tin " +
                  record?.Profile?.firstName +
                  " " +
                  record?.Profile?.lastName
                }
              >
                <Button
                  onClick={() => navigate(`/user/profile/${record.id}`)}
                  icon={<ProfileOutlined />}
                ></Button>
              </Tooltip>
              {record.isdeleted == 0 ? (
                <Tooltip
                  title={
                    "Xóa " +
                    record?.Profile?.firstName +
                    " " +
                    record?.Profile?.lastName
                  }
                >
                  <Button
                    onClick={() => handleDelete(record.id, record.isdeleted)}
                    danger
                    icon={<DeleteOutlined />}
                  ></Button>
                </Tooltip>
              ) : (
                <Tooltip
                  title={
                    "Khôi phục " +
                    record?.Profile?.firstName +
                    " " +
                    record?.Profile?.lastName
                  }
                >
                  <Button
                    onClick={() => handleDelete(record.id, record.isdeleted)}
                    icon={<RedoOutlined />}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      color: hovered ? "green" : "green",
                      borderColor: hovered ? "green" : "green",
                    }}
                  ></Button>
                </Tooltip>
              )}
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default App;
