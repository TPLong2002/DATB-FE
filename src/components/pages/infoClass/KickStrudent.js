import React, { useState } from "react";
import { kickUserFromClass } from "@/services/class/classInfo";

import { Modal } from "antd";
import { toast } from "react-toastify";

const App = (props) => {
  const { open, setOpen, user_id, class_id, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn kích học sinh này ?"
  );
  const handleOk = () => {
    kickUserFromClass(user_id, class_id).then((res) => {
      setModalText(res.message);
      setConfirmLoading(true);
      setModalText(res.message);
      setTimeout(() => {
        setOpen(false);
        fetchData();
        toast.success("thành công");
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
        title="kích học sinh"
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
