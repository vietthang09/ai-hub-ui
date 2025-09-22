"use client";
import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

export interface ApexChartProps {
  dates: { x: string; y: number }[];
  title?: string;
}

export default function ApexChart({ dates, title }: ApexChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: {
      text: title ?? "Line Chart Example",
      align: "left",
    },
    xaxis: {
      categories: dates.map((d) => d.x),
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toString(),
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
  };

  const series = [{ name: "XYZ MOTORS", data: dates.map((d) => d.y) }];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
}
