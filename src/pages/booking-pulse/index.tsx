import { type ReactNode } from "react";
 import Navbar from "../../components/common/Navbar";
import {
  AnalyticChart,
  BookingOverviewChart,
  DumbbellChart,
  ExpensesChart,
  TotalEarningChart,
} from "./components/BookingChart";
import { statCards, tabs } from "./utils/booking-data";

type CardProps = {
  title?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
};

const Card = ({ title, right, children, className = "" }: CardProps) => (
  <div className={`bg-primary rounded-2xl shadow-sm p-5 ${className}`}>
    <div className="flex items-center justify-between mb-4">
      {title ? (
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      ) : (
        <div />
      )}
      {right ?? <div />}
    </div>
    {children}
  </div>
);

export default function BookingPulse() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar>
        {/* Tabs */}
        <div className="px-6 pt-1">
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

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-4 mb-6">
          {statCards.map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
            >
              <div className="text-sm text-slate-400">{c.title}</div>
              <div className="pt-2 text-3xl font-bold tracking-tight text-slate-100">
                {c.value}
              </div>
              <div className="pt-1 text-xs text-slate-400">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-6 ">
            <Card
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
              title="Analytic"
            >
              <AnalyticChart />
            </Card>
            <Card
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
              title="Weather"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">☀️</div>
                <div>
                  <div className="text-2xl font-semibold">27°C</div>
                  <div className="text-sm text-slate-500">
                    Thu, Sep 20th 2025
                  </div>
                  <div className="text-sm text-slate-500">Da Nang City</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <Card
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
              title="Booking Overview"
            >
              <BookingOverviewChart />
            </Card>
            <Card
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
              title="Expenses"
            >
              <ExpensesChart />
            </Card>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <Card
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
              title="Total Earning"
              right={<span className="text-xl font-semibold">$5,024.23</span>}
            >
              <TotalEarningChart />
            </Card>

            <Card
              className="rounded-2xl border border-slate-800 bg-[#0f1522] p-5 shadow-lg shadow-black/30"
              title="Product A vs B (Dumbbell)"
            >
              <DumbbellChart />
            </Card>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
