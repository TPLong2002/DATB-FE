import Chart from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { CategoryScale } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { getAllAmountByYear } from "@/services/fee";

Chart.register(CategoryScale);
function LineChart() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await getAllAmountByYear("desc");
    console.log(res.data);
    if (res.data) {
      const totalPaymentsByYear = [];

      // Lặp qua kết quả và tính tổng tiền đã thanh toán cho mỗi năm
      res.data.forEach((schoolYear) => {
        const year = schoolYear.name;
        const fees = schoolYear.Fees;
        let totalPayment = 0;

        fees.forEach((fee) => {
          fee.Paymenthistories.forEach((payment) => {
            totalPayment += payment.amount;
          });
        });

        // Lưu tổng tiền đã thanh toán cho năm này
        totalPaymentsByYear.push({
          lable: year,
          total: totalPayment,
        });
      });
      console.log(totalPaymentsByYear);
      setData(totalPaymentsByYear);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tổng phí theo năm",
      },
    },
  };

  return (
    <div>
      <Bar
        data={{
          labels: data.map((data) => data.lable),
          datasets: [
            {
              label: "VND",
              data: data.map((data) => data.total),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "&quot;#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
        options={options}
      ></Bar>
    </div>
  );
}

export default LineChart;
