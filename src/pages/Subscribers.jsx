import { useState } from "react";

const initialSubscribers = [
  { id: 1, name: "John Doe",   email: "john@email.com",  interests: "Books, Journals", date: "12 Jan 2026", status: "Active"       },
  { id: 2, name: "Mary Smith", email: "mary@email.com",  interests: "Teachings",       date: "10 Jan 2026", status: "Active"       },
  { id: 3, name: "Peter K.",   email: "peter@email.com", interests: "Blog",            date: "08 Jan 2026", status: "Unsubscribed" },
];

export default function Subscribers() {
  const [subscribers] = useState(initialSubscribers);
  const [search, setSearch] = useState("");
  const [filterInterest, setFilterInterest] = useState("");

  const filtered = subscribers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchInterest =
      filterInterest === "" ||
      s.interests.toLowerCase().includes(filterInterest.toLowerCase());
    return matchSearch && matchInterest;
  });

  const total       = subscribers.length;
  const active      = subscribers.filter((s) => s.status === "Active").length;
  const unsubscribed = subscribers.filter((s) => s.status === "Unsubscribed").length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          Subscribers
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-6 space-y-5">

        {/* ── SUBTITLE ── */}
        <p className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
          Subscriber Management
        </p>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-3 gap-5 max-w-3xl">
          {[
            { label: "Total Subscribers", value: total },
            { label: "Active",            value: active },
            { label: "Unsubscribed",      value: unsubscribed },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-5"
            >
              <p className="text-xs text-gray-500 font-medium mb-3">
                {stat.label}
              </p>
              <p className="text-sm font-bold text-gray-500">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* ── SEARCH + FILTER + EXPORT ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4 flex items-center gap-8">

          {/* Search */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500 font-medium whitespace-nowrap">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all w-[200px]"
            />
          </div>

          {/* Filter by Interest */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500 font-medium whitespace-nowrap">
              Filter by Interest
            </label>
            <input
              type="text"
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all w-[200px]"
            />
          </div>

          {/* Export CSV */}
          <div className="ml-8">
            <button className="bg-[#6366F1] hover:bg-[#6a5dbf] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              Export CSV
            </button>
          </div>

        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden pb-16">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-900 tracking-wider">
                  Name
                </th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-900 tracking-wider">
                  Email
                </th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-900 tracking-wider">
                  Interests
                </th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-900 tracking-wider">
                  Date Subscribed
                </th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-900 tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((sub, i) => (
                  <tr
                    key={sub.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      i === filtered.length - 1 ? "border-0" : ""
                    }`}
                  >
                    <td className="px-3 py-3 text-sm text-gray-700 font-medium">
                      {sub.name}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {sub.email}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {sub.interests}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {sub.date}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          sub.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-400"
                  >
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── EMAIL INTEGRATION BANNER ── */}
        <div className="bg-[#E0E7FF]  rounded-xl px-6 py-5 ">
          <p className="text-sm font-semibold text-[#121214] mb-1">
            Email Integration: Connected
          </p>
          <p className="text-sm text-[#111113]">
            Last Sync: 5 minutes ago
          </p>
        </div>

      </div>
    </div>
  );
}