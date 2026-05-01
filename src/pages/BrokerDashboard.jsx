import { useState, useEffect } from "react";
import {
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import {
  HiOutlineSquares2X2,
  HiBriefcase,
  HiOutlineUsers,
  HiOutlineBanknotes,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiArrowRightOnRectangle,
  HiOutlineShare,
  HiOutlineClipboardDocument,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { RiCopperCoinLine } from "react-icons/ri";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { RxCross1 } from "react-icons/rx";
import axios from "../utils/axios"; 


const navItems = [
  {
    icon: HiOutlineSquares2X2,
    label: "Overview",
    type: "overview",
    active: true,
  },
  { icon: HiOutlineUserGroup, label: "Total Referral", type: "referral" },
  { icon: HiOutlineShieldCheck, label: "Total Converted", type: "converted" },
  { icon: HiOutlineBanknotes, label: "Commission", type: "commission" }
];

const statCards = [
  {
    icon: HiOutlineUserGroup,
    label: "Total Referrals",
    value: "1,284",
    color: "text-teal-700",
  },
  {
    icon: HiOutlineShieldCheck,
    label: "Total Converted",
    value: "432",
    color: "text-teal-700",
  },
  // { icon: HiOutlineChartBar, label: "Total Investment", value: "$2.4M", color: "text-teal-700" },
  {
    icon: RiCopperCoinLine,
    label: "Total Earnings",
    value: "$86,400",
    color: "text-yellow-600",
  },
];

const recentInvestors = [
  {
    name: "Jonathan Sterling",
    contact: "+91  XXXXX1234",
    property: "Azure Bay Penthouse",
    amount: "$125,000",
    date: "Oct 12, 2023",
    status: "Completed",
  },
  {
    name: "Amara Okafor",
    contact: "+91  XXXXX5678",
    property: "Golden Valley Estates",
    amount: "$45,000",
    date: "Oct 08, 2023",
    status: "In Process",
  },
  {
    name: "Kenji Tanaka",
    contact: "+91  XXXXX9812",
    property: "The Sovereign Tower",
    amount: "$250,000",
    date: "Sep 28, 2023",
    status: "Completed",
  },
];

const totalReferral = [
  {
    name: "Jonathan Sterling",
    contact: "+91  XXXXX1234",
    property: "Azure Bay Penthouse",
    amount: "$125,000",
    date: "Oct 12, 2023",
    status: "Completed",
  },
  {
    name: "Amara Okafor",
    contact: "+91  XXXXX5678",
    property: "Golden Valley Estates",
    amount: "$45,000",
    date: "Oct 08, 2023",
    status: "In Process",
  },
  {
    name: "Kenji Tanaka",
    contact: "+91  XXXXX9812",
    property: "The Sovereign Tower",
    amount: "$250,000",
    date: "Sep 28, 2023",
    status: "Completed",
  },
  {
    name: "Jonathan Sterling",
    contact: "+91  XXXXX1234",
    property: "Azure Bay Penthouse",
    amount: "$125,000",
    date: "Oct 12, 2023",
    status: "Completed",
  },
  {
    name: "Amara Okafor",
    contact: "+91  XXXXX5678",
    property: "Golden Valley Estates",
    amount: "$45,000",
    date: "Oct 08, 2023",
    status: "In Process",
  },
  {
    name: "Kenji Tanaka",
    contact: "+91  XXXXX9812",
    property: "The Sovereign Tower",
    amount: "$250,000",
    date: "Sep 28, 2023",
    status: "Completed",
  },
  {
    name: "Jonathan Sterling",
    contact: "+91  XXXXX1234",
    property: "Azure Bay Penthouse",
    amount: "$125,000",
    date: "Oct 12, 2023",
    status: "Completed",
  },
  {
    name: "Amara Okafor",
    contact: "+91  XXXXX5678",
    property: "Golden Valley Estates",
    amount: "$45,000",
    date: "Oct 08, 2023",
    status: "In Process",
  },
  // { name: "Kenji Tanaka", contact: "+91  XXXXX9812", property: "The Sovereign Tower", amount: "$250,000", date: "Sep 28, 2023", status: "Completed" },
];

const commissionDetails = [
  {
    property: "Azure Bay Penthouse",
    investor: "Jonathan S.",
    commission: "$6,250",
    status: "Paid",
  },
  {
    property: "The Sovereign Tower",
    investor: "Kenji T.",
    commission: "$12,500",
    status: "Pending",
  },
];

const opportunities = [
  {
    tag: "PREMIUM ASSET",
    tagColor: "bg-teal-700",
    roi: "8.4% Est. ROI",
    roiColor: "bg-teal-700",
    name: "Elysium Gardens",
    location: "Beverly Hills, California",
    price: "$2,500",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  },
  {
    tag: "NEWLY ADDED",
    tagColor: "bg-teal-500",
    roi: "12.2% Est. ROI",
    roiColor: "bg-teal-500",
    name: "Indigo Reef Residences",
    location: "Malibu Coastline",
    price: "$10,000",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
  {
    tag: "COMMERCIAL",
    tagColor: "bg-slate-700",
    roi: "9.8% Est. Yield",
    roiColor: "bg-slate-700",
    name: "Metropolitan Plaza",
    location: "Downtown Business District",
    price: "$5,000",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
  },
];

const chartPoints = [
  { x: 0, y: 85 },
  { x: 1, y: 80 },
  { x: 2, y: 75 },
  { x: 3, y: 60 },
  { x: 4, y: 45 },
  { x: 5, y: 35 },
  { x: 6, y: 30 },
  { x: 7, y: 20 },
  { x: 8, y: 25 },
  { x: 9, y: 30 },
  { x: 10, y: 20 },
  { x: 11, y: 10 },
];

function StatusBadge({ status }) {
  const s =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

      
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${s}`}>
      {status}
    </span>
  );
}



// function Sidebar({ mobileOpen, setMobileOpen }) {
//   return (
//     <>
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-10 lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
//       <aside
//         className={`fixed top-0 left-0 h-screen w-44 bg-white border-r border-gray-100 flex flex-col z-10 transition-transform duration-300
//         ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:fixed lg:top-0 lg:flex lg:h-screen lg:flex-shrink-0`}
//       >
//         <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
//           <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
//             <HiBriefcase className="text-white text-sm" />
//           </div>
//           <div>
//             <p className="text-sm whitespace-nowrap font-semibold text-gray-800 leading-tight">
//               Broker Portal
//             </p>
//             <p className="text-xs text-gray-400">Premium Tier</p>
//           </div>
//         </div>
//         <nav className="flex-1 py-4 px-2">
//           {navItems.map(({ icon: Icon, label, active }) => (
//             <button
//               key={label} 
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
//               ${
//                 active
//                   ? "bg-teal-50 text-teal-700"
//                   : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
//               }`}
//             >
//               <Icon className="text-lg flex-shrink-0" />
//               {label}
//             </button>
//           ))}
//         </nav>
//         <div className="px-2 pb-4 border-t border-gray-100 pt-3">
//           <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 mb-1">
//             <HiOutlineQuestionMarkCircle className="text-lg" /> Help Center
//           </button>
//           <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
//             <HiArrowRightOnRectangle className="text-lg" /> Sign Out
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

function StatCards({ data }) {
  if (!data) return null;

  const cards = [
    {
      icon: HiOutlineUserGroup,
      label: "Total Referrals",
      value: data.referrals,
      color: "text-teal-700",
    },
    {
      icon: HiOutlineShieldCheck,
      label: "Total Converted",
      value: data.conversions,
      color: "text-teal-700",
    },
    {
      icon: RiCopperCoinLine,
      label: "Total Earnings",
      value: `₹${data.totalEarnings}`,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
      {cards.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
          <Icon className={`text-2xl ${color}`} />
          <p className="text-xs text-gray-400">{label}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}

function BrokerCodeCard({ profile }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      if (!profile?.referralCode) return;

      await navigator.clipboard.writeText(profile.referralCode);

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log("Copy failed", err);
    }
  };

  return (
    <div className="bg-teal-700 rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="text-white font-semibold text-sm">
        Your Broker Code
      </h3>

      <div className="bg-white/20 rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-sm">
          {profile?.referralCode || "----"}
        </span>

        <button onClick={copyCode} className="text-white">
          <HiOutlineClipboardDocument />
        </button>
      </div>

      {copied && (
        <p className="text-white text-xs">Code copied!</p>
      )}
    </div>
  );
}

function ReferralChart() {
  const [active, setActive] = useState("Monthly");
  return (
    <div className="bg-teal-700 text-white rounded-2xl shadow-lg p-6 sm:max-w-md w-full">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-3">How Broker Code Works</h2>

      {/* Content */}
      <p className="text-sm text-teal-100 leading-relaxed mb-4">
        Broker code ek unique identifier hota hai jo har broker ko assign kiya
        jata hai. Jab koi user aapka broker code use karta hai, to uske through
        hone wale transactions aapke account se link ho jaate hain.
      </p>

      <p className="text-sm text-teal-100 leading-relaxed mb-4">
        Isse aap apne referrals, commissions aur activity ko easily track kar
        sakte ho. Ye system transparency maintain karta hai aur earnings ko
        automate karta hai.
      </p>

      {/* Highlight Box */}
      <div className="bg-teal-800 rounded-xl p-3">
        <p className="text-xs text-teal-200">
          💡 Tip: Apna broker code zyada se zyada share karo taaki aapki earning
          aur network grow ho.
        </p>
      </div>
    </div>
  );
}

function RecentInvestors({ investors }) {
  const thClass =
  "px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left";

const tdClass =
  "px-6 py-4 text-sm text-gray-700 text-left align-middle";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      
      {/* HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
        <h3 className="font-semibold text-gray-800 text-base">
          Recent Referred Investors
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Latest activity from your referral network
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">

          {/* HEAD */}
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Investor</th>
              <th className={thClass}>Contact</th>
              <th className={thClass}>Property</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Date</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {investors?.length > 0 ? (
              investors.map((row, i) => (
                <tr
                  key={i}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  {/* NAME + AVATAR */}
                  <td className={tdClass}>
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
      {row.investorName?.charAt(0)}
    </div>
    <span className="font-medium text-gray-800">
      {row.investorName}
    </span>
  </div>
</td>

                  {/* CONTACT */}
                  <td className={tdClass}>{row.contact}</td>

                  {/* PROPERTY */}
                  <td className={`${tdClass} text-gray-600`}>
                    {row.property}
                  </td>

                  {/* AMOUNT */}
                  <td className={`${tdClass} font-semibold text-teal-600`}>
                    ₹{row.amount}
                  </td>

                  {/* DATE */}
                  <td className={tdClass}>
                    {new Date(row.date).toLocaleDateString()}
                  </td>

                  {/* STATUS */}
                  <td className={tdClass}>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : row.status === "In Process"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No investors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CommissionDetails({ commissions }) {
  const thClass =
    "px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left";

  const tdClass =
    "px-6 py-4 text-sm text-gray-700 text-left align-middle";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
        <h3 className="font-semibold text-gray-800 text-base">
          Commission Details
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Track your earnings & payout status
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">

          {/* HEAD (FIXED) */}
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Property</th>
              <th className={thClass}>Investor</th>
              <th className={thClass}>Commission</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {commissions?.length > 0 ? (
              commissions.map((row, i) => (
                <tr
                  key={i}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  {/* PROPERTY */}
                  <td className={`${tdClass} font-medium text-gray-800 whitespace-nowrap`}>
                    {row.property}
                  </td>

                  {/* INVESTOR */}
                  <td className={tdClass}>
                    {row.investor}
                  </td>

                  {/* COMMISSION */}
                  <td className={`${tdClass} font-semibold text-teal-600`}>
                    ₹{row.commission}
                  </td>

                  {/* STATUS */}
                  <td className={tdClass}>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No commission data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EarningsSummary({ data }) {
  if (!data) return null;

  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-bold mb-2">Earnings Summary</h3>

      <p className="text-xs mb-2">
        Next payout: {data.nextPayout}
      </p>

      <p className="text-sm font-semibold mb-2">
        ₹{data.total} / ₹{data.target}
      </p>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-teal-700 h-2 rounded-full"
          style={{ width: `${data.percent}%` }}
        />
      </div>
    </div>
  );
}

function ActiveOpportunities() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-800 text-base">
            Active Opportunities
          </h3>
          <p className="text-xs text-gray-400">
            Recommended properties for your network
          </p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
            <HiOutlineChevronLeft className="text-sm" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
            <HiOutlineChevronRight className="text-sm" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {opportunities.map((opp) => (
          <div
            key={opp.name}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="relative h-40">
              <img
                src={opp.img}
                alt={opp.name}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 ${opp.tagColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
              >
                {opp.tag}
              </span>
              <span
                className={`absolute bottom-3 left-3 ${opp.roiColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
              >
                {opp.roi}
              </span>
            </div>
            <div className="p-4 flex items-end justify-between">
              <div>
                <p className="font-bold text-gray-800 text-sm">{opp.name}</p>
                <p className="text-xs text-gray-400 mb-2">{opp.location}</p>
                <p className="text-xs text-gray-400">SHARE PRICE</p>
                <p className="font-bold text-gray-800 text-sm">
                  {opp.price}{" "}
                  <span className="text-gray-400 font-normal">/ share</span>
                </p>
              </div>
              <button className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center hover:bg-yellow-300 transition-colors flex-shrink-0">
                <HiOutlineShare className="text-gray-800 text-base" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ setMobileOpen, profile }) {
  
  

  const handleShare = () => {
    if (!profile?.referralCode) return;
  
    const text = `Join using my referral code: ${profile.referralCode}
  ${profile.shareLink || ""}`;
  
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`
    );
  };

  return (
    <div className="flex items-center justify-between mb-6">
      
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(prev => !prev)}
        >
          <HiOutlineSquares2X2 className="text-2xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold">
            Broker Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            Track referrals & earnings
          </p>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
      >
        <HiOutlineShare />
        Share Promo Code
      </button>
    </div>
  );
}

export default function BrokerDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("overview");
  console.log("dd", active);
  const [dashboard, setDashboard] = useState(null);
const [profile, setProfile] = useState(null);
const [investors, setInvestors] = useState([]);
const [commissions, setCommissions] = useState([]);
const [earnings, setEarnings] = useState(null);
const [referrals, setReferrals] = useState([]);
const [converted, setConverted] = useState([]);

const thClass =
  "px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center";
  const tdClass = "px-6 py-4 text-sm text-gray-700 text-center";


useEffect(() => {
  const fetchData = async () => {
    try {
      const [
        dash,
        prof,
        inv,
        comm,
        earn,
        ref,
        conv
      ] = await Promise.all([
        axios.get("/api/brokers/dashboard"),
        axios.get("/api/brokers/profile"),
        axios.get("/api/brokers/referred-investors"),
        axios.get("/api/brokers/commissions"),
        axios.get("/api/brokers/earnings-summary"),
        axios.get("/api/brokers/total-referrals"),
        axios.get("/api/brokers/total-converted")    
      ]);

      setDashboard(dash.data);
      setProfile(prof.data);
      setInvestors(inv.data);
      setCommissions(comm.data);
      setEarnings(earn.data);
      setReferrals(ref.data);
      setConverted(conv.data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/"; // ya "/login"
};

const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
    <div className="flex bg-gray-50 font-sans   ">
      <aside
        className={
          // ` sticky top-[11%] h-[90vh] w-52 bg-gray-50 border-r border-gray-200
          // flex flex-col z-10
          // ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          // lg:translate-x-0 lg:flex-shrink-0`
          `fixed lg:sticky top-0 lg:top-[11%] left-0
          h-full lg:h-[90vh] w-52 bg-gray-50 border-r border-gray-200
          flex flex-col z-40
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`
        }
      >
        <div className="flex items-center gap-2 px-4 py-5 border-bborder-gray-200">
          <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
            <HiBriefcase className="text-white text-sm" />
          </div>
          <div className="flex  items-center  justify-around gap-8">
            <div>
              <p className="text-sm whitespace-nowrap font-semibold text-gray-800 leading-tight">
                Broker Portal
              </p>
              <p className="text-xs text-gray-400">Premium Tier</p>
            </div>
            <div className="border-2 lg:hidden block">
              <RxCross1
                className="text-xl "
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* <nav className="flex-1 py-4 px-2">
          {navItems.map(({ icon: Icon, label, active, type }) => (
            <button key={label} onClick={() => setActive(type)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
              ${type ? "bg-teal-50 text-teal-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}>
              <Icon className="text-lg flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav> */}

        <nav className="flex-1 py-4 px-2">
          {navItems.map(({ icon: Icon, label, type }) => (
            <button
              key={label}
              onClick={() => {setActive(type)
                setMobileOpen(false)}}
               
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
                  ${
                    active === type
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
            >
              <Icon className="text-lg flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-2 pb-4 border-t border-gray-200 pt-3">
          {/* <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 mb-1">
            <HiOutlineQuestionMarkCircle className="text-lg" /> Help Center
          </button> */}
          <button
  onClick={() => setShowLogoutConfirm(true)}
  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
>
  <HiArrowRightOnRectangle className="text-lg" /> Sign Out
</button>
        </div>
      </aside>

      {active === "referral" && (
  <div className="flex-1 p-4 sm:p-6 lg:p-8">
    
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800 text-base">
            Total Referrals
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            All users referred by you
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">

          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>User</th>
              <th className={thClass}>Contact</th>
            
              <th className={thClass}>Joined</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>

          <tbody>
            {referrals.map((row, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                {/* USER */}
                <td className={tdClass}>
  <div className="flex items-center justify-center gap-3">
    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
      {row.name?.charAt(0)}
    </div>
    <span className="font-medium text-gray-800">
      {row.name}
    </span>
  </div>
</td>

                <td className={tdClass}>{row.contact}</td>
                {/* <td className={tdClass}>{row.email}</td> */}

                <td className={tdClass}>
                  {new Date(row.signupDate).toLocaleDateString()}
                </td>

                <td className={tdClass}>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "Converted"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

{active === "converted" && (
  <div className="flex-1 p-4 sm:p-6 lg:p-8">

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
        <h3 className="font-semibold text-gray-800 text-base">
          Total Converted
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Users who completed investment
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">

          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Investor</th>
              <th className={thClass}>Contact</th>
              <th className={thClass}>Property</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Date</th>
            </tr>
          </thead>

          <tbody>
            {converted.map((row, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                {/* NAME */}
                <td className={tdClass}>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
                      {row.name?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">
                      {row.name}
                    </span>
                  </div>
                </td>

                <td className={tdClass}>{row.contact}</td>
                <td className={tdClass}>{row.property}</td>

                <td className={`${tdClass} font-semibold text-teal-600`}>
                  ₹{row.amount}
                </td>

                <td className={tdClass}>
                  {new Date(row.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  </div>
)}


{active === "commission" && (
  <div className="flex-1 p-4 sm:p-6 lg:p-8">

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
        <h3 className="font-semibold text-gray-800 text-base">
          Commission Details
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Complete commission history
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">

          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Property</th>
              <th className={thClass}>Investor</th>
              <th className={thClass}>Commission</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>

          <tbody>
            {commissions.map((row, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className={tdClass}>{row.property}</td>

                <td className={tdClass}>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
                      {row.investor?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">
                      {row.investor}
                    </span>
                  </div>
                </td>

                <td className={`${tdClass} font-semibold text-teal-600`}>
                  ₹{row.commission}
                </td>

                <td className={tdClass}>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  </div>
)}

      {active === "overview" && (
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Header setMobileOpen={setMobileOpen} profile={profile} />
          <StatCards data={dashboard} />

          <div className="flex  flex-col sm:flex-row  gap-4 lg:gap-14 xl:gap-24 mb-6">
            <div className="flex-1">
            <BrokerCodeCard profile={profile} />
            </div>
            <div className="flex-1">
              <ReferralChart />
            </div>
          </div>

          <RecentInvestors investors={investors} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
            <CommissionDetails commissions={commissions.slice(0, 5)} />
            </div>
            <div>
            <EarningsSummary data={earnings} />
            </div>
          </div>

          {/* <ActiveOpportunities /> */}
        </main>
      )}

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </div>

{showLogoutConfirm && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Sign Out
      </h3>

      <p className="text-sm text-gray-500 mb-5">
        Are you sure you want to sign out?
      </p>

      <div className="flex justify-end gap-3">
        
        {/* Cancel */}
        <button
          onClick={() => setShowLogoutConfirm(false)}
          className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>

        {/* Confirm */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
        >
          Sign Out
        </button>

      </div>
    </div>
  </div>
  
)}
</>

    
  );

  

  
}
