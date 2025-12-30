"use client";

import { Line } from "react-chartjs-2";
import "../charts/ChartRegistry";

interface LineChartProps {
  title?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
    tension?: number;
  }[];
  height?: number;
}

export default function LineChart({
  title,
  labels,
  datasets,
  height = 300,
}: LineChartProps) {
  const defaultColors = [
    { border: "rgb(59, 130, 246)", bg: "rgba(59, 130, 246, 0.1)" }, // blue
    { border: "rgb(16, 185, 129)", bg: "rgba(16, 185, 129, 0.1)" }, // green
    { border: "rgb(245, 158, 11)", bg: "rgba(245, 158, 11, 0.1)" }, // amber
    { border: "rgb(239, 68, 68)", bg: "rgba(239, 68, 68, 0.1)" }, // red
    { border: "rgb(139, 92, 246)", bg: "rgba(139, 92, 246, 0.1)" }, // purple
  ];

  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length].border,
      backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length].bg,
      fill: dataset.fill ?? true,
      tension: dataset.tension ?? 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  const options = {
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
      <Line data={data} options={options} />
    </div>
  );
}
