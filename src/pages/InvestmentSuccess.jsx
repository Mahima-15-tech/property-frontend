
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaDownload,
  FaClock,
  FaFileAlt,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "../utils/axios";

// Handle strings, arrays, and common image object formats.
const getImageUrl = (value) => {
  if (!value) return "";

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = getImageUrl(item);
      if (url) return url;
    }
    return "";
  }

  if (typeof value === "string") return value.trim();

  if (typeof value === "object") {
    return (
      value.secure_url ||
      value.url ||
      value.imageUrl ||
      value.src ||
      value.path ||
      getImageUrl(value.image) ||
      ""
    );
  }

  return "";
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });

// Pronex World letterhead for PDF printing.
const createLegalDocumentHtml = (title, content, propertyName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #1e293b;
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .toolbar {
    padding: 14px;
    background: #0f172a;
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  .toolbar button {
    border: 0;
    border-radius: 8px;
    padding: 12px 18px;
    font-weight: 700;
    cursor: pointer;
  }
  .save { background: #047857; color: white; }
  .paper { max-width: 800px; margin: 25px auto; padding: 35px; }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-bottom: 3px solid #047857;
    padding-bottom: 22px;
  }
  .brand { color: #064e3b; font-size: 27px; font-weight: 900; }
  .brand span {
    display: block;
    color: #047857;
    font-size: 14px;
    letter-spacing: 5px;
    margin-top: 4px;
  }
  .label {
    color: #64748b;
    font-size: 11px;
    line-height: 1.8;
    text-align: right;
    font-weight: 700;
  }
  h1 { margin: 32px 0 8px; font-size: 24px; overflow-wrap: anywhere; }
  .subtitle {
    color: #047857;
    font-size: 10px;
    letter-spacing: 1.5px;
    font-weight: 700;
    margin-bottom: 28px;
  }
  .property {
    padding: 12px 14px;
    margin-bottom: 24px;
    background: #f8fafc;
    border-left: 3px solid #047857;
    font-size: 12px;
  }
  .content {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 13px;
    line-height: 2;
  }
  footer {
    border-top: 1px solid #cbd5e1;
    padding-top: 18px;
    margin-top: 42px;
    color: #64748b;
    font-size: 10px;
    line-height: 1.8;
  }
  footer strong { color: #064e3b; font-size: 12px; }
  @media print {
    .toolbar { display: none !important; }
    .paper { margin: 0; padding: 0; max-width: none; }
  }
  @media screen and (max-width: 600px) {
    .paper { padding: 22px; }
    .brand { font-size: 22px; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <button class="save" onclick="window.print()">Save as PDF</button>
    <button onclick="window.close()">Close</button>
  </div>
  <main class="paper">
    <header class="header">
      <div class="brand">PRONEX<span>WORLD</span></div>
      <div class="label">Property Documentation<br/>Legal &amp; Due Diligence</div>
    </header>
    <h1>${escapeHtml(title || "Investment Agreement")}</h1>
    <div class="subtitle">PROPERTY RECORD · LEGAL DOCUMENTATION</div>
    <div class="property">
      <strong>Property:</strong> ${escapeHtml(propertyName || "Property Investment")}
    </div>
    <div class="content">${escapeHtml(content || "")}</div>
    <footer>
      <strong>PRONEX WORLD</strong><br/>
      Property Legal Documentation<br/>
      This document should be verified against original records and reviewed by an appropriate legal professional.
    </footer>
  </main>
</body>
</html>`;
};

export default function InvestmentSuccess() {
  const { state: data } = useLocation();

  const [property, setProperty] = useState(data?.property || null);
  const [imageError, setImageError] = useState(false);
  const [agreementLoading, setAgreementLoading] = useState(false);
  const [agreementError, setAgreementError] = useState("");

  const propertyId =
    data?.propertyId ||
    data?.property?._id ||
    data?.property?.id ||
    data?.investment?.property?._id ||
    data?.investment?.propertyId ||
    data?.investment?.property?._id ||
    "";

  // First use checkout data. If incomplete, fetch the property record.
  useEffect(() => {
    let cancelled = false;

    const loadProperty = async () => {
      if (!propertyId) return;

      const hasImage = getImageUrl(
        data?.propertyImage ||
        data?.property?.media?.images ||
        data?.property?.images
      );

      const hasAgreement =
        Boolean(data?.legalDocumentContent?.trim()) ||
        Boolean(data?.property?.legalDocumentContent?.trim());

      if (hasImage && hasAgreement) return;

      try {
        // Matches the existing getPropertyById API pattern.
        const response = await axios.get(`/properties/${propertyId}`);

        const result =
          response?.data?.property ||
          response?.data?.data ||
          response?.data;

        if (!cancelled && result) {
          setProperty(result);
        }
      } catch (error) {
        console.error("Unable to fetch property details:", error);
      }
    };

    loadProperty();

    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FaFileAlt className="mx-auto text-3xl text-slate-400" />
          <p className="mt-3 text-slate-600">No investment data found.</p>
          <NavLink
            to="/portfolio"
            className="mt-4 inline-block font-semibold text-emerald-700"
          >
            Go to Portfolio
          </NavLink>
        </div>
      </div>
    );
  }

  const propertyName =
    data.propertyName || property?.name || "Property Investment";

  const propertyImage = getImageUrl(
    data.propertyImage ||
    data.image ||
    data.thumbnail ||
    data.coverImage ||
    property?.media?.images ||
    property?.images ||
    property?.image ||
    property?.thumbnail ||
    property?.coverImage
  );

  const legalDocumentTitle =
    data.legalDocumentTitle ||
    property?.legalDocumentTitle ||
    "Investment Agreement";

  const legalDocumentContent =
    data.legalDocumentContent ||
    property?.legalDocumentContent ||
    "";

  const locationText =
    typeof (data.location || property?.location) === "string"
      ? data.location || property?.location
      : [
          (data.location || property?.location)?.city,
          (data.location || property?.location)?.state,
        ]
          .filter(Boolean)
          .join(", ") || "Location not available";

  const shares = Number(data.shares || 0);
  const totalShares = Number(data.totalShares || property?.totalShares || 0);

  const ownership =
    totalShares > 0
      ? ((shares / totalShares) * 100).toFixed(2)
      : "0.00";

  const dateTime = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const downloadAgreement = () => {
    setAgreementError("");

    if (!legalDocumentContent.trim()) {
      setAgreementError(
        "Legal agreement is not available for this property yet. Please try again or contact support."
      );
      return;
    }

    // Open synchronously on click to avoid popup blockers.
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setAgreementError(
        "Please allow pop-ups in your browser to download the agreement."
      );
      return;
    }

    setAgreementLoading(true);

    try {
      printWindow.document.open();
      printWindow.document.write(
        createLegalDocumentHtml(
          legalDocumentTitle,
          legalDocumentContent,
          propertyName
        )
      );
      printWindow.document.close();
      printWindow.focus();

      // Let the document render before enabling printing.
      printWindow.onload = () => {
        setAgreementLoading(false);
      };

      // Some browsers have already fired load after document.close().
      setTimeout(() => setAgreementLoading(false), 1000);
    } catch (error) {
      console.error("Agreement generation failed:", error);
      printWindow.close();
      setAgreementLoading(false);
      setAgreementError("Could not prepare the agreement. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40">
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12">

        {/* SUCCESS HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-50/60">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-white shadow-lg shadow-amber-200">
              <FaClock size={24} />
            </div>
          </div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
            <FaClock size={12} />
            Awaiting Verification
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Payment Proof Submitted
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Your payment proof has been received. Our team will verify
            the transaction before activating your investment.
          </p>
        </div>

        {/* INVESTMENT CARD */}
        <section className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.3)]">

          {/* PROPERTY IMAGE */}
          <div className="relative h-60 overflow-hidden bg-slate-200 sm:h-80">
            {propertyImage && !imageError ? (
              <img
                src={propertyImage}
                alt={propertyName}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-800 to-slate-950 text-white">
                <FaMapMarkerAlt size={34} />
                <p className="mt-3 text-sm font-semibold">
                  {imageError ? "Property image unavailable" : propertyName}
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-slate-950/10" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-3 py-2 text-xs font-bold text-emerald-800 shadow-lg">
              <FaCheckCircle size={13} />
              PAYMENT SUBMITTED
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Property Investment
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                {propertyName}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <FaMapMarkerAlt size={13} />
                {locationText}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">

            {/* AMOUNT SUMMARY */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">
                  Amount Submitted
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-900">
                  ₹{Number(data.amount || 0).toLocaleString("en-IN")}
                </p>
                <p className="mt-2 text-xs text-emerald-800/70">
                  Payment awaiting team verification
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Payment Reference
                </p>
                <p className="mt-3 break-all font-mono text-sm font-bold text-slate-800">
                  {data.paymentReference || "Submitted"}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Submitted {dateTime}
                </p>
              </div>
            </div>

            {/* SHARE DETAILS */}
            <div className="mt-6 rounded-2xl border border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">
                  Ownership Summary
                </h3>
                <FaShieldAlt className="text-emerald-700" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Shares Purchased</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">
                    {shares} Share{shares === 1 ? "" : "s"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Ownership</p>
                  <p className="mt-1 text-lg font-extrabold text-emerald-700">
                    {ownership}%
                  </p>
                </div>
              </div>
            </div>

            {/* VERIFICATION STATUS */}
            <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <FaClock size={18} />
              </div>
              <div>
                <h3 className="font-bold text-amber-950">
                  Verification in progress
                </h3>
                <p className="mt-1 text-sm leading-6 text-amber-900/75">
                  Your investment will become active only after the
                  payment proof and transaction details are approved
                  by our team.
                </p>
              </div>
            </div>

            {/* AGREEMENT */}
            <div className="mt-5 rounded-2xl border border-slate-200 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <FaFileAlt size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900">
                    Investment Agreement
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {legalDocumentContent.trim()
                      ? legalDocumentTitle
                      : "The agreement could not be loaded yet."}
                  </p>

                  <button
                    type="button"
                    onClick={downloadAgreement}
                    disabled={agreementLoading}
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                  >
                    <FaDownload size={13} />
                    {agreementLoading
                      ? "Preparing Agreement..."
                      : "Download Agreement PDF"}
                  </button>

                  {agreementError && (
                    <p className="mt-3 text-sm leading-5 text-red-600">
                      {agreementError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEXT ACTION */}
        <div className="mt-6 w-full max-w-2xl">
          <NavLink
            to="/portfolio"
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Go to Portfolio
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </NavLink>

          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            Your payment status will be updated after verification.
          </p>
        </div>
      </main>
    </div>
  );
}
