import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { addRoles } from "@/services/role";
import { toast } from "react-toastify";

const App = (prop) => {
  const { rerender } = prop;
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState([{ URL: true, description: true }]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [roles, setRoles] = useState([
    {
      URL: "",
      description: "",
    },
  ]);

  const showModal = () => {
    setOpen(true);
  };
  const handleValid = () => {
    let check = true;
    const newValid = [...valid];
    roles.map((role, index) => {
      if (role.URL === "") {
        newValid[index] = { ...newValid[index], URL: false };
        check = false;
      } else {
        newValid[index] = { ...newValid[index], URL: true };
      }
      if (role.description === "") {
        newValid[index] = { ...newValid[index], description: false };
        check = false;
      } else {
        newValid[index] = { ...newValid[index], description: true };
      }
    });
    setValid(newValid);
    return check;
  };
  const handleOk = async () => {
    const check = handleValid();

    if (check) {
      setConfirmLoading(true);

      const res = await addRoles(roles);
      if (res) {
        toast.success(res.message);
        setOpen(false);
        setConfirmLoading(false);
        rerender();
      }
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");

    setOpen(false);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newValid = [...valid];
    const newRoles = [...roles];
    if (value === "") {
      newValid[index] = { ...newValid[index], [name]: false };
    } else {
      newValid[index] = { ...newValid[index], [name]: true };
    }
    newRoles[index] = { ...newRoles[index], [name]: value };
    setValid(newValid);
    setRoles(newRoles);
  };
  const handleAdd = () => {
    setRoles([...roles, { URL: "", description: "" }]);
    valid.push({ URL: true, description: true });
  };
  const handleDelete = (index) => {
    const newRoles = roles.filter((role, i) => i !== index);
    setRoles(newRoles);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue-600">
        Add URL
      </Button>
      <Modal
        title="Add new role"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="space-y-2">
          {roles.map((role, index) => (
            <div key={index} className="flex flex-row items-center space-x-1">
              <Input
                name="URL"
                placeholder="URL"
                status={`${valid[index].URL ? "" : "error"}`}
                value={role.URL}
                onChange={(e) => handleChange(e, index)}
              />
              <Input
                name="description"
                placeholder="Description"
                status={`${valid[index].description ? "" : "error"}`}
                value={role.description}
                onChange={(e) => handleChange(e, index)}
              />
              {index === roles.length - 1 ? (
                <AddCircleOutlineIcon
                  onClick={handleAdd}
                  className=" hover:cursor-pointer"
                />
              ) : (
                <button onClick={() => handleDelete(index)}>
                  <DeleteIcon className=" hover:cursor-pointer" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default App;
