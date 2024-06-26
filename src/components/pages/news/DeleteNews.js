import React, { useState } from "react";

import { updateNews } from "@/services/news";
import { Modal } from "antd";
import { toast } from "react-toastify";

const App = (props) => {
  const { open, setOpen, id, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa tin này không ?"
  );
  const handleOk = async () => {
    try {
      const res = await updateNews({ id: id, ishidden: 1 });
      console.log(res);
      setConfirmLoading(true);
      setModalText("Đang xóa tin...");
      if (+res.code === 0) {
        setModalText(res.message);
        setTimeout(() => {
          setOpen(false);
          fetchData();
          toast.success("Xóa lớp học thành công");
          setConfirmLoading(false);
        }, 1000);
      } else {
        setModalText(res.message);
        setTimeout(() => {
          setConfirmLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
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
