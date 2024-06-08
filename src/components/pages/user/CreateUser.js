import React, { useEffect, useState, useRef } from "react";
import { createUser } from "@/services/user";
import { getGroups } from "@/services/group";
import {
  UploadOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Papa from "papaparse";
import { Modal, Input, Select, Button } from "antd";

const App = (props) => {
  const { fetchData } = props;
  const [users, setUsers] = useState([
    { username: "", password: "", email: "" },
  ]);
  const [groups, setGroups] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng này không ?"
  );
  // const [importedFile, setImportedFile] = useState(null);
  const fileInputRef = useRef(null); // Use useRef to create a ref

  const fetchGroup = async () => {
    try {
      const res = await getGroups();
      setGroups(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  const handleOk = async () => {
    console.log(users);
    const create = await createUser(users);
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchData().then(() => {
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newUsers = [...users];
    newUsers[index] = { ...users[index], [name]: value };
    setUsers(newUsers);
  };

  const handleSelectChange = (value, index) => {
    const newUsers = [...users];
    newUsers[index] = { ...users[index], group_id: value };
    setUsers(newUsers);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      console.log("File loaded successfully");
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;
      setUsers(parsedData);
    };
    reader.readAsText(file);
  };
  const admin = groups?.filter((group) => group.name === "admin");
  const school_staff = groups?.filter(
    (group) => group.name === "teacher" || group.name === "accountant"
  );
  const parent_student = groups?.filter(
    (group) => group.name === "student" || group.name === "parent"
  );
  const handleAdd = () => {
    setUsers([...users, { username: "", password: "", email: "" }]);
  };
  const handleDelete = (index) => {
    const newUsers = users.filter((role, i) => i !== index);
    setUsers(newUsers);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo mới người dùng
      </Button>
      <Modal
        title="Tạo mới người dùng"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <input
            key="file"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef} // Assign the ref to the file input
          />,
          <Button
            key="import"
            onClick={() => fileInputRef.current.click()} // Trigger click event of the file input when "Import" button is clicked
            icon={<UploadOutlined />}
          >
            Import
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div>
            {users.map((user, index) => (
              <div key={index} className=" border-t-2 py-3 flex space-x-2">
                <div className="space-y-2 w-11/12">
                  <Input
                    placeholder="Username"
                    name="username"
                    value={user.username}
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                  <Input
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                  <Input
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                  <Select
                    placeholder="Chọn nhóm quyền"
                    value={+user.group_id || null}
                    name="group_id"
                    style={{ width: 200 }}
                    onChange={(value) => handleSelectChange(value, index)}
                    options={[
                      {
                        label: <span>Manager</span>,
                        title: "Manager",
                        options: admin.map((ad) => {
                          return {
                            key: ad.id,
                            label: <span>{ad.description}</span>,
                            value: ad.id,
                          };
                        }),
                      },
                      {
                        label: <span>School Staff</span>,
                        title: "School Staff",
                        options:
                          school_staff &&
                          school_staff.map((school) => {
                            return {
                              key: school.id,
                              label: <span>{school.description}</span>,
                              value: school.id,
                            };
                          }),
                      },
                      {
                        label: <span>Student & Parent</span>,
                        title: "Student & Parent",
                        options:
                          parent_student &&
                          parent_student.map((school) => {
                            return {
                              key: school.id,
                              label: <span>{school.description}</span>,
                              value: school.id,
                            };
                          }),
                      },
                    ]}
                  />
                </div>

                <Button
                  className="w-1/12"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(index)}
                ></Button>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={handleAdd}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
