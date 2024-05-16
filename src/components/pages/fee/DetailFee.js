import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getFeeById, updateFee } from "@/services/fee";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Typography } from "antd";
import { toast } from "react-toastify";
import ListStudentOfFee from "./ListStudentOfFee";
import AddStudentToFee from "./AddStudentToFee";

const format = "YYYY/MM/DD";
const { Title } = Typography;
function DetailFee() {
  const { id } = useParams();
  const [fee, setFee] = useState({});

  const listStudentOfFeeRef = useRef();
  const addStudentToFeeRef = useRef();

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
  const fetchStudentOfFee = async () => {
    // Gọi hàm fetchData từ ref
    if (listStudentOfFeeRef.current) {
      return await listStudentOfFeeRef.current.fetchStudentOfFee();
    }
  };
  const fetchAllStudents = async () => {
    // Gọi hàm fetchData từ ref
    if (addStudentToFeeRef.current) {
      return await addStudentToFeeRef.current.fetchAllStudents();
    }
  };
  return (
    <div className="flex space-x-3">
      <div className="flex flex-col w-1/3 space-x-4">
        <Title level={2}>Thông tin khoảng phí</Title>
        {fee && (
          <div className="space-y-3">
            <div className=" space-y-3">
              <div className="flex space-x-2">
                <div className="w-1/2">Tên khoảng phí</div>
                <Input
                  value={fee.name}
                  name="name"
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Số tiền</div>
                <Input
                  value={fee.price}
                  name="price"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="w-1/2">Ngày bắt đầu</div>
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
                <div className="w-1/2">Ngày hết hạn</div>
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
      <div className="w-2/3">
        <div className="flex justify-between">
          <Title level={2}> Đối tượng</Title>
          <AddStudentToFee
            fee_id={id}
            fetchData={fetchStudentOfFee}
            ref={addStudentToFeeRef}
          />
        </div>
        <ListStudentOfFee
          fee_id={id}
          fetchAllStudents={fetchAllStudents}
          ref={listStudentOfFeeRef}
        />
      </div>
    </div>
  );
}

export default DetailFee;
