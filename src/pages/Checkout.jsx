import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiLock,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import {
  MdVerified,
  MdOutlineAccountBalance,
} from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";


// ======================================================
// TRUST BADGES
// ======================================================

function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {[
        {
          icon: <FiLock size={13} />,
          label: "SECURE PAYMENT",
        },
        {
          icon: <MdVerified size={13} />,
          label: "VERIFIED PROPERTY",
        },
        {
          icon: <MdOutlineAccountBalance size={13} />,
          label: "TRANSPARENT OWNERSHIP",
        },
      ].map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-1.5 bg-teal-700 text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-md"
        >
          {b.icon}
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}


// ======================================================
// PROPERTY CARD
// ======================================================

function PropertyCard({ property }) {
  return (
    <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">

      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-sky-400 to-teal-600 flex items-center justify-center">

        <img
          src={property.image || property.images?.[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />

      </div>

      <div className="flex-1 min-w-0">

        <div className="flex items-start justify-between gap-2 flex-wrap">

          <div>

            <h3 className="font-bold text-gray-900 text-base sm:text-lg">
              {property.name}
            </h3>

            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 mt-0.5">
              <FiMapPin size={11} />
              {property.location?.city}, {property.location?.state}
            </p>

          </div>

          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
            {property?.roi || 0}% ROI
          </span>

        </div>

        <div className="flex gap-6 mt-2">

          <div>
            <p className="text-gray-400 text-xs">
              Type
            </p>

            <p className="text-gray-800 text-sm font-semibold">
              {property?.type || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">
              Share Price
            </p>

            <p className="text-gray-800 text-sm font-semibold">
              ₹{Number(property.sharePrice || 0).toLocaleString("en-IN")}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}


// ======================================================
// SHARE SELECTOR
// ======================================================

function ShareSelector({ shares, setShares, property }) {

  const price = Number(property?.sharePrice || 0);

  const totalShares = Number(property?.totalShares || 0);

  const availableShares = Number(
    property?.sharesLeft ??
    property?.availableShares ??
    0
  );

  const shareCycle = Number(
    property?.shareBuyingCycle || 10
  );


  const calculateMaxShares = () => {

    if (availableShares < 10) {
      return 0;
    }

    if (shareCycle === 10) {
      return Math.floor(availableShares / 10) * 10;
    }

    if (shareCycle === 5) {
      return (
        10 +
        Math.floor((availableShares - 10) / 5) * 5
      );
    }

    return 10;
  };


  const maxShares = Math.min(
    totalShares,
    calculateMaxShares()
  );


  const investment = shares * price;


  const ownership =
    totalShares > 0
      ? ((shares / totalShares) * 100).toFixed(2)
      : "0.00";


  const handleIncrease = () => {

    const nextShares = shares + shareCycle;

    if (nextShares <= maxShares) {
      setShares(nextShares);
    }

  };


  const handleDecrease = () => {

    const nextShares = shares - shareCycle;

    if (nextShares >= 10) {
      setShares(nextShares);
    }

  };


  useEffect(() => {

    if (maxShares < 10) {
      setShares(0);
      return;
    }

    if (shares < 10 || shares > maxShares) {
      setShares(10);
    }

  }, [maxShares]);


  if (maxShares < 10) {

    return (
      <div>

        <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">
          Select Number of Shares
        </h3>

        <div className="border border-red-200 bg-red-50 rounded-xl p-4">

          <p className="text-sm font-semibold text-red-600">
            Investment currently unavailable
          </p>

          <p className="text-xs text-red-500 mt-1">
            There are not enough shares available for the minimum
            purchase of 10 shares.
          </p>

        </div>

      </div>
    );
  }


  return (
    <div>

      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">
        Select Number of Shares
      </h3>

      <div className="border border-gray-200 bg-green-50 rounded-xl p-4 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <button
            onClick={handleDecrease}
            disabled={shares <= 10}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiMinus size={14} />
          </button>

          <span className="text-gray-900 font-semibold text-base min-w-[40px] text-center">
            {shares}
          </span>

          <button
            onClick={handleIncrease}
            disabled={shares >= maxShares}
            className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white hover:bg-teal-800 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiPlus size={14} />
          </button>

        </div>

        <div className="text-right">

          <p className="text-gray-400 text-xs">

            {shares} share{shares > 1 ? "s" : ""} ={" "}

            <span className="font-semibold text-gray-700">
              {ownership}%
            </span>{" "}

            ownership

          </p>

          <p className="text-teal-700 font-bold text-lg sm:text-xl">
            Total: ₹{investment.toLocaleString("en-IN")}
          </p>

        </div>

      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-400">

        <span>
          {availableShares} shares available
        </span>

        <span>
          Buy in {shareCycle}-share increments
        </span>

      </div>

    </div>
  );
}


// ======================================================
// REFERRAL CODE
// ======================================================

function ReferralCode({
  code,
  setCode,
  applied,
  setApplied,
}) {

  const [referralError, setReferralError] = useState("");


  const handleApplyReferral = async () => {

    try {

      setReferralError("");

      const res = await axios.post(
        "/api/investments/validate-referral",
        {
          code,
        }
      );

      if (res.data.valid) {

        setApplied(true);

      } else {

        setApplied(false);
        setReferralError("Invalid referral code");

      }

    } catch (err) {

      setApplied(false);
      setReferralError("Invalid referral code");

    }

  };


  return (
    <div>

      <p className="text-gray-500 text-xs font-semibold tracking-wide uppercase mb-2">
        Broker Referral Code (Optional)
      </p>

      <div className="flex gap-2 items-center">

        <div className="flex-1 flex items-center border border-gray-200 rounded-lg overflow-hidden">

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm text-gray-700 bg-white outline-none"
            placeholder="Enter referral code"
          />

          {applied && (
            <div className="flex items-center gap-1 pr-3 text-teal-600 text-xs font-semibold">
              <FiCheck size={13} />
              Applied
            </div>
          )}

        </div>

        {!applied ? (

          <button
            onClick={handleApplyReferral}
            className="bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            Apply
          </button>

        ) : (

          <button
            onClick={() => {

              setApplied(false);
              setCode("");
              setReferralError("");

            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            Remove
          </button>

        )}

      </div>


      {applied && (

        <p className="text-green-600 text-xs mt-2 flex items-center gap-1">

          <FiCheckCircle />

          Broker code applied successfully

        </p>

      )}


      {referralError && (

        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">

          <FiAlertCircle />

          {referralError}

        </p>

      )}

    </div>
  );
}


// ======================================================
// INVESTMENT BREAKDOWN
// ======================================================

function InvestmentBreakdown({
  shares,
  applied,
  property,
}) {
  const price = Number(property?.sharePrice || 0);

  const investment = shares * price;

  // Broker referral gives NO discount
  const total = investment;

  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-green-50">

      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">
        Investment Breakdown
      </h3>

      <div className="space-y-2 text-sm">

        {[
          {
            label: "Investment Amount",
            value: `₹${investment.toLocaleString("en-IN")}`,
          },
          {
            label: "Platform Fee",
            value: "₹0",
          },
          {
            label: "Taxes",
            value: "₹0",
          },
        ].map((r) => (
          <div
            key={r.label}
            className="flex justify-between text-gray-600"
          >
            <span>{r.label}</span>
            <span>{r.value}</span>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base sm:text-lg">

          <span>
            Total Payable Amount
          </span>

          <span>
            ₹{total.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

    </div>
  );
}


// ======================================================
// AGREEMENT
// ======================================================

function AgreementRow({
  agreed,
  setAgreed,
}) {

  return (
    <div className="flex items-start gap-3">

      <button
        onClick={() => setAgreed((a) => !a)}
        className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
          agreed
            ? "bg-teal-700 border-teal-700"
            : "border-gray-300 bg-white"
        }`}
      >

        {agreed && (
          <FiCheck
            size={10}
            className="text-white"
          />
        )}

      </button>

      <p className="text-gray-500 text-xs sm:text-sm">

        I agree to the investment terms, ownership structure,
        and legal documentation.{" "}

        <span className="text-teal-700 cursor-pointer underline">
          View Agreement
        </span>

      </p>

    </div>
  );
}


// ======================================================
// INVESTMENT SUMMARY
// ======================================================

function InvestmentSummary({
  shares,
  property,
}) {

  const price = property?.sharePrice || 0;

  const investment = shares * price;

  const roi = property?.roi || 0;

  const annual = (investment * roi) / 100;

  const monthly = annual / 12;


  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm">

      <h3 className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">
        Investment Summary
      </h3>

      <div className="space-y-3">

        {[
          {
            label: "Property",
            value: property.name,
          },

          {
            label: "Location",
            value: `${property.location?.city || ""}, ${property.location?.state || ""}`,
          },

          {
            label: "Share Price",
            value: `₹${price.toLocaleString()}`,
            bold: true,
          },

          {
            label: "Selected Shares",
            value: `${shares} Share${shares > 1 ? "s" : ""}`,
            bold: true,
          },

          {
            label: "Ownership %",
            value: `${(
              (shares /
                (property?.totalShares || 1)) *
              100
            ).toFixed(2)}%`,
            teal: true,
            bold: true,
          },

        ].map((r) => (

          <div
            key={r.label}
            className="flex justify-between items-center text-sm"
          >

            <span className="text-gray-500">
              {r.label}
            </span>

            <span
              className={`${
                r.teal
                  ? "text-teal-700"
                  : "text-gray-900"
              } ${
                r.bold
                  ? "font-bold"
                  : ""
              }`}
            >
              {r.value}
            </span>

          </div>

        ))}

      </div>


      <div className="mt-4 bg-gray-50 rounded-lg p-4">

        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">
          Financial Snapshot
        </p>

        <div className="flex gap-4">

          <div>

            <p className="text-gray-400 text-xs">
              Estimated Annual
            </p>

            <p className="text-gray-900 font-bold text-base">
              ₹{annual.toLocaleString()}
            </p>

          </div>


          <div>

            <p className="text-gray-400 text-xs">
              Monthly Income
            </p>

            <p className="text-gray-900 font-bold text-base">
              ₹{monthly.toFixed(0).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


// ======================================================
// FUNDING PROGRESS
// ======================================================

function FundingProgress({ property }) {

  return (
    <div className="bg-green-50 border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm">

      <div className="flex justify-between items-center mb-2">

        <p className="text-gray-600 text-sm font-semibold">
          Funding Progress
        </p>

        <span className="text-gray-900 font-bold text-sm">
          {property?.soldPercent || 0}%
        </span>

      </div>


      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">

        <div
          className="bg-teal-600 h-2 rounded-full"
          style={{
            width: `${property?.soldPercent || 0}%`,
          }}
        />

      </div>


      <p className="text-gray-400 text-xs italic">
        Only {property?.availableShares || 0} shares remaining
      </p>


      <div className="flex justify-around mt-5 pt-4 border-t border-gray-100">

        {[
          {
            icon: <FiShield size={18} />,
            label: "SECURE\nTRANSACTION",
          },

          {
            icon: <MdVerified size={18} />,
            label: "VERIFIED\nLISTING",
          },

          {
            icon: <HiOutlineDocumentText size={18} />,
            label: "LEGAL\nPROTECTION",
          },

        ].map((b) => (

          <div
            key={b.label}
            className="flex flex-col items-center gap-1 text-teal-700"
          >

            {b.icon}

            <p className="text-[9px] sm:text-[10px] text-gray-500 font-semibold text-center whitespace-pre-line leading-tight">
              {b.label}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}


// ======================================================
// PAYMENT MODAL
// ======================================================

function PaymentModal({
  show,
  onClose,
  property,
  shares,
  paymentSettings,
  paymentSettingsLoading,
  applied,
  paymentMethod,
  setPaymentMethod,
  paymentReference,
  setPaymentReference,
  paymentScreenshot,
  setPaymentScreenshot,
  paymentSubmitting,
  submitPaymentProof,
}) {

  if (!show) {
    return null;
  }


  const investmentAmount =
  shares *
  Number(property?.sharePrice || 0);

// Broker referral gives NO discount
const payableAmount = investmentAmount;


  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onWheel={(e) => {
        // Prevent wheel event from reaching background
        e.stopPropagation();
      }}
    >

      {/* MODAL */}
      <div
        className="w-full max-w-2xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex-shrink-0 bg-white border-b border-gray-100 px-5 sm:px-7 py-5">

          <div className="flex items-center justify-between gap-4">

            <div>

              <div className="flex items-center gap-2">

                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">

                  <FiLock
                    className="text-teal-700"
                    size={18}
                  />

                </div>


                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Complete Your Payment
                </h2>

              </div>


              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Make the payment and submit your transaction details.
              </p>

            </div>


            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition flex-shrink-0"
            >
              ✕
            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* SCROLLABLE CONTENT */}
        {/* ================================================= */}

        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >

          {/* ================================================= */}
          {/* AMOUNT */}
          {/* ================================================= */}

          <div className="rounded-2xl bg-teal-50 border border-teal-100 p-4 sm:p-5">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                  Amount Payable
                </p>

                <p className="text-2xl sm:text-3xl font-extrabold text-teal-700 mt-1">
                  ₹{payableAmount.toLocaleString("en-IN")}
                </p>

              </div>


              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">

                <MdOutlineAccountBalance
                  size={23}
                  className="text-teal-700"
                />

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* PAYMENT OPTIONS */}
          {/* ================================================= */}

          <div>

            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Choose Payment Method
            </h3>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* BANK TRANSFER */}

              <div
                className={`border rounded-2xl p-4 transition ${
                  paymentMethod === "Bank Transfer"
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 bg-white"
                }`}
              >

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100">

                    <MdOutlineAccountBalance
                      size={21}
                      className="text-teal-700"
                    />

                  </div>


                  <div>

                    <p className="font-bold text-gray-900 text-sm">
                      Bank Transfer
                    </p>

                    <p className="text-xs text-gray-500">
                      Transfer directly to our bank
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("Bank Transfer")
                  }
                  className={`w-full py-2 rounded-lg text-xs font-semibold ${
                    paymentMethod === "Bank Transfer"
                      ? "bg-teal-700 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Select Bank Transfer
                </button>

              </div>


              {/* UPI */}

              <div
                className={`border rounded-2xl p-4 transition ${
                  paymentMethod === "UPI"
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 bg-white"
                }`}
              >

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100">

                    <span className="text-teal-700 font-extrabold text-sm">
                      QR
                    </span>

                  </div>


                  <div>

                    <p className="font-bold text-gray-900 text-sm">
                      UPI / QR Code
                    </p>

                    <p className="text-xs text-gray-500">
                      Scan and make payment
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("UPI")
                  }
                  className={`w-full py-2 rounded-lg text-xs font-semibold ${
                    paymentMethod === "UPI"
                      ? "bg-teal-700 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Select UPI / QR
                </button>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* BANK DETAILS */}
          {/* ================================================= */}
{/* ================================================= */}
{/* BANK DETAILS */}
{/* ================================================= */}

{paymentMethod === "Bank Transfer" && (

<div className="border border-gray-200 rounded-2xl p-4 sm:p-5">

  <div className="flex items-center justify-between mb-4">

    <div>
      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
        Bank Account Details
      </h3>

      <p className="text-xs text-gray-400 mt-0.5">
        Use these details to complete your transfer.
      </p>
    </div>

    <MdOutlineAccountBalance
      size={22}
      className="text-teal-700"
    />

  </div>

  {paymentSettingsLoading ? (

    <div className="py-6 text-center text-sm text-gray-400">
      Loading bank details...
    </div>

  ) : (

    <div className="space-y-3">

      {[
        [
          "Account Name",
          paymentSettings?.accountName || "Not available",
        ],

        [
          "Account Number",
          paymentSettings?.accountNumber || "Not available",
        ],

        [
          "IFSC Code",
          paymentSettings?.ifscCode || "Not available",
        ],

        [
          "Bank Name",
          paymentSettings?.bankName || "Not available",
        ],

      ].map(([label, value]) => (

        <div
          key={label}
          className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0"
        >

          <span className="text-xs sm:text-sm text-gray-500">
            {label}
          </span>

          <span className="text-xs sm:text-sm font-semibold text-gray-900 text-right break-all">
            {value}
          </span>

        </div>

      ))}

    </div>

  )}

</div>

)}


          {/* ================================================= */}
          {/* QR */}
          {/* ================================================= */}

          {/* ================================================= */}
{/* QR */}
{/* ================================================= */}

{paymentMethod === "UPI" && (

<div className="border border-gray-200 rounded-2xl p-5 text-center">

  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
    Scan QR Code to Pay
  </h3>

  <p className="text-xs text-gray-400 mt-1 mb-4">
    Scan the QR code using your UPI app.
  </p>

  {paymentSettingsLoading ? (

    <div className="w-40 h-40 mx-auto rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">

      <p className="text-xs text-gray-400">
        Loading QR...
      </p>

    </div>

  ) : paymentSettings?.qrCode ? (

    <div className="w-40 h-40 mx-auto rounded-2xl border border-gray-200 bg-white p-2">

      <img
        src={paymentSettings.qrCode}
        alt="Payment QR Code"
        className="w-full h-full object-contain rounded-xl"
      />

    </div>

  ) : (

    <div className="w-40 h-40 mx-auto rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">

      <div className="text-center">

        <div className="text-3xl font-bold text-gray-300">
          QR
        </div>

        <p className="text-[10px] text-gray-400 mt-1">
          QR Code unavailable
        </p>

      </div>

    </div>

  )}

  {paymentSettings?.upiId && (

    <div className="mt-4">

      <p className="text-xs text-gray-400">
        UPI ID
      </p>

      <p className="text-sm font-bold text-gray-900 mt-1 break-all">
        {paymentSettings.upiId}
      </p>

    </div>

  )}

</div>

)}


          {/* ================================================= */}
          {/* UTR */}
          {/* ================================================= */}

          <div>

            <label className="text-sm font-semibold text-gray-700">
              Payment Reference / UTR
            </label>


            <input
              type="text"
              value={paymentReference}
              onChange={(e) =>
                setPaymentReference(e.target.value)
              }
              placeholder="Enter UTR / transaction reference"
              className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-teal-500 outline-none text-sm transition"
            />


            <p className="text-[11px] text-gray-400 mt-1">
              Enter the transaction reference generated after payment.
            </p>

          </div>


          {/* ================================================= */}
          {/* SCREENSHOT */}
          {/* ================================================= */}

          <div>

            <label className="text-sm font-semibold text-gray-700">
              Payment Screenshot
            </label>


            <label className="mt-2 flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition">

              <FiCheckCircle
                size={24}
                className="text-gray-400 mb-2"
              />


              <span className="text-sm font-semibold text-gray-600 text-center px-3">
                {paymentScreenshot
                  ? paymentScreenshot.name
                  : "Upload Payment Screenshot"}
              </span>


              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG or JPEG
              </span>


              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPaymentScreenshot(
                    e.target.files?.[0] || null
                  )
                }
                className="hidden"
              />

            </label>

          </div>


          {/* ================================================= */}
          {/* SECURITY */}
          {/* ================================================= */}

          <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">

            <FiShield
              size={17}
              className="text-teal-700 mt-0.5 flex-shrink-0"
            />

            <p className="text-xs text-gray-500 leading-relaxed">
              Your payment details are securely submitted for admin
              verification. Your investment will be processed after
              payment verification.
            </p>

          </div>


          {/* ================================================= */}
          {/* SUBMIT */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={submitPaymentProof}
            disabled={paymentSubmitting}
            className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base transition active:scale-[0.99] disabled:opacity-60"
          >
            {paymentSubmitting
              ? "Submitting Payment Proof..."
              : "Submit Payment Proof"}
          </button>


          {/* BOTTOM SPACE */}
          <div className="h-2" />

        </div>

      </div>

    </div>
  );
}


// ======================================================
// MAIN CHECKOUT
// ======================================================

export default function Checkout() {

  const location = useLocation();

  const navigate = useNavigate();

  const [shares, setShares] = useState(10);

  const [code, setCode] = useState("");

  const [applied, setApplied] = useState(false);

  const [agreed, setAgreed] = useState(false);

  const [showAuthPopup, setShowAuthPopup] =
    useState(false);

  const [investmentId, setInvestmentId] =
    useState(null);

  const [paymentReference, setPaymentReference] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Bank Transfer");

  const [paymentScreenshot, setPaymentScreenshot] =
    useState(null);

  const [paymentSubmitting, setPaymentSubmitting] =
    useState(false);

  const [showPaymentSection, setShowPaymentSection] =
    useState(false);

    // ======================================================
// PAYMENT SETTINGS
// ======================================================

const [paymentSettings, setPaymentSettings] =
useState(null);

const [paymentSettingsLoading, setPaymentSettingsLoading] =
useState(false);


  const isLoggedIn =
    !!localStorage.getItem("token");


  const properties =
    useSelector(
      (state) => state.property.properties
    );


  const { id } = useParams();

  const [property, setProperty] =
    useState(null);


  // ======================================================
  // FETCH PROPERTY
  // ======================================================

  useEffect(() => {

    if (id) {
      fetchProperty();
    }

  }, [id]);


  const fetchProperty = async () => {

    try {

      const res = await axios.get(
        `/api/properties/${id}`
      );

      setProperty(res.data);

    } catch (err) {

      console.error(
        "Error fetching property:",
        err
      );

    }

  };

  // ======================================================
// FETCH PAYMENT SETTINGS
// ======================================================

const fetchPaymentSettings = async () => {
  try {
    setPaymentSettingsLoading(true);

    const res = await axios.get(
      "/api/investments/payment-settings"
    );

    setPaymentSettings(
      res.data?.settings || null
    );

  } catch (err) {

    console.error(
      "PAYMENT SETTINGS ERROR:",
      err
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

  // ======================================================
  // LOCK BACKGROUND WHEN PAYMENT MODAL IS OPEN
  // ======================================================

  useEffect(() => {

    if (!showPaymentSection) {
      return;
    }


    const scrollY =
      window.scrollY;


    const bodyStyle =
      document.body.style;


    const htmlStyle =
      document.documentElement.style;


    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";


    htmlStyle.overflow = "hidden";


    return () => {

      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.left = "";
      bodyStyle.right = "";
      bodyStyle.width = "";
      bodyStyle.overflow = "";


      htmlStyle.overflow = "";


      window.scrollTo(
        0,
        scrollY
      );

    };

  }, [showPaymentSection]);


  // ======================================================
  // CREATE INVESTMENT
  // ======================================================

  const onSubmit = async () => {

    if (!isLoggedIn) {

      setShowAuthPopup(true);

      return;
    }


    if (!agreed) {

      alert(
        "Please accept agreement"
      );

      return;
    }


    try {

      const propertyId =
        property?._id ||
        property?.id;


      // ==========================================
      // CHECK KYC
      // ==========================================

      const kycRes =
        await axios.get("/api/kyc");


      const kyc =
        kycRes.data;


      // ==========================================
      // KYC NOT COMPLETED
      // ==========================================

      if (
        !kyc ||
        kyc.status === "draft"
      ) {

        navigate("/kyc", {

          state: {

            returnToInvestment: true,

            property,

            propertyId,

            shares,

            referralCode:
              applied
                ? code
                : "",

          },

        });

        return;
      }


      // ==========================================
      // KYC REJECTED
      // ==========================================

      if (
        kyc.status === "rejected"
      ) {

        navigate("/kyc", {

          state: {

            returnToInvestment: true,

            property,

            propertyId,

            shares,

            referralCode:
              applied
                ? code
                : "",

          },

        });

        return;
      }


      // ==========================================
      // CREATE INVESTMENT
      // ==========================================

      const res =
        await axios.post(
          "/api/investments/create",
          {
            propertyId,
            shares,
            referralCode:
              applied
                ? code
                : "",
          }
        );


      const investment =
        res.data.investment;


      if (!investment?._id) {

        throw new Error(
          "Investment was not created"
        );

      }


      // ==========================================
      // SAVE INVESTMENT ID
      // ==========================================

      setInvestmentId(
        investment._id
      );


      // ==========================================
      // OPEN PAYMENT MODAL
      // ==========================================

      setShowPaymentSection(
        true
      );

    } catch (err) {

      console.log(
        "CREATE INVESTMENT ERROR:",
        err
      );

      console.log(
        "RESPONSE:",
        err.response?.data
      );


      alert(
        err.response?.data?.message ||
        "Unable to continue with investment"
      );

    }

  };


  // ======================================================
  // SUBMIT PAYMENT PROOF
  // ======================================================

  const submitPaymentProof = async () => {

    if (!investmentId) {

      alert(
        "Investment not found"
      );

      return;
    }


    if (!paymentReference.trim()) {

      alert(
        "Please enter payment reference / UTR"
      );

      return;
    }


    if (!paymentScreenshot) {

      alert(
        "Please upload payment screenshot"
      );

      return;
    }


    try {

      setPaymentSubmitting(
        true
      );


      const formData =
        new FormData();


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
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );


      alert(
        "Payment proof submitted successfully. Admin will verify your payment."
      );


      navigate(
        "/investment-success",
        {
          state: {

            propertyName:
              property.name,

            amount:
              property.sharePrice *
              shares,

            shares,

            paymentReference,

            location:
              property.location,

            totalShares:
              property.totalShares,

          },
        }
      );


    } catch (err) {

      console.log(
        "PAYMENT PROOF ERROR:",
        err
      );

      console.log(
        "RESPONSE:",
        err.response?.data
      );


      alert(
        err.response?.data?.message ||
        "Failed to submit payment proof"
      );

    } finally {

      setPaymentSubmitting(
        false
      );

    }

  };


  if (!property) {

    return (
      <p>
        Loading...
      </p>
    );

  }


  return (
    <>
      {/* ================================================= */}
      {/* CHECKOUT PAGE */}
      {/* ================================================= */}

      <div className="min-h-screen bg-white font-sans">

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          <div className="mb-6 sm:mb-8">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">
              Confirm Your Investment
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Review details, select shares, and proceed securely.
            </p>

            <TrustBadges />

          </div>


          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* LEFT */}

            <div className="lg:col-span-3 space-y-5">

              <PropertyCard
                property={property}
              />


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
                applied={applied}
                property={property}
              />


              <AgreementRow
                agreed={agreed}
                setAgreed={setAgreed}
              />


              {!showPaymentSection && (

                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-[0.98] ${
                    agreed
                      ? "bg-teal-700 text-white hover:bg-teal-800"
                      : "bg-teal-700/60 text-white"
                  }`}
                  disabled={!agreed}
                  onClick={onSubmit}
                >
                  Proceed to Payment
                </button>

              )}

            </div>


            {/* RIGHT */}

            <div className="lg:col-span-2 space-y-4">

              <InvestmentSummary
                shares={shares}
                property={property}
              />

              <FundingProgress
                property={property}
              />

            </div>

          </div>

        </main>

      </div>


      {/* ================================================= */}
      {/* PAYMENT MODAL */}
      {/* IMPORTANT: OUTSIDE MAIN */}
      {/* ================================================= */}

      <PaymentModal
        show={showPaymentSection}
        onClose={() =>
          setShowPaymentSection(false)
        }
        property={property}
        shares={shares}
        applied={applied}
        paymentMethod={paymentMethod}
        paymentSettings={paymentSettings}
paymentSettingsLoading={paymentSettingsLoading}
        setPaymentMethod={setPaymentMethod}
        paymentReference={paymentReference}
        setPaymentReference={setPaymentReference}
        paymentScreenshot={paymentScreenshot}
        setPaymentScreenshot={setPaymentScreenshot}
        paymentSubmitting={paymentSubmitting}
        submitPaymentProof={submitPaymentProof}
      />


      {/* ================================================= */}
      {/* LOGIN POPUP */}
      {/* ================================================= */}

      {showAuthPopup && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[10000]">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center">

            <h3 className="text-xl font-semibold mb-2">
              Login Required
            </h3>

            <p className="text-gray-500 text-sm mb-5">
              Please login or signup to continue with your investment and proceed to secure payment.
            </p>


            <div className="flex gap-3 justify-center">

              <button
                onClick={() =>
                  navigate("/signup")
                }
                className="px-4 py-2 bg-[#0F766E] text-white rounded-lg"
              >
                Signup
              </button>


              <button
                onClick={() =>
                  navigate("/login")
                }
                className="px-4 py-2 border rounded-lg"
              >
                Login
              </button>

            </div>


            <button
              onClick={() =>
                setShowAuthPopup(false)
              }
              className="mt-4 text-xs text-gray-400"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </>
  );
}