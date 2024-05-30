import React, { useEffect, useState } from "react";
import { deleteFee } from "@/services/fee";
import { Modal } from "antd";
import { toast } from "react-toastify";
const defaultText = "Bạn có chắc muốn xóa khoảng phí này không ?";
const App = (props) => {
  const { open, setOpen, feeDetele, fetchData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    +feeDetele.ishidden == 1
      ? defaultText
      : "Bạn có chắc muốn hiện khoảng phí này không ?"
  );
  useEffect(() => {
    setModalText(
      +feeDetele.ishidden == 1
        ? defaultText
        : "Bạn có chắc muốn hiện khoảng phí này không ?"
    );
  }, [feeDetele]);
  const handleOk = () => {
    deleteFee(feeDetele).then((res) => {
      setModalText(res.message);
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        fetchData();
        setModalText(defaultText);
        toast.success("Xóa khoảng phí thành công");
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
