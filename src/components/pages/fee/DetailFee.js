import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeeById, updateFee } from "@/services/fee";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Typography } from "antd";
import { toast } from "react-toastify";

const format = "YYYY/MM/DD";
const { Title } = Typography;
function DetailFee() {
  const { id } = useParams();
  const [fee, setFee] = useState({});
  const fetchFee = async () => {
    const res = await getFeeById(id);
    if (+res.code === 0) {
      setFee({
        ...res.data,
        startDate: dayjs(res.data.startDate).format(format),
        endDate: dayjs(res.data.endDate).format(format),
      });
    }
  };
  useEffect(() => {
    fetchFee();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFee = { ...fee, [name]: value };
    setFee(newFee);
  };
  const onChange = (date, dateString, field) => {
    const newFee = { ...fee, [field]: dateString };
    setFee(newFee);
  };
  const onSubmit = async () => {
    const res = await updateFee(fee);
    if (+res.code === 0) {
      fetchFee();
      toast.success("Cập nhật khoảng phí thành công");
    }
  };
  return (
    <div className="flex space-x-3">
      {fee && (
        <div className="w-1/2 space-y-3">
          <Title>Thông tin khoảng phí</Title>
          <div className=" space-y-3">
            <div className="flex space-x-2">
              <div className="w-2/6">Tên khoảng phí</div>
              <Input
                value={fee.name}
                name="name"
                onChange={handleChange}
              ></Input>
            </div>
            <div className="flex space-x-2">
              <div className="w-2/6">Số tiền</div>
              <Input
                value={fee.price}
                name="price"
                onChange={handleChange}
              ></Input>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <div className="w-2/6">Ngày bắt đầu</div>
              {fee.startDate && (
                <DatePicker
                  defaultValue={dayjs(fee.startDate)}
                  format={format}
                  onChange={(date, dateString) =>
                    onChange(date, dateString, "startDate")
                  }
                />
              )}
            </div>
            <div className="flex space-x-2">
              <div className="w-2/6">Ngày hết hạn</div>
              {fee.endDate && (
                <DatePicker
                  defaultValue={dayjs(fee.endDate)}
                  format={format}
                  onChange={(date, dateString) =>
                    onChange(date, dateString, "endDate")
                  }
                />
              )}
            </div>
          </div>
          <div className="text-center">
            <Button type="primary" onClick={onSubmit}>
              Lưu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailFee;
