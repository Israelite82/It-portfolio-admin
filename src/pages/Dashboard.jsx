import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Subscribers", value: "2,430" },
    { label: "Books Published", value: "10" },
    { label: "Journal Entries", value: "3" },
    { label: "Pending Drafts", value: "7" },
  ];

  const quickActions = [
    { label: "+ Add Book",     bg: "bg-[#E0E7FF]",   text: "text-gray-700",   border: "border-blue-100",   path: "/books"    },
    { label: "+ New Journal",  bg: "bg-[#DCFCE7]",  text: "text-gray-700",  border: "border-green-100",  path: "/journals" },
    { label: "+ Add Teaching", bg: "bg-[#FEF3C7]", text: "text-gray-700", border: "border-yellow-100", path: "/teachings"},
    { label: "+ Blog Post",    bg: "bg-[#FCE7F3]",   text: "text-gray-700",   border: "border-pink-100",   path: "/blog"     },
  ];

  const recentActivity = [
    '"Economic and Governance" published',
    "New subscriber added (Books)",
    "Journal draft updated",
    "Teaching audio uploaded",
  ];

  const systemAlerts = [
    "3 blog posts missing featured image",
    "Email integration requires verification",
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between ml-6">
        <p className="text-[15px] text-gray-700 font-medium tracking-wide">
          Welcome back,{" "}
          <span className="font-semibold text-[#1a1612]">Admin</span>
        </p>
        <button className="bg-[#6366F1] hover:bg-[#6a5dbf] text-white text-sm font-semibold px-5 py-2.5 mr-10 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          + Quick Add
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-8 py-8 space-y-14">

        {/* ── STAT CARDS ── */}
        <div className="mt-5">
          <h2 className="text-sm font-semibold text-black tracking-widest uppercase mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <p className="text-md text-gray-700 font-medium tracking-wide mb-8">
                  {stat.label}
                </p>
                <p className="text-sm  text-[#1a1612]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div>
          <h2 className="text-sm font-semibold text-black tracking-widest uppercase mb-4">
            Quick Actions
          </h2>
          <div className="flex gap-8">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`${action.bg} ${action.text} border ${action.border} rounded-xl py-4 px-8 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        
        <div className="flex flex-col gap-5 ">
          {/* Recent Activity  */}
           <h2 className="text-sm font-semibold text-black tracking-widest uppercase ">
              Recent Activity
            </h2>
          <div className="bg-white rounded-xl  px-6 py-5 shadow-lg">
           
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111110] mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts  */}
           <h2 className="text-sm font-semibold text-black tracking-widest uppercase -mb-3 mt-5 ">
              System Alerts
            </h2>
          <div className="bg-[#FEF3C7] rounded-xl px-6 py-5 mb-8 shadow-lg">
           
            <div className="space-y-3">
              {systemAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-gray-700 mt-0.2 flex-shrink-0">▲</span>
                  <p className="text-sm text-black">{alert}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}