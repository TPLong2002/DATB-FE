import React, { useEffect, useState } from "react";
import { deleteUsersOfFee } from "@/services/fee/studentOfFee";
import { Modal } from "antd";
import { toast } from "react-toastify";
const defaultText = "Bạn có chắc muốn xóa khoảng phí này không ?";
const App = (props) => {
  const { open, setOpen, studentDetele, fetchData, fetchAllStudents } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng khỏi khoảng phí này không ?"
  );

  const handleOk = () => {
    deleteUsersOfFee(studentDetele).then((res) => {
      console.log(res);
      setModalText(res.message);
      setConfirmLoading(true);
      if (+res.code === 0) {
        setTimeout(() => {
          setOpen(false);
          fetchData();
          fetchAllStudents();
          setModalText(defaultText);
          toast.success("Xóa thành công");
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
