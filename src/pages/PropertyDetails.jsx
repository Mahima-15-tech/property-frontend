import { useState, useEffect } from "react";
import { FiBell, FiMapPin, FiDownload, FiHeart, FiShare2, FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { BsPersonCircle, BsBuilding, BsFileText, BsShieldCheck, BsDiagram3 } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineSquareFoot, MdOutlinePeople } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch , useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToWatchlist } from "../slices/watchlistSlice";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";



const GALLERY = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=80",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=300&q=80",
  "https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&q=80"
 ];

const DOCS = [
  { icon: <BsFileText size={18} />, name: "Investment Brochure", size: "PDF · 4.2 MB" },
  { icon: <BsShieldCheck size={18} />, name: "Legal Verification", size: "PDF · 1.8 MB" },
  { icon: <BsFileText size={18} />, name: "Due Diligence Report", size: "PDF · 12.5 MB" },
  { icon: <BsDiagram3 size={18} />, name: "Ownership Structure", size: "PDF · 2.8 MB" },
];

const FAQS = [
  { q: "What is fractional ownership?", a: "Fractional ownership allows multiple investors to own a percentage of a high-value property. Each share represents exactly 1% legal ownership in the underlying Special Purpose Vehicle (SPV) that owns this asset." },
  { q: "What does 1 share mean?", a: "One share equals 1% ownership in the property's SPV. You receive 1% of all rental income distributions and 1% of the final sale proceeds when the property is liquidated." },
  { q: "How do I exit my investment?", a: "You can exit by listing your shares on our secondary marketplace, or wait for the planned exit at the end of the holding period (5 years), at which point the property is sold and proceeds distributed." },
];

