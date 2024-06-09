import { Bar } from "react-chartjs-2";
function BarChart(props) {
  const { data } = props;
  return (
    <Bar
      data={{
        labels: data?.map((item) => item.name),
        datasets: [
          {
            label: "Đã thanh toán",
            data: data?.map((item) => item.paidAmount),
            backgroundColor: "rgba(99, 255, 132, 1)",
          },
          {
            label: "Chưa thanh toán",
            data: data?.map((item) => item.unpaidAmount),
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      }}
    />
  );
}

export default BarChart;
