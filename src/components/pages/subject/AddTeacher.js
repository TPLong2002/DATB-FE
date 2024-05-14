import React, { useEffect, useState, useRef } from "react";
import {
  getTeachersNotInSubject,
  addTeacherToSubject,
} from "@/services/subject/index";
import { Modal, Input, Select, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const App = (props) => {
  const { fetchSubject, subject_id } = props;
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn thêm giáo viên này không ?"
  );
  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const res = await getTeachersNotInSubject(subject_id);
        const data = res.data.map((teacher) => ({
          value: teacher?.id,
          label: teacher?.Profile?.firstName + " " + teacher?.Profile?.lastName,
        }));
        setAllTeachers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTeachers();
  }, []);
  const handleOk = async () => {
    const create = await addTeacherToSubject(
      teachers.map((teacher) => ({
        teacher_id: teacher.id,
        subject_id: subject_id,
      }))
    );
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchSubject().then(() => {
          toast.success("thêm giáo viên vào môn học thành công");
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newTeachers = [...teachers];
    newTeachers[index] = { ...teachers[index], [name]: value };
    setTeachers(newTeachers);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleDelete = (index) => {
    let newTeachers = [...teachers];
    const removedTeacher = newTeachers.splice(index, 1)[0];
    console.log(removedTeacher);
    setAllTeachers([
      ...allTeachers,
      { value: removedTeacher.id, label: removedTeacher.label },
    ]);
    setTeachers(newTeachers);
  };
  const onChange = (value, label) => {
    const newTeachers = [...teachers];
    newTeachers.push({ id: value, label: label.label });

    const updatedAllStudents = allTeachers.filter((teacher) => {
      return !newTeachers.some((newTeacher) => newTeacher.id === teacher.value);
    });
    setTeachers(newTeachers);
    setAllTeachers(updatedAllStudents);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm giáo viên
      </Button>
      <Modal
        title="Thêm giáo viên vào môn học"
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
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div>
            {teachers &&
              teachers.map((_subject, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    placeholder="Giáo viên"
                    name="name"
                    value={_subject.label}
                    onChange={(e) => handleChange(e, index)}
                  ></Input>

                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                  ></Button>
                </div>
              ))}
            <Select
              showSearch
              value={"Chọn giáo viên"}
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={allTeachers}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
