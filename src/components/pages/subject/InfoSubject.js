import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "@/services/subject/infoSubject";
import { Typography, Table, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
import AddTeacher from "@/components/pages/subject/AddTeacher";

const { Title } = Typography;
function InfoSubject() {
  const navigate = useNavigate();
  let param = useParams();
  const [data, setData] = useState([{ key: 1, id: 0, SubjectUsers: [] }]);
  useEffect(() => {
    document.title = "Thông tin môn học";
  }, []);
  const fetchSubject = async () => {
    const res = await getSubjectById(param.subject_id);
    setData(res.data);
  };
  useEffect(() => {
    fetchSubject();
  }, [param.subject_id]);
  const columns = [
    {
      title: "Họ",
      dataIndex: "fullname",
    },

    {
      title: "Số điên thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a onClick={() => navigate(`/subject/info/${record.id}`)}>Detail</a>
          <a className="hover:text-red-500">Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <div className="space-y-2">
      <div className="flex text-center items-center justify-between">
        <Input
          value={data ? data.name : ""}
          className="w-fit"
          size="large"
        ></Input>
        <AddTeacher
          fetchSubject={fetchSubject}
          subject_id={param.subject_id}
        ></AddTeacher>
      </div>

      <Table
        columns={columns}
        dataSource={
          data.SubjectUsers
            ? data.SubjectUsers.map((row) => ({
                ...row.Profile,
                fullname: row.Profile.firstname + " " + row.Profile.lastname,
                key: row.id,
              }))
            : []
        }
      />
    </div>
  );
}

export default InfoSubject;
