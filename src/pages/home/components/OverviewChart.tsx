"use client";
import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
 
interface OverviewChartProps {
  dates: { x: string; y: number }[];
}

export default function OverviewChart({ dates }: OverviewChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    xaxis: {
      categories: dates.map((d) => d.x),
      labels: { style: { colors: "#94a3b8" } },
    },
    yaxis: {
      labels: { style: { colors: "#94a3b8" } },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#3b82f6"],
    grid: { borderColor: "#1e293b" },
  };

  const series = [
    {
      name: "Revenue",
      data: dates.map((d) => d.y),
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="area" height={350} />
  );
}