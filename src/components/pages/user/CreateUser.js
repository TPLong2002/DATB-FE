import React, { useEffect, useState } from "react";
import { createUser } from "@/services/user";
import { getGroups } from "@/services/group";

import { Modal, Input, Select, Button } from "antd";

const App = (props) => {
  const { id, fetchData } = props;
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng naỳ không ?"
  );
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
    console.log(user);
    const create = await createUser(user);
    if (create.code == 0) {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSelectChange = (value) => {
    setUser({ ...user, group_id: value });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const admin = groups.filter((group) => group.name === "admin");
  const school_staff = groups.filter(
    (group) => group.name === "teacher" || group.name === "accountant"
  );
  const parent_student = groups.filter(
    (group) => group.name === "student" || group.name === "parent"
  );
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
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div>
            <Input
              placeholder="Username"
              name="username"
              onChange={handleChange}
            ></Input>
            <Input
              placeholder="Password"
              name="password"
              onChange={handleChange}
            ></Input>
            <Input
              placeholder="Email"
              name="email"
              onChange={handleChange}
            ></Input>
            <Select
              defaultValue={1}
              name="group_id"
              style={{ width: 200 }}
              onChange={handleSelectChange}
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
        )}
      </Modal>
    </>
  );
};

export default App;
