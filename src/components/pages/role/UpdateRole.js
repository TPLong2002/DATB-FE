import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Input } from "antd";
import { getRoleById, updateRole } from "@/services/role";
import { toast } from "react-toastify";

const App = (prop) => {
  const { rerender, open, setOpen, id } = prop;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [role, setRole] = useState();

  const fetchRole = async () => {
    const res = await getRoleById(id);
    setRole(res.data);
  };

  useEffect(() => {
    if (id) fetchRole();
  }, [id]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await updateRole(role);
    if (+res.code === 0) {
      setTimeout(() => {
        toast.success(res.message);
        setOpen(false);
        setConfirmLoading(false);
        rerender();
      }, 1000);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");

    setOpen(false);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setRole({ ...role, [name]: value });
  };

  return (
    <>
      <Modal
        title="Cập nhật quyền"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-row items-center space-x-1">
          <Input
            name="URL"
            placeholder="URL"
            value={role?.URL}
            onChange={(e) => handleChange(e)}
          />
          <Input
            name="description"
            placeholder="Description"
            value={role?.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </Modal>
    </>
  );
};

export default App;
