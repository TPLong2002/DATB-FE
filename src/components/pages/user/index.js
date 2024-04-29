import React, { useEffect, useState } from "react";
import Table from "@/components/pages/user/Table";
import { getUsers } from "@/services/user";
function App() {
  const [data, setData] = useState([
    // { id: 1, username: "John", group_id: 1, email: "" },
  ]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const fetchUser = async () => {
    try {
      const res = await getUsers(pagination.page, pagination.limit);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [pagination]);

  return (
    <div>
      <Table
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        setData={setData}
        fetchUser={fetchUser}
      ></Table>
    </div>
  );
}

export default App;
