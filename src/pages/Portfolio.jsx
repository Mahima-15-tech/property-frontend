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
  FiMail,
FiPhone,
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


/* ---------------- INVESTOR PROFILE CARD ---------------- */

function InvestorProfileCard({ profile }) {
  const displayName =
    profile?.name?.trim() ||
    profile?.fullName?.trim() ||
    "Investor";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm mb-8">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      <div className="relative p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Profile photo / initials */}
          <div className="shrink-0">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={`${displayName}'s profile`}
                className="h-20 w-20 rounded-2xl object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
              />
            ) : (
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-teal-800 to-emerald-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-md ring-4 ring-teal-50">
                {initials || "I"}
              </div>
            )}
          </div>

          {/* Investor name and badge */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                <FiShield size={12} />
                Investor Profile
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 break-words">
              {displayName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your personal details and investment account
            </p>
          </div>

          {/* Account label */}
          <div className="hidden md:flex shrink-0 items-center gap-2 rounded-2xl border border-teal-100 bg-teal-50/70 px-4 py-3 text-teal-800">
            <FiLayers size={18} />
            <div>
              <p className="text-xs font-bold">My Account</p>
              <p className="text-[10px] text-teal-700/70 mt-0.5">
                Portfolio Overview
              </p>
            </div>
          </div>
        </div>

        {/* Contact details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700">
              <FiMail size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </p>

              {profile?.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 block truncate text-sm font-semibold text-slate-800 hover:text-teal-700"
                  title={profile.email}
                >
                  {profile.email}
                </a>
              ) : (
                <p className="mt-1 text-sm text-slate-400">
                  Email not available
                </p>
              )}
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700">
              <FiPhone size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Phone Number
              </p>

              {profile?.phone ? (
                <a
                  href={`tel:${profile.phone}`}
                  className="mt-1 block truncate text-sm font-semibold text-slate-800 hover:text-teal-700"
                >
                  {profile.phone}
                </a>
              ) : (
                <p className="mt-1 text-sm text-slate-400">
                  Phone number not available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
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
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [paymentSettingsLoading, setPaymentSettingsLoading] = useState(false);
  const [paymentSettingsError, setPaymentSettingsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPaymentSettings = async () => {
      try {
        setPaymentSettingsLoading(true);
        setPaymentSettingsError("");

        // Reuse the same settings endpoint as Checkout.
        const res = await axios.get("/api/investments/payment-settings");
        const settings =
          res.data?.settings || res.data?.data || res.data || null;

        if (isMounted) {
          setPaymentSettings(settings);
        }
      } catch (error) {
        console.error("PAYMENT SETTINGS FETCH ERROR:", error);
        if (isMounted) {
          setPaymentSettings(null);
          setPaymentSettingsError(
            error.response?.data?.message ||
              "Unable to load bank details. Please refresh and try again."
          );
        }
      } finally {
        if (isMounted) setPaymentSettingsLoading(false);
      }
    };

    fetchPaymentSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const copyBankDetail = async (value, label) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(String(value));
      toast.success(`${label} copied`);
    } catch (error) {
      toast.error(`Unable to copy ${label.toLowerCase()}`);
    }
  };

  if (!property || !investment) {
    return null;
  }

  const totalShares = Number(property.totalShares || 0);
  const currentShares = Number(investment.shares || 0);

  const remainingShares = Math.max(totalShares - currentShares, 0);

  const currentOwnership =
    totalShares > 0 ? (currentShares / totalShares) * 100 : 0;

  const isAlreadyFullOwner =
    currentShares >= totalShares || investment.isFullOwner === true;

  if (isAlreadyFullOwner) {
    return (
      <div className="relative w-full self-start overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 shadow-sm">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/30 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
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

  const requestPaymentStatus = ownershipRequest?.paymentStatus;

  const requestStatus = ownershipRequest?.status;

  const paymentSubmitted =
    requestStatus === "payment_submitted" ||
    requestPaymentStatus === "payment_submitted";

  const paymentVerified =
    requestStatus === "payment_verified" ||
    requestPaymentStatus === "verified";

  const paymentRejected = requestPaymentStatus === "rejected";

  const additionalShares = ownershipRequest
    ? Math.max(
        Number(ownershipRequest.additionalShares ?? remainingShares),
        0
      )
    : remainingShares;

  const pricePerShare = Number(
    ownershipRequest?.pricePerShare || property.sharePrice || 0
  );

  const totalAmount = additionalShares * pricePerShare;

  const fullOwnershipAmount =
    remainingShares * Number(property.sharePrice || 0);

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

      formData.append("paymentReference", paymentReference.trim());

      formData.append("paymentMethod", "Bank Transfer");

      formData.append("file", paymentFile);

      const res = await axios.post(
        `/api/ownership/${ownershipRequest._id}/payment-proof`,
        formData
      );

      setOwnershipRequest(res.data?.request || ownershipRequest);

      toast.success("Payment proof submitted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit payment proof"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.04]">

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
      <div className="flex flex-1 flex-col p-5 sm:p-6">

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

            <span className="text-xs font-bold text-gray-700">100%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-700 to-emerald-400 transition-all duration-700"
              style={{
                width: `${Math.min(currentOwnership, 100)}%`,
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
        <div className="mt-4 flex flex-1 flex-col rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">

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

          <div className="mb-4 grid grid-cols-2 gap-4">

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
                ₹{Number(property.sharePrice || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-auto flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3.5">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Amount Required
              </p>

              <p className="mt-0.5 text-[11px] text-slate-300">
                For 100% ownership
              </p>
            </div>

            <p className="text-lg font-black tracking-tight text-white">
              ₹{fullOwnershipAmount.toLocaleString("en-IN")}
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
              <div className="mt-3 rounded-xl border border-teal-100 bg-teal-50/60 px-3.5 py-3">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700/70">
                      Payable Amount
                    </p>

                    <p className="mt-1 text-xl font-black tracking-tight text-teal-950">
                      ₹{totalAmount.toLocaleString("en-IN")}
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

              {/* COMPACT BANK DETAILS - shared with Checkout settings */}
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between gap-3 bg-slate-50/80 px-3.5 py-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
                      <FiCreditCard size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-slate-900">Pay to Bank Account</p>
                      <p className="text-[10px] text-slate-500">Use these details to complete your transfer</p>
                    </div>
                  </div>
                  {paymentSettings?.bankName && (
                    <span className="max-w-[42%] truncate rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-teal-800 ring-1 ring-teal-100">
                      {paymentSettings.bankName}
                    </span>
                  )}
                </div>

                <div className="p-3.5">
                  {paymentSettingsLoading ? (
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="h-14 animate-pulse rounded-lg bg-slate-100" />
                      ))}
                    </div>
                  ) : paymentSettingsError ? (
                    <div className="rounded-lg bg-amber-50 p-3">
                      <p className="text-xs text-amber-800">{paymentSettingsError}</p>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setPaymentSettingsLoading(true);
                            setPaymentSettingsError("");
                            const res = await axios.get("/api/investments/payment-settings");
                            setPaymentSettings(res.data?.settings || res.data?.data || res.data || null);
                          } catch (error) {
                            setPaymentSettingsError(error.response?.data?.message || "Unable to load bank details. Please try again.");
                          } finally {
                            setPaymentSettingsLoading(false);
                          }
                        }}
                        className="mt-1.5 text-xs font-bold text-amber-900 underline"
                      >Retry</button>
                    </div>
                  ) : paymentSettings && (
                    paymentSettings.accountName || paymentSettings.bankName ||
                    paymentSettings.accountNumber || paymentSettings.ifscCode ||
                    paymentSettings.upiId || paymentSettings.qrCode
                  ) ? (
                    <div className={`grid gap-3 ${paymentSettings.qrCode ? "grid-cols-[minmax(0,1fr)_88px]" : "grid-cols-1"}`}>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          ["Account Holder", paymentSettings.accountName],
                          ["Bank Name", paymentSettings.bankName],
                          ["Account Number", paymentSettings.accountNumber],
                          ["IFSC Code", paymentSettings.ifscCode],
                        ].filter(([, value]) => value).map(([label, value]) => (
                          <div key={label} className="min-w-0 rounded-lg bg-slate-50 px-2.5 py-2">
                            <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                            <div className="mt-1 flex min-w-0 items-center gap-1">
                              <p className="min-w-0 flex-1 break-all text-[11px] font-bold leading-snug text-slate-900">{value}</p>
                              {(label === "Account Number" || label === "IFSC Code") && (
                                <button type="button" onClick={() => copyBankDetail(value, label)} title={`Copy ${label}`} className="shrink-0 rounded-md p-1 text-teal-700 hover:bg-teal-100">
                                  <FiCopy size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {paymentSettings.upiId && (
                          <div className="col-span-2 flex items-center justify-between gap-2 rounded-lg bg-teal-50 px-2.5 py-2">
                            <div className="min-w-0">
                              <p className="text-[9px] font-semibold uppercase tracking-wide text-teal-700">UPI ID</p>
                              <p className="mt-1 break-all text-[11px] font-bold text-teal-950">{paymentSettings.upiId}</p>
                            </div>
                            <button type="button" onClick={() => copyBankDetail(paymentSettings.upiId, "UPI ID")} className="shrink-0 rounded-md bg-white px-2 py-1.5 text-[10px] font-bold text-teal-800 shadow-sm">
                              <FiCopy size={11} className="mr-1 inline" />Copy
                            </button>
                          </div>
                        )}
                      </div>
                      {paymentSettings.qrCode && (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-white p-1.5 text-center">
                          <img src={paymentSettings.qrCode} alt="Payment QR code" className="h-[72px] w-[72px] rounded object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                          <span className="mt-1 text-[9px] font-bold text-slate-500">Scan to pay</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">Bank details are not configured yet. Please contact our team before making payment.</p>
                  )}
                  <p className="mt-2 text-[9px] leading-relaxed text-slate-400">Please verify the account details before making the transfer.</p>
                </div>
              </div>

              {/* UTR */}
              <div className="mt-3">

                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-600">
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
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Enter your UTR number"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm font-medium text-gray-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-3">

                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-600">
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
                      setPaymentFile(e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                onClick={handlePaymentProof}
                disabled={paymentLoading}
                className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
                Your payment proof will be reviewed by our team.
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
   FLOATING CARDS UI  (shared helpers)
========================================================= */

// Har card ka same soft-floating style (border nahi, soft shadow)
const cardShell =
  "rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.04]";

const FloatCard = ({ icon, iconClass, title, subtitle, right, children }) => (
  <div className={`${cardShell} p-5 sm:p-6`}>
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      {right}
    </div>
    {children}
  </div>
);

// List row (icon + label ........ value)
const Row = ({ icon, label, value, valueClass = "text-slate-900" }) => (
  <div className="flex items-center justify-between gap-3 py-3.5">
    <div className="flex items-center gap-3 text-slate-500">
      {icon && (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
          {icon}
        </span>
      )}
      <span className="text-[13px] font-medium">{label}</span>
    </div>
    <span className={`text-sm font-bold ${valueClass}`}>{value}</span>
  </div>
);

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
  const [exitShares, setExitShares] = useState("");
  const [exitLoading, setExitLoading] = useState(false);
  const [eligibleExitDate, setEligibleExitDate] = useState(null);
  const [exitError, setExitError] = useState("");

  if (!investment) return null;

  const profit = Number(investment.profit || 0);
  const isProfitable = profit >= 0;
  const invested = Number(investment.invested || 0);
  const currentValue = Number(investment.currentValue || 0);

  const profitPercentage =
    invested > 0 ? ((profit / invested) * 100).toFixed(2) : "0.00";

  const inr = (v) => `₹${Number(v || 0).toLocaleString("en-IN")}`;

  const handleExit = async () => {
    if (!exitShares || Number(exitShares) <= 0) {
      toast.error("Please enter the number of shares");
      return;
    }

    if (Number(exitShares) > Number(investment.shares || 0)) {
      toast.error("You cannot exit more shares than you own");
      return;
    }

    try {
      setExitLoading(true);
      setExitError("");
      setEligibleExitDate(null);

      await onExitRequest(Number(exitShares));

      setExitShares("");
      toast.success("Exit request submitted successfully");
    } catch (error) {
      console.error("Exit request failed:", error);

      const data = error?.response?.data;

      // LOCK-IN PERIOD
      if (data?.eligibleExitDate) {
        setEligibleExitDate(data.eligibleExitDate);
        toast.error("Investment is still under lock-in period");
      } else {
        setExitError(data?.message || "Failed to submit exit request");
        toast.error(data?.message || "Failed to submit exit request");
      }
    } finally {
      setExitLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* ================= TOP: 2 COLUMNS ================= */}
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        {/* ---------- LEFT ---------- */}
        <div className="space-y-5">
          {/* Overview */}
          <FloatCard
            icon={<FiGrid size={17} />}
            iconClass="bg-emerald-50 text-emerald-600"
            title="Overview"
            subtitle="Key details of this investment"
          >
            <div className="divide-y divide-slate-100">
              <Row
                icon={<FiShield size={15} />}
                label="Total Value"
                value={inr(investment.totalValue)}
              />
              <Row
                icon={<FiDollarSign size={15} />}
                label="Share Price"
                value={inr(investment.sharePrice)}
              />
              <Row
                icon={<FiClock size={15} />}
                label="Lock-in Period"
                value={`${investment.lockInYears || 0} Years`}
              />
              <Row
                icon={<FiTrendingUp size={15} />}
                label="Current Value"
                value={inr(currentValue)}
              />
            </div>
          </FloatCard>

          {/* Returns */}
          <FloatCard
            icon={<FiBarChart2 size={17} />}
            iconClass="bg-teal-50 text-teal-600"
            title="Investment Returns"
            subtitle="Overall valuation change"
            right={
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  isProfitable
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {isProfitable ? (
                  <FiTrendingUp size={12} />
                ) : (
                  <FiTrendingDown size={12} />
                )}
                {profitPercentage}%
              </span>
            }
          >
            <div className="divide-y divide-slate-100">
              <Row label="Invested Amount" value={inr(invested)} />
              <Row label="Current Valuation" value={inr(currentValue)} />
            </div>

            {/* Gain / Loss highlight */}
            <div
              className={`mt-3 flex items-center justify-between rounded-xl px-4 py-3.5 ${
                isProfitable ? "bg-emerald-50" : "bg-rose-50"
              }`}
            >
              <span className="text-[13px] font-semibold text-slate-600">
                {isProfitable ? "Total Gain" : "Total Loss"}
              </span>

              <span
                className={`text-lg font-extrabold tracking-tight ${
                  isProfitable ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {isProfitable ? "+" : "-"}₹
                {Math.abs(profit).toLocaleString("en-IN")}
              </span>
            </div>
          </FloatCard>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className="flex flex-col self-start">
          <FullOwnershipCard
            property={investment}
            investment={investment}
            ownershipRequest={ownershipRequest}
            onRequest={onRequest}
            loading={loading}
            setOwnershipRequest={setOwnershipRequest}
          />
        </div>
      </div>

      {/* ================= DOCUMENTS (full width) ================= */}
      {investment.documents?.length > 0 && (
        <FloatCard
          icon={<FiFolder size={17} />}
          iconClass="bg-sky-50 text-sky-600"
          title="Investment Documents"
          subtitle={`${investment.documents.length} file(s) available`}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {investment.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.url || doc}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 transition-colors hover:bg-emerald-50/60"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm group-hover:text-emerald-600">
                    <FiFileText size={15} />
                  </div>
                  <span className="truncate text-[13px] font-semibold text-slate-700 group-hover:text-emerald-700">
                    {doc.name || `Document ${index + 1}`}
                  </span>
                </div>
                <FiExternalLink
                  size={14}
                  className="shrink-0 text-slate-300 group-hover:text-emerald-600"
                />
              </a>
            ))}
          </div>
        </FloatCard>
      )}

      {/* ================= EXIT (full width) ================= */}
      <div className={`${cardShell} overflow-hidden`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: info */}
          <div className="border-b border-slate-100 bg-gradient-to-br from-rose-50/70 to-white p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <FiLogOut size={17} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Exit Investment
                </h4>
                <p className="mt-0.5 text-xs text-slate-400">
                  Request to exit your shares
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/[0.04]">
                <p className="text-xs font-medium text-slate-400">
                  Shares you own
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {investment.shares || 0}
                </p>
              </div>

              <div className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/[0.04]">
                <p className="text-xs font-medium text-slate-400">Lock-in</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {investment.lockInYears || 0} Yrs
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-5 sm:p-6">
            {eligibleExitDate && (
              <div className="mb-4 flex gap-3 rounded-xl bg-amber-50 p-3.5">
                <FiClock
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <p className="text-[13px] font-semibold text-amber-800">
                    Investment is under lock-in period
                  </p>
                  <p className="mt-0.5 text-xs text-amber-700">
                    You can request an exit from{" "}
                    <span className="font-bold text-amber-900">
                      {new Date(eligibleExitDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {exitError && !eligibleExitDate && (
              <div className="mb-4 rounded-xl bg-rose-50 px-3.5 py-2.5">
                <p className="text-xs text-rose-600">{exitError}</p>
              </div>
            )}

            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Number of Shares to Exit
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
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
                className="w-full flex-1 rounded-xl border border-transparent bg-slate-100/80 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 disabled:text-slate-400"
              />

              <button
                type="button"
                disabled={exitLoading || !!eligibleExitDate}
                onClick={handleExit}
                className={`rounded-xl px-7 py-3 text-sm font-semibold transition-all sm:w-auto ${
                  eligibleExitDate
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : "bg-rose-600 text-white shadow-md shadow-rose-600/20 hover:bg-rose-700"
                } disabled:opacity-70`}
              >
                {exitLoading
                  ? "Submitting..."
                  : eligibleExitDate
                  ? "Exit Locked"
                  : "Request Exit"}
              </button>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Your exit request will be reviewed by the administrator. The
              final exit process will begin after approval.
            </p>
          </div>
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

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => {
    if (!showImageViewer) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowImageViewer(false);
      if (event.key === "+" || event.key === "=") {
        setImageZoom((prev) => Math.min(4, +(prev + 0.25).toFixed(2)));
      }
      if (event.key === "-") {
        setImageZoom((prev) => Math.max(0.5, +(prev - 0.25).toFixed(2)));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showImageViewer]);

const propertyImages = (
  Array.isArray(property?.images) && property.images.length
    ? property.images
    : property?.image
      ? [property.image]
      : []
).filter(Boolean);

const safeImageIndex =
  activeImageIndex < propertyImages.length ? activeImageIndex : 0;
  return (
    <div className="space-y-4">
      {/* ---------- Top summary card ---------- */}
      <div
        className={`${cardShell} transition-all duration-300 ${
          expanded ? "ring-emerald-300" : "hover:shadow-[0_12px_36px_rgba(15,23,42,0.1)]"
        }`}
      >
        <div className="flex items-center gap-3.5 p-3.5 sm:gap-5 sm:p-5">
        <div className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-32">
  {propertyImages.length > 0 ? (
    <>
      <button
        type="button"
        aria-label="Open property image in zoom viewer"
        onClick={() => {
          setImageZoom(1);
          setShowImageViewer(true);
        }}
        className="h-full w-full cursor-zoom-in"
      >
        <img
          key={propertyImages[safeImageIndex]}
          src={propertyImages[safeImageIndex]}
          alt={property?.propertyName || "Property"}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </button>

      {propertyImages.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous property image"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) =>
                (prev - 1 + propertyImages.length) %
                propertyImages.length
              );
            }}
            className="absolute left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow transition hover:bg-black/80"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next property image"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) =>
                (prev + 1) % propertyImages.length
              );
            }}
            className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow transition hover:bg-black/80"
          >
            ›
          </button>

          <span className="absolute bottom-1 right-1 rounded-full bg-black/65 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            {safeImageIndex + 1}/{propertyImages.length}
          </span>
        </>
      )}
    </>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gray-50 text-xs text-gray-400">
      <FiPieChart size={20} className="opacity-40" />
      <span>No Image</span>
    </div>
  )}
</div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold tracking-tight text-gray-900 sm:text-base">
                  {property?.propertyName || "Untitled Property"}
                </h3>

                <p className="mt-1 flex items-center gap-1 truncate text-xs font-medium text-gray-500">
                  <FiMapPin className="shrink-0 text-emerald-500" size={13} />
                  <span className="truncate">
                    {property?.location}
                    {property?.state ? `, ${property.state}` : ""}
                  </span>
                </p>
              </div>

              <div className="flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <FiTrendingUp size={12} />
                <span>{property?.roi || 0}% ROI</span>
              </div>
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-xs">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Shares
                </p>
                <p className="mt-0.5 font-bold text-gray-900">
                  {property?.shares || 0}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Ownership
                </p>
                <p className="mt-0.5 font-bold text-emerald-600">
                  {property?.ownership || 0}%
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Invested
                </p>
                <p className="mt-0.5 truncate font-bold text-gray-900">
                  ₹{Number(property?.invested || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onToggle}
            aria-label="Toggle details"
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10 ${
              expanded
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "border border-gray-100 bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
          >
            <FiChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ---------- Expanded: soft grey bg par floating cards ---------- */}
      {expanded && (
        <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-slate-50 to-white p-4 sm:p-6">
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

      {showImageViewer && propertyImages[safeImageIndex] && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Property image viewer"
          onClick={() => setShowImageViewer(false)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-950/80 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">{property?.propertyName || "Property Image"}</p>
                <p className="text-xs text-white/60">{safeImageIndex + 1} of {propertyImages.length} · {Math.round(imageZoom * 100)}%</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => setImageZoom((prev) => Math.max(0.5, +(prev - 0.25).toFixed(2)))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-xl hover:bg-white/20">−</button>
                <button type="button" aria-label="Reset zoom" title="Reset zoom" onClick={() => setImageZoom(1)} className="h-9 rounded-lg border border-white/20 bg-white/10 px-3 text-xs font-semibold hover:bg-white/20">Reset</button>
                <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => setImageZoom((prev) => Math.min(4, +(prev + 0.25).toFixed(2)))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-xl hover:bg-white/20">+</button>
                <button type="button" aria-label="Close image viewer" title="Close" onClick={() => setShowImageViewer(false)} className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl font-semibold text-slate-900 hover:bg-slate-200">×</button>
              </div>
            </div>
            <div
              className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-auto p-3 sm:grid-cols-2 sm:p-5 lg:grid-cols-3"
              onWheel={(event) => {
                if (event.ctrlKey || event.metaKey) {
                  event.preventDefault();
                  setImageZoom((prev) => Math.max(0.5, Math.min(4, +(prev + (event.deltaY < 0 ? 0.15 : -0.15)).toFixed(2))));
                }
              }}
            >
              {propertyImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:min-h-[260px]"
                >
                  <img
                    src={image}
                    alt={`${property?.propertyName || "Property"} image ${index + 1}`}
                    draggable="false"
                    style={{ transform: `scale(${imageZoom})`, transformOrigin: "center center" }}
                    className="h-full max-h-[58vh] w-full select-none object-contain transition-transform duration-150"
                  />
                </div>
              ))}
            </div>
            <p className="border-t border-white/10 px-4 py-2 text-center text-[11px] text-white/55">All property images are shown here · Use + / − to zoom · Ctrl/⌘ + scroll to zoom · Press Esc to close</p>
          </div>
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

  const [ownershipRequests, setOwnershipRequests] = useState({});

  const [ownershipLoading, setOwnershipLoading] = useState({});

  useEffect(() => {
    const fetchOwnershipRequests = async () => {
      try {
        const res = await axios.get("/api/ownership/my-requests");

        const requests = Array.isArray(res.data)
          ? res.data
          : res.data?.requests || [];

        const mapped = {};

        requests.forEach((request) => {
          const propertyId = request.propertyId?._id || request.propertyId;

          const investmentId =
            request.investmentId?._id || request.investmentId;

          if (propertyId) {
            mapped[`property_${propertyId}`] = request;
          }

          if (investmentId) {
            mapped[`investment_${investmentId}`] = request;
          }
        });

        setOwnershipRequests(mapped);
      } catch (error) {
        console.error("Failed to fetch ownership requests", error);
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

      const res = await axios.post("/api/ownership/request", {
        investmentId: investment.investmentId,
      });

      const request = res.data?.request;

      if (request) {
        setOwnershipRequests((prev) => ({
          ...prev,
          [`property_${investment.propertyId}`]: request,
          [`investment_${investment.investmentId}`]: request,
        }));
      }

      toast.success("Full ownership request created successfully");
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
        error.response?.data?.message || "Failed to submit exit request"
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
        const expanded = expandedId === investment.investmentId;

        const ownershipRequest =
          ownershipRequests[`investment_${investment.investmentId}`] ||
          ownershipRequests[`property_${investment.propertyId}`] ||
          null;

        return (
          <InvestmentCard
            key={investment.investmentId}
            property={investment}
            expanded={expanded}
            onToggle={() =>
              setExpandedId(expanded ? null : investment.investmentId)
            }
            ownershipRequest={ownershipRequest}
            onRequest={() => handleOwnershipRequest(investment)}
            loading={ownershipLoading[investment.investmentId]}
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

/* =========================================================
   PENDING INVESTMENTS
========================================================= */

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

  const getPaymentStatus = (paymentStatus, status) => {
    // PAYMENT SUBMITTED
    if (paymentStatus === "payment_submitted") {
      return {
        label: "Payment Under Review",
        color: "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    // PAYMENT VERIFIED
    if (paymentStatus === "verified" && status !== "approved") {
      return {
        label: "Payment Verified - Awaiting Investment Approval",
        color: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }

    // REJECTED
    if (paymentStatus === "rejected" || status === "rejected") {
      return {
        label: "Rejected",
        color: "bg-red-50 text-red-700 border-red-200",
      };
    }

    // DEFAULT
    return {
      label: "Investment Pending",
      color: "bg-gray-50 text-gray-600 border-gray-200",
    };
  };

  return (
    <div className="space-y-4">
      {data.map((investment) => {
        const status = getPaymentStatus(
          investment.paymentStatus,
          investment.status
        );

        return (
          <div
            key={investment.investmentId}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-5">
              <div className="flex flex-col md:flex-row gap-5">
                {/* IMAGE */}
                <div className="w-full md:w-40 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  {investment.image ? (
                    <img
                      src={investment.image}
                      alt={investment.propertyName}
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
                        {investment.propertyName}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        {investment.location}
                        {investment.state && `, ${investment.state}`}
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
                      <p className="text-xs text-gray-400">Shares</p>

                      <p className="font-bold text-gray-900 mt-1">
                        {investment.shares}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Amount</p>

                      <p className="font-bold text-gray-900 mt-1">
                        ₹{Number(investment.amount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Submitted</p>

                      <p className="font-bold text-gray-900 mt-1">
                        {investment.createdAt
                          ? new Date(
                              investment.createdAt
                            ).toLocaleDateString("en-IN")
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl p-4">
                    {investment.paymentStatus === "payment_submitted" ? (
                      <p className="text-sm text-amber-800">
                        Your payment has been submitted successfully and is currently under team review.
                      </p>
                    ) : investment.paymentStatus === "verified" ? (
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
  const [selectedId, setSelectedId] = useState("");

  const [exitError, setExitError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleExit = async () => {
    setExitError("");

    if (!selectedId) {
      setExitError("Please select a property.");
      return;
    }

    const data = JSON.parse(selectedId);

    try {
      setLoading(true);

      await axios.post("/api/portfolio/exit", {
        investmentId: data.investmentId,
        shares: data.shares,
      });

      alert("Exit request submitted successfully");

      window.location.reload();
    } catch (err) {
      console.log("EXIT ERROR:", err);

      const response = err.response?.data;

      if (response?.message === "Investment is still under lock-in period") {
        const eligibleDate = response.eligibleExitDate
          ? new Date(response.eligibleExitDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
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
      <p className="mb-1 text-sm font-extrabold">Liquidity / Exit Request</p>

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
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
}

/* =========================================================
   REFER & EARN
========================================================= */

function ReferralSection() {
  const [referralData, setReferralData] = useState(null);

  const [rewards, setRewards] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState("");

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const [referralRes, rewardsRes] = await Promise.all([
          axios.get("/api/user/referral"),
          axios.get("/api/user/referral/rewards"),
        ]);

        setReferralData(referralRes.data);

        setRewards(rewardsRes.data?.rewards || []);
      } catch (error) {
        console.log("REFERRAL ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  const copyText = async (text, type) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      console.log("COPY ERROR:", error);
    }
  };

  const shareReferral = async () => {
    if (!referralData?.referralLink) return;

    const shareData = {
      title: "Join our Investment Platform",
      text: "Join me and explore investment opportunities.",
      url: referralData.referralLink,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyText(referralData.referralLink, "link");
      }
    } catch (error) {
      console.log("SHARE ERROR:", error);
    }
  };

  const getRewardStatus = (status) => {
    if (status === "approved") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (status === "rejected") {
      return "bg-rose-50 text-rose-700 border-rose-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const getGiftStatus = (status) => {
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

  if (!referralData?.referralCode) {
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
                  onClick={() => copyText(referralData.referralCode, "code")}
                  className="inline-flex items-center gap-2 bg-white text-teal-900 px-3 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-all"
                >
                  <FiCopy size={14} />

                  {copied === "code" ? "Copied!" : "Copy"}
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
                  onClick={() => copyText(referralData.referralLink, "link")}
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
            {rewards.map((reward) => (
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
                      {reward.referredInvestor?.name || "Investor"}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {reward.referredInvestor?.email || "-"}
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
                      {reward.giftName || "Gift Reward"}
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
                    {reward.status || "pending"}
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
                    {reward.giftStatus === "issued"
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
                      ? new Date(reward.createdAt).toLocaleDateString(
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
            ))}
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
          Explore All
          <FiArrowRight size={12} />
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

/* =========================================================
   WATCHLIST
========================================================= */

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
          p.name || p.title || p.propertyName || "Untitled Property";

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
            ? `${p.location.city}${
                p.location.state ? `, ${p.location.state}` : ""
              }`
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
                  View
                  <FiArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   PAYMENT HISTORY
========================================================= */

function PaymentCard({ payment }) {
  const paymentStatus = payment.paymentStatus || "pending";

  const investmentStatus = payment.investmentStatus || "pending";

  const isVerified = paymentStatus === "verified";

  const isPending =
    paymentStatus === "payment_submitted" || paymentStatus === "pending";

  const isRejected = paymentStatus === "rejected";

  let statusStyle = "bg-gray-50 text-gray-700 border-gray-200";

  let statusLabel = paymentStatus;

  if (isVerified) {
    statusStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";

    statusLabel =
      investmentStatus === "approved"
        ? "Investment Approved"
        : "Payment Verified";
  }

  if (isPending) {
    statusStyle = "bg-amber-50 text-amber-700 border-amber-200";

    statusLabel = "Payment Under Review";
  }

  if (isRejected) {
    statusStyle = "bg-rose-50 text-rose-700 border-rose-200";

    statusLabel = "Payment Rejected";
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
              <FiCreditCard size={20} className="text-teal-700" />
            )}
          </div>

          {/* PROPERTY DETAILS */}
          <div>
            <p className="text-sm font-extrabold text-gray-900">
              {payment.propertyName || "Property Investment"}
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
                `You paid ₹${Number(payment.amount || 0).toLocaleString(
                  "en-IN"
                )}`}
            </p>

            {/* DATE */}
            <p className="text-[11px] text-gray-400 mt-1">
              {payment.date
                ? new Date(payment.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Date unavailable"}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center sm:justify-end gap-5">
          {/* AMOUNT */}
          <div className="text-right">
            <p className="text-base font-extrabold text-gray-900">
              ₹{Number(payment.amount || 0).toLocaleString("en-IN")}
            </p>

            {payment.shares && (
              <p className="text-xs text-gray-400 mt-0.5">
                {payment.shares} Shares
                {payment.pricePerShare
                  ? ` • ₹${Number(payment.pricePerShare).toLocaleString(
                      "en-IN"
                    )} / share`
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

  const payments = Array.isArray(data)
    ? data
    : Array.isArray(data?.payments)
    ? data.payments
    : [];

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
        <FiCreditCard size={30} className="mx-auto text-gray-300 mb-3" />

        <p className="text-gray-400 font-medium text-sm">
          No payment history found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment, i) => (
        <PaymentCard key={payment.paymentId || i} payment={payment} />
      ))}
    </div>
  );
}

/* =========================================================
   KYC DOCUMENTS
========================================================= */

function KycDocuments({ docs, kyc, onResubmit, resubmitting }) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [showResubmitForm, setShowResubmitForm] = useState(false);
  const [savingCorrections, setSavingCorrections] = useState(false);
  const [kycForm, setKycForm] = useState({
    fullName: "", email: "", dob: "", address: "",
    panNumber: "", aadhaarNumber: "",
    nomineeName: "", nomineePanNumber: "", nomineeAadhaarNumber: "", nomineeDob: "",
    beneficiaryName: "", accountNumber: "", ifsc: "", branch: "",
  });
  const [kycFiles, setKycFiles] = useState({
    panFile: null, aadhaarFile: null, cancelCheque: null,
  });

  // Lock the page behind the KYC modal; restore its exact scroll position on close.
  useEffect(() => {
    if (!showResubmitForm) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const previousHtmlOverflow = html.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.position = previousBody.position;
      body.style.top = previousBody.top;
      body.style.left = previousBody.left;
      body.style.right = previousBody.right;
      body.style.width = previousBody.width;
      body.style.overflow = previousBody.overflow;
      html.style.overflow = previousHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [showResubmitForm]);

  useEffect(() => {
    if (!kyc) return;
    setKycForm({
      fullName: kyc.fullName || "",
      email: kyc.email || "",
      dob: kyc.dob ? String(kyc.dob).slice(0, 10) : "",
      address: kyc.address || "",
      panNumber: kyc.panNumber || "",
      aadhaarNumber: kyc.aadhaarNumber || "",
      nomineeName: kyc.nominee?.name || "",
      nomineePanNumber: kyc.nominee?.panNumber || "",
      nomineeAadhaarNumber: kyc.nominee?.aadhaarNumber || "",
      nomineeDob: kyc.nominee?.dob ? String(kyc.nominee.dob).slice(0, 10) : "",
      beneficiaryName: kyc.bank?.beneficiaryName || "",
      accountNumber: kyc.bank?.accountNumber || "",
      ifsc: kyc.bank?.ifsc || "",
      branch: kyc.bank?.branch || "",
    });
  }, [kyc]);

  const updateKycForm = (event) => {
    const { name, value } = event.target;
    setKycForm((current) => ({ ...current, [name]: value }));
  };

  const submitKycCorrections = async (event) => {
    event.preventDefault();
    if (savingCorrections) return;

    try {
      setSavingCorrections(true);

      await axios.post("/api/kyc/basic", {
        fullName: kycForm.fullName.trim(),
        email: kycForm.email.trim(),
        dob: kycForm.dob,
        address: kycForm.address.trim(),
      });

      const panData = new FormData();
      panData.append("panNumber", kycForm.panNumber.trim().toUpperCase());
      if (kycFiles.panFile) {
        panData.append("document", kycFiles.panFile);
      }
      await axios.post("/api/kyc/pan", panData);

      const aadhaarData = new FormData();
      aadhaarData.append("aadhaarNumber", kycForm.aadhaarNumber.trim());
      if (kycFiles.aadhaarFile) {
        aadhaarData.append("document", kycFiles.aadhaarFile);
      }
      await axios.post("/api/kyc/aadhaar", aadhaarData);

      await axios.post("/api/kyc/nominee", {
        name: kycForm.nomineeName.trim(),
        panNumber: kycForm.nomineePanNumber.trim().toUpperCase(),
        aadhaarNumber: kycForm.nomineeAadhaarNumber.trim(),
        dob: kycForm.nomineeDob,
      });

      const bankData = new FormData();
      bankData.append("beneficiaryName", kycForm.beneficiaryName.trim());
      bankData.append("accountNumber", kycForm.accountNumber.trim());
      bankData.append("ifsc", kycForm.ifsc.trim().toUpperCase());
      bankData.append("branch", kycForm.branch.trim());
      if (kycFiles.cancelCheque) {
        bankData.append("document", kycFiles.cancelCheque);
      }
      await axios.post("/api/kyc/bank", bankData);

      await axios.post("/api/kyc/submit");

      toast.success("KYC resubmitted successfully");
      setShowResubmitForm(false);
      if (onResubmit) await onResubmit();
    } catch (error) {
      console.error("KYC CORRECTION SUBMISSION ERROR:", error);
      const missing = error.response?.data?.missingFields;
      toast.error(
        missing?.length
          ? `Please complete: ${missing.join(", ")}`
          : error.response?.data?.message || "Unable to resubmit KYC. Please check your details."
      );
    } finally {
      setSavingCorrections(false);
    }
  };

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
          <Field
            label="Beneficiary Name"
            value={kyc.bank?.beneficiaryName}
          />

          <Field
            label="Account Number"
            value={mask(kyc.bank?.accountNumber)}
          />

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

      {kyc?.status === "rejected" && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <FiXCircle className="mt-0.5 text-rose-600 shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-rose-900">KYC needs correction</h3>
              <p className="mt-1 text-sm text-rose-800">
                {kyc.rejectionMessage || "Your KYC was rejected. Please review your details and resubmit them."}
              </p>
              {kyc.rejectionType === "contact_bank" ? (
                <>
                  <p className="mt-2 text-sm leading-relaxed text-rose-800">
                    Your contact or bank details need to be updated. You can submit a change request from the Contact page. You do not need to resubmit your full KYC for this correction.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-800"
                  >
                    Go to Contact Page
                    <FiArrowRight size={15} />
                  </button>
                </>
              ) : (
                <>
                  {kyc.rejectionType === "full_kyc" && (
                    <p className="mt-2 text-xs font-semibold text-rose-700">
                      Please review your KYC details and documents before resubmitting.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowResubmitForm(true)}
                    disabled={resubmitting || savingCorrections}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resubmitting ? "Submitting..." : "Resubmit KYC"}
                    {!resubmitting && <FiArrowRight size={15} />}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
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

                  <p className="text-xs text-gray-400">
                    Identity verification
                  </p>
                </div>

                <button
                  onClick={() => setPreview(doc.url)}
                  className="text-teal-800 hover:bg-teal-50 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <FiEye size={14} />
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showResubmitForm && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-slate-950/60 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-6"
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="mx-auto max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4 sm:px-7">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Update & Resubmit KYC</h3>
                <p className="mt-1 text-sm text-gray-500">Correct the rejected details and upload updated documents if needed.</p>
              </div>
              <button type="button" onClick={() => setShowResubmitForm(false)} disabled={savingCorrections} className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50" aria-label="Close KYC form">
                <FiXCircle size={21} />
              </button>
            </div>

            <form onSubmit={submitKycCorrections} className="space-y-6 p-5 sm:p-7">
              <section>
                <h4 className="mb-3 text-sm font-extrabold text-teal-900">Personal Details</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ["fullName", "Full Name", "text"],
                    ["email", "Email Address", "email"],
                    ["dob", "Date of Birth", "date"],
                  ].map(([name, label, type]) => (
                    <label key={name} className="block text-xs font-semibold text-gray-600">
                      {label}
                      <input required name={name} type={type} value={kycForm[name]} onChange={updateKycForm} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                    </label>
                  ))}
                  <label className="block text-xs font-semibold text-gray-600 sm:col-span-2">
                    Address
                    <textarea required name="address" value={kycForm.address} onChange={updateKycForm} rows={2} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                  </label>
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-sm font-extrabold text-teal-900">Identity Documents</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-gray-600">
                    PAN Number
                    <input required name="panNumber" value={kycForm.panNumber} onChange={updateKycForm} maxLength={10} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm uppercase outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                    <span className="mt-2 block text-gray-400">Current document will be kept unless you select a replacement.</span>
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setKycFiles((f) => ({ ...f, panFile: e.target.files?.[0] || null }))} className="mt-2 block w-full text-xs" />
                  </label>
                  <label className="block text-xs font-semibold text-gray-600">
                    Aadhaar Number
                    <input required name="aadhaarNumber" value={kycForm.aadhaarNumber} onChange={updateKycForm} maxLength={12} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                    <span className="mt-2 block text-gray-400">Current document will be kept unless you select a replacement.</span>
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setKycFiles((f) => ({ ...f, aadhaarFile: e.target.files?.[0] || null }))} className="mt-2 block w-full text-xs" />
                  </label>
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-sm font-extrabold text-teal-900">Nominee Details</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ["nomineeName", "Nominee Full Name", "text"],
                    ["nomineePanNumber", "Nominee PAN Number", "text"],
                    ["nomineeAadhaarNumber", "Nominee Aadhaar Number", "text"],
                    ["nomineeDob", "Nominee Date of Birth", "date"],
                  ].map(([name, label, type]) => (
                    <label key={name} className="block text-xs font-semibold text-gray-600">
                      {label}
                      <input required name={name} type={type} value={kycForm[name]} onChange={updateKycForm} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-sm font-extrabold text-teal-900">Bank Details</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ["beneficiaryName", "Account Holder Name", "text"],
                    ["accountNumber", "Account Number", "text"],
                    ["ifsc", "IFSC Code", "text"],
                    ["branch", "Bank Branch", "text"],
                  ].map(([name, label, type]) => (
                    <label key={name} className="block text-xs font-semibold text-gray-600">
                      {label}
                      <input required name={name} type={type} value={kycForm[name]} onChange={updateKycForm} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                    </label>
                  ))}
                  <label className="block text-xs font-semibold text-gray-600 sm:col-span-2">
                    Replace Cancelled Cheque (optional if existing document is correct)
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setKycFiles((f) => ({ ...f, cancelCheque: e.target.files?.[0] || null }))} className="mt-2 block w-full text-xs" />
                  </label>
                </div>
              </section>

              <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-gray-100 bg-white pt-4 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setShowResubmitForm(false)} disabled={savingCorrections} className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={savingCorrections} className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-700 px-6 py-3 text-sm font-bold text-white hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60">
                  {savingCorrections ? "Saving & Resubmitting..." : "Save Corrections & Resubmit"}
                  {!savingCorrections && <FiArrowRight size={16} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl relative shadow-2xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 font-bold p-2 text-sm"
            >
              ✕
            </button>

            <h3 className="font-extrabold text-gray-900 mb-4 text-base">
              Document Preview
            </h3>

            {preview.endsWith(".pdf") ? (
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
                {req.date ? new Date(req.date).toLocaleDateString() : "N/A"}
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

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(null);

  const [payments, setPayments] = useState([]);
  const [profile, setProfile] = useState(null);

  const [docs, setDocs] = useState([]);

  const [activeTab, setActiveTab] = useState("Active Investments");

  const [watchlist, setWatchlist] = useState([]);

  const [kycDetails, setKycDetails] = useState(null);
  const [resubmittingKyc, setResubmittingKyc] = useState(false);

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

    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
    
        setProfile(res.data?.profile || null);
      } catch (err) {
        console.error(
          "INVESTOR PROFILE FETCH ERROR:",
          err.response?.data || err.message
        );
      }
    };

    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/portfolio/payments");

        console.log("PAYMENTS RESPONSE =>", res.data);

        const paymentData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.payments)
          ? res.data.payments
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setPayments(paymentData);
      } catch (err) {
        console.log("PAYMENTS FETCH ERROR =>", err);

        setPayments([]);
      }
    };

    
const fetchDocs = async () => {
  try {
    const res = await axios.get("/api/portfolio/documents");

    setDocs(res.data.documents || []);
    setKycDetails(res.data.kycDetails || null);
  } catch (err) {
    console.error("DOCUMENTS FETCH ERROR:", err);
  }
};


    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("/api/user/watchlist");

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
    fetchProfile();
    fetchPayments();
    fetchDocs();
    fetchWatchlist();
    fetchExitRequests();
  }, []);

  const handleKycResubmit = async () => {
    try {
      const res = await axios.get("/api/portfolio/documents");
      setDocs(res.data.documents || []);
      setKycDetails(res.data.kycDetails || null);
    } catch (err) {
      console.error("KYC DOCUMENTS REFRESH ERROR:", err);
      toast.error("KYC was submitted, but the status could not be refreshed. Please reload the page.");
    }
  };

  useEffect(() => {
    if (!portfolioData) return;

    const fetchRelated = async () => {
      try {
        const firstPropertyId = portfolioData?.investments?.[0]?.propertyId;

        if (!firstPropertyId) {
          setRelatedProperties([]);
          return;
        }

        const res = await axios.get(
          `/api/properties/related/${firstPropertyId}`
        );

        console.log("RELATED PROPERTIES RESPONSE =>", res.data);

        setRelatedProperties(
          Array.isArray(res.data?.data) ? res.data.data : []
        );
      } catch (err) {
        console.error("RELATED PROPERTIES FETCH ERROR =>", err);

        setRelatedProperties([]);
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

  <InvestorProfileCard profile={profile} />

  <StatsBar data={portfolioData.summary} />

        <TabBar active={activeTab} setActive={setActiveTab} />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            {activeTab === "Active Investments" && (
              <ActiveInvestments data={portfolioData.investments} />
            )}

            {activeTab === "Pending Investments" && (
              <PendingInvestments data={portfolioData.pendingInvestments} />
            )}

            {activeTab === "Watchlist" && <WatchList data={watchlist} />}

            {activeTab === "Payment History" && <Payment data={payments} />}
          </div>
        </div>

        {activeTab === "Active Investments" && (
          <Sidebar properties={relatedProperties} />
        )}

        {activeTab === "Documents" && (
          <KycDocuments docs={docs} kyc={kycDetails} onResubmit={handleKycResubmit} resubmitting={resubmittingKyc} />
        )}

        {activeTab === "Support / Exit Request" && (
          <ExitRequests data={exitRequests} />
        )}

        {activeTab === "Refer & Earn" && <ReferralSection />}
      </main>
    </div>
  );
}