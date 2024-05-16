import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Button, Checkbox, Space, Table, Tag, Typography, Text } from "antd";
import DeleteSubject from "@/components/pages/subject/DeleteSubject";
import { Link, useNavigate } from "react-router-dom";
import { getStudentsOfFee } from "@/services/fee/studentOfFee";
import DeleteStudentOfFee from "@/components/pages/fee/DeleteStudentOfFee";

const { Column } = Table;
const { Title } = Typography;

const App = forwardRef((props, ref) => {
  const { fee_id, fetchAllStudents } = props;
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [studentDetele, setStudentDetele] = useState({});
  const [data, setData] = useState([]);

  const fetchStudentOfFee = async () => {
    const res = await getStudentsOfFee(fee_id);
    if (+res.code === 0) {
      setData(
        res.data.Fee_Users.map((row) => ({
          id: row.id,
          username: row.username,
          name: row.Profile.firstname + " " + row.Profile.lastname,
        }))
      );
    }
  };
  useImperativeHandle(ref, () => ({
    fetchStudentOfFee() {
      return fetchStudentOfFee();
    },
  }));
  useEffect(() => {
    fetchStudentOfFee();
  }, []);
  const handleDelete = (id) => {
    setOpenDelete(true);
    setStudentDetele({ fee_id: +fee_id, user_id: id });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-l">
          <a onClick={() => navigate(`/user/profile/${record.id}`)}>Detail</a>
          <a
            className="hover:text-red-500"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <DeleteStudentOfFee
        setOpen={setOpenDelete}
        studentDetele={studentDetele}
        open={openDelete}
        fetchData={fetchStudentOfFee}
        fetchAllStudents={fetchAllStudents}
      ></DeleteStudentOfFee>

      <Table
        columns={columns}
        dataSource={data ? data.map((row) => ({ ...row, key: row.id })) : []}
      />
    </>
  );
});

export default App;
