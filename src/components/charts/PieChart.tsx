"use client";

import { Doughnut, Pie } from "react-chartjs-2";
import "../charts/ChartRegistry";

interface PieChartProps {
  title?: string;
  labels: string[];
  data: number[];
  colors?: string[];
  type?: "pie" | "doughnut";
  height?: number;
  showLegend?: boolean;
}

export default function PieChart({
  title,
  labels,
  data,
  colors,
  type = "doughnut",
  height = 300,
  showLegend = true,
}: PieChartProps) {
  const defaultColors = [
    "rgba(59, 130, 246, 0.8)", // blue
    "rgba(16, 185, 129, 0.8)", // green
    "rgba(245, 158, 11, 0.8)", // amber
    "rgba(239, 68, 68, 0.8)", // red
    "rgba(139, 92, 246, 0.8)", // purple
    "rgba(236, 72, 153, 0.8)", // pink
    "rgba(20, 184, 166, 0.8)", // teal
    "rgba(249, 115, 22, 0.8)", // orange
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors || defaultColors.slice(0, labels.length),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        display: showLegend,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      title: {
        display: !!title,
        text: title,
        font: { size: 16, weight: "bold" as const },
      },
    },
    cutout: type === "doughnut" ? "60%" : "0%",
  };

  const ChartComponent = type === "doughnut" ? Doughnut : Pie;

  return (
    <div style={{ height }}>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
}
