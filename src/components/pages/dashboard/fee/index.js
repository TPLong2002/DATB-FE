import { amountOfFee } from "@/services/fee";
import { useEffect, useState } from "react";
import { getAllGrade } from "@/services/grade";
import { getAllSchoolyear } from "@/services/schoolyear";
import { Select, Table, Space, Button, Checkbox } from "antd";
import { getFeeBySchoolyearGrade, amountOfFeesAvailable } from "@/services/fee";
import { useNavigate } from "react-router-dom";
import PieChart from "./PieChart";
import LineChart from "../components/chart/LineChart";
import UserCard from "../components/UserCard";
import { countFeeAvailable } from "@/services/fee";
import { DollarOutlined } from "@ant-design/icons";
function FeeDashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const [amountOfFeeData, setAmountOfFeesData] = useState();
  const [grade, setGrade] = useState([]);
  const [selectGrade, setSelectGrade] = useState();
  const [allSchoolyear, setAllSchoolyear] = useState([]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [selectFee, setSelectFee] = useState();
  const [feeCount, setFeeCount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await amountOfFee(selectFee);
      setAmountOfFeesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGrade = async () => {
    const res = await getAllGrade();
    setGrade([...res.data]);
  };
  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear(res_schoolyear.data);
  };
  const fetchFee = async () => {
    try {
      const res = await countFeeAvailable();
      setFeeCount(res.data);
      const res2 = await amountOfFeesAvailable();
      setTotalPaidAmount(res2.data[0].paidAmount);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFeeBySchoolyearGrade = async () => {
    const res = await getFeeBySchoolyearGrade(selectSchoolyear, selectGrade);
    console.log("res:", res.data);
    setRows(res.data);
  };
  useEffect(() => {
    fetchFee();
    fetchGrade();
    fetchSchoolyear();
  }, []);

  useEffect(() => {
    if (selectSchoolyear && selectGrade) {
      fetchFeeBySchoolyearGrade();
    }
  }, [selectSchoolyear, selectGrade]);
  useEffect(() => {
    if (selectFee) {
      fetchData();
    }
  }, [selectFee]);
  const onSelectGradeChange = (value) => {
    setSelectGrade(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSchoolyearChange = (value) => {
    setSelectSchoolyear(value);
  };
  return (
    <div className="flex-col space-y-5">
      <div className="flex space-x-4 border-b-2 pb-5">
        <div className="w-2/3 border-2 shadow-lg">
          <LineChart indexAxis={"x"} orderBy="asc"></LineChart>
        </div>
        <div className="flex flex-col w-1/3 justify-center gap-2 space-y-4">
          <UserCard
            userCount={feeCount}
            bg={"bg-blue-400"}
            icon={<DollarOutlined className="text-5xl text-white" />}
            typeUser={"Khoảng phí đang thu"}
          ></UserCard>
          <UserCard
            userCount={totalPaidAmount}
            bg={"bg-green-400"}
            icon={<DollarOutlined className="text-5xl text-white" />}
            typeUser={"Tổng thu"}
          ></UserCard>
        </div>
      </div>
      <div className="space-x-3">
        <Select
          showSearch
          placeholder="Chọn năm học"
          optionFilterProp="children"
          onChange={onSchoolyearChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={allSchoolyear?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          style={{ width: 150 }}
        />
        <Select
          showSearch
          placeholder="Chọn khối"
          optionFilterProp="children"
          onChange={onSelectGradeChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={grade?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          style={{ width: 150 }}
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-3/5">
          <Table
            className="shadow-lg"
            bordered={true}
            columns={[
              {
                title: "Tên phí",
                dataIndex: "name",
              },
              {
                title: "Ẩn",
                dataIndex: "ishidden",
                render: (ishidden, record) => (
                  <Checkbox checked={+ishidden === 1} />
                ),
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Space size="middle" className="text-l">
                    <a onClick={() => navigate(`/fee/detail/${record.id}`)}>
                      Detail
                    </a>
                    <Button onClick={() => setSelectFee(record.id)}>
                      Show
                    </Button>
                  </Space>
                ),
              },
            ]}
            dataSource={rows.map((item) => ({ ...item, key: item.id }))}
          />
        </div>
        <div className="w-2/5 border-2 p-10">
          {amountOfFeeData && <PieChart data={amountOfFeeData}></PieChart>}
        </div>
      </div>
    </div>
  );
}

export default FeeDashboard;
