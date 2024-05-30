import React, { useEffect, useState } from "react";
import Table from "@/components/pages/user/Table";
import { getUsers } from "@/services/user";
import { getGroups } from "@/services/group";
function App() {
  const [data, setData] = useState({
    rows: [{ key: 1, id: 0 }],
    count: 1,
  });
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState();
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const [typeSelected, setTypeSelected] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const fetchUser = async () => {
    try {
      const res = await getUsers(
        pagination.page,
        pagination.limit,
        groupSelected,
        typeSelected,
        search
      );
      setData(res.data);
      const res2 = await getGroups();
      setGroups(res2?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Quản lý người dùng";
    setType([
      { value: 0, label: "Khả dụng" },
      { value: 1, label: "Đã bị xóa" },
    ]);
  }, []);
  useEffect(() => {
    fetchUser();
  }, [pagination, groupSelected, typeSelected, search]);
  useEffect(() => {
    setPagination({
      page: 1,
      limit: 10,
    });
  }, [groupSelected, typeSelected, search]);
  return (
    <div>
      <Table
        data={data}
        groups={groups}
        groupSelected={groupSelected}
        setGroupSelected={setGroupSelected}
        pagination={pagination}
        setPagination={setPagination}
        setData={setData}
        fetchUser={fetchUser}
        type={type}
        setTypeSelected={setTypeSelected}
        typeSelected={typeSelected}
        search={search}
        setSearch={setSearch}
      ></Table>
    </div>
  );
}

export default App;
