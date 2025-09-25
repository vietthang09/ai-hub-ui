// BookingChart.tsx
import React from "react";
import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

export function AnalyticChart() {
  const donut: { series: number[]; options: ApexOptions } = React.useMemo(
    () => ({
      series: [60, 30, 10],
      options: {
        chart: { type: "donut" },
        labels: ["Booked", "Cancelled", "Pending"],
        legend: { show: false },
        dataLabels: {
          formatter: (value: number | string | number[]) => {
            const num = typeof value === "number" ? value : 0;
            return `${num.toFixed(1)}%`;
          },
        },
        stroke: { width: 0 },
        plotOptions: { pie: { donut: { size: "70%" } } },
      },
    }),
    []
  );

  return <ReactApexChart options={donut.options} series={donut.series} type="donut" height={260} />;
}

export function ExpensesChart() {
  const expenses: {
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  } = React.useMemo(
    () => ({
      series: [{ name: "Expenses", data: [20, 45, 30, 60, 40, 70, 55] }],
      options: {
        chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 3 },
        dataLabels: { enabled: false },
        xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
        yaxis: { labels: { formatter: (value) => `$${value}k` } },
        grid: { borderColor: "#f1f5f9" },
      },
    }),
    []
  );

  return <ReactApexChart options={expenses.options} series={expenses.series} type="line" height={100} />;
}

export function BookingOverviewChart() {
  const booking: { series: { name: string; data: number[] }[]; options: ApexOptions } = React.useMemo(
    () => ({
      series: [
        { name: "Current year", data: [15, 120, 60, 140, 80, 110, 60, 150, 80, 130] },
        { name: "Last year", data: [10, 90, 40, 120, 60, 70, 40, 110, 60, 95] },
      ],
      options: {
        chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 3 },
        dataLabels: { enabled: false },
        xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"] },
        yaxis: { labels: { formatter: (value) => `$${value}k` } },
        legend: { position: "top", horizontalAlign: "left" },
        grid: { borderColor: "#f1f5f9" },
        markers: { size: 0 },
      },
    }),
    []
  );

  return <ReactApexChart options={booking.options} series={booking.series} type="line" height={220} />;
}

export function TotalEarningChart() {
  const earning: { series: { data: number[] }[]; options: ApexOptions } = React.useMemo(
    () => ({
      series: [{ data: [5, 7, 6, 8, 7, 9, 10, 8, 11, 9, 12, 10] }],
      options: {
        chart: { type: "bar", sparkline: { enabled: true } },
        plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
        tooltip: { y: { formatter: (value) => `$${(value * 1000).toLocaleString()}` } },
      },
    }),
    []
  );

  return <ReactApexChart options={earning.options} series={earning.series} type="bar" height={90} />;
}

export function DumbbellChart() {
  const dumbbell: {
    series: { data: { x: string; y: [number, number] }[] }[];
    options: ApexOptions;
  } = React.useMemo(
    () => ({
      series: [
        {
          data: [
            { x: "2008", y: [2800, 4500] },
            { x: "2009", y: [3200, 4100] },
            { x: "2010", y: [2950, 7800] },
            { x: "2011", y: [3000, 4600] },
            { x: "2012", y: [3500, 4100] },
            { x: "2013", y: [4500, 6500] },
            { x: "2014", y: [4100, 5600] },
          ],
        },
      ],
      options: {
        chart: { type: "rangeBar", zoom: { enabled: false } },
        plotOptions: { bar: { isDumbbell: true, columnWidth: 3, dumbbellColors: [["#3b82f6", "#10b981"]] } },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: "top",
          horizontalAlign: "left",
          customLegendItems: ["Product A", "Product B"],
        },
        fill: { type: "gradient", gradient: { type: "vertical", gradientToColors: ["#10b981"], inverseColors: true, stops: [0, 100] } },
        grid: { xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
        xaxis: { tickPlacement: "on" },
        yaxis: { labels: { formatter: (value) => `$${(value / 100).toFixed(0)}k` } },
      },
    }),
    []
  );

  return <ReactApexChart options={dumbbell.options} series={dumbbell.series} type="rangeBar" height={230} />;
}
