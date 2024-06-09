import { Doughnut } from "react-chartjs-2";
function Chart(props) {
  const { data } = props;
  return (
    <Doughnut
      data={{
        labels: data?.map((data) => data.Grade.name),
        datasets: [
          {
            label: "Số lượng học sinh",
            data: data?.map((data) => data.student_count),
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Số lượng học sinh theo khối",
          },
        },
      }}
    ></Doughnut>
  );
}

export default Chart;
