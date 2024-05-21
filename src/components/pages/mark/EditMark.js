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
    fetchMarkType,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("loading...");
  const [marks, setMarks] = useState([]);
  const [data, setData] = useState({});
  const [transcript_id, setTranscript_id] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getMarkByStudentId(class_id, subject_id, student);
      setTranscript_id(res.data[0].transcript_id);
      const m = {};
      res.data.forEach((item) => {
        m[item.Marktype.name] = item.mark;
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
          fetchMarkType().then(() => {
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
        title={
          "Chỉnh sửa điểm của học sinh " +
          marks[0]?.User?.Profile?.firstName +
          " " +
          marks[0]?.User?.Profile?.lastName
        }
        open={openEditMark}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          <div>
            <Input
              placeholder="Tên học sinh"
              readOnly
              onChange={handleChange}
              value={
                marks[0]?.User?.Profile?.firstName +
                " " +
                marks[0]?.User?.Profile?.lastName
              }
            />
            {markTypes?.map((markType, index) => (
              <Input
                placeholder={"Điểm" + markType.name}
                name={markType.name}
                onChange={handleChange}
                value={data[markType.name]}
              />
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default EditMark;
