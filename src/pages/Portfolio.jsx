import { useState, useEffect } from "react";
import {
  FiMapPin,
  FiDownload,
  FiChevronUp,
  FiChevronDown,
  FiPieChart,
  FiBarChart2,
  FiFolder,
  FiFileText,
  FiGrid,
  FiArrowRight,
  FiEye,
  FiUser,
  FiCreditCard,
  FiClock,
  FiXCircle,
  FiCheckCircle,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const tabs = [
  "Active Investments",
  "Watchlist",
  "Payment History",
  "Documents",
  "Support / Exit Request",
];

/* ---------------- HEADER ---------------- */
function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 p-8 rounded-3xl text-white shadow-xl shadow-teal-900/10 relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/50 backdrop-blur-md border border-teal-500/30 text-teal-200 text-xs font-semibold mb-3">
          <FiLayers size={12} /> Institutional Grade Asset Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          My Portfolio
        </h1>
        <p className="text-teal-100/80 text-sm mt-1 max-w-xl font-light">
          Track your real estate investments, yields, and overall performance across premium global assets in real time.
        </p>
      </div>

      <NavLink
        to="/property"
        className="relative z-10 self-start sm:self-auto inline-flex items-center gap-2 bg-emerald-400 text-teal-950 font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-emerald-300 active:scale-95 transition-all shadow-lg shadow-emerald-400/20 whitespace-nowrap"
      >
        Explore Properties <FiArrowRight size={16} />
      </NavLink>
    </div>
  );
}

