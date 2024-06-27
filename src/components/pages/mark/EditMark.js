import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import { getMarkByStudentId, updateOrCreateMark } from "@/services/mark";
import { toast } from "react-toastify";

function EditMark(props) {
  const {
    openEditMark,
    setOpenEditMark,
    student,
    class_id,
    subject_id,
    markTypes,
    fetchMarks,
    semester_id,
    schoolyear_id,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("loading...");
  const [marks, setMarks] = useState([]);
  const [data, setData] = useState({});
  const [transcript_id, setTranscript_id] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getMarkByStudentId(
        student,
        schoolyear_id,
        semester_id,
        subject_id
      );
      console.log(res.data);
      setTranscript_id(res?.data?.Marks[0]?.transcript_id);
      const m = {};
      res.data.Marks.forEach((item) => {
        m[item?.Marktype?.name] = item?.mark;
      });
      setData(m);
      setMarks(res.data);
    };
    fetch();
  }, [student]);
  const handleOk = async () => {
    const result = markTypes.reduce((acc, item) => {
      if (data[item.name] !== undefined && data[item.name] !== "") {
        acc.push({
          subject_id: subject_id,
          user_id: student,
          marktype_id: item.id,
          mark: +data[item.name],
          transcript_id: transcript_id,
          schoolyear_id: schoolyear_id,
          semester_id: semester_id,
        });
      }
      return acc;
    }, []);
    if (result?.length > 0) {
      setConfirmLoading(true);
      const res = await updateOrCreateMark(result);
      setModalText("loading...");
      if (+res.code == 0) {
        setTimeout(() => {
          fetchMarks().then(() => {
            setOpenEditMark(false);
            setConfirmLoading(false);
            toast.success(res.message);
          });
        }, 1000);
      }
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenEditMark(false);
  };

  return (
    <>
      <Modal
        title={"Chỉnh sửa điểm của học sinh "}
        open={openEditMark}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={400}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div className="flex-col space-y-3">
            <div className="flex space-x-3 items-center">
              <p className="w-2/5 text-lg">Tên học sinh</p>
              <Input
                onChange={handleChange}
                value={
                  marks?.Profile?.firstName + " " + marks?.Profile?.lastName
                }
                size="large"
                className="w-3/5"
              />
            </div>
            {markTypes?.map((markType, index) => (
              <div className="flex space-x-3 items-center">
                <p className="w-2/5 text-lg">
                  {"Điểm " + markType.name.toLowerCase()}
                </p>
                <Input
                  key={index}
                  placeholder={"Điểm " + markType.name}
                  name={markType.name}
                  onChange={handleChange}
                  value={data[markType.name]}
                  size="large"
                  className="w-3/5"
                />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default EditMark;
