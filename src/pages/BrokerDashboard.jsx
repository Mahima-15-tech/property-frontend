import { useState, useEffect, useMemo } from "react";

import {
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
} from "react-icons/hi";

import {
  HiOutlineSquares2X2,
  HiBriefcase,
  HiOutlineBanknotes,
  HiOutlineQuestionMarkCircle,
  HiArrowRightOnRectangle,
  HiOutlineShare,
  HiOutlineClipboardDocument,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowTrendingUp,
  HiOutlineClock,
} from "react-icons/hi2";

import {
  RiCopperCoinLine,
  RiMoneyRupeeCircleLine,
} from "react-icons/ri";

import {
  RxCross1,
} from "react-icons/rx";

import axios from "../utils/axios";

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  {
    icon: HiOutlineSquares2X2,
    label: "Overview",
    type: "overview",
  },
  {
    icon: HiOutlineUserGroup,
    label: "Total Referrals",
    type: "referral",
  },
  {
    icon: HiOutlineShieldCheck,
    label: "Total Converted",
    type: "converted",
  },
  {
    icon: HiOutlineBanknotes,
    label: "Commission",
    type: "commission",
  },
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const normalized =
    String(status || "").toLowerCase();

  let styles =
    "bg-slate-100 text-slate-600 border-slate-200";

  let label = status || "Pending";

  if (
    normalized === "completed" ||
    normalized === "approved" ||
    normalized === "paid"
  ) {
    styles =
      "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (
    normalized === "in process" ||
    normalized === "pending" ||
    normalized === "processing"
  ) {
    styles =
      "bg-amber-50 text-amber-700 border-amber-200";
  } else if (
    normalized === "rejected" ||
    normalized === "failed"
  ) {
    styles =
      "bg-red-50 text-red-700 border-red-200";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  setMobileOpen,
  profile,
}) {
  const [copied, setCopied] = useState(false);

  const referralCode =
    profile?.referralCode || "";

  const handleCopy = async () => {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(
        referralCode
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.log("Copy failed", error);
    }
  };

  const handleShare = () => {
    if (!referralCode) return;

    const text = `Join using my referral code: ${referralCode} ${
      profile?.shareLink || ""
    }`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (
    <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-3">

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm lg:hidden"
          onClick={() =>
            setMobileOpen((prev) => !prev)
          }
        >
          <HiOutlineSquares2X2 className="text-xl" />
        </button>

        <div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">
              Partner Portal
            </span>
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Broker Dashboard
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage your referrals, conversions and earnings.
          </p>

        </div>
      </div>

      {/* RIGHT ACTIONS */}

      <div className="flex flex-wrap items-center gap-2">

        {/* REFERRAL CODE */}

        <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">

          <div className="px-3 py-1.5">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Referral Code
            </p>

            <p className="text-xs font-bold tracking-wide text-slate-800">
              {referralCode || "----"}
            </p>

          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            title="Copy referral code"
          >
            {copied ? (
              <HiOutlineCheckCircle className="text-emerald-600" />
            ) : (
              <HiOutlineClipboardDocument />
            )}
          </button>

        </div>

        {/* SHARE */}

        <button
          type="button"
          onClick={handleShare}
          disabled={!referralCode}
          className="flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HiOutlineShare className="text-base" />
          Share Code
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   STAT CARDS
========================================================= */

function StatCards({ data }) {
  if (!data) return null;

  const cards = [
    {
      icon: HiOutlineUserGroup,
      label: "Total Referrals",
      value: Number(
        data.referrals || 0
      ).toLocaleString(),
      description: "People referred",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "bg-blue-500",
    },
    {
      icon: HiOutlineShieldCheck,
      label: "Total Converted",
      value: Number(
        data.conversions || 0
      ).toLocaleString(),
      description: "Successful investments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
    },
    {
      icon: RiCopperCoinLine,
      label: "Total Earnings",
      value: `₹${Number(
        data.totalEarnings || 0
      ).toLocaleString()}`,
      description: "Commission earned",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "bg-violet-500",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

      {cards.map(
        ({
          icon: Icon,
          label,
          value,
          description,
          iconBg,
          iconColor,
          accent,
        }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >

            <div className="p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {label}
                  </p>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {value}
                  </p>

                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
                >
                  <Icon className="text-xl" />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                <HiOutlineArrowTrendingUp className="text-sm text-slate-400" />
                {description}
              </div>

            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 h-1 ${accent}`}
            />

          </div>
        )
      )}

    </div>
  );
}

/* =========================================================
   REFERRAL CODE CARD
========================================================= */

function BrokerCodeCard({ profile }) {
  const [copied, setCopied] = useState(false);

  const code =
    profile?.referralCode || "----";

  const copyCode = async () => {
    if (!profile?.referralCode) return;

    try {
      await navigator.clipboard.writeText(
        profile.referralCode
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.log("Copy failed", error);
    }
  };

  const shareCode = () => {
    if (!profile?.referralCode) return;

    const text = `Join using my referral code: ${profile.referralCode} ${
      profile.shareLink || ""
    }`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg">

      {/* decorative circles */}

      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10" />

      <div className="absolute -bottom-16 right-16 h-40 w-40 rounded-full bg-blue-400/10" />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              Your Partner Code
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              Share & Grow
            </h2>

            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-400">
              Share your referral code with investors
              and track every successful conversion.
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
            <HiOutlineShare className="text-lg" />
          </div>

        </div>

        {/* CODE */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <div className="flex flex-1 items-center justify-between rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Referral Code
              </p>

              <p className="mt-1 text-base font-bold tracking-[0.15em] text-white">
                {code}
              </p>

            </div>

            <button
              type="button"
              onClick={copyCode}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
            >
              {copied ? (
                <HiOutlineCheckCircle className="text-emerald-400" />
              ) : (
                <HiOutlineClipboardDocument />
              )}
            </button>

          </div>

          <button
            type="button"
            onClick={shareCode}
            disabled={!profile?.referralCode}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <HiOutlineShare className="text-base" />
            Share Referral
          </button>

        </div>

        {copied && (
          <p className="mt-2 text-[10px] font-medium text-emerald-400">
            Referral code copied successfully.
          </p>
        )}

      </div>
    </div>
  );
}

/* =========================================================
   PERFORMANCE CARD
========================================================= */

function PerformanceCard({ dashboard }) {
  const referrals = Number(
    dashboard?.referrals || 0
  );

  const conversions = Number(
    dashboard?.conversions || 0
  );

  const rate =
    referrals > 0
      ? Math.min(
          100,
          (conversions / referrals) * 100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <HiOutlineArrowTrendingUp className="text-lg text-emerald-600" />
            </div>

            <div>

              <h3 className="text-sm font-bold text-slate-900">
                Referral Performance
              </h3>

              <p className="text-[10px] text-slate-400">
                Conversion overview
              </p>

            </div>

          </div>

        </div>

        <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
          {rate.toFixed(1)}%
        </span>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-[10px] font-medium text-slate-400">
            Referral conversion
          </span>

          <span className="text-[10px] font-bold text-slate-700">
            {conversions} / {referrals}
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
            style={{
              width: `${rate}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Referrals
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {referrals}
          </p>

        </div>

        <div className="rounded-xl bg-emerald-50 p-3">

          <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
            Converted
          </p>

          <p className="mt-1 text-lg font-bold text-emerald-700">
            {conversions}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   RECENT INVESTORS
========================================================= */

function RecentInvestors({ investors }) {
  const [page, setPage] = useState(1);

  const perPage = 5;

  const totalPages =
    Math.ceil(
      (investors?.length || 0) /
        perPage
    ) || 1;

  const currentInvestors =
    investors?.slice(
      (page - 1) * perPage,
      page * perPage
    ) || [];

  useEffect(() => {
    setPage(1);
  }, [investors]);

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      );
    }

    const pages = [1];

    if (page > 3) {
      pages.push("left");
    }

    const start = Math.max(
      2,
      page - 1
    );

    const end = Math.min(
      totalPages - 1,
      page + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("right");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <HiOutlineUserGroup className="text-lg text-blue-600" />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              Recent Referred Investors
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Latest activity from your referral network
            </p>

          </div>

        </div>

        <span className="w-fit rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
          {investors?.length || 0} Investors
        </span>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[760px]">

          <thead className="bg-slate-50/70">

            <tr>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Investor
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Property
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Date
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {currentInvestors.length > 0 ? (
              currentInvestors.map(
                (row, index) => {

                  const name =
                    row?.investorName ||
                    row?.name ||
                    "Unknown";

                  return (
                    <tr
                      key={
                        row?._id ||
                        row?.id ||
                        index
                      }
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* INVESTOR */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700">
                            {name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>

                            <p className="text-xs font-semibold text-slate-800">
                              {name}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CONTACT */}

                      <td className="px-5 py-4 text-xs text-slate-500">
                      {row?.email || "—"}
                      </td>

                      {/* PROPERTY */}

                      <td className="max-w-[180px] px-5 py-4">

                        <p className="truncate text-xs font-medium text-slate-700">
                          {row?.property ||
                            "—"}
                        </p>

                      </td>

                      {/* AMOUNT */}

                      <td className="px-5 py-4">

                        <span className="text-xs font-bold text-emerald-600">
                          ₹
                          {Number(
                            row?.amount || 0
                          ).toLocaleString()}
                        </span>

                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <HiOutlineCalendar className="text-slate-400" />

                          {row?.date
                            ? new Date(
                                row.date
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "—"}
                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4 text-right">
                        <StatusBadge
                          status={
                            row?.status ||
                            "Pending"
                          }
                        />
                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>

                <td
                  colSpan={6}
                  className="py-14 text-center"
                >

                  <div className="mx-auto flex max-w-xs flex-col items-center">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                      <HiOutlineUserGroup className="text-lg text-slate-400" />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-slate-600">
                      No referred investors yet
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Share your referral code to start building your network.
                    </p>

                  </div>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      {(investors?.length || 0) > 0 && (
        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[10px] text-slate-500">

            Showing{" "}

            <span className="font-bold text-slate-800">
              {(page - 1) *
                  perPage +
                1}
            </span>

            {" "}to{" "}

            <span className="font-bold text-slate-800">
              {Math.min(
                page * perPage,
                investors.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-bold text-slate-800">
              {investors.length}
            </span>

          </p>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronLeft />
            </button>

            {getPages().map(
              (item, index) => {

                if (
                  item === "left" ||
                  item === "right"
                ) {
                  return (
                    <span
                      key={`${item}-${index}`}
                      className="flex h-8 min-w-6 items-center justify-center text-xs font-bold text-slate-400"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() =>
                      setPage(item)
                    }
                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                      page === item
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                );
              }
            )}

            <button
              type="button"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.min(
                      totalPages,
                      prev + 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronRight />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   COMMISSION DETAILS
========================================================= */

function CommissionDetails({
  commissions,
}) {
  const [page, setPage] = useState(1);

  const perPage = 5;

  const totalPages =
    Math.ceil(
      (commissions?.length || 0) /
        perPage
    ) || 1;

  const currentCommissions =
    commissions?.slice(
      (page - 1) * perPage,
      page * perPage
    ) || [];

  useEffect(() => {
    setPage(1);
  }, [commissions]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
            <RiMoneyRupeeCircleLine className="text-lg text-violet-600" />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              Commission History
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Track commission earned from your referrals
            </p>

          </div>

        </div>

        <span className="hidden rounded-lg bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700 sm:block">
          {commissions?.length || 0} Records
        </span>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[600px]">

          <thead className="bg-slate-50/70">

            <tr>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Property
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Investor
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Commission
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {currentCommissions.length > 0 ? (
              currentCommissions.map(
                (row, index) => {

                  const investor =
                    row?.investor ||
                    "Unknown";

                  return (
                    <tr
                      key={
                        row?._id ||
                        row?.id ||
                        index
                      }
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >

                      <td className="px-5 py-4">

                        <p className="max-w-[200px] truncate text-xs font-semibold text-slate-800">
                          {row?.property ||
                            "—"}
                        </p>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2.5">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600">
                            {investor
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <span className="text-xs font-medium text-slate-600">
                            {investor}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1.5">

                          <RiCopperCoinLine className="text-sm text-emerald-500" />

                          <span className="text-xs font-bold text-emerald-600">
                            ₹
                            {Number(
                              row?.commission ||
                                0
                            ).toLocaleString()}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-right">

                        <StatusBadge
                          status={
                            row?.status ||
                            "Pending"
                          }
                        />

                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>

                <td
                  colSpan={4}
                  className="py-14 text-center"
                >

                  <div className="mx-auto flex max-w-xs flex-col items-center">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                      <RiMoneyRupeeCircleLine className="text-lg text-slate-400" />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-slate-600">
                      No commission records
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Commission history will appear here after successful referrals.
                    </p>

                  </div>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      {(commissions?.length || 0) > perPage && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">

          <p className="text-[10px] text-slate-400">
            Page{" "}
            <span className="font-bold text-slate-700">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronLeft />
            </button>

            <button
              type="button"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.min(
                      totalPages,
                      prev + 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronRight />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   EARNINGS SUMMARY
========================================================= */

function EarningsSummary({ data }) {
  if (!data) return null;

  const total = Number(
    data.total || 0
  );

  const target = Number(
    data.target || 0
  );

  const percent =
    target > 0
      ? Math.min(
          100,
          (total / target) * 100
        )
      : Number(data.percent || 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
            <HiOutlineClock className="text-lg text-amber-600" />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              Earnings Summary
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Current payout progress
            </p>

          </div>

        </div>

        <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">
          {percent.toFixed(0)}%
        </span>

      </div>

      <div className="mt-6">

        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Current Earnings
        </p>

        <p className="mt-1 text-xl font-bold text-slate-900">
          ₹{total.toLocaleString()}
        </p>

      </div>

      {target > 0 && (
        <>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{
                width: `${percent}%`,
              }}
            />

          </div>

          <div className="mt-2 flex justify-between">

            <span className="text-[10px] text-slate-400">
              Progress
            </span>

            <span className="text-[10px] font-semibold text-slate-600">
              ₹{total.toLocaleString()} / ₹
              {target.toLocaleString()}
            </span>

          </div>
        </>
      )}

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">

        <HiOutlineCalendar className="text-sm text-slate-400" />

        <div>

          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Next Payout
          </p>

          <p className="mt-0.5 text-xs font-semibold text-slate-700">
            {data.nextPayout || "To be announced"}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   REFERRAL LIST
========================================================= */

function ReferralList({
  referrals,
}) {
  const [page, setPage] = useState(1);

  const perPage = 6;

  const totalPages =
    Math.ceil(
      (referrals?.length || 0) /
        perPage
    ) || 1;

  const current =
    referrals?.slice(
      (page - 1) * perPage,
      page * perPage
    ) || [];

  useEffect(() => {
    setPage(1);
  }, [referrals]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <HiOutlineUserGroup className="text-lg text-blue-600" />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              Total Referrals
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              People who joined through your referral
            </p>

          </div>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[620px]">

          <thead className="bg-slate-50/70">

            <tr>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                User
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Joined
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {current.length > 0 ? (
              current.map(
                (row, index) => {

                  const name =
                    row?.name ||
                    "Unknown";

                  return (
                    <tr
                      key={
                        row?._id ||
                        row?.id ||
                        index
                      }
                      className="border-t border-slate-100 hover:bg-slate-50/70"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700">
                            {name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <span className="text-xs font-semibold text-slate-800">
                            {name}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500">
                      {row?.email || "—"}
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">

                          <HiOutlineCalendar className="text-slate-400" />

                          {row?.signupDate
                            ? new Date(
                                row.signupDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "—"}

                        </div>

                      </td>

                      <td className="px-5 py-4 text-right">

                        <StatusBadge
                          status={
                            row?.status ||
                            "Referred"
                          }
                        />

                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>

                <td
                  colSpan={4}
                  className="py-14 text-center"
                >

                  <p className="text-xs font-semibold text-slate-600">
                    No referrals found
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Your referred users will appear here.
                  </p>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {(referrals?.length || 0) >
        perPage && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">

          <p className="text-[10px] text-slate-400">
            Page {page} of{" "}
            {totalPages}
          </p>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronLeft />
            </button>

            <button
              type="button"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.min(
                      totalPages,
                      prev + 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronRight />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   CONVERTED LIST
========================================================= */

function ConvertedList({
  converted,
}) {
  const [page, setPage] = useState(1);

  const perPage = 5;

  const totalPages =
    Math.ceil(
      (converted?.length || 0) /
        perPage
    ) || 1;

  const current =
    converted?.slice(
      (page - 1) * perPage,
      page * perPage
    ) || [];

  useEffect(() => {
    setPage(1);
  }, [converted]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
            <HiOutlineShieldCheck className="text-lg text-emerald-600" />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              Total Converted
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Referred users who completed investments
            </p>

          </div>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[720px]">

          <thead className="bg-slate-50/70">

            <tr>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Investor
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Property
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {current.length > 0 ? (
              current.map(
                (row, index) => {

                  const name =
                    row?.name ||
                    "Unknown";

                  return (
                    <tr
                      key={
                        row?._id ||
                        row?.id ||
                        index
                      }
                      className="border-t border-slate-100 hover:bg-slate-50/70"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-xs font-bold text-emerald-700">
                            {name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <span className="text-xs font-semibold text-slate-800">
                            {name}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500">
                      {row?.email || "—"}
                      </td>



                      <td className="max-w-[190px] px-5 py-4">

                        <p className="truncate text-xs font-medium text-slate-700">
                          {row?.property ||
                            "—"}
                        </p>

                      </td>

                      <td className="px-5 py-4">

                        <span className="text-xs font-bold text-emerald-600">
                          ₹
                          {Number(
                            row?.amount || 0
                          ).toLocaleString()}
                        </span>

                      </td>

                      <td className="px-5 py-4 text-right text-xs text-slate-500">

                        {row?.date
                          ? new Date(
                              row.date
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "—"}

                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>

                <td
                  colSpan={5}
                  className="py-14 text-center"
                >

                  <p className="text-xs font-semibold text-slate-600">
                    No converted investors
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Successful investments will appear here.
                  </p>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {(converted?.length || 0) >
        perPage && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">

          <p className="text-[10px] text-slate-400">
            Page {page} of{" "}
            {totalPages}
          </p>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronLeft />
            </button>

            <button
              type="button"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.min(
                      totalPages,
                      prev + 1
                    )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <HiOutlineChevronRight />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  mobileOpen,
  setMobileOpen,
  active,
  setActive,
  setShowLogoutConfirm,
}) {
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 lg:shadow-none ${
        mobileOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >

      {/* LOGO */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
            <HiBriefcase className="text-lg text-white" />
          </div>

          <div>

            <p className="text-sm font-bold leading-tight text-slate-900">
              Broker Portal
            </p>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              Partner Dashboard
            </p>

          </div>

        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <RxCross1 />
        </button>

      </div>

      {/* NAV */}

      <nav className="flex-1 px-3 py-5">

        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Workspace
        </p>

        {navItems.map(
          ({
            icon: Icon,
            label,
            type,
          }) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setActive(type);
                setMobileOpen(false);
              }}
              className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold transition-all ${
                active === type
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="text-lg" />

              <span>{label}</span>

              {active === type && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}

            </button>
          )
        )}

      </nav>

      {/* BOTTOM */}

      <div className="border-t border-slate-100 p-3">

        <div className="mb-2 rounded-xl bg-slate-50 p-3">

          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Partner Account
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-700">
            Broker
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[9px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Account Active
          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            setShowLogoutConfirm(true)
          }
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <HiArrowRightOnRectangle className="text-lg" />
          Sign Out
        </button>

      </div>

    </aside>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function BrokerDashboard() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [active, setActive] =
    useState("overview");

  const [dashboard, setDashboard] =
    useState(null);

  const [profile, setProfile] =
    useState(null);

  const [investors, setInvestors] =
    useState([]);

  const [commissions, setCommissions] =
    useState([]);

  const [earnings, setEarnings] =
    useState(null);

  const [referrals, setReferrals] =
    useState([]);

  const [converted, setConverted] =
    useState([]);

  const [
    showLogoutConfirm,
    setShowLogoutConfirm,
  ] = useState(false);

  /* =======================================================
     FETCH DATA
  ======================================================= */

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
          conv,
        ] = await Promise.all([
          axios.get(
            "/api/brokers/dashboard"
          ),
          axios.get(
            "/api/brokers/profile"
          ),
          axios.get(
            "/api/brokers/referred-investors"
          ),
          axios.get(
            "/api/brokers/commissions"
          ),
          axios.get(
            "/api/brokers/earnings-summary"
          ),
          axios.get(
            "/api/brokers/total-referrals"
          ),
          axios.get(
            "/api/brokers/total-converted"
          ),
        ]);

        setDashboard(
          dash.data
        );

        setProfile(
          prof.data
        );

        setInvestors(
          inv.data
        );

        setCommissions(
          comm.data
        );

        setEarnings(
          earn.data
        );

        setReferrals(
          ref.data
        );

        setConverted(
          conv.data
        );

      } catch (error) {

        console.error(
          "BROKER DASHBOARD ERROR:",
          error
        );

      }

    };

    fetchData();

  }, []);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";

  };

  /* =======================================================
     OVERVIEW
  ======================================================= */

  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans">

        <div className="flex min-h-screen">

          {/* SIDEBAR */}

          <Sidebar
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            active={active}
            setActive={setActive}
            setShowLogoutConfirm={
              setShowLogoutConfirm
            }
          />

          {/* MOBILE OVERLAY */}

          {mobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              onClick={() =>
                setMobileOpen(false)
              }
            />
          )}

          {/* =================================================
              CONTENT
          ================================================= */}

          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

            {/* OVERVIEW */}

            {active === "overview" && (
              <>
                <Header
                  setMobileOpen={
                    setMobileOpen
                  }
                  profile={profile}
                />

                <StatCards
                  data={dashboard}
                />

                {/* CODE + PERFORMANCE */}

                <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">

                  <BrokerCodeCard
                    profile={profile}
                  />

                  <PerformanceCard
                    dashboard={
                      dashboard
                    }
                  />

                </div>

                {/* RECENT INVESTORS */}

                <div className="mb-6">

                  <RecentInvestors
                    investors={
                      investors
                    }
                  />

                </div>

                {/* COMMISSION + EARNINGS */}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">

                  <CommissionDetails
                    commissions={
                      commissions
                    }
                  />

                  <EarningsSummary
                    data={earnings}
                  />

                </div>
              </>
            )}

            {/* =================================================
                REFERRALS
            ================================================= */}

            {active === "referral" && (
              <>

                <Header
                  setMobileOpen={
                    setMobileOpen
                  }
                  profile={profile}
                />

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Total Referrals
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {referrals?.length ||
                        0}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Users joined through your code
                    </p>

                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Converted
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {dashboard?.conversions ||
                        0}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Successful investments
                    </p>

                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      Conversion Rate
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">

                      {referrals?.length
                        ? (
                            ((dashboard?.conversions ||
                              0) /
                              referrals.length) *
                            100
                          ).toFixed(1)
                        : "0.0"}
                      %

                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Referral to investment
                    </p>

                  </div>

                </div>

                <ReferralList
                  referrals={referrals}
                />

              </>
            )}

            {/* =================================================
                CONVERTED
            ================================================= */}

            {active === "converted" && (
              <>

                <Header
                  setMobileOpen={
                    setMobileOpen
                  }
                  profile={profile}
                />

                <ConvertedList
                  converted={converted}
                />

              </>
            )}

            {/* =================================================
                COMMISSION
            ================================================= */}

            {active === "commission" && (
              <>

                <Header
                  setMobileOpen={
                    setMobileOpen
                  }
                  profile={profile}
                />

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      Total Earnings
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      ₹
                      {Number(
                        dashboard?.totalEarnings ||
                          0
                      ).toLocaleString()}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Total commission
                    </p>

                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      Commission Records
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {commissions?.length ||
                        0}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Recorded commission entries
                    </p>

                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Current Payout
                    </p>

                    <p className="mt-2 text-lg font-bold text-slate-900">
                      {earnings?.nextPayout ||
                        "To be announced"}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Next payout information
                    </p>

                  </div>

                </div>

                <CommissionDetails
                  commissions={
                    commissions
                  }

                />

              </>
            )}

          </main>

        </div>

      </div>

      {/* =====================================================
          LOGOUT MODAL
      ===================================================== */}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <HiArrowRightOnRectangle className="text-xl text-red-600" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Sign Out
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Are you sure you want to sign out of your broker account?
            </p>

            <div className="mt-6 flex justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setShowLogoutConfirm(
                    false
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
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