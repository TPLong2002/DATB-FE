import React, { useEffect, useState } from "react";
import { createFee } from "@/services/fee";
import { Modal, Input, Button, DatePicker, Select } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { getAllSemester } from "@/services/semester";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllGrade } from "@/services/grade";

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
  const [formattedPrice, setFormattedPrice] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Đang tạo khoảng phí, vui lòng chờ trong giây lát..."
  );
  const [allSemester, setAllSemester] = useState();
  const [allSchoolyear, setAllSchoolyear] = useState();
  const [allGrade, setAllGrade] = useState();

  const fetchSemester = async () => {
    const res = await getAllSemester();
    setAllSemester(res.data);
  };

  const fetchSchoolyear = async () => {
    const res = await getAllSchoolyear();
    setAllSchoolyear(res.data);
  };

  const fetchGrade = async () => {
    const res = await getAllGrade();
    setAllGrade(res.data);
  };
  useEffect(() => {
    fetchSemester();
    fetchSchoolyear();
    fetchGrade();
  }, []);

  const handleOk = async () => {
    setConfirmLoading(true);
    const create = await createFee(fees);
    if (+create.code === 0) {
      setModalText(create.message);
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
    setFormattedPrice([...formattedPrice, ""]);
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

  const onSelectChange = (value, index, name) => {
    const newFees = [...fees];
    newFees[index] = { ...fees[index], [name]: value };
    setFees(newFees);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const handleFeeChange = (e, index) => {
    let value = e.target.value;
    const rawValue = value.replace(/\D/g, "");
    const formattedValue = rawValue
      ? parseInt(rawValue, 10).toLocaleString("vi-VN")
      : "";

    const newFees = [...fees];
    newFees[index] = { ...fees[index], price: rawValue };
    setFees(newFees);

    const newFormattedPrices = [...formattedPrice];
    newFormattedPrices[index] = formattedValue;
    setFormattedPrice(newFormattedPrices);
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo khoảng phí
      </Button>
      <Modal
        title="Tạo khoảng phí"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={confirmLoading}
          >
            Submit
          </Button>,
        ]}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          fees.map((fee, index) => (
            <div key={index} className="flex space-x-2 pt-5 pb-3 border-t-2 ">
              <div className="flex flex-col space-y-2 mb-2 w-11/12">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tên khoảng phí"
                    name="name"
                    value={fee.name}
                    onChange={(e) => handleChange(e, index)}
                    className="w-1/2"
                  ></Input>
                  <Input
                    placeholder="Số tiền"
                    addonAfter="VNĐ"
                    name="price"
                    value={formattedPrice[index]}
                    onChange={(e) => handleFeeChange(e, index)}
                    className="w-1/2"
                  ></Input>
                </div>
                <div className="flex space-x-2">
                  <Select
                    showSearch
                    placeholder="Chọn năm học"
                    optionFilterProp="children"
                    onChange={(value) =>
                      onSelectChange(value, index, "schoolyear_id")
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={allSchoolyear?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    className="w-1/3"
                  ></Select>
                  <Select
                    showSearch
                    placeholder="Chọn khối lớp"
                    optionFilterProp="children"
                    onChange={(value) =>
                      onSelectChange(value, index, "grade_id")
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={allGrade?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    className="w-1/3"
                  ></Select>
                  <Select
                    showSearch
                    placeholder="Chọn học kỳ"
                    optionFilterProp="children"
                    onChange={(value) =>
                      onSelectChange(value, index, "semester_id")
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={allSemester?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    className="w-1/3"
                  />
                </div>
                <div className="flex space-x-2">
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
                </div>
              </div>
              <div className="w-1/12">
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
            </div>
          ))
        )}
      </Modal>
    </>
  );
};

export default App;
