import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaDownload,
  FaClock,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const buildingImg =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80";

export default function InvestmentSuccess() {
  const location = useLocation();
  const data = location.state;

  // Data nahi hai to pehle check karo
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No investment data found.</p>
      </div>
    );
  }

  const dateTime = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const ownership =
    data.totalShares && data.totalShares > 0
      ? ((data.shares / data.totalShares) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col items-center mb-6 sm:mb-8">

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fff7df] flex items-center justify-center mb-4 sm:mb-5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f5c842] flex items-center justify-center">
              <FaClock className="text-white" size={18} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Payment Proof Submitted
          </h1>

          <p className="text-gray-500 text-sm sm:text-base text-center max-w-xl">
            Your payment proof has been submitted successfully. Your investment
            is currently awaiting verification by our admin team.
          </p>

        </div>

        {/* ================= INVESTMENT CARD ================= */}

        <div className="w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">

          {/* IMAGE */}

          <div className="relative h-44 sm:h-52 md:h-56 w-full overflow-hidden">

            <img
              src={buildingImg}
              alt={data.propertyName || "Property"}
              className="w-full h-full object-cover"
            />

            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#f5c842] text-[#7a5e00] text-xs font-semibold px-3 py-1.5 rounded-full">
              <FaCheckCircle size={11} />
              PAYMENT SUBMITTED
            </span>

          </div>

          {/* CONTENT */}

          <div className="p-4 sm:p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5">

              {/* PROPERTY */}

              <div>

                <p className="text-[#1a7a5e] font-bold text-lg sm:text-xl">
                  {data.propertyName || "Property"}
                </p>

                <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mt-3 mb-1">
                  Location
                </p>

                <p className="flex items-center gap-1.5 text-gray-700 text-sm">

                  <FaMapMarkerAlt
                    size={13}
                    className="text-gray-400"
                  />

                  {data.location
                    ? data.location.city
                      ? `${data.location.city}, ${data.location.state || ""}`
                      : data.location
                    : "Location not available"}

                </p>

              </div>

              {/* PAYMENT */}

              <div>

                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  Amount Submitted
                </p>

                <p className="text-gray-900 font-bold text-xl sm:text-2xl">
                  ₹{Number(data.amount || 0).toLocaleString("en-IN")}
                </p>

                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mt-3 mb-1">
                  Payment Reference
                </p>

                <p className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-md font-mono inline-block break-all">
                  {data.paymentReference || "Submitted"}
                </p>

                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mt-3 mb-1">
                  Submitted At
                </p>

                <p className="text-gray-700 text-sm">
                  {dateTime}
                </p>

              </div>

            </div>

            {/* ================= SHARES ================= */}

            <div className="border-t border-gray-100 pt-4 mb-5 grid grid-cols-2 gap-2">

              <span className="text-gray-600">
                Shares Purchased
              </span>

              <span className="text-right font-semibold">
                {data.shares} Share{data.shares > 1 ? "s" : ""}
              </span>

              <span className="text-gray-800">
                Ownership %
              </span>

              <span className="text-right font-semibold text-[#1a7a5e]">
                {ownership}%
              </span>

            </div>

            {/* ================= STATUS ================= */}

            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-2">

              <div className="mt-0.5 shrink-0">
                <FaClock
                  className="text-amber-600"
                  size={16}
                />
              </div>

              <div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  Payment verification is pending.
                </p>

                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">
                  Our admin team will verify your payment proof and transaction
                  details. Your investment will become active only after the
                  payment has been verified and approved.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= BUTTON ================= */}

        <div className="w-full max-w-xl mt-5 flex flex-col sm:flex-row gap-3">

          <NavLink
            to="/portfolio"
            className="flex-1 bg-[#1a7a5e] hover:bg-[#155f49] text-white font-semibold text-sm py-3 rounded-xl transition-colors text-center"
          >
            Go to Portfolio
          </NavLink>

        </div>

        {/* ================= AGREEMENT ================= */}

        <button
          className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
        >
          <FaDownload size={13} />
          Download Agreement
        </button>

      </main>

    </div>
  );
}