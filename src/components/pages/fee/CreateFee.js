import React, { useState } from "react";
import { createFee } from "@/services/fee";
import { Modal, Input, Button, DatePicker } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const format = "YYYY/MM/DD";

const App = (props) => {
  const { fetchFee } = props;
  const [fees, setFees] = useState([
    {
      name: "",
      price: "",
      startDate: dayjs(new Date()).format(format),
      endDate: dayjs(new Date()).format(format),
    },
  ]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn xóa người dùng này không ?"
  );

  const handleOk = async () => {
    const create = await createFee(fees);
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchFee().then(() => {
          toast.success("Tạo khoảng phí thành công");
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFees = [...fees];
    newFees[index] = { ...fees[index], [name]: value };
    setFees(newFees);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleAdd = () => {
    setFees([
      ...fees,
      {
        name: "",
        price: "",
        startDate: dayjs(new Date()).format(format),
        endDate: dayjs(new Date()).format(format),
      },
    ]);
  };
  const handleDelete = (index) => {
    const newFees = fees.filter((role, i) => i !== index);
    setFees(newFees);
  };
  const onChange = (date, dateString, field, index) => {
    const newFees = [...fees];
    newFees[index] = { ...fees[index], [field]: dateString };
    setFees(newFees);
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo khoảng phí
      </Button>
      <Modal
        title="Tạo lớp học"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
        footer={[
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
          fees.map((fee, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Input
                placeholder="Tên khoảng phí"
                name="name"
                value={fee.name}
                onChange={(e) => handleChange(e, index)}
              ></Input>
              <Input
                placeholder="Số tiền"
                name="price"
                value={fee.price}
                onChange={(e) => handleChange(e, index)}
              ></Input>
              <DatePicker
                className="w-full"
                defaultValue={dayjs(fee.startDate)}
                format={format}
                onChange={(date, dateString) =>
                  onChange(date, dateString, "startDate", index)
                }
              />
              <DatePicker
                className="w-full"
                defaultValue={dayjs(fee.endDate)}
                format={format}
                onChange={(date, dateString) =>
                  onChange(date, dateString, "endDate", index)
                }
              />
              {index === fees.length - 1 ? (
                <Button
                  icon={<PlusCircleOutlined onClick={handleAdd} />}
                ></Button>
              ) : (
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(index)}
                ></Button>
              )}
            </div>
          ))
        )}
      </Modal>
    </>
  );
};

export default App;
