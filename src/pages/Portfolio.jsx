import { useState, useEffect } from "react";
import {
  FiMapPin,
  FiDownload,
  FiCopy,
  FiShare2,
  FiGift,
  FiUsers,
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
  FiUpload,
  FiXCircle,
  FiCheckCircle,
  FiLayers,
  FiLogOut,
  FiTrendingUp,
 FiDollarSign, 
FiTrendingDown, 
  FiShield, 
  FiExternalLink
} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";
import axios from "../utils/axios";

const tabs = [
  "Active Investments",
  "Pending Investments",
  "Watchlist",
  "Payment History",
  "Documents",
  "Support / Exit Request",
  "Refer & Earn",
];

/* ---------------- HEADER ---------------- */

function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 p-8 rounded-3xl text-white shadow-xl shadow-teal-900/10 relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/50 backdrop-blur-md border border-teal-500/30 text-teal-200 text-xs font-semibold mb-3">
          <FiLayers size={12} />
          Institutional Grade Asset Portal
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          My Portfolio
        </h1>

        <p className="text-teal-100/80 text-sm mt-1 max-w-xl font-light">
          Track your real estate investments, yields, and overall performance
          across premium global assets in real time.
        </p>
      </div>

      <NavLink
        to="/property"
        className="relative z-10 self-start sm:self-auto inline-flex items-center gap-2 bg-emerald-400 text-teal-950 font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-emerald-300 active:scale-95 transition-all shadow-lg shadow-emerald-400/20 whitespace-nowrap"
      >
        Explore Properties
        <FiArrowRight size={16} />
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
      value: `₹${Number(data.totalInvested || 0).toLocaleString()}`,
      badge: "Capital Deployed",
    },
    {
      icon: <FiPieChart size={18} />,
      label: "SHARES OWNED",
      value: data.sharesOwned || 0,
      badge: "Fractional Units",
    },
    {
      icon: <FiBarChart2 size={18} />,
      label: "EXPECTED RETURNS",
      value: `${data.expectedReturn || 0}%`,
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

/* =========================================================
   FULL OWNERSHIP
========================================================= */

const FullOwnershipCard = ({
  property,
  investment,
  onRequest,
  loading,
  ownershipRequest,
  setOwnershipRequest,
}) => {
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentFile, setPaymentFile] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);


  if (!property || !investment || !property.enableFullOwnership) {
    return null;
  }

  const totalShares = Number(property.totalShares || 0);
  const currentShares = Number(investment.shares || 0);

  const remainingShares = Math.max(
    totalShares - currentShares,
    0
  );

  const currentOwnership =
    totalShares > 0
      ? (currentShares / totalShares) * 100
      : 0;

  const isAlreadyFullOwner =
    currentShares >= totalShares ||
    investment.isFullOwner === true;

  if (isAlreadyFullOwner) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/30 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <FiCheckCircle size={23} />
          </div>

          <div>
            <p className="text-sm font-extrabold text-gray-900">
              Full Ownership Achieved
            </p>

            <p className="mt-1 text-xs text-gray-500">
              You currently own 100% of this property.
            </p>
          </div>

          <div className="ml-auto rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
            100%
          </div>
        </div>
      </div>
    );
  }

  if (remainingShares <= 0) return null;

  const requestPaymentStatus =
    ownershipRequest?.paymentStatus;

  const requestStatus =
    ownershipRequest?.status;

  const paymentSubmitted =
    requestStatus === "payment_submitted" ||
    requestPaymentStatus === "payment_submitted";

  const paymentVerified =
    requestStatus === "payment_verified" ||
    requestPaymentStatus === "verified";

  const paymentRejected =
    requestPaymentStatus === "rejected";

  const additionalShares = ownershipRequest
    ? Math.max(
        Number(
          ownershipRequest.additionalShares ??
            remainingShares
        ),
        0
      )
    : remainingShares;

  const pricePerShare = Number(
    ownershipRequest?.pricePerShare ||
      property.sharePrice ||
      0
  );

  const totalAmount =
    additionalShares * pricePerShare;

  const fullOwnershipAmount =
    remainingShares *
    Number(property.sharePrice || 0);

  const handlePaymentProof = async () => {
    if (!ownershipRequest?._id) {
      toast.error("Ownership request not found");
      return;
    }

    if (!paymentReference.trim()) {
      toast.error("Please enter payment reference / UTR");
      return;
    }

    if (!paymentFile) {
      toast.error("Please upload payment screenshot");
      return;
    }

    try {
      setPaymentLoading(true);

      const formData = new FormData();

      formData.append(
        "paymentReference",
        paymentReference.trim()
      );

      formData.append(
        "paymentMethod",
        "Bank Transfer"
      );

      formData.append("file", paymentFile);

      const res = await axios.post(
        `/api/ownership/${ownershipRequest._id}/payment-proof`,
        formData
      );

      setOwnershipRequest(
        res.data?.request || ownershipRequest
      );

      toast.success(
        "Payment proof submitted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit payment proof"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          PREMIUM HEADER
      ===================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 px-5 py-5 sm:px-6">

        {/* Decorative circles */}
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
        <div className="absolute -bottom-20 left-1/3 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl" />

        <div className="relative flex items-start justify-between gap-4">

          <div className="flex items-start gap-3.5">

            {/* Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-emerald-300 backdrop-blur-md">
              <FiShield size={20} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight text-white">
                  Full Ownership
                </h3>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  Premium Option
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-300">
                Complete your ownership of this property
              </p>
            </div>
          </div>

          {/* Current ownership badge */}
          <div className="shrink-0 text-right">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
              Current
            </p>

            <p className="mt-0.5 text-xl font-black text-emerald-300">
              {currentOwnership.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="p-5 sm:p-6">

        {/* Ownership Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-800">
                Ownership Progress
              </p>

              <p className="mt-0.5 text-[11px] text-gray-400">
                {currentShares.toLocaleString("en-IN")} of{" "}
                {totalShares.toLocaleString("en-IN")} shares owned
              </p>
            </div>

            <span className="text-xs font-bold text-gray-700">
              100%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-700 to-emerald-400 transition-all duration-700"
              style={{
                width: `${Math.min(
                  currentOwnership,
                  100
                )}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between">
            <span className="text-[10px] font-medium text-gray-400">
              Current {currentOwnership.toFixed(1)}%
            </span>

            <span className="text-[10px] font-semibold text-emerald-600">
              Goal 100%
            </span>
          </div>
        </div>

        {/* =====================================================
            SHARE SUMMARY
        ===================================================== */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <FiPieChart size={14} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Shares Owned
              </p>
            </div>

            <p className="mt-2 text-lg font-extrabold tracking-tight text-gray-900">
              {currentShares.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <FiLayers size={14} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Shares Remaining
              </p>
            </div>

            <p className="mt-2 text-lg font-extrabold tracking-tight text-gray-900">
              {remainingShares.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* =====================================================
            PURCHASE SUMMARY
        ===================================================== */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">

          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-gray-900">
                Complete Your Ownership
              </p>

              <p className="mt-0.5 text-[11px] text-gray-400">
                Acquire the remaining shares
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <FiTrendingUp size={15} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Additional Shares
              </p>

              <p className="mt-1 text-sm font-extrabold text-gray-900">
                {remainingShares.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Price / Share
              </p>

              <p className="mt-1 text-sm font-extrabold text-gray-900">
                ₹
                {Number(
                  property.sharePrice || 0
                ).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3.5">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Amount Required
              </p>

              <p className="mt-0.5 text-[11px] text-slate-300">
                For 100% ownership
              </p>
            </div>

            <p className="text-lg font-black tracking-tight text-white">
              ₹
              {fullOwnershipAmount.toLocaleString(
                "en-IN"
              )}
            </p>
          </div>
        </div>

        {/* =====================================================
            REQUEST BUTTON
        ===================================================== */}
        {!ownershipRequest && (
          <div className="mt-4">

            <button
              onClick={onRequest}
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-teal-900 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Request...
                </>
              ) : (
                <>
                  Request Full Ownership
                  <FiArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
              <FiShield size={11} />
              Secure ownership request process
            </div>
          </div>
        )}

        {/* =====================================================
            PAYMENT SECTION
        ===================================================== */}
        {ownershipRequest &&
          ownershipRequest.status !== "pending" &&
          !paymentSubmitted &&
          !paymentVerified && (

            <div className="mt-5 border-t border-slate-100 pt-5">

              {/* Payment Header */}
              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <FiCreditCard size={17} />
                </div>

                <div>
                  <p className="text-sm font-extrabold text-gray-900">
                    Complete Payment
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    Submit your payment details for verification
                  </p>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50/60 p-4">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700/70">
                      Payable Amount
                    </p>

                    <p className="mt-1 text-xl font-black tracking-tight text-teal-950">
                      ₹
                      {totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-gray-400">
                      Shares
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-800">
                      {additionalShares.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* UTR */}
              <div className="mt-4">

                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Payment Reference / UTR
                </label>

                <div className="relative">
                  <FiCreditCard
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) =>
                      setPaymentReference(
                        e.target.value
                      )
                    }
                    placeholder="Enter your UTR number"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm font-medium text-gray-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-4">

                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Payment Proof
                </label>

                <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-slate-50/70 p-3.5 transition hover:border-teal-400 hover:bg-teal-50/30">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm">
                    <FiUpload size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-gray-800">
                      {paymentFile
                        ? paymentFile.name
                        : "Upload payment screenshot"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      PNG, JPG or PDF
                    </p>
                  </div>

                  <span className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-teal-700 shadow-sm">
                    Browse
                  </span>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      setPaymentFile(
                        e.target.files?.[0] ||
                          null
                      )
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                onClick={handlePaymentProof}
                disabled={paymentLoading}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paymentLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting Payment...
                  </>
                ) : (
                  <>
                    Submit Payment Proof
                    <FiArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="mt-2.5 text-center text-[10px] text-gray-400">
                Your payment proof will be reviewed by the admin team.
              </p>
            </div>
          )}

        {/* =====================================================
            PAYMENT SUBMITTED
        ===================================================== */}
        {paymentSubmitted && !paymentVerified && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <FiClock size={18} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-gray-900">
                    Payment Under Review
                  </p>

                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-700">
                    Pending
                  </span>
                </div>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Your payment proof has been submitted successfully.
                  Our team will verify the transaction and update your
                  ownership status.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            VERIFIED
        ===================================================== */}
        {paymentVerified && (
          <div className="mt-5 relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />

            <div className="relative flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <FiCheckCircle size={21} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-gray-900">
                    Ownership Payment Verified
                  </p>

                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                    Verified
                  </span>
                </div>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Your payment has been successfully verified.
                  Your full ownership request is now being processed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            REJECTED
        ===================================================== */}
        {paymentRejected && (
          <div className="mt-5 rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <FiXCircle size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-extrabold text-gray-900">
                  Payment Proof Rejected
                </p>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  We couldn't verify your payment proof.
                  Please upload a valid payment receipt and submit again.
                </p>
              </div>

              <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-rose-700">
                Rejected
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/* =========================================================
   RETURN HISTORY
========================================================= */

const ReturnHistory = ({
  investment,
  ownershipRequest,
  onRequest,
  loading,
  setOwnershipRequest,
  onExitRequest,
}) => {
  if (!investment) return null;

  const profit = Number(investment.profit || 0);
  const isProfitable = profit >= 0;
  const invested = Number(investment.invested || 0);
  const currentValue = Number(investment.currentValue || 0);
  const [exitShares, setExitShares] = useState("");
const [exitLoading, setExitLoading] = useState(false);
const [eligibleExitDate, setEligibleExitDate] = useState(null);
const [exitError, setExitError] = useState("");

  // Profit percentage calculation safely
  const profitPercentage = invested > 0 
    ? ((profit / invested) * 100).toFixed(2) 
    : 0;

  return (
    <div className="space-y-4 pt-2">

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Total Value */}
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <FiShield size={14} className="text-emerald-500" />
            <p className="text-[11px] font-semibold uppercase tracking-wider">Total Value</p>
          </div>
          <p className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight">
            ₹{Number(investment.totalValue || 0).toLocaleString("en-IN")}
          </p>
        </div>

        {/* Share Price */}
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <FiDollarSign size={14} className="text-emerald-500" />
            <p className="text-[11px] font-semibold uppercase tracking-wider">Share Price</p>
          </div>
          <p className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight">
            ₹{Number(investment.sharePrice || 0).toLocaleString("en-IN")}
          </p>
        </div>

        {/* Lock-in Period */}
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <FiClock size={14} className="text-emerald-500" />
            <p className="text-[11px] font-semibold uppercase tracking-wider">Lock-in</p>
          </div>
          <p className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight">
            {investment.lockInYears || 0} Years
          </p>
        </div>

        {/* Current Value */}
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <FiTrendingUp size={14} className="text-emerald-500" />
            <p className="text-[11px] font-semibold uppercase tracking-wider">Current Value</p>
          </div>
          <p className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight">
            ₹{currentValue.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* Performance Overview Banner */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-bold text-gray-900 text-xs sm:text-sm uppercase tracking-wider">
              Investment Returns
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">Overall valuation change</p>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isProfitable
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-rose-50 text-rose-700 border border-rose-100"
            }`}
          >
            {isProfitable ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
            <span>
              {isProfitable ? "+" : ""}
              ₹{Math.abs(profit).toLocaleString("en-IN")} ({profitPercentage}%)
            </span>
          </div>
        </div>

        {/* Visual Progress/Breakdown Line */}
        <div className="space-y-2 pt-1 border-t border-gray-50">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-gray-500">Invested Amount:</span>
            <span className="text-gray-900 font-semibold">
              ₹{invested.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-xs font-medium">
            <span className="text-gray-500">Current Valuation:</span>
            <span className="text-gray-900 font-semibold">
              ₹{currentValue.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      {investment.documents?.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
            Investment Documents
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {investment.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.url || doc}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-xs font-medium text-gray-700 hover:text-emerald-700 group"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <FiFileText size={14} />
                  </div>
                  <span className="truncate">{doc.name || `Document ${index + 1}`}</span>
                </div>
                <FiExternalLink size={13} className="text-gray-400 group-hover:text-emerald-600 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Full Ownership Options */}
      {investment.enableFullOwnership && (
        <div className="pt-1">
          <FullOwnershipCard
            property={investment}
            investment={investment}
            ownershipRequest={ownershipRequest}
            onRequest={onRequest}
            loading={loading}
            setOwnershipRequest={setOwnershipRequest}
          />
        </div>
      )}

{/* Exit Request */}
{/* =========================================================
    EXIT REQUEST
========================================================= */}

<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">

  {/* Header */}
  <div className="flex items-start justify-between gap-4 mb-5">

    <div>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
          <FiLogOut size={17} />
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-sm">
            Exit Investment
          </h4>

          <p className="text-xs text-gray-500 mt-0.5">
            Submit a request to exit your investment shares.
          </p>
        </div>
      </div>
    </div>

  </div>


  {/* Eligible Exit Date Alert */}
  {eligibleExitDate && (
    <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4">

      <div className="flex gap-3">

        <div className="text-amber-600 mt-0.5">
          <FiClock size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-amber-800">
            Investment is currently under lock-in period
          </p>

          <p className="text-xs text-amber-700 mt-1">
            You will be eligible to request an exit from:
          </p>

          <p className="text-sm font-bold text-amber-900 mt-1">
            {new Date(eligibleExitDate).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </p>

        </div>

      </div>

    </div>
  )}


  {/* Error Message */}
  {exitError && !eligibleExitDate && (
    <div className="mb-4 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
      <p className="text-xs text-rose-600">
        {exitError}
      </p>
    </div>
  )}


  {/* Form */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">

    <div>

      <label className="text-xs font-semibold text-gray-700 mb-2 block">
        Number of Shares to Exit
      </label>

      <input
        type="number"
        min="1"
        max={investment.shares || 0}
        value={exitShares}
        onChange={(e) => {
          setExitShares(e.target.value);
          setExitError("");
        }}
        placeholder={`Maximum ${investment.shares || 0} shares`}
        disabled={exitLoading || !!eligibleExitDate}
        className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-emerald-500 disabled:bg-gray-100 disabled:text-gray-400"
      />

      <p className="text-[11px] text-gray-400 mt-1.5">
        You currently own{" "}
        <span className="font-semibold text-gray-600">
          {investment.shares || 0}
        </span>{" "}
        shares.
      </p>

    </div>


    <button
      type="button"
      disabled={exitLoading || !!eligibleExitDate}
      onClick={async () => {

        if (!exitShares || Number(exitShares) <= 0) {
          toast.error("Please enter the number of shares");
          return;
        }

        if (
          Number(exitShares) >
          Number(investment.shares || 0)
        ) {
          toast.error(
            "You cannot exit more shares than you own"
          );
          return;
        }

        try {

          setExitLoading(true);
          setExitError("");
          setEligibleExitDate(null);

          await onExitRequest(Number(exitShares));

          setExitShares("");

          toast.success(
            "Exit request submitted successfully"
          );

        } catch (error) {

          console.error(
            "Exit request failed:",
            error
          );

          const data = error?.response?.data;

          // LOCK-IN PERIOD
          if (data?.eligibleExitDate) {

            setEligibleExitDate(
              data.eligibleExitDate
            );

            toast.error(
              "Investment is still under lock-in period"
            );

          } else {

            setExitError(
              data?.message ||
              "Failed to submit exit request"
            );

            toast.error(
              data?.message ||
              "Failed to submit exit request"
            );
          }

        } finally {

          setExitLoading(false);

        }

      }}
      className={`w-full font-semibold py-3 px-4 rounded-lg text-sm transition-all ${
        eligibleExitDate
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-rose-600 hover:bg-rose-700 text-white"
      } disabled:opacity-70`}
    >

      {exitLoading
        ? "Submitting..."
        : eligibleExitDate
        ? "Exit Locked"
        : "Request Exit"}

    </button>

  </div>


  {/* Footer */}
  <div className="mt-4 pt-4 border-t border-gray-100">

    <p className="text-[11px] text-gray-400 leading-relaxed">
      Your exit request will be reviewed by the administrator.
      The final exit process will begin after approval.
    </p>

  </div>

</div>
    </div>
  );
};

/* =========================================================
   INVESTMENT CARD
========================================================= */

const InvestmentCard = ({
  property,
  expanded,
  onToggle,
  ownershipRequest,
  onRequest,
  loading,
  setOwnershipRequest,
  onExitRequest,
}) => {
  return (
    <div className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden ${
      expanded 
        ? "border-emerald-300 shadow-xl ring-1 ring-emerald-500/10" 
        : "border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
    }`}>
      {/* Compact Investment Row */}
      <div className="p-3.5 sm:p-5 flex items-center gap-3.5 sm:gap-5">

        {/* Image with Floating Badge */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 group">
          {property?.image ? (
            <img
              src={property.image}
              alt={property.propertyName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 text-xs gap-1">
              <FiPieChart size={20} className="opacity-40" />
              <span>No Image</span>
            </div>
          )}
          
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight truncate hover:text-emerald-600 transition-colors">
                {property?.propertyName || "Untitled Property"}
              </h3>

              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 truncate font-medium">
                <FiMapPin className="text-emerald-500 shrink-0" size={13} />
                <span className="truncate">
                  {property?.location}
                  {property?.state ? `, ${property.state}` : ""}
                </span>
              </p>
            </div>

            {/* ROI Pill */}
            <div className="flex-shrink-0 flex items-center gap-1 bg-emerald-50/80 border border-emerald-100 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
              <FiTrendingUp size={12} />
              <span>{property?.roi || 0}% ROI</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-gray-100/80 text-xs">
            <div>
              <p className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Shares</p>
              <p className="text-gray-900 font-bold mt-0.5">{property?.shares || 0}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Ownership</p>
              <p className="text-emerald-600 font-bold mt-0.5">{property?.ownership || 0}%</p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Invested</p>
              <p className="text-gray-900 font-bold mt-0.5 truncate">
                ₹{Number(property?.invested || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Expand Action */}
        <button
          onClick={onToggle}
          aria-label="Toggle details"
          className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            expanded
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 border border-gray-100"
          }`}
        >
          <FiChevronDown
            size={18}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expanded Content with Divider */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-6 animate-fadeIn">
         <ReturnHistory
  investment={property}
  ownershipRequest={ownershipRequest}
  onRequest={onRequest}
  loading={loading}
  setOwnershipRequest={setOwnershipRequest}
  onExitRequest={onExitRequest}
/>
        </div>
      )}
    </div>
  );
};




/* =========================================================
   ACTIVE INVESTMENTS
========================================================= */

const ActiveInvestments = ({ data }) => {
  const [expandedId, setExpandedId] = useState(null);

  const [ownershipRequests, setOwnershipRequests] =
    useState({});

  const [ownershipLoading, setOwnershipLoading] =
    useState({});

    useEffect(() => {
      const fetchOwnershipRequests = async () => {
        try {
          const res = await axios.get(
            "/api/ownership/my-requests"
          );
    
          const requests = Array.isArray(res.data)
            ? res.data
            : res.data?.requests || [];
    
          const mapped = {};
    
          requests.forEach((request) => {
            const propertyId =
              request.propertyId?._id ||
              request.propertyId;
    
            const investmentId =
              request.investmentId?._id ||
              request.investmentId;
    
            if (propertyId) {
              mapped[`property_${propertyId}`] = request;
            }
    
            if (investmentId) {
              mapped[`investment_${investmentId}`] = request;
            }
          });
    
          setOwnershipRequests(mapped);
    
        } catch (error) {
          console.error(
            "Failed to fetch ownership requests",
            error
          );
        }
      };
    
      fetchOwnershipRequests();
    }, []);

  const handleOwnershipRequest = async (investment) => {
    try {
      setOwnershipLoading((prev) => ({
        ...prev,
        [investment.investmentId]: true,
      }));

      const res = await axios.post(
        "/api/ownership/request",
        {
          investmentId: investment.investmentId,
        }
      );

      const request = res.data?.request;

      if (request) {
        setOwnershipRequests((prev) => ({
          ...prev,
          [`property_${investment.propertyId}`]: request,
          [`investment_${investment.investmentId}`]: request,
        }));
      }

      toast.success(
        "Full ownership request created successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create ownership request"
      );
    } finally {
      setOwnershipLoading((prev) => ({
        ...prev,
        [investment.investmentId]: false,
      }));
    }
  };

  const handleExitRequest = async (investment, shares) => {
    try {
      const res = await axios.post("/api/portfolio/exit", {
        investmentId: investment.investmentId,
        shares: Number(shares),
      });
  
      toast.success(
        res.data?.message || "Exit request submitted successfully"
      );
  
      return res.data;
  
    } catch (error) {
      console.error("EXIT REQUEST ERROR:", error);
  
      toast.error(
        error.response?.data?.message ||
        "Failed to submit exit request"
      );
  
      throw error;
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <p className="text-gray-500">
          You don't have any active investments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {data.map((investment) => {
        const expanded =
          expandedId === investment.investmentId;

        const ownershipRequest =
          ownershipRequests[
            `investment_${investment.investmentId}`
          ] ||
          ownershipRequests[
            `property_${investment.propertyId}`
          ] ||
          null;

        return (
          <InvestmentCard
          key={investment.investmentId}
          property={investment}
          expanded={expanded}
          onToggle={() =>
            setExpandedId(
              expanded ? null : investment.investmentId
            )
          }
          ownershipRequest={ownershipRequest}
          onRequest={() =>
            handleOwnershipRequest(investment)
          }
          loading={
            ownershipLoading[investment.investmentId]
          }
          onExitRequest={(shares) =>
            handleExitRequest(investment, shares)
          }
          setOwnershipRequest={(request) => {
            setOwnershipRequests((prev) => ({
              ...prev,
              [`investment_${investment.investmentId}`]: request,
              [`property_${investment.propertyId}`]: request,
            }));
          }}
        />
        );
      })}
    </div>
  );
};

function PendingInvestments({ data }) {

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">

        <p className="text-gray-400 font-medium">
          No pending investments found.
        </p>

      </div>
    );
  }

  const getPaymentStatus = (
    paymentStatus,
    status
  ) => {

    // PAYMENT SUBMITTED
    if (
      paymentStatus ===
      "payment_submitted"
    ) {
      return {
        label:
          "Payment Under Review",

        color:
          "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    // PAYMENT VERIFIED
    if (
      paymentStatus ===
      "verified" &&
      status !== "approved"
    ) {
      return {
        label:
          "Payment Verified - Awaiting Investment Approval",

        color:
          "bg-blue-50 text-blue-700 border-blue-200",
      };
    }

    // REJECTED
    if (
      paymentStatus ===
        "rejected" ||
      status === "rejected"
    ) {
      return {
        label:
          "Rejected",

        color:
          "bg-red-50 text-red-700 border-red-200",
      };
    }

    // DEFAULT
    return {
      label:
        "Investment Pending",

      color:
        "bg-gray-50 text-gray-600 border-gray-200",
    };
  };

  return (

    <div className="space-y-4">

      {data.map((investment) => {

        const status =
          getPaymentStatus(
            investment.paymentStatus,
            investment.status
          );

        return (

          <div
            key={
              investment.investmentId
            }
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >

            <div className="p-5">

              <div className="flex flex-col md:flex-row gap-5">

                {/* IMAGE */}

                <div className="w-full md:w-40 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">

                  {investment.image ? (

                    <img
                      src={
                        investment.image
                      }
                      alt={
                        investment.propertyName
                      }
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>

                  )}

                </div>


                {/* DETAILS */}

                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">

                    <div>

                      <h3 className="text-lg font-bold text-gray-900">

                        {
                          investment.propertyName
                        }

                      </h3>

                      <p className="text-sm text-gray-400 mt-1">

                        {
                          investment.location
                        }

                        {investment.state &&
                          `, ${investment.state}`}

                      </p>

                    </div>


                    {/* STATUS */}

                    <span
                      className={`inline-flex w-fit items-center px-3 py-1.5 rounded-full text-xs font-bold border ${status.color}`}
                    >

                      {status.label}

                    </span>

                  </div>


                  {/* FINANCIAL DETAILS */}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">

                    <div>

                      <p className="text-xs text-gray-400">
                        Shares
                      </p>

                      <p className="font-bold text-gray-900 mt-1">

                        {
                          investment.shares
                        }

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-400">
                        Amount
                      </p>

                      <p className="font-bold text-gray-900 mt-1">

                        ₹
                        {Number(
                          investment.amount || 0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-400">
                        Submitted
                      </p>

                      <p className="font-bold text-gray-900 mt-1">

                        {investment.createdAt
                          ? new Date(
                              investment.createdAt
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}

                      </p>

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl p-4">

                    {investment.paymentStatus ===
                    "payment_submitted" ? (

                      <p className="text-sm text-amber-800">

                        Your payment has been submitted successfully and is currently under admin review.

                      </p>

                    ) : investment.paymentStatus ===
                        "verified" ? (

                      <p className="text-sm text-blue-800">

                        Your payment has been verified successfully. Your investment is awaiting final approval.

                      </p>

                    ) : (

                      <p className="text-sm text-gray-600">

                        Your investment request is currently being processed.

                      </p>

                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );
}

/* =========================================================
   DOCUMENTS
========================================================= */

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

/* =========================================================
   EXIT PORTFOLIO
========================================================= */

function ExitPortfolio({ investments }) {
  const [selectedId, setSelectedId] =
    useState("");

  const [exitError, setExitError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleExit = async () => {
    setExitError("");

    if (!selectedId) {
      setExitError(
        "Please select a property."
      );
      return;
    }

    const data =
      JSON.parse(selectedId);

    try {
      setLoading(true);

      await axios.post(
        "/api/portfolio/exit",
        {
          investmentId:
            data.investmentId,
          shares: data.shares,
        }
      );

      alert(
        "Exit request submitted successfully"
      );

      window.location.reload();
    } catch (err) {
      console.log(
        "EXIT ERROR:",
        err
      );

      const response =
        err.response?.data;

      if (
        response?.message ===
        "Investment is still under lock-in period"
      ) {
        const eligibleDate =
          response.eligibleExitDate
            ? new Date(
                response.eligibleExitDate
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )
            : null;

        setExitError(
          eligibleDate
            ? `This investment is currently under the lock-in period. You can request an exit after ${eligibleDate}.`
            : "This investment is currently under the lock-in period."
        );

        return;
      }

      setExitError(
        response?.message ||
          "Unable to submit exit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-2xl p-5 text-white shadow-lg shadow-teal-900/10">
      <p className="mb-1 text-sm font-extrabold">
        Liquidity / Exit Request
      </p>

      <p className="text-xs text-teal-200/80 mb-4 font-light">
        Submit fractional shares back to pool or transfer request.
      </p>

      <select
        value={selectedId}
        onChange={(e) => {
          setSelectedId(e.target.value);
          setExitError("");
        }}
        className="w-full mb-3 p-2.5 text-xs text-gray-900 bg-white font-medium rounded-xl border-none focus:ring-2 focus:ring-emerald-400 focus:outline-none"
      >
        <option value="">
          Select Property To Exit
        </option>

        {investments.map(
          (inv) => (
            <option
              key={inv.propertyId}
              value={JSON.stringify({
                investmentId:
                  inv.investmentId,
                shares: inv.shares,
              })}
            >
              {inv.propertyName ||
                inv.name}
            </option>
          )
        )}
      </select>

      {exitError && (
        <div className="mb-3 rounded-xl border border-red-300/30 bg-red-500/10 p-3">
          <div className="flex items-start gap-2">
            <FiClock
              size={16}
              className="text-red-300 mt-0.5 flex-shrink-0"
            />

            <div>
              <p className="text-xs font-bold text-red-200">
                Exit Not Available
              </p>

              <p className="text-xs text-red-100/90 mt-1 leading-relaxed">
                {exitError}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleExit}
        disabled={loading}
        className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed text-teal-950 font-bold py-2.5 text-xs rounded-xl shadow-md transition-all active:scale-95"
      >
        {loading
          ? "Submitting..."
          : "Submit Request"}
      </button>
    </div>
  );
}

/* =========================================================
   REFER & EARN
========================================================= */

function ReferralSection() {
  const [referralData, setReferralData] =
    useState(null);

  const [rewards, setRewards] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [copied, setCopied] =
    useState("");

  useEffect(() => {
    const fetchReferralData =
      async () => {
        try {
          const [
            referralRes,
            rewardsRes,
          ] = await Promise.all([
            axios.get(
              "/api/user/referral"
            ),
            axios.get(
              "/api/user/referral/rewards"
            ),
          ]);

          setReferralData(
            referralRes.data
          );

          setRewards(
            rewardsRes.data
              ?.rewards || []
          );
        } catch (error) {
          console.log(
            "REFERRAL ERROR:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchReferralData();
  }, []);

  const copyText = async (
    text,
    type
  ) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      console.log(
        "COPY ERROR:",
        error
      );
    }
  };

  const shareReferral =
    async () => {
      if (
        !referralData?.referralLink
      )
        return;

      const shareData = {
        title:
          "Join our Investment Platform",
        text:
          "Join me and explore investment opportunities.",
        url:
          referralData.referralLink,
      };

      try {
        if (navigator.share) {
          await navigator.share(
            shareData
          );
        } else {
          await copyText(
            referralData.referralLink,
            "link"
          );
        }
      } catch (error) {
        console.log(
          "SHARE ERROR:",
          error
        );
      }
    };

  const getRewardStatus = (
    status
  ) => {
    if (status === "approved") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (status === "rejected") {
      return "bg-rose-50 text-rose-700 border-rose-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const getGiftStatus = (
    status
  ) => {
    if (status === "issued") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    return "bg-gray-50 text-gray-600 border-gray-200";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gray-100 rounded w-40" />
          <div className="h-4 bg-gray-100 rounded w-64" />
          <div className="h-12 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (
    !referralData?.referralCode
  ) {
    return null;
  }

  return (
    <div className="mb-8">

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 p-6 sm:p-8 text-white shadow-xl shadow-teal-900/10">

        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-100 mb-3">
                <FiGift size={13} />
                Refer & Earn
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold">
                Invite Friends & Earn Rewards
              </h2>

              <p className="text-teal-100/70 text-xs sm:text-sm mt-1 max-w-xl">
                Share your referral link. Your reward becomes eligible after
                your referred investor successfully completes an investment.
              </p>
            </div>

            <div className="flex items-center gap-2 text-emerald-200">
              <FiUsers size={20} />

              <span className="text-xs font-semibold">
                Investor Referral Program
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">

              <p className="text-[10px] uppercase tracking-widest text-teal-200 font-bold mb-2">
                Your Referral Code
              </p>

              <div className="flex items-center justify-between gap-3">

                <p className="text-xl font-black tracking-widest">
                  {referralData.referralCode}
                </p>

                <button
                  onClick={() =>
                    copyText(
                      referralData.referralCode,
                      "code"
                    )
                  }
                  className="inline-flex items-center gap-2 bg-white text-teal-900 px-3 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-all"
                >
                  <FiCopy size={14} />

                  {copied === "code"
                    ? "Copied!"
                    : "Copy"}
                </button>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">

              <p className="text-[10px] uppercase tracking-widest text-teal-200 font-bold mb-2">
                Your Referral Link
              </p>

              <div className="flex items-center gap-2">

                <div className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-white/80 truncate">
                    {referralData.referralLink}
                  </p>
                </div>

                <button
                  onClick={() =>
                    copyText(
                      referralData.referralLink,
                      "link"
                    )
                  }
                  className="p-2.5 bg-white text-teal-900 rounded-xl hover:bg-emerald-50 transition-all"
                  title="Copy referral link"
                >
                  <FiCopy size={15} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={shareReferral}
            className="mt-4 inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-teal-950 font-bold text-sm px-5 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-400/10"
          >
            <FiShare2 size={16} />
            Share Referral Link
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm mt-5 overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

          <div>
            <h3 className="font-extrabold text-gray-900 text-base">
              Referral Rewards
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Track rewards earned from your successful referrals.
            </p>
          </div>

          <div className="p-2.5 bg-teal-50 text-teal-800 rounded-xl">
            <FiGift size={17} />
          </div>
        </div>

        {rewards.length === 0 ? (
          <div className="p-8 text-center">

            <div className="w-12 h-12 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-3">
              <FiUsers size={20} />
            </div>

            <p className="text-sm font-bold text-gray-700">
              No referral rewards yet
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Share your referral link to start earning rewards.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">

            {rewards.map(
              (reward) => (
                <div
                  key={reward._id}
                  className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >

                  <div className="flex items-center gap-3 min-w-[220px]">

                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                      <FiUser size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-extrabold text-gray-900">
                        {reward.referredInvestor?.name ||
                          "Investor"}
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        {reward.referredInvestor?.email ||
                          "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <FiGift size={17} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Reward
                      </p>

                      <p className="text-sm font-bold text-gray-900 mt-0.5">
                        {reward.giftName ||
                          "Gift Reward"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">
                      Reward Status
                    </p>

                    <span
                      className={`inline-flex px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getRewardStatus(
                        reward.status
                      )}`}
                    >
                      {reward.status ||
                        "pending"}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">
                      Gift Status
                    </p>

                    <span
                      className={`inline-flex px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getGiftStatus(
                        reward.giftStatus
                      )}`}
                    >
                      {reward.giftStatus ===
                      "issued"
                        ? "Gift Issued"
                        : "Not Issued"}
                    </span>
                  </div>

                  <div className="text-left lg:text-right">

                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      Date
                    </p>

                    <p className="text-xs font-semibold text-gray-700 mt-1">
                      {reward.createdAt
                        ? new Date(
                            reward.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR / RELATED PROPERTIES
========================================================= */

function Sidebar({ properties }) {
  if (
    !properties ||
    properties.length === 0
  ) {
    return (
      <p className="text-gray-400 text-sm mt-4">
        No related properties
      </p>
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
          Explore All
          <FiArrowRight size={12} />
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {properties.map(
          (p, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >

              <div>

                <div className="h-44 bg-gray-100 relative overflow-hidden">

                  {p.media?.images?.[0] ? (
                    <img
                      src={
                        p.media.images[0]
                      }
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}

                  <span className="absolute top-3 left-3 bg-teal-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    {p.type ||
                      "Property"}
                  </span>
                </div>

                <div className="p-5">

                  <h3 className="font-extrabold text-gray-900 text-base group-hover:text-teal-800 transition-colors">
                    {p.name}
                  </h3>

                  <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 font-medium">
                    <FiMapPin
                      size={12}
                      className="text-teal-700"
                    />

                    {p.location?.city},{" "}
                    {p.location?.state}
                  </p>

                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">

                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Target Yield
                      </p>

                      <p className="text-emerald-700 font-extrabold text-sm font-mono mt-0.5">
                        {p.roi
                          ? `${p.roi}%`
                          : "--"}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Price / Share
                      </p>

                      <p className="font-extrabold text-sm text-gray-900 font-mono mt-0.5">
                        ₹
                        {p.pricePerShare?.toLocaleString() ||
                          "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   WATCHLIST
========================================================= */

function WatchList({ data }) {
  const navigate = useNavigate();

  const watchlistData =
    Array.isArray(data)
      ? data
      : Array.isArray(
          data?.watchlist
        )
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

      {watchlistData.map(
        (p) => {
          const propertyId =
            p.id ||
            p._id ||
            p.propertyId;

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
            p.property?.media
              ?.images?.[0];

          const propertyLocation =
            typeof p.location ===
            "string"
              ? p.location
              : p.location?.city
              ? `${p.location.city}${
                  p.location.state
                    ? `, ${p.location.state}`
                    : ""
                }`
              : p.property
                    ?.location
                    ?.city
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
            p.property
              ?.expectedReturn;

          return (
            <div
              key={propertyId}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group flex flex-col justify-between"
              onClick={() =>
                propertyId &&
                navigate(
                  `/properties/${propertyId}`
                )
              }
            >
              <div>

                <div className="relative h-48 overflow-hidden bg-gray-100">

                  {propertyImage ? (
                    <img
                      src={
                        propertyImage
                      }
                      alt={
                        propertyName
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                      <BsBuilding
                        size={32}
                      />
                    </div>
                  )}

                  {propertyRoi && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-teal-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                      {propertyRoi}%
                      ROI
                    </div>
                  )}
                </div>

                <div className="p-5">

                  <h3 className="font-extrabold text-gray-900 text-base group-hover:text-teal-800 transition-colors">
                    {propertyName}
                  </h3>

                  <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 font-medium">
                    <FiMapPin
                      size={12}
                      className="text-teal-700"
                    />

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
                    View
                    <FiArrowRight
                      size={12}
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

/* =========================================================
   PAYMENT HISTORY
========================================================= */

/* =========================================================
   PAYMENT HISTORY
========================================================= */

function PaymentCard({ payment }) {

  const paymentStatus =
    payment.paymentStatus ||
    "pending";

  const investmentStatus =
    payment.investmentStatus ||
    "pending";

  const isVerified =
    paymentStatus === "verified";

  const isPending =
    paymentStatus === "payment_submitted" ||
    paymentStatus === "pending";

  const isRejected =
    paymentStatus === "rejected";

  let statusStyle =
    "bg-gray-50 text-gray-700 border-gray-200";

  let statusLabel =
    paymentStatus;

  if (isVerified) {
    statusStyle =
      "bg-emerald-50 text-emerald-700 border-emerald-200";

    statusLabel =
      investmentStatus === "approved"
        ? "Investment Approved"
        : "Payment Verified";
  }

  if (isPending) {
    statusStyle =
      "bg-amber-50 text-amber-700 border-amber-200";

    statusLabel =
      "Payment Under Review";
  }

  if (isRejected) {
    statusStyle =
      "bg-rose-50 text-rose-700 border-rose-200";

    statusLabel =
      "Payment Rejected";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 border border-gray-100">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* LEFT SIDE */}

        <div className="flex items-center gap-4">

          {/* PROPERTY IMAGE */}

          <div className="w-12 h-12 rounded-xl overflow-hidden bg-teal-50 flex items-center justify-center shrink-0">

            {payment.image ? (
              <img
                src={payment.image}
                alt={payment.propertyName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FiCreditCard
                size={20}
                className="text-teal-700"
              />
            )}

          </div>

          {/* PROPERTY DETAILS */}

          <div>

            <p className="text-sm font-extrabold text-gray-900">
              {payment.propertyName ||
                "Property Investment"}
            </p>

            {/* LOCATION */}

            {payment.location && (
              <p className="text-xs text-gray-400 mt-0.5">
                {payment.location}
              </p>
            )}

            {/* PAYMENT MESSAGE */}

            <p className="text-xs text-gray-500 mt-1 font-medium">
              {payment.message ||
                `You paid ₹${Number(
                  payment.amount || 0
                ).toLocaleString("en-IN")}`}
            </p>

            {/* DATE */}

            <p className="text-[11px] text-gray-400 mt-1">

              {payment.date
                ? new Date(
                    payment.date
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Date unavailable"}

            </p>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="flex items-center sm:justify-end gap-5">

          {/* AMOUNT */}

          <div className="text-right">

            <p className="text-base font-extrabold text-gray-900">

              ₹
              {Number(
                payment.amount || 0
              ).toLocaleString("en-IN")}

            </p>

            {payment.shares && (
              <p className="text-xs text-gray-400 mt-0.5">

                {payment.shares} Shares

                {payment.pricePerShare
                  ? ` • ₹${Number(
                      payment.pricePerShare
                    ).toLocaleString("en-IN")} / share`
                  : ""}

              </p>
            )}

          </div>


          {/* STATUS */}

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap ${statusStyle}`}
          >
            {statusLabel}
          </span>

        </div>

      </div>

    </div>
  );
}


function Payment({ data }) {

  // API response can be:
  // { payments: [...] }
  // OR directly [...]

  const payments =
    Array.isArray(data)
      ? data
      : Array.isArray(data?.payments)
      ? data.payments
      : [];

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">

        <FiCreditCard
          size={30}
          className="mx-auto text-gray-300 mb-3"
        />

        <p className="text-gray-400 font-medium text-sm">
          No payment history found.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-3">

      {payments.map(
        (payment, i) => (

          <PaymentCard
            key={
              payment.paymentId ||
              i
            }
            payment={payment}
          />

        )
      )}

    </div>
  );
}



/* =========================================================
   KYC DOCUMENTS
========================================================= */

function KycDocuments({
  docs,
  kyc,
}) {
  const [preview, setPreview] =
    useState(null);

  const kycDocs =
    Array.isArray(docs)
      ? docs.filter(
          (d) =>
            d.type === "kyc"
        )
      : [];

  const mask = (val) => {
    if (!val) return "-";

    return (
      val.toString().slice(0, 2) +
      "****" +
      val
        .toString()
        .slice(-2)
    );
  };

  const Card = ({
    title,
    icon,
    children,
  }) => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">

      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">

        <div className="p-2 bg-teal-50 text-teal-800 rounded-xl">
          {icon}
        </div>

        <h3 className="font-extrabold text-gray-900 text-base">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
        {children}
      </div>
    </div>
  );

  const Field = ({
    label,
    value,
  }) => (
    <div>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
        {label}
      </p>

      <p className="font-bold text-gray-900 mt-1">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">

      {kyc && (
        <Card
          title="Personal Details"
          icon={<FiUser />}
        >
          <Field
            label="Full Name"
            value={
              kyc.fullName
            }
          />

          <Field
            label="Email"
            value={kyc.email}
          />

          <Field
            label="DOB"
            value={kyc.dob}
          />

          <Field
            label="Address"
            value={kyc.address}
          />
        </Card>
      )}

      {kyc && (
        <Card
          title="Identity Details"
          icon={<FiFileText />}
        >
          <Field
            label="PAN Number"
            value={mask(
              kyc.panNumber
            )}
          />

          <Field
            label="Aadhaar Number"
            value={mask(
              kyc.aadhaarNumber
            )}
          />
        </Card>
      )}

      {kyc && (
        <Card
          title="Bank Details"
          icon={
            <FiCreditCard />
          }
        >
          <Field
            label="Beneficiary Name"
            value={
              kyc.bank
                ?.beneficiaryName
            }
          />

          <Field
            label="Account Number"
            value={mask(
              kyc.bank
                ?.accountNumber
            )}
          />

          <Field
            label="IFSC Code"
            value={
              kyc.bank?.ifsc
            }
          />

          <Field
            label="Branch"
            value={
              kyc.bank?.branch
            }
          />
        </Card>
      )}

      {kyc && (
        <Card
          title="Nominee Details"
          icon={<FiUser />}
        >
          <Field
            label="Name"
            value={
              kyc.nominee?.name
            }
          />

          <Field
            label="PAN"
            value={mask(
              kyc.nominee
                ?.panNumber
            )}
          />

          <Field
            label="Aadhaar"
            value={mask(
              kyc.nominee
                ?.aadhaarNumber
            )}
          />

          <Field
            label="DOB"
            value={
              kyc.nominee?.dob
            }
          />
        </Card>
      )}

      {kyc && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex justify-between items-center shadow-sm">

          <span className="text-sm font-bold text-gray-600">
            KYC Verification Status
          </span>

          <span
            className={`px-4 py-1.5 text-xs rounded-full font-bold uppercase tracking-wider ${
              kyc.status ===
              "approved"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : kyc.status ===
                  "pending"
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {kyc.status ||
              "draft"}
          </span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

        <h2 className="font-extrabold text-base mb-4 text-gray-900">
          Document Preview
        </h2>

        {kycDocs.length ===
        0 ? (
          <p className="text-gray-400 text-sm font-medium">
            No verified documents uploaded yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">

            {kycDocs.map(
              (doc, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-2xl p-4 flex justify-between items-center hover:border-teal-200 transition-all bg-gray-50/50"
                >

                  <div>
                    <p className="font-extrabold text-sm text-gray-900">
                      {doc.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      Identity verification
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setPreview(
                        doc.url
                      )
                    }
                    className="text-teal-800 hover:bg-teal-50 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <FiEye
                      size={14}
                    />
                    View
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl relative shadow-2xl">

            <button
              onClick={() =>
                setPreview(
                  null
                )
              }
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 font-bold p-2 text-sm"
            >
              ✕
            </button>

            <h3 className="font-extrabold text-gray-900 mb-4 text-base">
              Document Preview
            </h3>

            {preview.endsWith(
              ".pdf"
            ) ? (
              <iframe
                src={preview}
                className="w-full h-[500px] rounded-2xl border"
              />
            ) : (
              <img
                src={preview}
                className="w-full h-auto max-h-[500px] object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   EXIT REQUESTS
========================================================= */

function ExitRequests({
  data,
}) {
  if (
    !data ||
    data.length === 0
  ) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 font-medium text-sm">
        No active exit or support requests found.
      </div>
    );
  }

  const getStatus = (
    status
  ) => {
    if (
      status ===
      "approved"
    ) {
      return {
        color:
          "bg-emerald-50 text-emerald-800 border-emerald-100",
        icon: (
          <FiCheckCircle
            size={14}
          />
        ),
        label: "Approved",
      };
    }

    if (
      status ===
      "pending"
    ) {
      return {
        color:
          "bg-amber-50 text-amber-800 border-amber-100",
        icon: (
          <FiClock
            size={14}
          />
        ),
        label: "Pending",
      };
    }

    return {
      color:
        "bg-rose-50 text-rose-800 border-rose-100",
      icon: (
        <FiXCircle
          size={14}
        />
      ),
      label: "Rejected",
    };
  };

  return (
    <div className="space-y-3">

      {data.map(
        (req, i) => {
          const status =
            getStatus(
              req.status
            );

          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >

              <div>
                <p className="text-sm font-extrabold text-gray-900">
                  {req.property ||
                    "Property Asset"}
                </p>

                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                  Submitted on:{" "}
                  {req.date
                    ? new Date(
                        req.date
                      ).toLocaleDateString()
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
        }
      )}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Portfolio() {
  const [portfolioData, setPortfolioData] =
    useState(null);

  const [payments, setPayments] =
    useState([]);

  const [docs, setDocs] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState(
      "Active Investments"
    );

  const [watchlist, setWatchlist] =
    useState([]);

  const [kycDetails, setKycDetails] =
    useState(null);

  const [exitRequests, setExitRequests] =
    useState([]);

  const [
    relatedProperties,
    setRelatedProperties,
  ] = useState([]);

  useEffect(() => {
    const fetchPortfolio =
      async () => {
        try {
          const res =
            await axios.get(
              "/api/portfolio"
            );

          setPortfolioData(
            res.data
          );
        } catch (err) {
          console.log(err);
        }
      };

      const fetchPayments = async () => {
        try {
      
          const res = await axios.get(
            "/api/portfolio/payments"
          );
      
          console.log(
            "PAYMENTS RESPONSE =>",
            res.data
          );
      
          const paymentData =
            Array.isArray(res.data)
              ? res.data
              : Array.isArray(res.data?.payments)
              ? res.data.payments
              : Array.isArray(res.data?.data)
              ? res.data.data
              : [];
      
          setPayments(paymentData);
      
        } catch (err) {
      
          console.log(
            "PAYMENTS FETCH ERROR =>",
            err
          );
      
          setPayments([]);
        }
      };

    const fetchDocs =
      async () => {
        try {
          const res =
            await axios.get(
              "/api/portfolio/documents"
            );

          setDocs(
            res.data
              .documents || []
          );

          setKycDetails(
            res.data
              .kycDetails ||
              null
          );
        } catch (err) {
          console.log(err);
        }
      };

    const fetchWatchlist =
      async () => {
        try {
          const res =
            await axios.get(
              "/api/user/watchlist"
            );

          const watchlistData =
            Array.isArray(
              res.data
            )
              ? res.data
              : Array.isArray(
                  res.data
                    ?.watchlist
                )
              ? res.data
                  .watchlist
              : Array.isArray(
                  res.data
                    ?.data
                )
              ? res.data.data
              : [];

          setWatchlist(
            watchlistData
          );
        } catch (err) {
          console.log(err);
          setWatchlist([]);
        }
      };

    const fetchExitRequests =
      async () => {
        try {
          const res =
            await axios.get(
              "/api/portfolio/exits"
            );

          setExitRequests(
            res.data || []
          );
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
    if (!portfolioData)
      return;

    const fetchRelated =
      async () => {
        try {
          const firstPropertyId =
            portfolioData
              ?.investments?.[0]
              ?.propertyId;

          if (!firstPropertyId)
            return;

          const res =
            await axios.get(
              `/api/properties/related/${firstPropertyId}`
            );

          setRelatedProperties(
            res.data || []
          );
        } catch (err) {
          console.log(err);
        }
      };

    fetchRelated();
  }, [portfolioData]);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-semibold text-sm">
        Loading Portfolio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-900 pb-16">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <PageHeader />

        <StatsBar
          data={
            portfolioData.summary
          }
        />

        <TabBar
          active={activeTab}
          setActive={setActiveTab}
        />

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1 min-w-0">

            {activeTab ===
              "Active Investments" && (
              <ActiveInvestments
                data={
                  portfolioData.investments
                }
              />
            )}

{activeTab ===
  "Pending Investments" && (
  <PendingInvestments
    data={
      portfolioData.pendingInvestments
    }
  />
)}

            {activeTab ===
              "Watchlist" && (
              <WatchList
                data={watchlist}
              />
            )}

            {activeTab ===
              "Payment History" && (
              <Payment
                data={payments}
              />
            )}
          </div>
        </div>

        {activeTab ===
          "Active Investments" && (
          <Sidebar
            properties={
              relatedProperties
            }
          />
        )}

        {activeTab ===
          "Documents" && (
          <KycDocuments
            docs={docs}
            kyc={kycDetails}
          />
        )}

        {activeTab ===
          "Support / Exit Request" && (
          <ExitRequests
            data={
              exitRequests
            }
          />
        )}

        {activeTab ===
          "Refer & Earn" && (
          <ReferralSection />
        )}
      </main>
    </div>
  );
}