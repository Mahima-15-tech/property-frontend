import { useState } from "react";
import {
  FiBell,
  FiMapPin,
  FiDownload,
  FiChevronUp,
  FiChevronDown,
  FiTrendingUp,
  FiPieChart,
  FiDollarSign,
  FiBarChart2,
  FiFolder,
  FiFileText,
  FiCheckCircle,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { BsPersonCircle, BsBuilding } from "react-icons/bs";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FiEye, FiUser, FiCreditCard  } from "react-icons/fi";
import { FiClock, FiXCircle } from "react-icons/fi";




const tabs = [
  "Active Investments",
  "Watchlist",
  "Payment History",
  "Documents",
  "Support / Exit Request",
];

function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          My Portfolio
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Track your investments and returns across{" "}
          <span className="font-medium text-gray-700">premium</span> global
          assets.
        </p>
      </div>

      <button
        className="self-start sm:self-auto bg-teal-800 text-white font-semibold text-sm 
      
      px-5 py-3 rounded-xl hover:bg-teal-900 active:scale-95 transition-all whitespace-nowrap"
      >
        <NavLink to="/property">Explore More Properties</NavLink>
      </button>
    </div>
  );
}

function StatsBar({ data }) {
  if (!data) return null;

  const stats = [
    {
      icon: <FiGrid size={16} />,
      label: "TOTAL INVESTED",
      value: `₹${data.totalInvested.toLocaleString()}`,
    },
    {
      icon: <FiPieChart size={16} />,
      label: "SHARES OWNED",
      value: data.sharesOwned,
    },
    {
      icon: <FiBarChart2 size={16} />,
      label: "EXPECTED RETURNS",
      value: `${data.expectedReturn}%`,
    },
  ];
  return (
    <div className="bg-green-50 border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <div className="flex items-center gap-1.5 text-teal-700 mb-1">
            {s.icon}
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              {s.label}
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {s.value}
          </p>
          {s.sub && s.sub}
        </div>
      ))}
    </div>
  );
}

