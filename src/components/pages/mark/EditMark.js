import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import { getMarkByStudentId } from "@/services/mark";

function EditMark(props) {
  const { openEditMark, setOpenEditMark, student, class_id, subject_id } =
    props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [marks, setMarks] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const res = await getMarkByStudentId(class_id, subject_id, student);
      console.log(res.data);
      const m = {};
      res.data.forEach((item) => {
        m[item.Marktype.name] = item.mark;
      });
      setData(m);
      setMarks(res.data);
    };
    fetch();
  }, [student]);
  const handleOk = () => {
    setModalText("loading...");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenEditMark(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: +e.target.value });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenEditMark(false);
  };
  console.log(data);
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
            <Input
              placeholder="Điểm miệng"
              name="Điểm miệng"
              onChange={handleChange}
              value={data["Điểm miệng"]}
            />
            <Input
              placeholder="Điểm 15 phút"
              name="15 phút"
              onChange={handleChange}
              value={data["15 phút"]}
            />
            <Input
              placeholder="Điểm 1 tiết"
              name="1 tiết"
              onChange={handleChange}
              value={data["1 tiết"]}
            />
            <Input
              placeholder="Điểm thi giữa kỳ"
              name="Giữa kỳ"
              onChange={handleChange}
              value={data["Giữa kỳ"]}
            />
            <Input
              placeholder="Điểm thi cuối kỳ"
              name="Cuối kỳ"
              onChange={handleChange}
              value={data["Cuối kỳ"]}
            />
          </div>
        )}
      </Modal>
    </>
  );
}

export default EditMark;
