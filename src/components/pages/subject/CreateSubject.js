import React, { useEffect, useState, useRef } from "react";
import { createSubject } from "@/services/subject/index";
import { Modal, Input, Select, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const App = (props) => {
  const { fetchSubject } = props;
  const [subjects, setSubjects] = useState([{ name: "" }]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng này không ?"
  );

  const handleOk = async () => {
    const create = await createSubject(subjects);
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchSubject().then(() => {
          toast.success("Tạo môn học thành công");
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newSubjects = [...subjects];
    newSubjects[index] = { ...subjects[index], [name]: value };
    setSubjects(newSubjects);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleAdd = () => {
    setSubjects([...subjects, { name: "" }]);
  };
  const handleDelete = (index) => {
    const newsubjects = subjects.filter((role, i) => i !== index);
    setSubjects(newsubjects);
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
          subjects.map((_subject, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Input
                placeholder="Tên môn học"
                name="name"
                value={_subject.name}
                onChange={(e) => handleChange(e, index)}
              ></Input>
              {index === subjects.length - 1 ? (
                <Button
                  icon={<PlusCircleOutlined onClick={handleAdd} />}
                ></Button>
              ) : (
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(index)}
                ></Button>
              )}
            </div>
          ))
        )}
      </Modal>
    </>
  );
};

export default App;
