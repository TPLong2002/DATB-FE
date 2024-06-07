import Chart from "chart.js/auto";
import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { Data } from "./data";
Chart.register(CategoryScale);
function LineChart() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
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
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options}></Line>
    </div>
  );
}

export default LineChart;
