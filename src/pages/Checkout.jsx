
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiFileText,
  FiImage,
  FiLock,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiShield,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import {
  MdOutlineAccountBalance,
  MdVerified,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

/* =========================================================
   HELPERS
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const getSharePrice = (property) =>
  Number(
    property?.pricePerShare ??
      property?.sharePrice ??
      0
  );

const getAvailableShares = (property) =>
  Number(
    property?.publicAvailableShares ??
      property?.availableShares ??
      property?.sharesLeft ??
      0
  );

const getPropertyImage = (property) => {
  if (!property) return "";

  const candidates = [
    property?.image,
    property?.thumbnail,
    property?.coverImage,
    property?.images?.[0],
    property?.propertyImages?.[0],
    property?.media?.images?.[0],
  ];

  const image = candidates.find(Boolean);

  if (!image) return "";

  const url =
    typeof image === "string"
      ? image
      : image?.secure_url ||
        image?.url ||
        image?.path ||
        "";

  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

/* =========================================================
   TRUST BADGES
========================================================= */

function TrustBadges() {
  const badges = [
    {
      icon: <FiLock size={14} />,
      label: "Secure Payment",
    },
    {
      icon: <MdVerified size={15} />,
      label: "Verified Property",
    },
    {
      icon: <MdOutlineAccountBalance size={15} />,
      label: "Transparent Ownership",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2.5">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 shadow-sm"
        >
          <span className="text-teal-700">
            {badge.icon}
          </span>
          {badge.label}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({ property }) {
  const imageUrl = getPropertyImage(property);
  const [imageError, setImageError] = useState(false);

  const location = [
    property?.location?.city || property?.city,
    property?.location?.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="relative h-[250px] sm:h-[300px] overflow-hidden bg-slate-100">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={property?.name || "Property"}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <FiImage size={32} />
            <span className="mt-2 text-sm font-semibold">
              Property image unavailable
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/15 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 shadow-lg backdrop-blur">
          <MdVerified className="text-emerald-600" size={16} />
          Verified Property
        </div>

        <div className="absolute right-4 top-4 rounded-2xl bg-teal-700 px-4 py-2.5 text-white shadow-xl">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/70">
            Expected ROI
          </p>
          <p className="mt-0.5 text-xl font-extrabold">
            {property?.roi || 0}%
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-1.5 text-xs text-white/80">
                <FiMapPin size={14} />
                <span className="truncate">
                  {location || "Location unavailable"}
                </span>
              </div>

              <h2 className="truncate text-2xl font-extrabold tracking-tight sm:text-3xl">
                {property?.name || "Untitled Property"}
              </h2>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                Property Grade
              </p>
              <p className="mt-1 text-sm font-bold uppercase">
                {property?.propertyGrade || "A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 sm:p-5">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Property Type
          </p>
          <p className="mt-1 text-sm font-extrabold capitalize text-slate-800">
            {property?.type || "N/A"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Per Share
          </p>
          <p className="mt-1 text-sm font-extrabold text-slate-800">
            {formatINR(getSharePrice(property))}
          </p>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700/70">
            Available
          </p>
          <p className="mt-1 text-sm font-extrabold text-teal-800">
            {getAvailableShares(property)} Shares
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SHARE SELECTOR
========================================================= */

function ShareSelector({ shares, setShares, property }) {
  const price = getSharePrice(property);
  const totalShares = Number(property?.totalShares || 0);
  const availableShares = getAvailableShares(property);
  const cycle = Number(property?.shareBuyingCycle || 5);
  const minimumShares = 10;

  const maxShares = useMemo(() => {
    if (availableShares < minimumShares) return 0;

    const maxByAvailability =
      minimumShares +
      Math.floor(
        (availableShares - minimumShares) / cycle
      ) *
        cycle;

    return Math.min(
      totalShares || maxByAvailability,
      maxByAvailability
    );
  }, [availableShares, cycle, totalShares]);

  useEffect(() => {
    if (maxShares < minimumShares) {
      setShares(0);
      return;
    }

    if (
      shares < minimumShares ||
      shares > maxShares
    ) {
      setShares(minimumShares);
    }
  }, [maxShares, shares, setShares]);

  if (maxShares < minimumShares) {
    return (
      <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <FiAlertCircle
            className="mt-0.5 text-red-500"
            size={19}
          />
          <div>
            <h3 className="font-bold text-red-700">
              Investment currently unavailable
            </h3>
            <p className="mt-1 text-sm text-red-600">
              At least 10 shares must be available to continue.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const ownership =
    totalShares > 0
      ? ((shares / totalShares) * 100).toFixed(2)
      : "0.00";

  const investment = shares * price;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">
            Select Number of Shares
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Start from 10 shares and increase in {cycle}-share increments.
          </p>
        </div>

        <span className="w-fit rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
          {availableShares} shares available
        </span>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              setShares((prev) =>
                Math.max(minimumShares, prev - cycle)
              )
            }
            disabled={shares <= minimumShares}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiMinus size={17} />
          </button>

          <div className="min-w-[70px] text-center">
            <p className="text-2xl font-extrabold text-slate-900">
              {shares}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Shares
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShares((prev) =>
                Math.min(maxShares, prev + cycle)
              )
            }
            disabled={shares >= maxShares}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-md transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiPlus size={17} />
          </button>
        </div>

        <div className="border-t border-teal-100 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
          <p className="text-xs text-slate-500">
            Ownership{" "}
            <span className="font-bold text-teal-700">
              {ownership}%
            </span>
          </p>
          <p className="mt-1 text-xl font-extrabold text-slate-900">
            {formatINR(investment)}
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REFERRAL
========================================================= */

function ReferralCode({
  code,
  setCode,
  applied,
  setApplied,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applyCode = async () => {
    if (!code.trim()) {
      setError("Please enter a referral code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "/api/investments/validate-referral",
        { code: code.trim() }
      );

      if (res.data?.valid) {
        setApplied(true);
      } else {
        setApplied(false);
        setError("Invalid referral code.");
      }
    } catch {
      setApplied(false);
      setError("Invalid referral code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm font-extrabold text-slate-900">
          Referral Code
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Optional — enter your broker or referral code if applicable.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex min-h-[46px] flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-teal-500 focus-within:bg-white">
          <input
            value={code}
            disabled={applied}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter referral code"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none disabled:cursor-not-allowed"
          />

          {applied && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <FiCheck size={14} />
              Applied
            </span>
          )}
        </div>

        {applied ? (
          <button
            type="button"
            onClick={() => {
              setApplied(false);
              setCode("");
              setError("");
            }}
            className="rounded-xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={applyCode}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Apply"}
          </button>
        )}
      </div>

      {applied && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <FiCheckCircle />
          Referral code applied successfully.
        </p>
      )}

      {error && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-500">
          <FiAlertCircle />
          {error}
        </p>
      )}
    </section>
  );
}

/* =========================================================
   INVESTMENT BREAKDOWN
========================================================= */

function InvestmentBreakdown({ shares, property }) {
  const investment = shares * getSharePrice(property);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-base font-extrabold text-slate-900">
        Investment Breakdown
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-slate-500">
          <span>Investment Amount</span>
          <span className="font-semibold text-slate-800">
            {formatINR(investment)}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-500">
          <span>Platform Fee</span>
          <span className="font-semibold text-emerald-600">
            ₹0
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-500">
          <span>Taxes</span>
          <span className="font-semibold text-emerald-600">
            ₹0
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-extrabold text-slate-900">
            Total Payable
          </span>
          <span className="text-lg font-extrabold text-teal-700">
            {formatINR(investment)}
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   AGREEMENT
========================================================= */

function AgreementRow({ agreed, setAgreed }) {
  return (
    <button
      type="button"
      onClick={() => setAgreed((value) => !value)}
      className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-teal-200"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border ${
          agreed
            ? "border-teal-700 bg-teal-700 text-white"
            : "border-slate-300 bg-white"
        }`}
      >
        {agreed && <FiCheck size={13} />}
      </span>

      <span className="text-xs leading-relaxed text-slate-500 sm:text-sm">
        I agree to the investment terms, ownership structure and legal documentation.
        <span className="ml-1 font-semibold text-teal-700">
          View Agreement
        </span>
      </span>
    </button>
  );
}

/* =========================================================
   SUMMARY
========================================================= */

function InvestmentSummary({ shares, property }) {
  const price = getSharePrice(property);
  const investment = shares * price;
  const roi = Number(property?.roi || 0);
  const annual = (investment * roi) / 100;
  const monthly = annual / 12;
  const totalShares = Number(property?.totalShares || 1);

  const location = [
    property?.location?.city || property?.city,
    property?.location?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const rows = [
    ["Property", property?.name || "-"],
    ["Location", location || "-"],
    ["Share Price", formatINR(price)],
    ["Selected Shares", `${shares} Shares`],
    [
      "Ownership",
      `${((shares / totalShares) * 100).toFixed(2)}%`,
    ],
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:p-6">
      <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
        Investment Summary
      </p>

      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <span className="text-slate-500">{label}</span>
            <span
              className={`max-w-[60%] text-right font-bold ${
                label === "Ownership"
                  ? "text-teal-700"
                  : "text-slate-800"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
          Financial Snapshot
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold text-slate-400">
              Estimated Annual
            </p>
            <p className="mt-1 text-base font-extrabold text-slate-900">
              {formatINR(annual)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-slate-400">
              Monthly Income
            </p>
            <p className="mt-1 text-base font-extrabold text-slate-900">
              {formatINR(Math.round(monthly))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FUNDING PROGRESS
========================================================= */

function FundingProgress({ property }) {
  const funded = Number(
    property?.soldPercent ??
      property?.fundedPercent ??
      0
  );

  const available = getAvailableShares(property);

  return (
    <section className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800">
            Funding Progress
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Live property funding status
          </p>
        </div>

        <span className="text-lg font-extrabold text-teal-700">
          {funded}%
        </span>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/90">
        <div
          className="h-full rounded-full bg-teal-700 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, funded))}%` }}
        />
      </div>

      <p className="mt-3 text-xs font-semibold text-teal-800">
        {available} shares currently available
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-teal-100 pt-4 text-center">
        {[
          [<FiShield size={17} />, "Secure"],
          [<MdVerified size={18} />, "Verified"],
          [<FiFileText size={17} />, "Legal"],
        ].map(([icon, label]) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-teal-700">{icon}</span>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PAYMENT MODAL
========================================================= */

function PaymentModal({
  show,
  onClose,
  property,
  shares,
  paymentSettings,
  paymentSettingsLoading,
  paymentMethod,
  setPaymentMethod,
  paymentReference,
  setPaymentReference,
  paymentScreenshot,
  setPaymentScreenshot,
  paymentSubmitting,
  submitPaymentProof,
}) {
  const amount = shares * getSharePrice(property);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!paymentScreenshot) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(paymentScreenshot);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [paymentScreenshot]);

  if (!show) return null;

  const bankDetails = [
    ["Account Name", paymentSettings?.accountName],
    ["Account Number", paymentSettings?.accountNumber],
    ["IFSC Code", paymentSettings?.ifscCode],
    ["Bank Name", paymentSettings?.bankName],
  ];

  /*
    IMPORTANT:
    This modal is rendered with a Portal directly into document.body.
    The outer layer owns the viewport, while only .payment-modal-scroll
    is allowed to scroll.
  */
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] h-[100dvh] w-screen overflow-hidden bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-full w-full items-center justify-center">
        <div
          className="flex h-full max-h-[calc(100dvh-24px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-[90vh] sm:max-h-[900px] sm:rounded-3xl"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* FIXED HEADER */}
          <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <FiLock size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Complete Your Payment
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Submit your payment details for secure verification.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* THIS IS THE ONLY SCROLL AREA */}
          <div
            className="min-h-0 flex-1 overflow-y-scroll overscroll-contain px-5 py-5 sm:px-7 sm:py-6"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              touchAction: "pan-y",
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="space-y-5 pb-6">
              <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-600 p-5 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  Amount Payable
                </p>
                <p className="mt-1 text-3xl font-extrabold">
                  {formatINR(amount)}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {shares} selected shares
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-extrabold text-slate-900">
                  Choose Payment Method
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      name: "Bank Transfer",
                      icon: <MdOutlineAccountBalance size={22} />,
                      text: "Transfer directly to our bank account",
                    },
                    {
                      name: "UPI",
                      icon: <span className="text-sm font-extrabold">UPI</span>,
                      text: "Scan QR code or pay using UPI ID",
                    },
                  ].map((method) => {
                    const selected = paymentMethod === method.name;

                    return (
                      <button
                        type="button"
                        key={method.name}
                        onClick={() => setPaymentMethod(method.name)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600/10"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-teal-700 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {method.icon}
                          </div>

                          <div>
                            <p className="text-sm font-extrabold text-slate-900">
                              {method.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-500">
                              {method.text}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {paymentMethod === "Bank Transfer" && (
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Bank Account Details
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Use these details to complete the transfer.
                      </p>
                    </div>
                    <MdOutlineAccountBalance
                      className="shrink-0 text-teal-700"
                      size={22}
                    />
                  </div>

                  {paymentSettingsLoading ? (
                    <p className="py-5 text-center text-sm text-slate-400">
                      Loading bank details...
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {bankDetails.map(([label, value]) => (
                        <div
                          key={label}
                          className="flex flex-col gap-1 border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="text-slate-500">{label}</span>
                          <span className="break-all text-left font-bold text-slate-800 sm:text-right">
                            {value || "Not available"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === "UPI" && (
                <div className="rounded-2xl border border-slate-200 p-5 text-center">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Scan QR Code to Pay
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Use any supported UPI application.
                  </p>

                  <div className="mx-auto mt-5 flex h-44 w-44 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                    {paymentSettingsLoading ? (
                      <span className="text-xs text-slate-400">Loading QR...</span>
                    ) : paymentSettings?.qrCode ? (
                      <img
                        src={paymentSettings.qrCode}
                        alt="Payment QR Code"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        QR unavailable
                      </span>
                    )}
                  </div>

                  {paymentSettings?.upiId && (
                    <div className="mt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        UPI ID
                      </p>
                      <p className="mt-1 break-all text-sm font-extrabold text-slate-800">
                        {paymentSettings.upiId}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Payment Reference / UTR
                </label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="Enter transaction reference"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Enter the transaction reference generated after payment.
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700">
                  Payment Screenshot
                </p>

                <label className="mt-2 flex min-h-[140px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-teal-300 hover:bg-teal-50/40">
                  {preview ? (
                    <div className="w-full p-2">
                      <img
                        src={preview}
                        alt="Payment preview"
                        className="h-[170px] w-full rounded-xl object-contain"
                      />
                      <p className="mt-2 truncate px-2 text-center text-xs font-bold text-slate-600">
                        {paymentScreenshot?.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud size={26} className="text-teal-600" />
                      <span className="mt-2 text-sm font-bold text-slate-700">
                        Upload Payment Screenshot
                      </span>
                      <span className="mt-1 text-xs text-slate-400">
                        PNG, JPG or JPEG
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setPaymentScreenshot(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <FiShield size={18} className="mt-0.5 shrink-0 text-teal-700" />
                <p className="text-xs leading-relaxed text-slate-500">
                  Your payment details are securely submitted for admin verification.
                  Your investment will be processed after payment verification.
                </p>
              </div>
            </div>
          </div>

          {/* FIXED FOOTER */}
          <div className="shrink-0 border-t border-slate-100 bg-white p-4 sm:px-7 sm:py-5">
            <button
              type="button"
              onClick={submitPaymentProof}
              disabled={paymentSubmitting}
              className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentSubmitting
                ? "Submitting Payment Proof..."
                : `Submit Payment Proof • ${formatINR(amount)}`}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


/* =========================================================
   MAIN CHECKOUT
========================================================= */

export default function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loadingProperty, setLoadingProperty] =
    useState(true);
  const [propertyError, setPropertyError] =
    useState("");

  const [shares, setShares] = useState(10);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [showAuthPopup, setShowAuthPopup] =
    useState(false);

  const [investmentId, setInvestmentId] =
    useState(null);

  const [showPaymentSection, setShowPaymentSection] =
    useState(false);

  const [paymentSettings, setPaymentSettings] =
    useState(null);

  const [
    paymentSettingsLoading,
    setPaymentSettingsLoading,
  ] = useState(false);

  const [paymentReference, setPaymentReference] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Bank Transfer");

  const [paymentScreenshot, setPaymentScreenshot] =
    useState(null);

  const [paymentSubmitting, setPaymentSubmitting] =
    useState(false);

  const isLoggedIn =
    !!localStorage.getItem("token");

  /* ---------------- FETCH PROPERTY ---------------- */

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setPropertyError("Property ID not found.");
        setLoadingProperty(false);
        return;
      }

      try {
        setLoadingProperty(true);
        setPropertyError("");

        const res = await axios.get(
          `/api/properties/${id}`
        );

        const propertyData =
          res.data?.property ||
          res.data?.data ||
          res.data;

        const normalizedImages =
          Array.isArray(propertyData?.images)
            ? propertyData.images
            : Array.isArray(propertyData?.media?.images)
            ? propertyData.media.images
            : propertyData?.image
            ? [propertyData.image]
            : [];

        const normalizedProperty = {
          ...propertyData,
          images: normalizedImages,
          image:
            propertyData?.image ||
            normalizedImages[0] ||
            propertyData?.media?.images?.[0] ||
            "",
        };

        console.log(
          "CHECKOUT PROPERTY:",
          normalizedProperty
        );
        console.log(
          "PROPERTY IMAGE:",
          getPropertyImage(normalizedProperty)
        );

        setProperty(normalizedProperty);
      } catch (error) {
        console.error(
          "PROPERTY FETCH ERROR:",
          error
        );
        setPropertyError(
          error?.response?.data?.message ||
            "Unable to load property details."
        );
      } finally {
        setLoadingProperty(false);
      }
    };

    fetchProperty();
  }, [id]);

  /* ---------------- FETCH PAYMENT SETTINGS ---------------- */

  const fetchPaymentSettings = async () => {
    try {
      setPaymentSettingsLoading(true);

      const res = await axios.get(
        "/api/investments/payment-settings"
      );

      setPaymentSettings(
        res.data?.settings ||
          res.data?.data ||
          res.data ||
          null
      );
    } catch (error) {
      console.error(
        "PAYMENT SETTINGS ERROR:",
        error
      );
      setPaymentSettings(null);
    } finally {
      setPaymentSettingsLoading(false);
    }
  };

  useEffect(() => {
    if (showPaymentSection) {
      fetchPaymentSettings();
    }
  }, [showPaymentSection]);

  /* ---------------- LOCK BACKGROUND ---------------- */

  useEffect(() => {
    if (!showPaymentSection) return;

    const body = document.body;
    const html = document.documentElement;
    const root = document.getElementById("root");
    const scrollY = window.scrollY;

    const previousBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    const previousHtml = {
      overflow: html.style.overflow,
      height: html.style.height,
    };

    const previousRoot = root
      ? {
          overflow: root.style.overflow,
          height: root.style.height,
        }
      : null;

    // Lock every normal application scroll container.
    html.style.overflow = "hidden";
    html.style.height = "100%";

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (root) {
      root.style.overflow = "hidden";
      root.style.height = "100%";
    }

    return () => {
      html.style.overflow = previousHtml.overflow;
      html.style.height = previousHtml.height;

      body.style.overflow = previousBody.overflow;
      body.style.position = previousBody.position;
      body.style.top = previousBody.top;
      body.style.left = previousBody.left;
      body.style.right = previousBody.right;
      body.style.width = previousBody.width;

      if (root && previousRoot) {
        root.style.overflow = previousRoot.overflow;
        root.style.height = previousRoot.height;
      }

      window.scrollTo(0, scrollY);
    };
  }, [showPaymentSection]);

  /* ---------------- CREATE INVESTMENT ---------------- */

  const onSubmit = async () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    if (!agreed) {
      alert(
        "Please accept the investment agreement to continue."
      );
      return;
    }

    if (!property) return;

    try {
      const propertyId =
        property?._id || property?.id;

      const kycRes = await axios.get("/api/kyc");
      const kyc =
        kycRes.data?.kyc ||
        kycRes.data?.data ||
        kycRes.data;

      if (
        !kyc ||
        kyc?.status === "draft" ||
        kyc?.status === "rejected"
      ) {
        navigate("/kyc", {
          state: {
            returnToInvestment: true,
            property,
            propertyId,
            shares,
            referralCode: applied ? code : "",
          },
        });
        return;
      }

      const res = await axios.post(
        "/api/investments/create",
        {
          propertyId,
          shares,
          referralCode: applied ? code : "",
        }
      );

      const investment =
        res.data?.investment ||
        res.data?.data ||
        res.data;

      if (!investment?._id) {
        throw new Error(
          "Investment was not created."
        );
      }

      setInvestmentId(investment._id);
      setShowPaymentSection(true);
    } catch (error) {
      console.error(
        "CREATE INVESTMENT ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to continue with investment."
      );
    }
  };

  /* ---------------- SUBMIT PAYMENT PROOF ---------------- */

  const submitPaymentProof = async () => {
    if (!investmentId) {
      alert("Investment not found.");
      return;
    }

    if (!paymentReference.trim()) {
      alert(
        "Please enter payment reference / UTR."
      );
      return;
    }

    if (!paymentScreenshot) {
      alert(
        "Please upload payment screenshot."
      );
      return;
    }

    try {
      setPaymentSubmitting(true);

      const formData = new FormData();

      formData.append(
        "paymentReference",
        paymentReference.trim()
      );

      formData.append(
        "paymentMethod",
        paymentMethod
      );

      formData.append(
        "document",
        paymentScreenshot
      );

      await axios.post(
        `/api/investments/${investmentId}/payment-proof`,
        formData
      );

      navigate("/investment-success", {
        state: {
          propertyName: property?.name,
          amount:
            getSharePrice(property) * shares,
          shares,
          paymentReference,
          location: property?.location,
          totalShares: property?.totalShares,
        },
      });
    } catch (error) {
      console.error(
        "PAYMENT PROOF ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to submit payment proof."
      );
    } finally {
      setPaymentSubmitting(false);
    }
  };

  /* ---------------- LOADING / ERROR ---------------- */

  if (loadingProperty) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (propertyError || !property) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <FiAlertCircle
            size={30}
            className="mx-auto text-red-500"
          />
          <h2 className="mt-4 text-lg font-extrabold text-slate-900">
            Unable to load property
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {propertyError}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
          >
            <FiChevronLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f8fafc_100%)]">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-7">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-teal-700"
            >
              <FiChevronLeft />
              Back to Property
            </button>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Confirm Your Investment
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Review your investment details and proceed securely.
            </p>

            <div className="mt-5">
              <TrustBadges />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="space-y-5 lg:col-span-3">
              <PropertyCard property={property} />

              <ShareSelector
                shares={shares}
                setShares={setShares}
                property={property}
              />

              <ReferralCode
                code={code}
                setCode={setCode}
                applied={applied}
                setApplied={setApplied}
              />

              <InvestmentBreakdown
                shares={shares}
                property={property}
              />

              <AgreementRow
                agreed={agreed}
                setAgreed={setAgreed}
              />

              <button
                type="button"
                onClick={onSubmit}
                disabled={!agreed}
                className={`w-full rounded-2xl py-4 text-sm font-extrabold text-white shadow-lg transition ${
                  agreed
                    ? "bg-teal-700 hover:bg-teal-800 hover:shadow-xl"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Proceed to Secure Payment
              </button>
            </div>

            <aside className="space-y-4 lg:col-span-2">
              <div className="lg:sticky lg:top-6">
                <div className="space-y-4">
                  <InvestmentSummary
                    shares={shares}
                    property={property}
                  />

                  <FundingProgress
                    property={property}
                  />
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <PaymentModal
        show={showPaymentSection}
        onClose={() => setShowPaymentSection(false)}
        property={property}
        shares={shares}
        paymentSettings={paymentSettings}
        paymentSettingsLoading={
          paymentSettingsLoading
        }
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentReference={paymentReference}
        setPaymentReference={setPaymentReference}
        paymentScreenshot={paymentScreenshot}
        setPaymentScreenshot={setPaymentScreenshot}
        paymentSubmitting={paymentSubmitting}
        submitPaymentProof={submitPaymentProof}
      />

      {showAuthPopup && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <FiLock size={21} />
            </div>

            <h3 className="mt-4 text-xl font-extrabold text-slate-900">
              Login Required
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Please login or create an account to continue with your investment.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
              >
                Signup
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowAuthPopup(false)}
              className="mt-5 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
