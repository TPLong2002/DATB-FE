import React, { useEffect, useState } from "react";
import { deleteUser } from "@/services/user";

import { Modal } from "antd";

const App = (props) => {
  const { open, setOpen, userDelete, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    +userDelete.ishidden == 1
      ? "Bạn có chắc muốn xóa người dùng này không ?"
      : "Bạn có chắc muốn khôi phục người dùng này không ?"
  );
  console.log(userDelete);
  useEffect(() => {
    setModalText(
      +userDelete.ishidden == 1
        ? "Bạn có chắc muốn xóa người dùng này không ?"
        : "Bạn có chắc muốn khôi phục người dùng này không ?"
    );
  }, [userDelete]);
  const handleOk = () => {
    if (userDelete.ishidden === 1) {
      setModalText("Bạn có chắc muốn khôi phục người dùng này không ?");
    }
    deleteUser(userDelete.id, userDelete.ishidden).then((res) => {
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
