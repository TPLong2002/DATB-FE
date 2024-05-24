import React, { useEffect, useState } from "react";
import { createSubject } from "@/services/subject/index";
import { Modal, Input, Select, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const App = (props) => {
  const { fetchAssignment } = props;
  const [assignment, setAssignment] = useState([{ name: "" }]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOk = async () => {
    const create = await createSubject(assignment);
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchAssignment().then(() => {
          toast.success("Tạo môn học thành công");
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newAssignment = [...assignment];
    newAssignment[index] = { ...assignment[index], [name]: value };
    setAssignment(newAssignment);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleAdd = () => {
    setAssignment([...assignment, { name: "" }]);
  };
  const handleDelete = (index) => {
    const newAssignment = assignment.filter((role, i) => i !== index);
    setAssignment(newAssignment);
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo môn học
      </Button>
      <Modal
        title="Tạo lớp học"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
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
            <Input
              placeholder="Tền bài"
              name="name"
              value={assignment.name}
              onChange={(e) => handleChange(e)}
            ></Input>
            <Input
              placeholder="Nội dung"
              name="content"
              value={assignment.content}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
