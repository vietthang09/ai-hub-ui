"use client";

 import Navbar from "../../components/common/Navbar";
import OverviewChart from "./components/OverviewChart";
import ApexChart from "./components/ApexChart";

 import {
  months,
  values,
  tabs,
  statCards,
 } from "./utils/data";

 const dates = months.map((m, i) => ({ x: m, y: values[i] }));

 

export default function HomePage() {
  return (
    <div className="m-h-screen w-full bg-primary overflow-y-auto">
      <Navbar>
 
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h1 className="text-2xl text-white font-semibold tracking-tight">
            Dashboard
          </h1>
          <button className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-200 shadow hover:bg-slate-700">
            Download
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex gap-2 text-sm">
            {tabs.map((t) => (
              <button
                key={t.label}
                className={`rounded-full px-4 py-1.5 ${
                  t.active
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 px-6 pt-6 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
            >
              <div className="text-sm text-slate-400">{c.title}</div>
              <div className="pt-2 text-3xl font-bold tracking-tight text-slate-100">
                {c.value}
              </div>
              <div className="pt-1 text-xs text-slate-400">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-3">
          {/* Chart (area) */}
          <div className="xl:col-span-2 rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30">
            <div className="pb-4 text-base font-semibold text-slate-100">
              Overview
            </div>
            <OverviewChart dates={dates} />
          </div>

          {/*line chart*/}
          <div className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30">
            <div className="text-base font-semibold text-slate-100">
              Recent Sales
            </div>
            <p className="mt-1 text-sm text-slate-400">
              You made 265 sales this month.
            </p>
            <div className="mt-4">
              <ApexChart dates={dates} title="Monthly Sales" />
            </div>

 
          </div>
        </div>
      </Navbar>
    </div>
  );
}