function TabBar({ active, setActive }) {
  return (
    <div className="w-full overflow-x-auto mb-6">
      <div className="flex gap-0 min-w-max border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium  whitespace-nowrap transition-all ${
              active === tab
                ? "text-gray-900 border-b-2 bg-green-200 rounded-t-xl border-teal-700"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReturnHistory({ investment }) {
  const rows = [
    {
      date: "Oct 12, 2024",
      type: "Monthly Rental Distribution",
      amount: "$1,240.00",
    },
    {
      date: "Sep 12, 2024",
      type: "Monthly Rental Distribution",
      amount: "$1,240.00",
    },
    {
      date: "Aug 12, 2024",
      type: "Quarterly Valuation Gain",
      amount: "$8,450.00",
    },
  ];
  return (
    <div className="mt-5 pt-5 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
        <div className="lg:col-span-2  w-full  ">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Ownership Highlight
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <div className="w-14 h-14 rounded-full border-4 border-teal-600 border-r-gray-100 flex items-center justify-center">
                <span className="text-xs font-bold text-teal-700">{investment.ownership}%</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{investment.shares} Shares</p>
              <p className="text-gray-400 text-xs">
                Full fractional ownership secured
              </p>
            </div>
          </div>
          {[
  ["Total Investment", investment.invested],
  ["Current Value", investment.currentValue],
  

].map(([label, value]) => (
  <div
    key={label}
    className="flex justify-between py-2 border-b border-gray-50 text-sm"
  >
    <span className="text-gray-500">{label}</span>

    <span
      className={`font-semibold ${
        label === "Profit / Gain"
          ? value > 0
            ? "text-green-600"
            : "text-red-600"
          : "text-gray-900"
      }`}
    >
      ₹{(value || 0).toLocaleString()}
    </span>
  </div>
))}
        </div>
        {/* <div className="lg:col-span-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Return History</p>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase tracking-wider">
                  <th className="text-left pb-2 font-semibold">Date</th>
                  <th className="text-left pb-2 font-semibold">Return Type</th>
                  <th className="text-right pb-2 font-semibold">Amount</th>
                  <th className="text-right pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="py-3 text-gray-500">{r.date}</td>
                    <td className="py-3 text-gray-700">{r.type}</td>
                    <td className="py-3 text-right text-gray-900 font-medium">{r.amount}</td>
                    <td className="py-3 text-right">
                      <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">PROCESSED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        <div className="lg:col-span-1">
        <Documents docs={investment.documents} />
        </div>

        <div className="lg:col-span-1">
        <ExitPortfolio investments={[investment]} />
        </div>
       
      </div>
    </div>
  );
}

function InvestmentCard({ property, expanded, onToggle }) {
  return (
    <div className="bg-white  rounded-2xl shadow-md mb-4 overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-sky-400 to-teal-600 flex items-center justify-center flex-shrink-0">
              <BsBuilding size={20} className="text-white opacity-80" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                {property.name}
              </h3>
              <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                <FiMapPin size={10} />
                {property.location}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 flex-1">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide">
                Shares Owned
              </p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                {property.shares}
              </p>
              <p className="text-[10px] text-gray-400">{property.ownership}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide">
                Invested
              </p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                {property.invested}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {property.roi && (
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                {property.roi}
              </span>
            )}
            {property.expandable ? (
              <button
                onClick={onToggle}
                className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all"
              >
                {expanded ? (
                  <FiChevronUp size={14} />
                ) : (
                  <FiChevronDown size={14} />
                )}
              </button>
            ) : (
              <button className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap">
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
      {expanded && property.expandable && (
        <div className="px-4 sm:px-5 pb-5 bg-white border-t border-gray-50">
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

function Documents({ docs }) {
  if (!docs || docs.length === 0) {
    return (
      <div className="text-xs text-gray-400">
        No documents available
      </div>
    );
  }

  return (
    <div className="mb-8 shadow-lg px-3 rounded-xl py-2">
      <div className="flex items-center gap-2 mb-4">
        <FiFolder size={14} className="text-gray-400" />
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Documents
        </p>
      </div>

      <div className="space-y-2">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FiFileText size={16} className="text-teal-700" />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {doc.name}
                </p>

                <p className="text-xs text-gray-400">
                  {doc.type || "Document"}
                </p>
              </div>
            </div>

            <a href={doc.url} target="_blank" rel="noreferrer">
              <FiDownload
                size={16}
                className="text-gray-400 hover:text-teal-700"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExitPortfolio({ investments }) {
  const [selectedId, setSelectedId] = useState("");

  const handleExit = async () => {
    if (!selectedId) {
      alert("Please select property");
      return;
    }

    try {
      await axios.post("/api/portfolio/exit", {
        propertyId: selectedId, 
      });

      alert("Exit request submitted");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-teal-800 rounded-2xl p-5 text-white">
      <p className="mb-3 text-sm font-bold">Exit Portfolio</p>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="w-full mb-3 p-2 text-black rounded"
      >
        <option value="">Select Property</option>

        {investments.map((inv) => (
  <option key={inv.propertyId} value={inv.propertyId}>
    {inv.propertyName || inv.name}
  </option>
))}
      </select>

      <button
        onClick={handleExit}
        className="w-full bg-amber-400 text-black font-bold py-2 rounded"
      >
        Submit Exit Request
      </button>
    </div>
  );
}

function Sidebar({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">
        No related properties
      </p>
    );
  }

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Curated Opportunities
        </h2>

        <NavLink
          to="/portfolio"
          className="text-sm text-teal-700 font-semibold"
        >
          View Portfolio →
        </NavLink>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            {/* IMAGE */}
            <div className="h-40 bg-gray-200 relative">
              {p.media?.images?.[0] ? (
                <img
                  src={p.media.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : null}

              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                {p.type || "Property"}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm">
                {p.name}
              </h3>

              <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                <FiMapPin size={12} />
                {p.location?.city}, {p.location?.state}
              </p>

              {/* Bottom row */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-[10px] text-gray-400">ROI</p>
                  <p className="text-green-600 font-bold text-sm">
                    {p.roi ? `${p.roi}%` : "--"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-gray-400">Share</p>
                  <p className="font-bold text-sm text-gray-900">
                    ₹{p.pricePerShare?.toLocaleString() || "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WatchCard({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-md mb-4 p-4 flex items-center gap-4">

      {/* IMAGE */}
      {property.image ? (
        <img
          src={property.image}
          alt={property.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
          <BsBuilding />
        </div>
      )}

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-sm">
          {property.name}
        </h3>

        <p className="text-gray-400 text-xs">
          {property.location}
        </p>
      </div>

      {/* ROI */}
      {property.roi && (
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
          +{property.roi ? `${property.roi}% ROI` : ""}
        </span>
      )}
    </div>
  );
}

function WatchList({ data }) {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No properties in watchlist
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

      {data.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-gray-100 cursor-pointer"
          onClick={() => navigate(`/properties/${p.id}`)}
        >

          {/* IMAGE */}
          <div className="relative h-48 overflow-hidden">
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <BsBuilding size={30} className="text-gray-400" />
              </div>
            )}

            {/* ROI */}
            {p.roi && (
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {p.roi}% ROI
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-base">
              {p.name}
            </h3>

            <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
              <FiMapPin size={12} />
              {p.location}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                Investment Opportunity
              </span>

              <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                View <FiArrowRight size={14} />
              </span>
            </div>
          </div>

        </div>
      ))}

    </div>
  );
}

function PaymentCard({ property }) {

  const statusColor =
    property.status === "success"
      ? "bg-emerald-100 text-emerald-700"
      : property.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex justify-between items-center border border-gray-100">

      {/* LEFT */}
      <div>
        <p className="text-sm font-bold text-gray-900">
          {property.name || "Property"}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {property.date
            ? new Date(property.date).toLocaleDateString()
            : "No date"}
        </p>
      </div>

      {/* AMOUNT */}
      <div className="text-right">
        <p className="text-base font-bold text-gray-900">
          ₹{property.amount ? property.amount.toLocaleString() : "0"}
        </p>
      </div>

      {/* STATUS */}
      <div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
          {property.status || "unknown"}
        </span>
      </div>
    </div>
  );
}


function Payment({ data }) {

  console.log("PAYMENT DATA:", data);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No payment history available
      </div>
    );
  }

  return (
    <div className="space-y-5">
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
    <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 hover:shadow-xl transition-all">
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-semibold text-gray-900 mt-1">{value || "-"}</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/*  PERSONAL INFO */}
      {kyc && (
        <Card title="Personal Details" icon={<FiUser className="text-emerald-600" />}>
          <Field label="Full Name" value={kyc.fullName} />
          <Field label="Email" value={kyc.email} />
          <Field label="DOB" value={kyc.dob} />
          <Field label="Address" value={kyc.address} />
        </Card>
      )}

      {/*  ID DETAILS */}
      {kyc && (
        <Card title="Identity Details" icon={<FiFileText className="text-emerald-600" />}>
          <Field label="PAN Number" value={mask(kyc.panNumber)} />
          <Field label="Aadhaar Number" value={mask(kyc.aadhaarNumber)} />
        </Card>
      )}

      {/*  BANK DETAILS */}
      {kyc && (
        <Card title="Bank Details" icon={<FiCreditCard className="text-emerald-600" />}>
          <Field label="Beneficiary Name" value={kyc.bank?.beneficiaryName} />
          <Field label="Account Number" value={mask(kyc.bank?.accountNumber)} />
          <Field label="IFSC Code" value={kyc.bank?.ifsc} />
          <Field label="Branch" value={kyc.bank?.branch} />
        </Card>
      )}

      {/*  NOMINEE */}
      {kyc && (
        <Card title="Nominee Details" icon={<FiUser className="text-emerald-600" />}>
          <Field label="Name" value={kyc.nominee?.name} />
          <Field label="PAN" value={mask(kyc.nominee?.panNumber)} />
          <Field label="Aadhaar" value={mask(kyc.nominee?.aadhaarNumber)} />
          <Field label="DOB" value={kyc.nominee?.dob} />
        </Card>
      )}

      {/*  STATUS */}
      {kyc && (
        <div className="bg-white rounded-3xl border p-5 flex justify-between items-center shadow">
          <span className="text-sm text-gray-500">KYC Status</span>

          <span
            className={`px-4 py-1 text-xs rounded-full font-bold ${
              kyc.status === "approved"
                ? "bg-green-100 text-green-700"
                : kyc.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {kyc.status || "draft"}
          </span>
        </div>
      )}

      {/*  DOCUMENTS */}
      <div className="bg-white rounded-3xl border p-6 shadow">
        <h2 className="font-bold mb-4 text-gray-900">
          Document Preview
        </h2>

        {kycDocs.length === 0 ? (
          <p className="text-gray-400">No documents uploaded</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {kycDocs.map((doc, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-400">Preview only</p>
                </div>

                <button
                  onClick={() => setPreview(doc.url)}
                  className="text-emerald-600 font-semibold flex items-center gap-1"
                >
                  <FiEye /> View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*  MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 w-[90%] max-w-2xl relative">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            {preview.endsWith(".pdf") ? (
              <iframe src={preview} className="w-full h-[500px]" />
            ) : (
              <img src={preview} className="w-full rounded-lg" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}





function ExitRequests({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No exit or support requests yet
      </div>
    );
  }

  const getStatus = (status) => {
    if (status === "approved") {
      return {
        color: "bg-emerald-100 text-emerald-700",
        icon: <FiCheckCircle size={14} />,
        label: "Approved",
      };
    }
    if (status === "pending") {
      return {
        color: "bg-yellow-100 text-yellow-700",
        icon: <FiClock size={14} />,
        label: "Pending",
      };
    }
    return {
      color: "bg-red-100 text-red-700",
      icon: <FiXCircle size={14} />,
      label: "Rejected",
    };
  };

  return (
    <div className="space-y-5">

      {data.map((req, i) => {
        const status = getStatus(req.status);

        return (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >

            {/* LEFT */}
            <div>
              <p className="text-sm font-bold text-gray-900">
                {req.property || "Property"}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {req.date
                  ? new Date(req.date).toLocaleDateString()
                  : "No date"}
              </p>
            </div>

            {/* CENTER */}
            <div className="text-xs text-gray-500">
              Exit request submitted
            </div>

            {/* RIGHT */}
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${status.color}`}
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


export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [docs, setDocs] = useState([]);
  const [activeTab, setActiveTab] = useState("Active Investments");
  const [watchlist, setWatchlist] = useState([]);
  const [kycDetails, setKycDetails] = useState(null);
  const [exitRequests, setExitRequests] = useState([]);
  const [relatedProperties, setRelatedProperties] = useState([]);

  //  FIRST EFFECT (ALL INITIAL DATA)
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
        console.log("PAYMENT API RESPONSE:", res.data);
        setPayments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchDocs = async () => {
      try {
        const res = await axios.get("/api/portfolio/documents");

        console.log("DOC API:", res.data);

        setDocs(res.data.documents || []);
        setKycDetails(res.data.kycDetails || null);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchWatchlist = async () => {
      try {
        
        const res = await axios.get("/api/user/watchlist");
        console.log("WATCHLIST DATA:", watchlist);
        setWatchlist(res.data || []);
      } catch (err) {
        console.log(err);
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
        const firstPropertyId =
          portfolioData?.investments?.[0]?.propertyId;
  
        console.log("FIRST PROPERTY ID:", firstPropertyId); 
  
        if (!firstPropertyId) return;
  
        console.log("CALLING API WITH ID:", firstPropertyId); 
  
        const res = await axios.get(
          `/api/properties/related/${firstPropertyId}`
        );
  
        console.log(" RELATED RESPONSE:", res.data); 
  
        setRelatedProperties(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchRelated();
  }, [portfolioData]);

  //  SAFE RETURN AFTER HOOKS
  if (!portfolioData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <PageHeader />
        <StatsBar data={portfolioData.summary} />
        <TabBar active={activeTab} setActive={setActiveTab} />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">

            {activeTab === "Active Investments" && (
              <ActiveInvestments data={portfolioData.investments} />
            )}

            {activeTab === "Watchlist" && (
              <WatchList data={watchlist} />
            )}

            {activeTab === "Payment History" && (
              <Payment data={payments} />
            )}

          </div>
        </div>

        {/*  ONLY ONE SIDEBAR */}
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