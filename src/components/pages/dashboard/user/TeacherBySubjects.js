import { Bar } from "react-chartjs-2";
function Detail(props) {
  const { data } = props;

  let groupedData = {};
  groupedData = data?.reduce((acc, item) => {
    const parts = item.name.split(" ");
    const gradeLevel = parts.pop();
    const subjectBase = parts.join(" ");

    if (!acc[subjectBase]) {
      acc[subjectBase] = { 10: 0, 11: 0, 12: 0 };
    }

    acc[subjectBase][gradeLevel] += item.teacher_count;
    return acc;
  }, {});
  const labels = Object.keys(groupedData);
  return (
    <div>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Khối 10",
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              data: labels.map((label) => groupedData[label]["10"]),
            },
            {
              label: "Khối 11",
              backgroundColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: labels.map((label) => groupedData[label]["11"]),
            },
            {
              label: "Khối 12",
              backgroundColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: labels.map((label) => groupedData[label]["12"]),
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
              text: "Số lượng giáo viên theo môn học",
            },
          },
        }}
      ></Bar>
    </div>
  );
}

export default Detail;
