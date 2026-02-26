import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const growthData = [
  { day: "1",  subscribers: 2100 },
  { day: "5",  subscribers: 2150 },
  { day: "8",  subscribers: 2140 },
  { day: "10", subscribers: 2160 },
  { day: "13", subscribers: 2200 },
  { day: "15", subscribers: 2210 },
  { day: "18", subscribers: 2260 },
  { day: "20", subscribers: 2300 },
  { day: "23", subscribers: 2340 },
  { day: "25", subscribers: 2370 },
  { day: "28", subscribers: 2390 },
  { day: "30", subscribers: 2430 },
];

const topContent = [
  "1. Why Banks Fail",
  "2. Faith and Focus",
  "3. Kingdom Economics Explained",
  "4. Research Paper on Policy Reform",
  "5. Teaching: Economic Dominion",
];

const engagement = [
  { label: "Audio Plays",        value: "12,430" },
  { label: "Video Views",        value: "9,230"  },
  { label: "PDF Downloads",      value: "4,560"  },
  { label: "Book Click-throughs",value: "3,210"  },
];

const trafficSources = [
  { label: "Direct",           value: "40%" },
  { label: "Search Engines",   value: "35%" },
  { label: "Social Media",     value: "15%" },
  { label: "Email Campaigns",  value: "10%" },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          Analytics Overview
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-6 space-y-5">

        {/* Subtitle */}
        <p className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
          Admin Analytics Dashboard
        </p>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total Page Views",    value: "1000"   },
            { label: "Total Subscribers",   value: "2300"   },
            { label: "Content This Month",  value: "12"     },
            { label: "Avg Session Duration",value: "4m 32s" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5"
            >
            <p className="text-md text-gray-700 font-medium mb-6">
                {stat.label}
              </p>
              <p className="text-sm  text-[#1a1612]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── SUBSCRIBER GROWTH CHART ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4 ">
          <p className="text-sm font-semibold text-gray-600 mb-6">
            Subscriber Growth (Last 30 Days)
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={growthData}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="subscribers"
                stroke="#7c6fcf"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── TOP CONTENT + ENGAGEMENT ── */}
        <div className="grid grid-cols-2 gap-5">

          {/* Top Performing Content */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Top Performing Content
            </p>
            <div className="space-y-3">
              {topContent.map((item, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Engagement Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Engagement Breakdown
            </p>
            <div className="space-y-3">
              {engagement.map((item) => (
                <p key={item.label} className="text-sm text-gray-600">
                  {item.label}: <span className="font-semibold text-[#1a1612]">{item.value}</span>
                </p>
              ))}
            </div>
          </div>

        </div>

        {/* ── TRAFFIC SOURCES ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5 pb-16">
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Traffic Sources
          </p>
          <div className="space-y-2">
            {trafficSources.map((item) => (
              <p key={item.label} className="text-sm text-gray-600">
                {item.label}: <span className="font-semibold text-[#1a1612]">{item.value}</span>
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}