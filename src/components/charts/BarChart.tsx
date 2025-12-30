"use client";

import { Bar } from "react-chartjs-2";
import "../charts/ChartRegistry";

interface BarChartProps {
  title?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
  horizontal?: boolean;
  height?: number;
}

export default function BarChart({
  title,
  labels,
  datasets,
  horizontal = false,
  height = 300,
}: BarChartProps) {
  const defaultColors = [
    "rgba(59, 130, 246, 0.8)", // blue
    "rgba(16, 185, 129, 0.8)", // green
    "rgba(245, 158, 11, 0.8)", // amber
    "rgba(239, 68, 68, 0.8)", // red
    "rgba(139, 92, 246, 0.8)", // purple
  ];

  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length],
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: dataset.borderWidth || 1,
      borderRadius: 4,
    })),
  };

  const options = {
    indexAxis: horizontal ? ("y" as const) : ("x" as const),
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        display: datasets.length > 1,
      },
      title: {
        display: !!title,
        text: title,
        font: { size: 16, weight: "bold" as const },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
}
