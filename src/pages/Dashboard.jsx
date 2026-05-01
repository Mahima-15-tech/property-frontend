

import { useState } from "react";
import {
  FaBell,
  FaMapMarkerAlt,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCircle,
  FaFileAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaBuilding,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const chartData = [
  { month: "JAN", value: 50000 },
  { month: "FEB", value: 80000 },
  { month: "MAR", value: 68000 },
  { month: "APR", value: 140000 },
  { month: "MAY", value: 118000 },
  { month: "JUN", value: 100000 },
  { month: "JUL", value: 178000 },
  { month: "AUG", value: 145000 },
  { month: "SEP", value: 242000 },
  { month: "OCT", value: 200000 },
  { month: "NOV", value: 270000 },
  { month: "DEC", value: 284500 },
];

const stats = [
  { label: "TOTAL INVESTED", value: "$245,000" },
  { label: "TOTAL PROPERTIES", value: "12" },
  { label: "SHARES OWNED", value: "1200" },
  { label: "PORTFOLIO VALUE", value: "$284,500", badge: "+12%" },
  { label: "AVG. RETURNS", value: "12.4%" },
  { label: "INCOME EARNED", value: "$18,420" },
];

const investments = [
  {
    name: "The Azure Heights",
    location: "Marina District, Dubai",
    invested: "$85,000",
    current: "$98,400",
    roi: "+15.7% ROI",
    ownership: "1% Ownership",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    name: "Lakeside Villa",
    location: "Lake Como, Italy",
    invested: "$120,000",
    current: "$128,200",
    roi: "+6.8% ROI",
    ownership: "0.5% Ownership",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
  },
];

const payouts = [
  { name: "Azure Heights Div.", date: "JAN 15, 2024", amount: "$1,240.50", icon: <FaBuilding size={14} className="text-amber-600" /> },
  { name: "Lakeside Rental", date: "JAN 28, 2024", amount: "$850.00", icon: <FaHome size={14} className="text-amber-600" /> },
];

const activity = [
  { title: "Purchased 50 Shares", sub: "Aspen Ridge Luxury Chalet", amount: "-$25,000.00", date: "Dec 12", neg: true },
  { title: "Quarterly Payout", sub: "Portfolio Aggregate Distribution", amount: "+$4,580.20", date: "Dec 01", neg: false },
];

const docs = [
  { label: "Master Agreement 2024", icon: <FaFileAlt size={13} className="text-gray-400" /> },
  { label: "Portfolio Certificate #491", icon: <FaCheckCircle size={13} className="text-gray-400" /> },
  { label: "Annual SEC Disclosure", icon: <FaInfoCircle size={13} className="text-gray-400" /> },
];

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("Monthly");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
     

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8 max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-[#1a7a5e]">Eleanor Sterling-Wellesley</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg">
              Track your investments and grow your portfolio within the Sovereign ecosystem. Your assets are currently outperforming the regional benchmark by 2.4%.
            </p>
          </div>

          <button className=" flex items-center gap-2 bg-[#1a3a2e] hover:bg-[#122a22] text-white 
          text-sm font-semibold px-4 py-3 rounded-xl whitespace-nowrap self-start transition-colors">
           <NavLink to='/property' className={"flex justify-center items-center gap-3"}>
               Explore Properties  <FaArrowRight size={12} />
           </NavLink>
         
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 relative">
              {s.badge && (
                <span className="absolute top-2 right-2 bg-[#e6f4ef] text-[#1a7a5e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{s.badge}</span>
              )}
              <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <p className="font-semibold text-gray-900 text-base">Portfolio Performance</p>
                  <p className="text-xs text-gray-400">Growth of assets over the last 12 months</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg p-1 self-start">
                  {["Monthly", "Quarterly"].map((t) => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a7a5e" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1a7a5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Value"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                    <Area type="linear" dataKey="value" stroke="#1a7a5e" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Active Investments</h2>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                View All <FaExternalLinkAlt size={11} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {investments.map((inv) => (
                <div key={inv.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="relative h-36 sm:h-40">
                    <img src={inv.img} alt={inv.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                      {inv.ownership}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{inv.name}</p>
                    <p className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <FaMapMarkerAlt size={10} /> {inv.location}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider">Invested</p>
                        <p className="text-sm font-bold text-gray-900">{inv.invested}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider">Current Value</p>
                        <p className="text-sm font-bold text-gray-900">{inv.current}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#e6f4ef] text-[#1a7a5e] text-[10px] font-bold px-2 py-1 rounded-full">{inv.roi}</span>
                      <button className="text-xs text-gray-500 hover:text-gray-800 font-medium underline">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Upcoming Payouts</p>
              <div className="flex flex-col gap-2 mb-3">
                {payouts.map((p) => (
                  <div key={p.name} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">{p.icon}</div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.date}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{p.amount}</p>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-xs text-gray-500 hover:text-gray-700 font-medium">View Payout History</button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Recent Activity</p>
              <div className="flex flex-col gap-3">
                {activity.map((a) => (
                  <div key={a.title} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <FaCircle size={7} className={`mt-1.5 shrink-0 ${a.neg ? "text-[#1a7a5e]" : "text-[#1a7a5e]"}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{a.title}</p>
                        <p className="text-[10px] text-gray-400 truncate">{a.sub}</p>
                        <p className={`text-xs font-bold ${a.neg ? "text-red-500" : "text-[#1a7a5e]"}`}>{a.amount}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">{a.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <FaBuilding size={13} className="text-[#1a7a5e]" /> Legal &amp; Documents
              </p>
              <div className="flex flex-col gap-2">
                {docs.map((d) => (
                  <div key={d.label} className="flex items-center gap-2 py-1.5 border-b border-gray-100 last:border-0">
                    {d.icon}
                    <span className="text-xs text-gray-700 hover:text-gray-900 cursor-pointer">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a3a2e] rounded-2xl p-4 relative overflow-hidden">
              <p className="text-white font-bold text-sm mb-1">Need dedicated support?</p>
              <p className="text-gray-300 text-xs mb-4">Your personal asset curator is available for a strategy call.</p>
              <button className="bg-white text-[#1a3a2e] text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
}