import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Typography, Select } from "antd";
import { toast } from "react-toastify";
import { createAssignment } from "@/services/assignment";
import { DatePicker, Image } from "antd";
import dayjs from "dayjs";

import { getSubjectByClassId } from "@/services/subject";
import { getClasses } from "@/services/class";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getAllSemester } from "@/services/semester";
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";
import { getTeaherBySubjectClass } from "@/services/user";

const format = "YYYY/MM/DD";
const { Title } = Typography;
const cloud_name = "depfh6rnw";
const preset_key = "rsnt801s";

const App = (props) => {
  const auth = useSelector((state) => state.auth);
  const { fetchAssignments } = props;
  const [assignment, setAssignment] = useState({ name: "" });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const [allClass, setAllClass] = useState([{}]);
  const [allSubject, setAllSubject] = useState([{}]);
  const [selectClass, setSelectClass] = useState(0);
  const [selectSubject, setSelectSubject] = useState(0);
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState(0);
  const [selectSemester, setSelectSemester] = useState(0);
  const [allSemester, setAllSemester] = useState([{}]);
  const [teacher, setTeacher] = useState([{}]);

  const fetchSubject = async () => {
    const res_subject = await getSubjectByClassId(
      selectClass,
      selectSchoolyear
    );
    setAllSubject(res_subject?.data?.Class_Subjects);
  };
  const fetchClasses = async () => {
    const res_class = await getClasses();
    setAllClass(res_class?.data);
  };
  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear(res_schoolyear.data);
  };

  const fetchSemester = async () => {
    const res_semester = await getAllSemester();
    setAllSemester(res_semester.data);
  };
  const fetchTecher = async () => {
    const res_teacher = await getTeaherBySubjectClass(
      selectSubject,
      selectClass
    );
    setTeacher(res_teacher?.data);
  };

  useEffect(() => {
    fetchSchoolyear();
    fetchSemester();
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchSubject();
  }, [selectClass, selectSchoolyear]);
  useEffect(() => {
    fetchTecher();
  }, [selectSubject, selectClass]);
  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  const onSubjectChange = (value) => {
    setSelectSubject(value);
  };
  console.log("teacher", teacher);
  const handleOk = async () => {
    const formatdata = {
      ...assignment,
      startdate: dayjs(assignment.startdate).format("YYYY-MM-DD"),
      deadline: dayjs(assignment.deadline).format("YYYY-MM-DD"),
      teacher_id: auth.id,
      subject_id: selectSubject,
    };
    console.log("formatdata", formatdata);
    // const formData = new FormData();
    // formData.append("file", assignment.image);
    // formData.append("upload_preset", preset_key);
    // try {
    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   const dataURL = await res.json();
    //   if (dataURL?.secure_url) {
    //     const create = await createAssignment({
    //       ...formatdata,
    //       image: dataURL.secure_url,
    //     });
    //     if (+create.code === 0) {
    //       setModalText(create.message);
    //       setConfirmLoading(true);
    //       setTimeout(async () => {
    //         fetchAssignments().then(() => {
    //           toast.success("Tạo bài tập thành công");
    //           setOpen(false);
    //           setConfirmLoading(false);
    //         });
    //       }, 1000);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAssignment({ ...assignment, [name]: value });
  };
  const onChange = (date, dateString, field) => {
    const newAssignment = { ...assignment, [field]: dateString };
    setAssignment(newAssignment);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onSemesterChange = (value) => {
    setSelectSemester(value);
  };
  const onClassChange = (value) => {
    setSelectClass(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo bài tập mới
      </Button>
      <Modal
        title="Tạo bài tập mới"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
        width={"50%"}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div className="">
            <div className="flex flex-col space-x-3">
              <Title level={2}>Thông tin bài tập</Title>
              {assignment && (
                <div className="flex space-x-5">
                  <div className="space-y-3 w-1/3">
                    <div className=" space-y-3">
                      <div className="flex space-x-2">
                        <div className="w-1/3">Tên bài</div>
                        <Input
                          value={assignment.name}
                          placeholder="Nhập tên bài tập"
                          name="name"
                          onChange={handleChange}
                          className="w-2/3"
                        ></Input>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/3">Năm học</div>
                        <Select
                          showSearch
                          placeholder="Chọn năm học"
                          optionFilterProp="children"
                          onChange={onSchoolyearChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={allSchoolyear?.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          style={{ width: "66.67%" }}
                          className="w-2/3"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/3">Kỳ</div>
                        <Select
                          showSearch
                          placeholder="Chọn học kỳ"
                          optionFilterProp="children"
                          onChange={onSemesterChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={allSemester?.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          style={{ width: "66.67%" }}
                          className="w-2/3"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/3">Lớp</div>
                        <Select
                          showSearch
                          onChange={onClassChange}
                          placeholder="Chọn lớp"
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={allClass?.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          style={{ width: "66.67%" }}
                          // className="w-2/3"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/3">Môn</div>
                        <Select
                          showSearch
                          onChange={onSubjectChange}
                          placeholder="Chọn môn học"
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={allSubject?.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          style={{ width: "66.67%" }}
                          className="w-2/3"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/3">Giáo viên</div>
                        <Input
                          readOnly
                          value={
                            teacher &&
                            teacher?.Profile?.firstName +
                              " " +
                              teacher?.Profile?.lastName
                          }
                          className="w-2/3"
                        ></Input>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <div className="w-1/2">Ngày bắt đầu</div>
                        <DatePicker
                          value={
                            assignment?.startdate
                              ? dayjs(assignment.startdate)
                              : null
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
                            assignment?.deadline
                              ? dayjs(assignment.deadline)
                              : null
                          }
                          format={format}
                          onChange={(date, dateString) =>
                            onChange(date, dateString, "deadline")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3 space-y-2">
                    <div className="flex space-x-2">
                      <div className="w-1/5">Nội dung</div>
                      <Input.TextArea
                        value={assignment.content}
                        placeholder="Nhập nội dung bài tập"
                        name="content"
                        onChange={handleChange}
                        className="w-4/5"
                        rows={5}
                      ></Input.TextArea>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-1/5">Ảnh</div>
                      <div className="w-4/5">
                        <UploadImage
                          assignment={assignment}
                          setAssignment={setAssignment}
                        ></UploadImage>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
