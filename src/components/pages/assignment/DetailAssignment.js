import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "@/services/assignment";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Typography, Select } from "antd";
import { toast } from "react-toastify";

const format = "YYYY/MM/DD";
const { Title } = Typography;
function DetailFee() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState();

  const listStudentOfFeeRef = useRef();
  const addStudentToFeeRef = useRef();

  const fetchFee = async () => {
    const res = await getAssignmentById(id);
    if (+res.code === 0) {
      setAssignment({
        ...res.data,
        subject: res.data.Subject.name,
        teacher:
          res.data.User.Profile.firstName +
          " " +
          res.data.User.Profile.lastName,
      });
    }
  };
  useEffect(() => {
    fetchFee();
  }, [id]);
  console.log(assignment);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newAssignment = { ...assignment, [name]: value };
    setAssignment(newAssignment);
  };
  const onChange = (date, dateString, field) => {
    const newAssignment = { ...assignment, [field]: dateString };
    setAssignment(newAssignment);
  };
  const onSubmit = async () => {
    // const res = await updateFee(fee);
    // if (+res.code === 0) {
    //   fetchFee();
    //   toast.success("Cập nhật khoảng phí thành công");
    // }
  };
  const onSelectChange = (value, label) => {};
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
        <Title level={2}>Thông tin bài tập</Title>
        {assignment && (
          <div className="space-y-3">
            <div className=" space-y-3">
              <div className="flex space-x-2">
                <div className="w-1/2">Tên bài</div>
                <Input
                  value={assignment.name}
                  name="name"
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Môn</div>
                <Input
                  value={assignment.subject}
                  name="subject"
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Giáo viên</div>
                <Input
                  value={assignment.teacher}
                  name="teacher"
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Lớp</div>
                <Select
                  showSearch
                  value={"Chọn giáo viên"}
                  onChange={onSelectChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  // options={allTeachers}
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Nội dung</div>
                <Input
                  value={assignment.content}
                  name="content"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="w-1/2">Ngày hết hạn</div>
                {assignment && (
                  <DatePicker
                    defaultValue={dayjs(assignment?.deadline)}
                    format={format}
                    onChange={(date, dateString) =>
                      onChange(date, dateString, "deadline")
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
    </div>
  );
}

export default DetailFee;
