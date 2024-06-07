import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAssignment } from "@/services/assignment/student_assignment";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Typography, Image } from "antd";
import { toast } from "react-toastify";

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

  const fetchAssignment = async () => {
    const res = await getAssignment(id);
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

  return (
    <div>
      {assignment && (
        <div className="flex-col space-y-3">
          <div className="flex justify-between">
            <Title level={2}>{assignment.name}</Title>
            <div>
              <div>{assignment.teacher}</div>
              <div>
                {assignment?.deadline
                  ? dayjs(assignment.deadline).format(format)
                  : null}
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="flex flex-col w-1/2 space-x-4 ">
              <div className="space-y-3">
                <div className=" space-y-3">
                  <div className="flex-col">
                    <div className="">Bài làm</div>
                    <Input.TextArea
                      value={assignment?.content}
                      rows={5}
                      name="content"
                      onChange={handleChange}
                    ></Input.TextArea>
                  </div>
                </div>
                <div className=" space-y-3"></div>
              </div>
            </div>
            <div className="flex-col w-1/2 border-l-2 pl-3 space-y-3">
              <div className="flex-col">
                <div className="w-1/12">Ảnh</div>
                <div className="bg-gray-100 flex items-center w-11/12 h-full min-h-32">
                  <div className="bg-gray rounded-lg shadow-md w-full h-full min-h-32">
                    <div className="relative w-full h-full min-h-32 overflow-hidden rounded-sm border border-gray-200">
                      {assignment.image ? (
                        <Image
                          src={assignment.image}
                          width={"100%"}
                          preview={{
                            src: assignment.image,
                            width: 800,
                            height: 800,
                          }}
                        ></Image>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full min-h-32 bg-gray-200 text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <div className="">Nội dung</div>
                <Input.TextArea
                  value={assignment?.content}
                  rows={3}
                  name="content"
                  onChange={handleChange}
                ></Input.TextArea>
              </div>
            </div>
          </div>
          <div className="text-center pt-5">
            <Button type="primary">Nộp</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailFee;