/* ---------------- STATS BAR ---------------- */
function StatsBar({ data }) {
  if (!data) return null;

  const stats = [
    {
      icon: <FiGrid size={18} />,
      label: "TOTAL INVESTED",
      value: `₹${data.totalInvested.toLocaleString()}`,
      badge: "Capital Deployed",
    },
    {
      icon: <FiPieChart size={18} />,
      label: "SHARES OWNED",
      value: data.sharesOwned,
      badge: "Fractional Units",
    },
    {
      icon: <FiBarChart2 size={18} />,
      label: "EXPECTED RETURNS",
      value: `${data.expectedReturn}%`,
      badge: "Target Yield",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-teal-900/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {s.label}
              </span>
              <div className="p-2.5 bg-teal-50 text-teal-800 rounded-2xl">
                {s.icon}
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">
              {s.value}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-full">
              {s.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- TAB BAR ---------------- */
function TabBar({ active, setActive }) {
  return (
    <div className="w-full overflow-x-auto mb-8 no-scrollbar">
      <div className="flex gap-2 p-1.5 bg-gray-200/60 backdrop-blur-md rounded-2xl min-w-max border border-gray-200/80">
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-teal-800 text-white shadow-md shadow-teal-900/10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- RETURN HISTORY ---------------- */
function ReturnHistory({ investment }) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Ownership Highlight Card */}
        <div className="lg:col-span-1 bg-teal-50/60 border border-teal-100 rounded-2xl p-5">
          <p className="text-[10px] font-extrabold text-teal-800 uppercase tracking-widest mb-4">
            Ownership Structure
          </p>
          <div className="flex items-center gap-4 mb-5">
            <div className="relative flex-shrink-0">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center p-1 shadow-inner"
                style={{
                  background: `conic-gradient(#0f766e ${
                    investment.ownership * 3.6
                  }deg, #e2e8f0 0deg)`,
                }}
              >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-black text-teal-900">
                    {investment.ownership.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-base">
                {investment.shares} Shares
              </p>
              <p className="text-gray-500 text-xs font-medium">
                Verified Asset Ownership
              </p>
            </div>
          </div>

          {[
            ["Total Investment", investment.invested],
            ["Current Value", investment.currentValue],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between py-2 border-b border-teal-100/60 text-xs last:border-none"
            >
              <span className="text-gray-500 font-medium">{label}</span>
              <span className="font-bold text-gray-900">
                ₹{(value || 0).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div className="lg:col-span-1">
          <Documents docs={investment.documents} />
        </div>

        {/* Exit Option */}
        <div className="lg:col-span-1">
          <ExitPortfolio investments={[investment]} />
        </div>

      </div>
    </div>
  );
}

/* ---------------- INVESTMENT CARD ---------------- */
function InvestmentCard({ property, expanded, onToggle }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all mb-4 overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-800 to-emerald-700 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-teal-900/10">
              <BsBuilding size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-gray-900 text-base truncate">
                {property.name}
              </h3>
              <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 font-medium">
                <FiMapPin size={12} className="text-teal-700" />
                {property.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 flex-1 bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">
                Shares Owned
              </p>
              <p className="text-sm font-extrabold text-gray-900 mt-0.5 font-mono">
                {property.shares}{" "}
                <span className="text-[10px] text-teal-700 font-normal">
                  ({property.ownership.toFixed(2)}%)
                </span>
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">
                Capital Invested
              </p>
              <p className="text-sm font-extrabold text-gray-900 mt-0.5 font-mono">
                {property.invested}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 justify-between sm:justify-start">
            {property.roi && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                {property.roi}
              </span>
            )}
            {property.expandable ? (
              <button
                onClick={onToggle}
                className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-teal-800 transition-all"
              >
                {expanded ? (
                  <FiChevronUp size={16} />
                ) : (
                  <FiChevronDown size={16} />
                )}
              </button>
            ) : (
              <button className="border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
                View Details
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && property.expandable && (
        <div className="px-5 sm:px-6 pb-6 bg-white border-t border-gray-100">
          <ReturnHistory investment={property} />
        </div>
      )}
    </div>
  );
}

function ActiveInvestments({ data }) {
  const [expanded, setExpanded] = useState(-1);

  if (!data) return null;

  return (
    <div>
      {data.map((p, i) => (
        <InvestmentCard
          key={p.propertyId}
          property={{
            investmentId: p.investmentId,
            propertyId: p.propertyId,
            name: p.propertyName,
            location: p.location,
            shares: p.shares,
            ownership: p.ownership,
            invested: p.invested,
            currentValue: p.currentValue,
            roi: p.roi,
            documents: p.documents,
            expandable: true,
          }}
          expanded={expanded === i}
          onToggle={() => setExpanded(expanded === i ? -1 : i)}
        />
      ))}
    </div>
  );
}

/* ---------------- DOCUMENTS ---------------- */
function Documents({ docs }) {
  if (!docs || docs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center text-xs text-gray-400 font-medium">
        No documents available for this asset.
      </div>
    );
  }

  return (
    <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <FiFolder size={14} className="text-teal-700" />
        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
          Legal & Title Documents
        </p>
      </div>

      <div className="space-y-2">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 shadow-sm hover:border-teal-200 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-50 text-teal-800 rounded-lg">
                <FiFileText size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 leading-tight">
                  {doc.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  {doc.type || "Official Document"}
                </p>
              </div>
            </div>

            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-gray-400 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-all"
            >
              <FiDownload size={15} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- EXIT PORTFOLIO ---------------- */
function ExitPortfolio({ investments }) {
  const [selectedId, setSelectedId] = useState("");

  const handleExit = async () => {

    if (!selectedId) {
      alert("Please select property");
      return;
    }
  
    const data = JSON.parse(selectedId);
  
    try {
  
      await axios.post("/api/portfolio/exit", {
        investmentId: data.investmentId,
        shares: data.shares,
      });
  
      alert("Exit request submitted");
  
      window.location.reload();
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-2xl p-5 text-white shadow-lg shadow-teal-900/10">
      <p className="mb-1 text-sm font-extrabold">Liquidity / Exit Request</p>
      <p className="text-xs text-teal-200/80 mb-4 font-light">
        Submit fractional shares back to pool or transfer request.
      </p>

      <select
  value={selectedId}
  onChange={(e) => setSelectedId(e.target.value)}
  className="w-full mb-3 p-2.5 text-xs text-gray-900 bg-white font-medium rounded-xl border-none focus:ring-2 focus:ring-emerald-400 focus:outline-none"
>
  <option value="">Select Property To Exit</option>

  {investments.map((inv) => (
    <option
      key={inv.propertyId}
      value={JSON.stringify({
        investmentId: inv.investmentId,
        shares: inv.shares,
      })}
    >
   {inv.propertyName || inv.name}
    </option>
  ))}
</select>

      <button
        onClick={handleExit}
        className="w-full bg-emerald-400 hover:bg-emerald-300 text-teal-950 font-bold py-2.5 text-xs rounded-xl shadow-md transition-all active:scale-95"
      >
        Submit Request
      </button>
    </div>
  );
}

/* ---------------- CURATED RELATED PROPERTIES ---------------- */
function Sidebar({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">No related properties</p>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200/80">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Curated Opportunities
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Handpicked premium listings aligned with your investment profile
          </p>
        </div>

        <NavLink
          to="/property"
          className="text-xs text-teal-800 font-bold hover:underline flex items-center gap-1"
        >
          Explore All <FiArrowRight size={12} />
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 bg-gray-100 relative overflow-hidden">
                {p.media?.images?.[0] ? (
                  <img
                    src={p.media.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : null}

                <span className="absolute top-3 left-3 bg-teal-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                  {p.type || "Property"}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-extrabold text-gray-900 text-base group-hover:text-teal-800 transition-colors">
                  {p.name}
                </h3>

                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 font-medium">
                  <FiMapPin size={12} className="text-teal-700" />
                  {p.location?.city}, {p.location?.state}
                </p>

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Target Yield
                    </p>
                    <p className="text-emerald-700 font-extrabold text-sm font-mono mt-0.5">
                      {p.roi ? `${p.roi}%` : "--"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Price / Share
                    </p>
                    <p className="font-extrabold text-sm text-gray-900 font-mono mt-0.5">
                      ₹{p.pricePerShare?.toLocaleString() || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- WATCHLIST ---------------- */
/* ---------------- WATCHLIST ---------------- */
function WatchList({ data }) {
  const navigate = useNavigate();

  const watchlistData = Array.isArray(data)
    ? data
    : Array.isArray(data?.watchlist)
    ? data.watchlist
    : Array.isArray(data?.data)
    ? data.data
    : [];

  if (watchlistData.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 font-medium text-sm">
        Your watchlist is currently empty.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {watchlistData.map((p) => {
        const propertyId = p.id || p._id || p.propertyId;

        const propertyName =
          p.name ||
          p.title ||
          p.propertyName ||
          "Untitled Property";

        const propertyImage =
          p.image ||
          p.media?.images?.[0] ||
          p.images?.[0] ||
          p.property?.image ||
          p.property?.media?.images?.[0];

        const propertyLocation =
          typeof p.location === "string"
            ? p.location
            : p.location?.city
            ? `${p.location.city}${p.location.state ? `, ${p.location.state}` : ""}`
            : p.property?.location?.city
            ? `${p.property.location.city}${
                p.property.location.state
                  ? `, ${p.property.location.state}`
                  : ""
              }`
            : "Location not available";

        const propertyRoi =
          p.roi ||
          p.expectedReturn ||
          p.property?.roi ||
          p.property?.expectedReturn;

        return (
          <div
            key={propertyId}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group flex flex-col justify-between"
            onClick={() =>
              propertyId && navigate(`/properties/${propertyId}`)
            }
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {propertyImage ? (
                  <img
                    src={propertyImage}
                    alt={propertyName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                    <BsBuilding size={32} />
                  </div>
                )}

                {propertyRoi && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-teal-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                    {propertyRoi}% ROI
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-extrabold text-gray-900 text-base group-hover:text-teal-800 transition-colors">
                  {propertyName}
                </h3>

                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 font-medium">
                  <FiMapPin size={12} className="text-teal-700" />
                  {propertyLocation}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">
                  Investment Opportunity
                </span>

                <span className="text-teal-800 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View <FiArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- PAYMENT HISTORY ---------------- */
function PaymentCard({ property }) {
  const isSuccess = property.status === "success";
  const isPending = property.status === "pending";

  const statusStyle = isSuccess
    ? "bg-emerald-50 text-emerald-800 border-emerald-100"
    : isPending
    ? "bg-amber-50 text-amber-800 border-amber-100"
    : "bg-rose-50 text-rose-800 border-rose-100";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex items-center justify-between border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isSuccess ? "bg-teal-50 text-teal-800" : "bg-gray-100 text-gray-500"}`}>
          <FiCreditCard size={18} />
        </div>
        <div>
          <p className="text-sm font-extrabold text-gray-900">
            {property.name || "Property Transaction"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">
            {property.date
              ? new Date(property.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Date unavailable"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <p className="text-base font-extrabold text-gray-900 font-mono">
          ₹{property.amount ? property.amount.toLocaleString() : "0"}
        </p>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${statusStyle}`}
        >
          {property.status || "Unknown"}
        </span>
      </div>
    </div>
  );
}

function Payment({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 font-medium text-sm">
        No payment history available.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((p, i) => (
        <PaymentCard
          key={i}
          property={{
            name: p.name,
            amount: p.amount,
            date: p.date,
            status: p.status,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- KYC DOCUMENTS ---------------- */
function KycDocuments({ docs, kyc }) {
  const [preview, setPreview] = useState(null);

  const kycDocs = Array.isArray(docs)
    ? docs.filter((d) => d.type === "kyc")
    : [];

  const mask = (val) => {
    if (!val) return "-";
    return val.toString().slice(0, 2) + "****" + val.toString().slice(-2);
  };

  const Card = ({ title, icon, children }) => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
        <div className="p-2 bg-teal-50 text-teal-800 rounded-xl">{icon}</div>
        <h3 className="font-extrabold text-gray-900 text-base">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p className="font-bold text-gray-900 mt-1">{value || "-"}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {kyc && (
        <Card title="Personal Details" icon={<FiUser />}>
          <Field label="Full Name" value={kyc.fullName} />
          <Field label="Email" value={kyc.email} />
          <Field label="DOB" value={kyc.dob} />
          <Field label="Address" value={kyc.address} />
        </Card>
      )}

      {kyc && (
        <Card title="Identity Details" icon={<FiFileText />}>
          <Field label="PAN Number" value={mask(kyc.panNumber)} />
          <Field label="Aadhaar Number" value={mask(kyc.aadhaarNumber)} />
        </Card>
      )}

      {kyc && (
        <Card title="Bank Details" icon={<FiCreditCard />}>
          <Field label="Beneficiary Name" value={kyc.bank?.beneficiaryName} />
          <Field label="Account Number" value={mask(kyc.bank?.accountNumber)} />
          <Field label="IFSC Code" value={kyc.bank?.ifsc} />
          <Field label="Branch" value={kyc.bank?.branch} />
        </Card>
      )}

      {kyc && (
        <Card title="Nominee Details" icon={<FiUser />}>
          <Field label="Name" value={kyc.nominee?.name} />
          <Field label="PAN" value={mask(kyc.nominee?.panNumber)} />
          <Field label="Aadhaar" value={mask(kyc.nominee?.aadhaarNumber)} />
          <Field label="DOB" value={kyc.nominee?.dob} />
        </Card>
      )}

      {kyc && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex justify-between items-center shadow-sm">
          <span className="text-sm font-bold text-gray-600">
            KYC Verification Status
          </span>

          <span
            className={`px-4 py-1.5 text-xs rounded-full font-bold uppercase tracking-wider ${
              kyc.status === "approved"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : kyc.status === "pending"
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {kyc.status || "draft"}
          </span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-extrabold text-base mb-4 text-gray-900">
          Document Preview
        </h2>

        {kycDocs.length === 0 ? (
          <p className="text-gray-400 text-sm font-medium">
            No verified documents uploaded yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {kycDocs.map((doc, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-4 flex justify-between items-center hover:border-teal-200 transition-all bg-gray-50/50"
              >
                <div>
                  <p className="font-extrabold text-sm text-gray-900">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-400">Identity verification</p>
                </div>

                <button
                  onClick={() => setPreview(doc.url)}
                  className="text-teal-800 hover:bg-teal-50 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <FiEye size={14} /> View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl relative shadow-2xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 font-bold p-2 text-sm"
            >
              ✕
            </button>

            <h3 className="font-extrabold text-gray-900 mb-4 text-base">Document Preview</h3>

            {preview.endsWith(".pdf") ? (
              <iframe src={preview} className="w-full h-[500px] rounded-2xl border" />
            ) : (
              <img src={preview} className="w-full h-auto max-h-[500px] object-contain rounded-2xl" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- EXIT REQUESTS ---------------- */
function ExitRequests({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 font-medium text-sm">
        No active exit or support requests found.
      </div>
    );
  }

  const getStatus = (status) => {
    if (status === "approved") {
      return {
        color: "bg-emerald-50 text-emerald-800 border-emerald-100",
        icon: <FiCheckCircle size={14} />,
        label: "Approved",
      };
    }
    if (status === "pending") {
      return {
        color: "bg-amber-50 text-amber-800 border-amber-100",
        icon: <FiClock size={14} />,
        label: "Pending",
      };
    }
    return {
      color: "bg-rose-50 text-rose-800 border-rose-100",
      icon: <FiXCircle size={14} />,
      label: "Rejected",
    };
  };

  return (
    <div className="space-y-3">
      {data.map((req, i) => {
        const status = getStatus(req.status);

        return (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-extrabold text-gray-900">
                {req.property || "Property Asset"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-medium">
                Submitted on:{" "}
                {req.date
                  ? new Date(req.date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Secondary Market Transfer
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}
            >
              {status.icon}
              {status.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [docs, setDocs] = useState([]);
  const [activeTab, setActiveTab] = useState("Active Investments");
  const [watchlist, setWatchlist] = useState([]);
  const [kycDetails, setKycDetails] = useState(null);
  const [exitRequests, setExitRequests] = useState([]);
  const [relatedProperties, setRelatedProperties] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("/api/portfolio");
        setPortfolioData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/portfolio/payments");
        setPayments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchDocs = async () => {
      try {
        const res = await axios.get("/api/portfolio/documents");
        setDocs(res.data.documents || []);
        setKycDetails(res.data.kycDetails || null);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("/api/user/watchlist");
    
        console.log("WATCHLIST RESPONSE:", res.data);
    
        const watchlistData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.watchlist)
          ? res.data.watchlist
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
    
        setWatchlist(watchlistData);
      } catch (err) {
        console.log(err);
        setWatchlist([]);
      }
    };

    const fetchExitRequests = async () => {
      try {
        const res = await axios.get("/api/portfolio/exits");
        setExitRequests(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPortfolio();
    fetchPayments();
    fetchDocs();
    fetchWatchlist();
    fetchExitRequests();
  }, []);

  useEffect(() => {
    if (!portfolioData) return;

    const fetchRelated = async () => {
      try {
        const firstPropertyId = portfolioData?.investments?.[0]?.propertyId;
        if (!firstPropertyId) return;

        const res = await axios.get(
          `/api/properties/related/${firstPropertyId}`
        );
        setRelatedProperties(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRelated();
  }, [portfolioData]);

  if (!portfolioData)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-semibold text-sm">
        Loading Portfolio...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-900 pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />
        <StatsBar data={portfolioData.summary} />
        <TabBar active={activeTab} setActive={setActiveTab} />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            {activeTab === "Active Investments" && (
              <ActiveInvestments data={portfolioData.investments} />
            )}

            {activeTab === "Watchlist" && <WatchList data={watchlist} />}

            {activeTab === "Payment History" && <Payment data={payments} />}
          </div>
        </div>

        {activeTab === "Active Investments" && (
          <Sidebar properties={relatedProperties} />
        )}

        {activeTab === "Documents" && (
          <KycDocuments docs={docs} kyc={kycDetails} />
        )}

        {activeTab === "Support / Exit Request" && (
          <ExitRequests data={exitRequests} />
        )}
      </main>
    </div>
  );
}