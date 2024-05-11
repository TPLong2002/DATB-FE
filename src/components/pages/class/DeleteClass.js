import React, { useState } from "react";
import { deleteClass } from "@/services/class";

import { Modal } from "antd";
import { toast } from "react-toastify";

const App = (props) => {
  const { open, setOpen, id, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa lớp học naỳ không ?"
  );
  const handleOk = () => {
    deleteClass(id).then((res) => {
      setModalText(res.message);
      setConfirmLoading(true);
      setModalText(res.message);
      setTimeout(() => {
        setOpen(false);
        fetchData();
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
