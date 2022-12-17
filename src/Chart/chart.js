import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function ChartColor(data) {
  const color = data[0] > data.at(-1) ? "#FF5656" : "#56FF90";
  return color;
}



export default function SmartChart({ data, dataIndex }) {
  const config = {
    data: {
      labels: data.map((_, index) => {
        return index + 1;
      }),
      datasets: [
        {
          label: "",
          data: data.map((element) =>
            dataIndex ? element[dataIndex] : element
          ),
          borderColor: ChartColor(data),
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
        },
      },

      scales: {
        y: {
          display: false,
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        x: {
          display: false,
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      tension: 0.5,
    },
  };

  return <Line data={config.data} options={config.options} />;
}
