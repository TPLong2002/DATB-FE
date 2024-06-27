import { Bar } from "react-chartjs-2";

function Chart(props) {
  const { data } = props;

  return (
    <Bar
      data={{
        labels: data?.map((item) => item.Schoolyear.name), // Lấy tên năm học từ dữ liệu
        datasets: [
          {
            label: `Số lượng học sinh`,
            data: data?.map((item) => item.student_count), // Lấy số lượng học sinh từ dữ liệu
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
        scales: {
          x: {
            title: {
              display: true,
              text: "Năm học", // Tiêu đề của trục X
            },
          },
          y: {
            title: {
              display: true,
              text: "Số lượng học sinh", // Tiêu đề của trục Y
            },
            beginAtZero: true,
          },
        },
      }}
    />
  );
}

export default Chart;