const RELATED = [
  { badge: "OFFICE", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80", name: "The Meridian Suites", loc: "London, Canary Wharf", roi: "12.2%", share: "$15k" },
  { badge: "RESIDENTIAL", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80", name: "Echo Garden Lofts", loc: "Singapore, District 10", roi: "9.5%", share: "$42k" },
  { badge: "HOSPITALITY", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", name: "Azure Bay Villas", loc: "Greece, Santorini", roi: "18.3%", share: "$85k" },
];



function Gallery({ property }) {
  const propertyImages =
    property?.media?.images?.filter(Boolean)?.length > 0
      ? property.media.images.filter(Boolean)
      : property?.images?.filter(Boolean)?.length > 0
      ? property.images.filter(Boolean)
      : [];

  const images =
    propertyImages.length > 0
      ? propertyImages
      : [FALLBACK_IMAGE];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [property?._id, property?.id]);

  const handleImageError = (e) => {
    if (e.currentTarget.src !== FALLBACK_IMAGE) {
      e.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  return (
    <div className="mb-8">

      {/* MAIN IMAGE */}
      <div className="relative rounded-3xl overflow-hidden mb-3 group shadow-lg">
        <img
          src={images[activeIndex] || FALLBACK_IMAGE}
          alt={property?.name || "Property"}
          className="w-full h-56 sm:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-black/70 backdrop-blur text-white text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
            {property?.type || "PROPERTY"}
          </span>

          <span className="bg-emerald-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow">
            {property?.fundedPercent ?? 0}% FUNDED
          </span>
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-3 mt-8">
        {images.map((img, i) => (
          <div
            key={`${img}-${i}`}
            onClick={() => setActiveIndex(i)}
            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
              ${
                activeIndex === i
                  ? "ring-2 ring-emerald-500 shadow-lg scale-105"
                  : "border border-gray-200 hover:border-emerald-400 hover:shadow-md"
              }
            `}
          >
            <img
              src={img || FALLBACK_IMAGE}
              alt={`gallery-${i}`}
              className="w-full h-16 sm:h-20 object-cover"
              onError={handleImageError}
            />
          </div>
        ))}
      </div>

    </div>
  );
}


function ReturnsCalculator({ property }) {
  const totalShares = Number(property?.totalShares || 0);

  const availableShares = Number(
    property?.sharesLeft ?? property?.availableShares ?? 0
  );

  const sharePrice = Number(property?.sharePrice || 0);

  const shareCycle = Number(
    property?.shareBuyingCycle || 10
  );

  const stakeholderUnit = Number(
    property?.stakeholderUnit || 10
  );

  const lockInYears = Number(
    property?.lockInYears || 2
  );

  const rentalYield = Number(
    property?.rentalYield || 0
  );

  const appreciation = Number(
    property?.appreciation || 0
  );

  // ==========================================
  // MAX VALID PURCHASE SHARES
  // ==========================================

  const calculateMaxShares = () => {
    if (availableShares < 10) {
      return 0;
    }

    if (shareCycle === 10) {
      return Math.floor(availableShares / 10) * 10;
    }

    // Cycle 5
    // 10, 15, 20, 25...

    return (
      10 +
      Math.floor((availableShares - 10) / 5) * 5
    );
  };

  const maxShares = Math.min(
    totalShares,
    calculateMaxShares()
  );

  // ==========================================
  // INITIAL SHARES
  // ==========================================

  const [shares, setShares] = useState(
    maxShares >= 10 ? 10 : 0
  );

  // ==========================================
  // AVAILABLE SHARES CHANGE HONE PAR
  // ==========================================

  useEffect(() => {
    if (maxShares < 10) {
      setShares(0);
      return;
    }
  
    setShares((currentShares) => {
      if (currentShares < 10) return 10;
  
      if (currentShares > maxShares) {
        return maxShares;
      }
  
      return currentShares;
    });
  }, [maxShares]);

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const totalInvest = shares * sharePrice;

  const monthlyIncome =
    totalInvest * (rentalYield / 100) / 12;

  const exitValue =
    totalInvest *
    Math.pow(
      1 + appreciation / 100,
      lockInYears
    );

  const ownershipPercent =
    totalShares > 0
      ? (shares / totalShares) * 100
      : 0;

  // ==========================================
  // NO PURCHASABLE SHARES
  // ==========================================

  if (maxShares < 10) {
    return (
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-900">
            Returns Calculator
          </span>

          <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full">
            Not Available
          </span>
        </div>

        <p className="text-sm text-gray-500">
          There are not enough shares available for the minimum
          purchase of 10 shares.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <span className="text-sm font-semibold text-gray-900">
          Returns Calculator
        </span>

        <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
          Live Projection
        </span>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* SHARE SELECTOR */}
        <div>

          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
            Select Shares
          </p>

          <div className="flex items-center gap-3 mb-3">

            {/* MINUS */}
            <button
              onClick={() => {
                const nextShares =
                  shares - shareCycle;

                if (nextShares >= 10) {
                  setShares(nextShares);
                }
              }}
              disabled={shares <= 10}
              className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
            >
              <FiMinus size={14} />
            </button>

            {/* CURRENT SHARES */}
            <span className="text-2xl font-bold text-gray-900 w-10 text-center">
              {String(shares).padStart(2, "0")}
            </span>

            {/* PLUS */}
            <button
              onClick={() => {
                const nextShares =
                  shares + shareCycle;

                if (nextShares <= maxShares) {
                  setShares(nextShares);
                }
              }}
              disabled={shares >= maxShares}
              className="w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center hover:bg-emerald-800 disabled:opacity-40"
            >
              <FiPlus size={14} />
            </button>

          </div>

          {/* AVAILABLE */}
          <p className="text-[10px] text-gray-400 mb-3">
            {availableShares} shares currently available
          </p>

          {/* OWNERSHIP */}
          <div>

            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
              Ownership Percentage
            </p>

            <p className="text-sm font-bold text-gray-900">
              {ownershipPercent.toFixed(2)}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">

              <div
                className="bg-emerald-700 h-1 rounded-full"
                style={{
                  width: `${Math.min(
                    ownershipPercent,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* CALCULATIONS */}
        <div className="space-y-3">

          <div className="bg-white rounded-xl p-3 border border-gray-100">

            <p className="text-[10px] text-gray-400">
              Total Investment
            </p>

            <p className="text-sm font-bold text-gray-900">
              ₹{totalInvest.toLocaleString("en-IN")}
            </p>

          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100">

            <p className="text-[10px] text-gray-400">
              Est. Monthly Income
            </p>

            <p className="text-sm font-bold text-emerald-700">
              ₹{monthlyIncome.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </p>

          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100">

            <p className="text-[10px] text-gray-400">
              Projected Exit ({lockInYears}Y)
            </p>

            <p className="text-sm font-bold text-gray-900">
              ₹{Math.round(exitValue).toLocaleString("en-IN")}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

// function FullOwnershipCard({
//   property,
//   investment,
//   onRequest,
//   loading,
//   ownershipRequest,
//   setOwnershipRequest,
// }) {
//   const [paymentReference, setPaymentReference] = useState("");
//   const [paymentFile, setPaymentFile] = useState(null);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   if (!property || !investment) {
//     return null;
//   }

//   const totalShares = Number(property.totalShares || 0);

//   const currentShares = Number(investment.shares || 0);

//   const remainingShares = Math.max(
//     totalShares - currentShares,
//     0
//   );

//   const currentOwnership =
//     totalShares > 0
//       ? (currentShares / totalShares) * 100
//       : 0;

//   const isAlreadyFullOwner =
//     currentShares >= totalShares ||
//     investment.isFullOwner === true;

//   if (!property.enableFullOwnership) {
//     return null;
//   }

//   // ==========================================
//   // ALREADY FULL OWNER
//   // ==========================================

//   if (isAlreadyFullOwner) {
//     return (
//       <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
//         <div className="flex items-center gap-2">
//           <FiCheckCircle
//             size={18}
//             className="text-emerald-700"
//           />

//           <p className="text-sm font-bold text-emerald-800">
//             You own 100% of this property
//           </p>
//         </div>

//         <p className="text-xs text-emerald-700 mt-1">
//           You are the full owner of this property.
//         </p>
//       </div>
//     );
//   }

//   if (remainingShares <= 0) {
//     return null;
//   }

//   // ==========================================
//   // PAYMENT SUBMIT
//   // ==========================================

//   const handlePaymentSubmit = async () => {
//     if (!ownershipRequest?._id) {
//       toast.error("Ownership request not found");
//       return;
//     }

//     if (!paymentReference.trim()) {
//       toast.error("Please enter payment reference / UTR");
//       return;
//     }

//     if (!paymentFile) {
//       toast.error("Please upload payment screenshot");
//       return;
//     }

//     try {
//       setPaymentLoading(true);

//       const formData = new FormData();

//       formData.append(
//         "paymentReference",
//         paymentReference.trim()
//       );

//       formData.append(
//         "paymentMethod",
//         "Bank Transfer"
//       );

//       // IMPORTANT:
//       // This field name must match uploadSingle middleware.
//       formData.append("file", paymentFile);

//       const res = await axios.post(
//         `/api/ownership/${ownershipRequest._id}/payment-proof`,
//         formData
//       );

//       toast.success(
//         res.data?.message ||
//           "Payment proof submitted successfully"
//       );

//       setOwnershipRequest(
//         res.data?.request || {
//           ...ownershipRequest,
//           status: "payment_submitted",
//           paymentStatus: "payment_submitted",
//           paymentReference: paymentReference.trim(),
//         }
//       );

//       setPaymentReference("");
//       setPaymentFile(null);

//     } catch (err) {
//       console.error(
//         "PAYMENT PROOF ERROR:",
//         err.response?.data || err
//       );

//       toast.error(
//         err.response?.data?.message ||
//           "Failed to submit payment proof"
//       );
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   // ==========================================
//   // REQUEST CREATED
//   // ==========================================

//   const requestPaymentStatus =
//     ownershipRequest?.paymentStatus;

//   const requestStatus =
//     ownershipRequest?.status;

//   const paymentSubmitted =
//     requestStatus === "payment_submitted" ||
//     requestPaymentStatus === "payment_submitted";

//   const paymentVerified =
//     requestStatus === "payment_verified" ||
//     requestPaymentStatus === "verified";

//   const paymentRejected =
//     requestPaymentStatus === "rejected";

//   return (
//     <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">

//       {/* ========================================== */}
//       {/* HEADER */}
//       {/* ========================================== */}

//       <div className="flex items-center justify-between mb-3">

//         <div>
//           <p className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">
//             Full Ownership
//           </p>

//           <p className="text-sm font-extrabold text-gray-900 mt-1">
//             Become 100% Owner
//           </p>
//         </div>

//         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-700 shadow-sm">
//           <BsBuilding size={18} />
//         </div>

//       </div>

//       {/* ========================================== */}
//       {/* CURRENT OWNERSHIP */}
//       {/* ========================================== */}

//       <div className="bg-white rounded-xl border border-teal-100 p-3 mb-3">

//         <div className="flex justify-between items-center mb-2">

//           <span className="text-xs text-gray-500">
//             Current Ownership
//           </span>

//           <span className="text-sm font-extrabold text-teal-800">
//             {currentOwnership.toFixed(2)}%
//           </span>

//         </div>

//         <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-teal-700 rounded-full transition-all"
//             style={{
//               width: `${Math.min(
//                 currentOwnership,
//                 100
//               )}%`,
//             }}
//           />
//         </div>

//         <div className="flex justify-between mt-3 text-xs">

//           <span className="text-gray-500">
//             Shares owned
//           </span>

//           <span className="font-bold text-gray-900">
//             {currentShares} / {totalShares}
//           </span>

//         </div>

//         <div className="flex justify-between mt-1 text-xs">

//           <span className="text-gray-500">
//             Remaining shares
//           </span>

//           <span className="font-bold text-teal-800">
//             {remainingShares}
//           </span>

//         </div>

//       </div>

//       {/* ========================================== */}
//       {/* NO REQUEST */}
//       {/* ========================================== */}

//       {!ownershipRequest && (
//         <>
//           <button
//             onClick={onRequest}
//             disabled={loading}
//             className="w-full bg-teal-800 hover:bg-teal-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-xs transition-all"
//           >
//             {loading
//               ? "Creating Request..."
//               : "Request 100% Ownership"}
//           </button>

//           <p className="text-[10px] text-gray-500 text-center mt-2">
//             Remaining {remainingShares} shares will be
//             transferred after payment verification.
//           </p>
//         </>
//       )}

//       {/* ========================================== */}
//       {/* PAYMENT PENDING */}
//       {/* ========================================== */}

//       {ownershipRequest &&
//         !paymentSubmitted &&
//         !paymentVerified &&
//         !paymentRejected && (
//           <div className="bg-white border border-amber-200 rounded-xl p-4">

//             <div className="flex items-center justify-between mb-3">

//               <div>
//                 <p className="text-xs font-bold text-gray-900">
//                   Full Ownership Payment
//                 </p>

//                 <p className="text-[11px] text-gray-500 mt-1">
//                   Complete the bank transfer and submit
//                   your payment proof.
//                 </p>
//               </div>

//               <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold uppercase">
//                 Payment Pending
//               </span>

//             </div>

//             {/* PAYMENT SUMMARY */}

//             <div className="grid grid-cols-2 gap-3 mb-4">

//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-[9px] text-gray-400 uppercase">
//                   Additional Shares
//                 </p>

//                 <p className="text-sm font-bold text-gray-900 mt-1">
//                   {ownershipRequest.requestedShares}
//                 </p>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-[9px] text-gray-400 uppercase">
//                   Price / Share
//                 </p>

//                 <p className="text-sm font-bold text-gray-900 mt-1">
//                   ₹
//                   {Number(
//                     ownershipRequest.pricePerShare || 0
//                   ).toLocaleString("en-IN")}
//                 </p>
//               </div>

//               <div className="col-span-2 bg-emerald-50 rounded-lg p-3">

//                 <p className="text-[9px] text-emerald-600 uppercase">
//                   Total Amount
//                 </p>

//                 <p className="text-xl font-extrabold text-emerald-800 mt-1">
//                   ₹
//                   {Number(
//                     ownershipRequest.amount || 0
//                   ).toLocaleString("en-IN")}
//                 </p>

//               </div>

//             </div>

//             {/* PAYMENT METHOD */}

//             <div className="mb-4">

//               <p className="text-[10px] text-gray-400 uppercase mb-1">
//                 Payment Method
//               </p>

//               <div className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
//                 Bank Transfer
//               </div>

//             </div>

//             {/* UTR */}

//             <div className="mb-3">

//               <label className="text-[10px] font-bold text-gray-600 uppercase">
//                 Payment Reference / UTR
//               </label>

//               <input
//                 type="text"
//                 value={paymentReference}
//                 onChange={(e) =>
//                   setPaymentReference(e.target.value)
//                 }
//                 placeholder="Enter UTR / transaction reference"
//                 className="w-full mt-1 px-3 py-2.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
//               />

//             </div>

//             {/* SCREENSHOT */}

//             <div className="mb-4">

//               <label className="text-[10px] font-bold text-gray-600 uppercase">
//                 Payment Screenshot
//               </label>

//               <input
//                 type="file"
//                 accept="image/*,.pdf"
//                 onChange={(e) =>
//                   setPaymentFile(
//                     e.target.files?.[0] || null
//                   )
//                 }
//                 className="w-full mt-1 text-xs border border-gray-200 rounded-lg bg-white p-2"
//               />

//               {paymentFile && (
//                 <p className="text-[10px] text-gray-500 mt-1 truncate">
//                   Selected: {paymentFile.name}
//                 </p>
//               )}

//             </div>

//             {/* SUBMIT */}

//             <button
//               onClick={handlePaymentSubmit}
//               disabled={paymentLoading}
//               className="w-full bg-teal-800 hover:bg-teal-900 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-xs"
//             >
//               {paymentLoading
//                 ? "Submitting Payment..."
//                 : "Submit Payment Proof"}
//             </button>

//           </div>
//         )}

//       {/* ========================================== */}
//       {/* PAYMENT SUBMITTED */}
//       {/* ========================================== */}

//       {paymentSubmitted && (
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

//           <div className="flex items-center gap-2">

//             <FiCheckCircle
//               size={17}
//               className="text-blue-600"
//             />

//             <p className="text-xs font-bold text-blue-800">
//               Payment Proof Submitted
//             </p>

//           </div>

//           <p className="text-[11px] text-blue-700 mt-1">
//             Your payment is under admin verification.
//           </p>

//           {ownershipRequest.paymentReference && (
//             <p className="text-[10px] text-blue-600 mt-2">
//               UTR:{" "}
//               <span className="font-semibold">
//                 {ownershipRequest.paymentReference}
//               </span>
//             </p>
//           )}

//         </div>
//       )}

//       {/* ========================================== */}
//       {/* PAYMENT VERIFIED */}
//       {/* ========================================== */}

//       {paymentVerified && (
//         <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">

//           <div className="flex items-center gap-2">

//             <FiCheckCircle
//               size={17}
//               className="text-emerald-600"
//             />

//             <p className="text-xs font-bold text-emerald-800">
//               Payment Verified
//             </p>

//           </div>

//           <p className="text-[11px] text-emerald-700 mt-1">
//             Your payment has been verified. Final ownership
//             transfer is being processed by the admin.
//           </p>

//         </div>
//       )}

//       {/* ========================================== */}
//       {/* PAYMENT REJECTED */}
//       {/* ========================================== */}

//       {paymentRejected && (
//         <div className="bg-red-50 border border-red-200 rounded-xl p-4">

//           <p className="text-xs font-bold text-red-800">
//             Payment Proof Rejected
//           </p>

//           <p className="text-[11px] text-red-700 mt-1">
//             Please submit your payment proof again with
//             the correct transaction details.
//           </p>

//           <button
//             onClick={() => {
//               setOwnershipRequest({
//                 ...ownershipRequest,
//                 status: "payment_pending",
//                 paymentStatus: "rejected",
//               });
//             }}
//             className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs"
//           >
//             Resubmit Payment
//           </button>

//         </div>
//       )}

//     </div>
//   );
// }

function StickyCard({
  property,
  liked,
  setLiked,
  investment,
  onOwnershipRequest,
  ownershipLoading,
  ownershipRequest,
  setOwnershipRequest,
}) {
  const dispatch = useDispatch();
  // const [liked, setLiked] = useState(false);
  // const properties = useSelector((state) => state.property.properties);

  // console.log("pro" , properties,  );
  const handleWatchlist = async () => {
    const propertyId = property?._id || property?.id;
  
    if (!propertyId) {
      toast.error("Property ID not found");
      return;
    }
  
    try {
      const res = await axios.post(
        `/api/user/watchlist/toggle/${propertyId}`
      );
      window.dispatchEvent(
        new Event("watchlistUpdated")
      );
  
      if (res.data.action === "added") {
        setLiked(true);
        toast.success("Added to watchlist");
      } else {
        setLiked(false);
        toast.success("Removed from watchlist");
      }
      
  
    } catch (err) {
      console.log(err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };  
   

  const propertyId = property?.id || property?._id;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-5 lg:sticky lg:top-20">
      <h2 className="text-xl font-extrabold text-gray-900">{property.name}</h2>
      <div className="flex items-center gap-1 mt-1 mb-4">
        <HiOutlineLocationMarker size={13} className="text-gray-400" />
        <span className="text-xs text-gray-500">{property?.location?.city}, {property?.location?.state}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total Value</p>
          <p className="text-base font-bold text-gray-900">{property.totalValue}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Share Price</p>
          <p className="text-base font-bold text-gray-900">{property.sharePrice}</p>
        </div>
        
      </div>
     {/* SHARE AVAILABILITY */}

{(() => {
  const totalShares = Number(property?.totalShares || 0);
  const sharesLeft = Number(property?.sharesLeft ?? property?.availableShares ?? 0);

  const soldShares = Math.max(totalShares - sharesLeft, 0);

  const fundedPercent =
    totalShares > 0
      ? Math.min((soldShares / totalShares) * 100, 100)
      : 0;

  return (
    <>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium">
          {fundedPercent.toFixed(1)}% Funded
        </span>

        <span className="text-xs text-gray-400">
          {sharesLeft} / {totalShares} Shares Left
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
        <div
          className="bg-emerald-700 h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${fundedPercent}%`,
          }}
        />
      </div>

      <p className="text-[10px] text-gray-400 mb-4">
        Joined by {property?.investors || 0} individual investors
      </p>
    </>
  );
})()}
      <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-colors mb-3">
      <NavLink to={`/checkout/${propertyId}`}>
             Invest Now
        </NavLink>
       </button>

       {/* <FullOwnershipCard
  property={property}
  investment={investment}
  onRequest={onOwnershipRequest}
  loading={ownershipLoading}
  ownershipRequest={ownershipRequest}
  setOwnershipRequest={setOwnershipRequest}
/> */}



       <button
  onClick={handleWatchlist}
  className={`w-full flex items-center justify-center gap-2 border 
    ${liked ? "border-red-300 bg-red-50 text-red-500" : "border-gray-200 text-gray-700"}
    font-medium py-2.5 rounded-xl text-sm transition-all`}
>
  {liked ? <FaHeart className="text-red-500" /> : <FiHeart />}
  {liked ? "Saved" : "Save to Watchlist"}
</button>
    
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  
  return (
    <section className="py-10">
      <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">Investment Knowledge</h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
              <span className="text-sm font-medium text-gray-900">{f.q}</span>
              {open === i ? <FiChevronUp size={16} className="text-gray-400 shrink-0" /> : <FiChevronDown size={16} className="text-gray-400 shrink-0" />}
            </button>
            {open === i && <div className="px-5 pb-4 text-sm text-gray-500">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedCard({ p }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/properties/${p.id}`)} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={p.img} alt={p.name} className="w-full h-32 object-cover" />
        <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{p.badge}</span>
      </div>
      <div className="p-3">
        <p className="text-sm font-bold text-gray-900">{p.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <HiOutlineLocationMarker size={11} className="text-gray-400" />
          <span className="text-[10px] text-gray-500">{p.loc}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-[9px] text-gray-400 uppercase">ROI</p>
            <p className="text-xs font-bold text-emerald-700">{p.roi}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 uppercase">Share</p>
            <p className="text-xs font-bold text-gray-900">{p.share}</p>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function PropertydetailPage() {

  const [relatedProperties, setRelatedProperties] = useState([]);

  const { id } = useParams();

const properties = useSelector((state) => state.property.properties);

const [property, setProperty] = useState(null);

const [ownershipLoading, setOwnershipLoading] = useState(false);
const [ownershipRequest, setOwnershipRequest] = useState(null);
const [myInvestment, setMyInvestment] = useState(null);
const [investmentLoading, setInvestmentLoading] = useState(true);


const [liked, setLiked] = useState(false);
  
  const location = useLocation();
  // const id = location.state?.id;
  // const property = properties[id-1];
  console.log('id', property  )


  useEffect(() => {
    const existing = properties.find(
      (p) => p._id === id || p.id === id
    );
  
    if (existing) {
      setProperty(existing);
    } else {
      fetchProperty();
    }
  
    if (id) {
      fetchRelatedProperties();
      fetchMyInvestment();
      fetchMyOwnershipRequest();
    }
  }, [id, properties]);


  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const res = await axios.get("/api/user/watchlist");
  
        const watchlist = res.data?.data || [];
  
        const currentPropertyId = property?._id || property?.id;
  
        const exists = watchlist.some(
          (item) =>
            item._id?.toString() === currentPropertyId?.toString()
        );
  
        setLiked(exists);
  
      } catch (err) {
        console.log("Watchlist error:", err.response?.data || err);
      }
    };
  
    if (property?._id || property?.id) {
      checkWatchlist();
    }
  }, [property]);


  const fetchProperty = async () => {
  try {
    const res = await axios.get(`/api/properties/${id}`);

    console.log("PROPERTY API RESPONSE:", res.data);
    console.log("PROPERTY IMAGES:", res.data?.media?.images);

    setProperty(res.data);
  } catch (err) {
    console.error("Error fetching property:", err);
  }
};

  const handleFullOwnershipRequest = async () => {
    try {
      const investmentId = myInvestment?.investmentId;
  
      if (!investmentId) {
        toast.error(
          "You do not have an approved investment in this property"
        );
        return;
      }
  
      setOwnershipLoading(true);
  
      const res = await axios.post(
        "/api/ownership/request",
        { investmentId }
      );
  
      setOwnershipRequest(res.data?.request || null);
  
      toast.success(
        "Full ownership request created successfully"
      );
    } catch (err) {
      console.error("FULL OWNERSHIP REQUEST ERROR:", err);
  
      toast.error(
        err.response?.data?.message ||
          "Unable to create ownership request"
      );
    } finally {
      setOwnershipLoading(false);
    }
  };
  const fetchRelatedProperties = async () => {
    try {
      const res = await axios.get(`/api/properties/related/${id}`);
      setRelatedProperties(res.data);
    } catch (err) {
      console.error("Error fetching related properties:", err);
    }
  };

  const fetchMyInvestment = async () => {
    try {
      setInvestmentLoading(true);
  
      const res = await axios.get("/api/portfolio");
  
      const investments = res.data?.investments || [];
  
      const currentInvestment = investments.find(
        (inv) =>
          String(inv.propertyId?._id || inv.propertyId) === String(id)
      );
  
      setMyInvestment(currentInvestment || null);
    } catch (err) {
      console.error("Error fetching my investment:", err);
      setMyInvestment(null);
    } finally {
      setInvestmentLoading(false);
    }
  };

  const fetchMyOwnershipRequest = async () => {
    try {
      const res = await axios.get("/api/ownership/my-requests");
  
      const requests = Array.isArray(res.data)
        ? res.data
        : res.data?.requests || [];
  
      const currentRequest = requests.find(
        (request) =>
          String(request.propertyId?._id || request.propertyId) ===
          String(id)
      );
  
      setOwnershipRequest(currentRequest || null);
    } catch (err) {
      console.error(
        "FETCH OWNERSHIP REQUEST ERROR:",
        err.response?.data || err
      );
  
      setOwnershipRequest(null);
    }
  };

  if (!property) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <a href="#" className="hover:text-gray-700">Home</a>
          <span>&rsaquo;</span>
          <a href="#" className="hover:text-gray-700">Properties</a>
          <span>&rsaquo;</span>
          <span className="text-gray-900 font-medium">{property.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
          <Gallery property={property} />

            <section className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Property Overview</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{property.description || "No description available"}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <MdOutlineSquareFoot size={18} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600">
  {property?.size || "Size not available"}
</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineLocationMarker size={18} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600">{property?.location?.city}, {property?.location?.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlinePeople size={18} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600">
  {property?.tenants || "No tenant information"}
</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiBuilding2Line size={18} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600">
  {property?.propertyGrade || "Property grade not specified"}
</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Investment Performance</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {[
                  
                    {
                      label: "Total Asset Value",
                      value: `₹${property?.totalValue?.toLocaleString() || 0}`
                    },
                    {
                      label: "Price Per Share",
                      value: `₹${property?.sharePrice?.toLocaleString() || 0}`
                    },
                    {
                      label: "Expected ROI",
                      value: `${property?.roi ?? property?.targetROI ?? 0}%`,
                      green: true
                    },
                    {
                      label: "Rental Yield",
                      value: `${property?.rentalYield ?? 0}%`,
                      green: true
                    },
                    {
                      label: "Holding Period",
                      value: `${property?.duration || 0} Years`
                    },
                    {
                      label: "Lock-in Period",
                      value: `${property?.lockInYears ?? 2} ${
                        (property?.lockInYears ?? 2) === 1 ? "Year" : "Years"
                      }`
                    }

                ].map(item => (
                  <div key={item.label}>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className={`text-lg font-bold mt-1 ${item.green ? "text-emerald-700" : "text-gray-900"}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mb-6">
            <ReturnsCalculator property={property} />
            </div>

            <section className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Location</h2>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <HiOutlineLocationMarker size={13} />
                 {property?.location?.city}, {property?.location?.state}
                </div>
              </div>
              <div className="bg-gray-200 rounded-xl h-40 sm:h-52 flex items-center justify-center mb-4 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13757.354064198062!2d73.8536679!3d18.4719759!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776857246711!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
             </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Metro Access", desc: "2 mins walking distance" },
                  { name: "Dubai Intl Airport", desc: "25 mins drive" },
                  { name: "The Palm Jumeirah", desc: "12 mins drive" },
                ].map(loc => (
                  <div key={loc.name} className="text-center">
                    <p className="text-xs font-semibold text-gray-800">{loc.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{loc.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Due Diligence</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  {property?.documents?.length > 0 ? (
    property.documents.map((doc, i) => (
      <div
        key={i}
        className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-500">
            <BsFileText size={18} />
          </span>

          <div>
            <p className="text-xs font-semibold text-gray-900">
              {doc.name}
            </p>
            <p className="text-[10px] text-gray-400">
              {doc.size || "PDF"}
            </p>
          </div>
        </div>

        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FiDownload size={14} className="text-gray-500" />
        </a>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-400">No documents available</p>
  )}
</div>
            </section>

            <FAQSection />

            <section className="py-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Curated Opportunities</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Hand-picked properties similar to your current view.</p>
                </div>
                <NavLink to='/portfolio' className="flex items-center gap-1 text-xs text-emerald-700 font-semibold hover:underline">View Portfolio <FiArrowRight size={12} /></NavLink>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProperties.map((p) => (
  <RelatedCard
    key={p._id}
    p={{
      id: p._id,
      name: p.name,
      img: p.media?.images?.[0],
      loc: `${p.location?.city}, ${p.location?.state}`,
      roi: `${p.roi}%`,
      share: `₹${p.pricePerShare}`,
      badge: p.type
    }}
  />
))}
              </div>
            </section>
          </div>

          <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <StickyCard
  property={property}
  liked={liked}
  setLiked={setLiked}
  investment={myInvestment}
  onOwnershipRequest={handleFullOwnershipRequest}
  ownershipLoading={ownershipLoading}
  ownershipRequest={ownershipRequest}
  setOwnershipRequest={setOwnershipRequest}
/>
          </div>

          
        </div>
      </div>
    </div>
  );
}