import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "@/services/subject/infoSubject";
import { updateSubject, delSubjectOfTeacher } from "@/services/subject";
import { Typography, Table, Space, Input, Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import AddTeacher from "@/components/pages/subject/AddTeacher";
import { toast } from "react-toastify";
import { DeleteOutlined, ProfileOutlined } from "@ant-design/icons";

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
  const handleDelete = async (user_subject_id) => {
    const res = await delSubjectOfTeacher(user_subject_id);
    if (+res.code === 0) {
      toast.success("Xóa giáo viên khỏi môn học thành công");
      fetchSubject();
    }
  };
  const columns = [
    {
      title: "Tên giáo viên",
      dataIndex: "fullname",
    },

    {
      title: "Số điên thoại",
      dataIndex: "phoneNumber",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <Tooltip title={"Xem thông tin " + record?.fullname}>
            <Button
              onClick={() => navigate(`/user/profile/${record.id}`)}
              icon={<ProfileOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title={"Xóa " + record?.fullname}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(record.user_subject_id);
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const handleChange = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const submit = async () => {
    const res = await updateSubject({ name: data.name, id: +param.subject_id });
    if (+res.code === 0) {
      toast.success("Cập nhật môn học thành công");
      fetchSubject();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex text-center items-center justify-between">
        <Space.Compact size="large">
          <Input
            value={data ? data.name : ""}
            className="w-fit"
            name="name"
            onChange={handleChange}
          ></Input>
          <Button type="primary" onClick={submit}>
            Lưu
          </Button>
        </Space.Compact>

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
                user_subject_id: row.id,
              }))
            : []
        }
      />
    </div>
  );
}

export default InfoSubject;
