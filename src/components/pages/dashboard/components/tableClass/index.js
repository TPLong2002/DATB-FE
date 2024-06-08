import React, { useEffect, useState } from "react";
import { getClasses } from "@/services/class";
import { Table } from "antd";

const { Column } = Table;
function App() {
  const [data, setData] = useState([]);

  const fetchClass = async () => {
    try {
      const res = await getClasses();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClass();
  }, []);

  return (
    <Table
      bordered={true}
      className="shadow-xl"
      dataSource={
        data
          ? data?.map((row) => {
              if (
                row?.GVCN?.Profile?.firstname &&
                row?.GVCN?.Profile?.lastname
              ) {
                row.gvcn =
                  row?.GVCN?.Profile?.firstname +
                  " " +
                  row?.GVCN?.Profile?.lastname;
              } else {
                row.gvcn = "chưa có GVCN";
              }
              row.schoolyear = row?.Schoolyear?.name;
              return { ...row, key: row.id };
            })
          : []
      }
      pagination={false}
      scroll={{ y: 300 }}
    >
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="GVCN" dataIndex="gvcn" key="gvcn" />
      <Column title="Schoolyear" dataIndex="schoolyear" key="schoolyear" />
    </Table>
  );
}

export default App;
