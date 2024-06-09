import { Pie } from "react-chartjs-2";
function PieChart(props) {
  const { data } = props;
  return (
    <Pie
      data={{
        labels: ["Đã thanh toán", "Chưa thanh toán"],
        datasets: [
          {
            label: data?.name,
            data: [data?.paidAmount, data?.unpaidAmount],
            backgroundColor: ["rgba(99, 255, 132, 1)", "rgba(255, 99, 132, 1)"],
          },
        ],
      }}
    />
  );
}

export default PieChart;
