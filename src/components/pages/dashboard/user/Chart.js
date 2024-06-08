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
              "red",
              "blue",
              "green",
              "yellow",
              "orange",
              "purple",
              "pink",
              "brown",
              "grey",
              "black",
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
