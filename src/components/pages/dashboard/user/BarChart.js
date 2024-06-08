import { Bar } from "react-chartjs-2";
function Chart(props) {
  const { data } = props;
  console.log(data);
  return (
    <Bar
      data={{
        labels: data?.map((data) => data.Schoolyear.name),
        datasets: [
          {
            label: "Số lượng học sinh",
            data: data?.map((data) => data.student_count),
            backgroundColor: [
              "green",
              "yellow",
              "red",
              "blue",
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
            text: "Số lượng học sinh theo năm",
          },
        },
      }}
    ></Bar>
  );
}

export default Chart;
