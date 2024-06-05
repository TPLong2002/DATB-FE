import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getAssignmentById,
  getClassesNotInAssignmentOfTeacher,
  changeClass,
  updateAssignment,
} from "@/services/assignment/teacher_assignment";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Typography } from "antd";
import { toast } from "react-toastify";
import TableClass from "./TableClasses";

const format = "YYYY/MM/DD";
const { Title } = Typography;
function DetailFee() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState();
  const [classes, setClasses] = useState([]);
  const [defaultSelect, setDefaultSelect] = useState({
    value: 0,
    label: "Chọn lớp",
  });
  const [subject_id, setSubject_id] = useState();
  const [teacher_id, setTeacher_id] = useState();

  // const fetchClassesNotInAssignmentOfTeacher = async () => {
  //   const res = getClassesNotInAssignmentOfTeacher(
  //     assignment?.id,
  //     assignment?.User?.id,
  //     assignment?.Subject?.id
  //   );
  //   if (+res.code === 0) {
  //     setClasses(res.data);
  //   }
  // };
  const fetchAssignment = async () => {
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
      setSubject_id(res.data.Subject.id);
      setTeacher_id(res.data.User.id);
      setDefaultSelect({
        value: res.data.Assignment_Classes.id,
        label: res.data.Assignment_Classes.name,
      });
      const res2 = await getClassesNotInAssignmentOfTeacher(
        res.data.User.id,
        res.data.Subject.id,
        res.data.id
      );
      if (+res2.code === 0) {
        setClasses(
          res2.data.map((item) => ({ value: item.id, label: item.name }))
        );
      }
    }
  };
  useEffect(() => {
    fetchAssignment();
  }, [id]);
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
    if (defaultSelect.value != assignment.Assignment_Classes.id) {
      const res = await changeClass(assignment.id, defaultSelect.value);
      if (+res.code === 0) {
        toast.success("Chuyển lớp thành công");
      }
    }
    const res2 = await updateAssignment({
      id: assignment.id,
      name: assignment.name,
      content: assignment.content,
      deadline: dayjs(assignment.deadline).format("YYYY/MM/DD HH:mm:ss"),
      startdate: dayjs(assignment.startdate).format("YYYY/MM/DD HH:mm:ss"),
    });
    if (+res2.code === 0) {
      toast.success("Cập nhật thành công");
    } else {
      toast.error("Cập nhật không thành công");
    }
  };
  const onSelectChange = (value, label) => {
    setDefaultSelect({ value: value, label: label.label });
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
                  readOnly
                ></Input>
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Giáo viên</div>
                <Input
                  value={assignment.teacher}
                  name="teacher"
                  onChange={handleChange}
                  readOnly
                ></Input>
              </div>
              {/* <div className="flex space-x-2">
                <div className="w-1/2">Lớp</div>
                <Select
                  showSearch
                  value={defaultSelect}
                  onChange={onSelectChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={classes}
                  style={{ width: "100%" }}
                />
              </div> */}
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
                <div className="w-1/2">Ngày bắt đầu</div>
                <DatePicker
                  value={
                    assignment?.startdate ? dayjs(assignment.startdate) : null
                  }
                  format={format}
                  onChange={(date, dateString) =>
                    onChange(date, dateString, "startdate")
                  }
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">Ngày hết hạn</div>

                <DatePicker
                  defaultValue={
                    assignment?.deadline ? dayjs(assignment.deadline) : null
                  }
                  format={format}
                  onChange={(date, dateString) =>
                    onChange(date, dateString, "deadline")
                  }
                />
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
      <div className="flex-col w-2/3">
        <TableClass
          assignment_id={id}
          subject_id={subject_id}
          teacher_id={teacher_id}
        ></TableClass>
      </div>
    </div>
  );
}

export default DetailFee;
