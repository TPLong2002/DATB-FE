import React, { useEffect, useState, useRef } from "react";
import { addStudentToClass } from "@/services/class/classInfo";
import { getStudentBySchoolyear } from "@/services/class/classInfo";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getSubjectByGradeId,
  getSubjectByGradeIdNotInClass,
  getTeachersBySubject,
  addSubjectUserToClass,
} from "@/services/subject/index";
import Papa from "papaparse";
import { Modal, Input, Select, Button } from "antd";
import { toast } from "react-toastify";
import { getGradeByClassId } from "@/services/class/index";

const App = (props) => {
  const { class_id, fetchData } = props;

  const [subjectUser, setSubjectUser] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectSubject, setSelectSubject] = useState(); // [0] is the default value of allStudents

  const [allTeachers, setAllTeachers] = useState([]);

  const [defaultTeacher, setDefaultTeacher] = useState("Chọn giáo viên"); // [0] is the default value of allStudents
  const [defaultSubject, setDefaultSubject] = useState("Chọn môn");

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Loading...");
  const fileInputRef = useRef(null); // Use useRef to create a ref
  const fetchAllSubjects = async () => {
    try {
      const grade = await getGradeByClassId(class_id);

      const res = await getSubjectByGradeIdNotInClass(grade.data.id, class_id);
      const data = res.data.map((subject) => ({
        value: subject?.id,
        label: subject?.name,
      }));
      setAllSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchAllTeachers = async () => {
  //   try {
  //     const res = await getTeachersBySubjectId(selectSubject_id);
  //     const data = res.data.map((teacher) => ({
  //       value: teacher?.id,
  //       label: teacher?.name,
  //     }));
  //     setAllTeachers(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (class_id) {
      fetchAllSubjects();
    }
  }, [class_id]);

  useEffect(() => {
    // fetchAllTeachers();
  }, [subjects]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = subjectUser.map((SU) => ({
      subject_id: SU.subject_id,
      teacher_id: SU.teacher_id,
      class_id: +class_id,
    }));
    const addSubjectUser = await addSubjectUserToClass(data);
    if (+addSubjectUser?.code === 0) {
      setModalText(addSubjectUser.message);
      setTimeout(async () => {
        fetchData().then(() => {
          toast.success(addSubjectUser.message);
          setOpen(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onSubjectChange = async (value, label) => {
    setSelectSubject({ id: value, label: label.label });
    // const newSubjects = [...subjects];
    // newSubjects.push({ id: value, label: label.label });
    // setSelectSubject_id(value);
    // setSubjects(newSubjects);

    // const updatedAllSubjects = allSubjects.filter((subject) => {
    //   // Lọc ra những học sinh không có trong danh sách newStudents
    //   return !newSubjects.some((newSubject) => newSubject.id === subject.value);
    // });
    // setAllSubjects(updatedAllSubjects);
    // setDefaultSubject("Chọn môn");
    const res = await getTeachersBySubject(value);

    setAllTeachers(
      res?.data.map((teacher) => ({
        value: teacher.id,
        label: teacher.Profile.firstName + " " + teacher.Profile.lastName,
      }))
    );
    setDefaultSubject(label.label);
  };

  const onTeacherChange = (value, label) => {
    const newSubjectUser = [...subjectUser];
    newSubjectUser.push({
      subject_id: selectSubject.id,
      subject_label: selectSubject.label,
      teacher_id: value,
      teacher_label: label.label,
    });
    setSubjectUser(newSubjectUser);
    console.log("newSubjectUser", newSubjectUser);
    const updatedAllSubjects = allSubjects.filter((subjectuser) => {
      return !newSubjectUser.some(
        (newSubjectuser) => newSubjectuser.subject_id === subjectuser.value
      );
    });
    setAllTeachers([]);
    setAllSubjects(updatedAllSubjects);
    setDefaultSubject("Chọn môn");
    setDefaultTeacher("Chọn giáo viên");
  };
  const handleDelete = (index) => {
    let newSubjectUser = [...subjectUser];
    const removedSubjectUser = newSubjectUser.splice(index, 1)[0];
    console.log(removedSubjectUser);
    setAllSubjects([
      ...allSubjects,
      {
        value: removedSubjectUser.subject_id,
        label: removedSubjectUser.subject_label,
      },
    ]);
    setSubjectUser(newSubjectUser);
    setAllTeachers([]);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm môn vào lớp học
      </Button>
      <Modal
        title="Thêm môn vào lớp học"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} loading={confirmLoading}>
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
          <div>
            {subjectUser?.map((row, index) => (
              <div key={index} className="flex space-x-2">
                <Input value={row.subject_label} readOnly></Input>
                <Input value={row.teacher_label} readOnly></Input>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                  danger
                ></Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <Select
                showSearch
                value={defaultSubject}
                placeholder="Select Subject"
                optionFilterProp="children"
                onChange={onSubjectChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={allSubjects}
                style={{ width: "50%" }}
              />
              <Select
                showSearch
                value={defaultTeacher}
                placeholder="Select Teacher"
                optionFilterProp="children"
                onChange={onTeacherChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={allTeachers}
                style={{ width: "50%" }}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
