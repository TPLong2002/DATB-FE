import React, { useState } from "react";
import { deleteSubject } from "@/services/subject";

import { Modal } from "antd";
import { toast } from "react-toastify";
const defaultText = "Bạn có chắc muốn xóa môn học này không ?";
const App = (props) => {
  const { open, setOpen, subjectDetele, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(defaultText);
  const handleOk = () => {
    deleteSubject(subjectDetele).then((res) => {
      setModalText(res.message);
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        fetchData();
        setModalText(defaultText);
        toast.success("Xóa lớp học thành công");
        setConfirmLoading(false);
      }, 2000);
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Xóa lớp học"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default App;
