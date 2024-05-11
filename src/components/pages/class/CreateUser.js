import React, { useEffect, useState, useRef } from "react";
import { createClass } from "@/services/class";
import { getGroups } from "@/services/group";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { Modal, Input, Select, Button } from "antd";

const App = (props) => {
  const { fetchData } = props;
  const [classes, setClasses] = useState([
    { name: "", gvcn_id: "", schoolyear: "" },
  ]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng này không ?"
  );
  // const [importedFile, setImportedFile] = useState(null);
  const fileInputRef = useRef(null); // Use useRef to create a ref

  const handleOk = async () => {
    const create = await createClass(classes);
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchData().then(() => {
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newClasses = [...classes];
    newClasses[index] = { ...classes[index], [name]: value };
    setClasses(newClasses);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      console.log("File loaded successfully");
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;

      setClasses(parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo mới người dùng
      </Button>
      <Modal
        title="Tạo mới người dùng"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <input
            key="file"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef} // Assign the ref to the file input
          />,
          <Button
            key="import"
            onClick={() => fileInputRef.current.click()} // Trigger click event of the file input when "Import" button is clicked
            icon={<UploadOutlined />}
          >
            Import
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          classes.map((_class, index) => (
            <div key={index}>
              <Input
                placeholder="Tên lớp"
                name="name"
                value={_class.name}
                onChange={(e) => handleChange(e, index)}
              ></Input>
              <Input
                placeholder="Giáo viên chủ nhiệm"
                name="gvcn_id"
                value={_class.gvcn_id}
                onChange={(e) => handleChange(e, index)}
              ></Input>
              <Input
                placeholder="Năm học"
                name="schoolyear"
                value={_class.schoolyear}
                onChange={(e) => handleChange(e, index)}
              ></Input>
            </div>
          ))
        )}
      </Modal>
    </>
  );
};

export default App;
