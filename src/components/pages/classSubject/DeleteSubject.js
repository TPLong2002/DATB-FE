import React, { useEffect, useState } from "react";
import { deleteSubject } from "@/services/class/classSubject";

import { Modal } from "antd";
import { toast } from "react-toastify";
const defaultText = "Bạn có chắc muốn xóa môn học này không ?";
const App = (props) => {
  const { open, setOpen, subjectDetele, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa môn học này không ?"
  );

  const handleOk = () => {
    setConfirmLoading(true);
    deleteSubject(subjectDetele).then((res) => {
      if (+res.code === 0) {
        setModalText(res.message);

        setTimeout(() => {
          setOpen(false);
          fetchData();
          setModalText(defaultText);
          toast.success("Xóa môn khỏi lớp học thành công");
          setConfirmLoading(false);
        }, 2000);
      }
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Xóa môn học"
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
