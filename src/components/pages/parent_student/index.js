import React, { useEffect, useState } from "react";

import {
  getStudentAndParents,
  deleteRelation,
} from "@/services/user/parent_student";
import { getAllSchoolyear } from "@/services/schoolyear";

import { Table, Select, Input, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import CreateRelation from "./CreateRelation";
import { toast } from "react-toastify";
function App() {
  const [data, setData] = useState({ rows: [], count: 0 });
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [search, setSearch] = useState();
  const [comfirmLoading, setComfirmLoading] = useState(false);
  const [text, setText] = useState("Bạn có chắc xóa quan hệ này không?");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [allSchoolyear, setAllSchoolyear] = useState([
    {
      id: null,
      name: "Tất cả",
    },
  ]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [textSearch, setTextSearch] = useState(search ? search : "");

  const fetchUser = async () => {
    try {
      const res = await getStudentAndParents(
        pagination.page,
        pagination.limit,
        search,
        selectSchoolyear
      );
      console.log("res", res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSchoolyear = async () => {
    try {
      const res3 = await getAllSchoolyear();
      setAllSchoolyear([...allSchoolyear, ...res3?.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Phụ huynh - học sinh";
    fetchSchoolyear();
  }, []);
  useEffect(() => {
    fetchUser();
  }, [pagination, search, selectSchoolyear]);
  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };
  const handleOk = async () => {
    try {
      setComfirmLoading(true);
      setText("Đang xóa...");
      console.log("deleteId", deleteId);
      const res = await deleteRelation(deleteId);
      if (+res.code === 0) {
        setTimeout(() => {
          toast.success("Xóa thành công");
          setComfirmLoading(false);
          setOpenDelete(false);
          fetchUser();
        }, 1000);
      } else {
        toast.error("Xóa thất bại");
        setComfirmLoading(false);
        setOpenDelete(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Tên học sinh",
      dataIndex: "studentName",
    },
    {
      title: "Tên tài khoảng học sinh",
      dataIndex: "studentUserName",
    },
    { title: "Email học sinh", dataIndex: "studentEmail" },
    {
      title: "Tên phụ huynh",
      dataIndex: "parentName",
    },
    {
      title: "Tên tài khoảng phụ huynh",
      dataIndex: "parentUserName",
    },
    { title: "Email phụ huynh", dataIndex: "parentEmail" },
    {
      title: "action",
      render: (text, record, index) => {
        if (record.id) {
          return (
            <Button
              danger
              onClick={() => handleDelete(record.id)}
              icon={<DeleteOutlined />}
            ></Button>
          );
        }
      },
    },
  ];

  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const handleChange = (e) => {
    setTextSearch(e.target.value);
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  const onClose = () => {
    console.log("onClose");
    setOpenDelete(false);
    setComfirmLoading(false);
    setText("Bạn có chắc xóa quan hệ này không?");
  };
  return (
    <div className="flex flex-col space-y-4 py-4">
      <Modal
        title="Xóa quann hệ học sinh - phụ huynh"
        open={openDelete}
        onOk={handleOk}
        onCancel={() => setOpenDelete(false)}
        confirmLoading={comfirmLoading}
      >
        <p>{text}</p>
      </Modal>
      <div className="flex justify-between">
        <div>
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
        </div>
        <div className="flex space-x-2">
          <Input.Search
            placeholder="search"
            value={textSearch}
            enterButton
            onSearch={handleSearch}
            onChange={handleChange}
          ></Input.Search>
          <CreateRelation fetchUser={fetchUser}></CreateRelation>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data?.rows?.map((row) => ({
          key: row?.id,
          id: row?.User_Students[0]?.Parent_Student?.id,
          studentName: row?.Profile?.firstName + " " + row?.Profile?.lastName,
          studentUserName: row?.username,
          studentEmail: row?.email,
          parentName:
            row?.User_Students[0]?.Profile?.firstName &&
            row?.User_Students[0]?.Profile?.lastName
              ? row?.User_Students[0]?.Profile?.firstName +
                " " +
                row?.User_Students[0]?.Profile?.lastName
              : "",
          parentUserName: row?.User_Students[0]?.username,
          parentEmail: row?.User_Students[0]?.email,
        }))}
        pagination={{
          total: data?.count,
          defaultPageSize: pagination.limit,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "50"],
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, page, limit: pageSize });
          },
        }}
        bordered
      ></Table>
    </div>
  );
}

export default App;
