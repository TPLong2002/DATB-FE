import React, { useState } from "react";
import { deleteUser } from "@/services/user";

import { Button, Modal } from "antd";

const App = (props) => {
  const { open, setOpen, id, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng naỳ không ?"
  );
  const handleOk = () => {
    deleteUser(id).then((res) => {
      setModalText(res.message);
      setConfirmLoading(true);
      setModalText(res.message);
      setTimeout(() => {
        setOpen(false);
        fetchData();
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
        title="Xóa người dùng"
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
