import { Pie } from "react-chartjs-2";
function PieChart(props) {
  const { data } = props;

  return (
    <Pie
      data={{
        labels: ["Đã thanh toán", "Chưa thanh toán"],
        datasets: [
          {
            label: ["VNĐ"],
            data: [data.total_paid_amount, data.total_unpaid_amount],
            hoverOffset: 4,
          },
        ],
      }}
    />
  );
}

export default PieChart;
