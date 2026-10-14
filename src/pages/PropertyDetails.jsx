import { useState, useEffect } from "react";

import {

  FiDownload,

  FiHeart,

  FiChevronDown,

  FiChevronUp,

  FiPlus,

  FiMinus,

  FiArrowRight,

  FiMapPin,

  FiCheckCircle,

  FiTrendingUp,

  FiClock,

  FiUsers,

  FiGrid,

} from "react-icons/fi";

import {

  BsFileText,

  BsBuilding,

} from "react-icons/bs";

import { HiOutlineLocationMarker } from "react-icons/hi";

import {

  MdOutlineSquareFoot,

  MdOutlinePeople,

} from "react-icons/md";

import { RiBuilding2Line } from "react-icons/ri";

import { NavLink, useParams, useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import axios from "../utils/axios";

const FALLBACK_IMAGE =

  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80";

const FAQS = [

  {

    q: "What is fractional ownership?",

    a: "Fractional ownership allows multiple investors to own a percentage of a high-value property. Each investment represents a proportional ownership stake in the underlying asset.",

  },

  {

    q: "What does one share represent?",

    a: "Each share represents a portion of ownership in the property and gives you proportional exposure to rental income and potential appreciation.",

  },

  {

    q: "How do I exit my investment?",

    a: "You can exit based on the platform's available liquidity options, secondary marketplace opportunities, or the planned property exit strategy.",

  },

];

const formatCurrency = (value) => {

  const number = Number(value || 0);

  return `₹${number.toLocaleString("en-IN")}`;

};


const createLegalDocumentHtml = (legalTitle, legalContent) => {
  const escapeHtml = (text) =>
    String(text || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));

  const title = escapeHtml(
    legalTitle || "PROPERTY LEGAL DOCUMENT"
  );

  const content = escapeHtml(legalContent)
    .replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <style>
      * { box-sizing: border-box; }

      body {
        margin: 0;
        padding: 35px;
        background: #eef1f4;
        font-family: Arial, sans-serif;
        color: #243044;
      }

      .toolbar {
        max-width: 850px;
        margin: 0 auto 18px;
        text-align: right;
      }

      .print-btn {
        border: 0;
        background: #087b60;
        color: white;
        padding: 12px 22px;
        border-radius: 6px;
        cursor: pointer;
      }

      .paper {
        max-width: 850px;
        min-height: 1050px;
        margin: auto;
        padding: 55px 65px;
        background: white;
        box-shadow: 0 5px 28px #0002;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding-bottom: 22px;
        border-bottom: 3px solid #087b60;
      }

      .brand {
        color: #123d35;
        font-size: 25px;
        font-weight: 800;
        letter-spacing: 1px;
      }

      .brand span {
        display: block;
        color: #087b60;
        font-size: 10px;
        letter-spacing: 4px;
      }

      .label {
        color: #64748b;
        font-size: 10px;
        text-align: right;
        text-transform: uppercase;
      }

      .doc-title {
        text-align: center;
        margin: 34px 0 8px;
        font-size: 22px;
        color: #173c34;
      }

      .subtitle {
        text-align: center;
        color: #738092;
        font-size: 11px;
        margin-bottom: 30px;
      }

      .content {
        font-size: 13px;
        line-height: 1.9;
        overflow-wrap: anywhere;
      }

      .footer {
        margin-top: 60px;
        padding-top: 15px;
        border-top: 1px solid #d5dedb;
        color: #64748b;
        font-size: 10px;
        line-height: 1.7;
        text-align: center;
      }

      @page { size: A4; margin: 12mm; }

      @media print {
        body { padding: 0; background: white; }
        .toolbar { display: none; }
        .paper {
          max-width: none;
          min-height: auto;
          padding: 20px;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <button class="print-btn" onclick="window.print()">
        Print / Save as PDF
      </button>
    </div>

    <main class="paper">
      <header class="header">
        <div class="brand">
          PRONEX
          <span>WORLD</span>
        </div>
        <div class="label">
          Property Documentation<br />
          Legal &amp; Due Diligence
        </div>
      </header>

      <h1 class="doc-title">${title}</h1>

      <p class="subtitle">
        PROPERTY RECORD · LEGAL DOCUMENTATION
      </p>

      <div class="content">${content}</div>

      <footer class="footer">
        <strong>PRONEX WORLD</strong><br />
        Property Legal Documentation<br />
        Please verify this document against original records.
      </footer>
    </main>
  </body>
  </html>`;
};


/* =====================================================

   GALLERY

===================================================== */

function Gallery({ property }) {

  const propertyImages =

    property?.media?.images?.filter(Boolean)?.length > 0

      ? property.media.images.filter(Boolean)

      : property?.images?.filter(Boolean)?.length > 0

      ? property.images.filter(Boolean)

      : [FALLBACK_IMAGE];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {

    setActiveIndex(0);

  }, [property?._id, property?.id]);

  const handleImageError = (e) => {

    e.currentTarget.src = FALLBACK_IMAGE;

  };

  const fundedPercent = Number(

    property?.fundedPercent ?? 0

  );

  return (

    <section className="mb-8">

      {/* MAIN HERO IMAGE */}

      <div className="relative overflow-hidden rounded-[28px] bg-gray-900 shadow-xl group">

        <img

          src={propertyImages[activeIndex] || FALLBACK_IMAGE}

          alt={property?.name || "Property"}

          onError={handleImageError}

          className="w-full h-[300px] sm:h-[420px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"

        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* TOP BADGES */}

        <div className="absolute top-5 left-5 flex flex-wrap gap-2">

          <span className="backdrop-blur-md bg-white/15 border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">

            {property?.type || "Property"}

          </span>

          <span className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest">

            {fundedPercent}% FUNDED

          </span>

        </div>

        {/* PROPERTY NAME */}

        <div className="absolute bottom-6 left-6 right-6">

          <div className="flex items-end justify-between gap-4">

            <div>

              <div className="flex items-center gap-2 text-white/80 text-xs mb-2">

                <FiMapPin size={14} />

                <span>

                  {property?.location?.city || "Location"},

                  {" "}

                  {property?.location?.state || ""}

                </span>

              </div>

              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">

                {property?.name}

              </h1>

            </div>

          </div>

        </div>

      </div>

      {/* THUMBNAILS */}

      <div className="flex gap-3 mt-4 overflow-x-auto pb-1">

        {propertyImages.map((img, index) => (

          <button

            key={`${img}-${index}`}

            onClick={() => setActiveIndex(index)}

            className={`relative min-w-[95px] h-[70px] rounded-2xl overflow-hidden transition-all duration-300

              ${

                activeIndex === index

                  ? "ring-2 ring-emerald-500 ring-offset-2 scale-[1.03]"

                  : "opacity-70 hover:opacity-100"

              }

            `}

          >

            <img

              src={img}

              alt={`Property ${index + 1}`}

              onError={handleImageError}

              className="w-full h-full object-cover"

            />

            {activeIndex === index && (

              <div className="absolute inset-0 bg-emerald-900/20" />

            )}

          </button>

        ))}

      </div>

    </section>

  );

}

/* =====================================================

   RETURNS CALCULATOR

===================================================== */

function ReturnsCalculator({ property }) {

  const totalShares = Number(property?.totalShares || 0);

  const availableShares = Number(

    property?.sharesLeft ??

    property?.availableShares ??

    0

  );

  const sharePrice = Number(

    property?.sharePrice ??

    property?.pricePerShare ??

    0

  );

  const shareCycle = Number(

    property?.shareBuyingCycle || 10

  );

  const rentalYield = Number(

    property?.rentalYield || 0

  );

  const appreciation = Number(

    property?.appreciation || 0

  );

  const lockInYears = Number(

    property?.lockInYears || 2

  );

  const calculateMaxShares = () => {

    if (availableShares < 10) return 0;

    if (shareCycle === 10) {

      return Math.floor(availableShares / 10) * 10;

    }

    return (

      10 +

      Math.floor((availableShares - 10) / 5) * 5

    );

  };

  const maxShares = Math.min(

    totalShares,

    calculateMaxShares()

  );

  const [shares, setShares] = useState(

    maxShares >= 10 ? 10 : 0

  );

  useEffect(() => {

    if (maxShares < 10) {

      setShares(0);

      return;

    }

    setShares((current) => {

      if (current < 10) return 10;

      if (current > maxShares) {

        return maxShares;

      }

      return current;

    });

  }, [maxShares]);

  const totalInvestment = shares * sharePrice;

  const monthlyIncome =

    (totalInvestment * rentalYield) /

    100 /

    12;

  const exitValue =

    totalInvestment *

    Math.pow(

      1 + appreciation / 100,

      lockInYears

    );

  const ownershipPercent =

    totalShares > 0

      ? (shares / totalShares) * 100

      : 0;

  if (maxShares < 10) {

    return (

      <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">

            <FiTrendingUp />

          </div>

          <div>

            <h3 className="font-bold text-gray-900">

              Investment Calculator

            </h3>

            <p className="text-sm text-gray-500">

              Currently unavailable for investment

            </p>

          </div>

        </div>

      </div>

    );

  }

  return (

    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white shadow-xl p-6 sm:p-8">

      {/* DECORATION */}

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

          <div>

            <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">

              Investment Simulator

            </p>

            <h2 className="text-2xl font-bold">

              Calculate Your Potential Returns

            </h2>

          </div>

          <span className="w-fit px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 text-xs font-semibold">

            Live Projection

          </span>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* SHARE SELECTOR */}

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">

              Select Investment Shares

            </p>

            <div className="flex items-center justify-between">

              <button

                disabled={shares <= 10}

                onClick={() => {

                  const next = shares - shareCycle;

                  if (next >= 10) {

                    setShares(next);

                  }

                }}

                className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 transition"

              >

                <FiMinus />

              </button>

              <div className="text-center">

                <p className="text-5xl font-bold">

                  {shares}

                </p>

                <p className="text-xs text-gray-400 mt-2">

                  Shares Selected

                </p>

              </div>

              <button

                disabled={shares >= maxShares}

                onClick={() => {

                  const next = shares + shareCycle;

                  if (next <= maxShares) {

                    setShares(next);

                  }

                }}

                className="w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 flex items-center justify-center disabled:opacity-30 transition"

              >

                <FiPlus />

              </button>

            </div>

            <div className="mt-8 pt-6 border-t border-white/10">

              <div className="flex justify-between text-sm mb-3">

                <span className="text-gray-400">

                  Ownership

                </span>

                <span className="font-bold text-emerald-400">

                  {ownershipPercent.toFixed(2)}%

                </span>

              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden">

                <div

                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"

                  style={{

                    width: `${Math.min(

                      ownershipPercent,

                      100

                    )}%`,

                  }}

                />

              </div>

              <p className="text-xs text-gray-500 mt-4">

                {availableShares} shares currently available

              </p>

            </div>

          </div>

          {/* RETURNS */}

          <div className="grid gap-4">

            <div className="rounded-2xl bg-white text-gray-900 p-5 shadow-lg">

              <p className="text-xs uppercase tracking-wider text-gray-400">

                Total Investment

              </p>

              <p className="text-2xl font-bold mt-2">

                {formatCurrency(totalInvestment)}

              </p>

            </div>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-5">

              <p className="text-xs uppercase tracking-wider text-emerald-300">

                Estimated Monthly Income

              </p>

              <p className="text-2xl font-bold text-emerald-400 mt-2">

                {formatCurrency(monthlyIncome)}

              </p>

            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

              <p className="text-xs uppercase tracking-wider text-gray-400">

                Projected Value After {lockInYears} Years

              </p>

              <p className="text-2xl font-bold mt-2">

                {formatCurrency(Math.round(exitValue))}

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

/* =====================================================

   STICKY INVESTMENT CARD

===================================================== */

function StickyCard({
  property,
  liked,
  setLiked,
  isBroker,
}) {
  const navigate = useNavigate();

  const propertyId =

    property?.id || property?._id;

  const handleWatchlist = async () => {

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

        toast.success(

          "Added to watchlist"

        );

      } else {

        setLiked(false);

        toast.success(

          "Removed from watchlist"

        );

      }

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  const totalShares = Number(

    property?.totalShares || 0

  );

  const sharesLeft = Number(

    property?.sharesLeft ??

    property?.availableShares ??

    0

  );

  const soldShares = Math.max(

    totalShares - sharesLeft,

    0

  );

  const fundedPercent =

    totalShares > 0

      ? Math.min(

          (soldShares / totalShares) * 100,

          100

        )

      : 0;

  return (

    <div className="lg:sticky lg:top-24">

      <div className="relative overflow-hidden rounded-[28px] bg-white border border-gray-200 shadow-xl">

        {/* HEADER */}

        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-6 text-white">

          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 mb-2">

            Investment Opportunity

          </p>

          <h2 className="text-xl font-bold leading-tight">

            {property?.name}

          </h2>

          <div className="flex items-center gap-2 mt-3 text-white/70 text-xs">

            <FiMapPin />

            <span>

              {property?.location?.city || "Location"},

              {" "}

              {property?.location?.state || ""}

            </span>

          </div>

        </div>

        <div className="p-6">

          {/* PRICE */}

          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-100">

            <div>

              <p className="text-[10px] uppercase tracking-wider text-gray-400">

                Total Value

              </p>

              <p className="font-bold text-gray-900 mt-1">

                {formatCurrency(property?.totalValue)}

              </p>

            </div>

            <div>

              <p className="text-[10px] uppercase tracking-wider text-gray-400">

                Price Per Share

              </p>

              <p className="font-bold text-gray-900 mt-1">

                {formatCurrency(

                  property?.sharePrice ??

                  property?.pricePerShare

                )}

              </p>

            </div>

          </div>

          {/* FUNDING */}

          <div className="py-6">

            <div className="flex justify-between mb-3">

              <div>

                <p className="font-semibold text-gray-900 text-sm">

                  Funding Progress

                </p>

                <p className="text-xs text-gray-400 mt-1">

                  {sharesLeft} shares remaining

                </p>

              </div>

              <span className="text-sm font-bold text-emerald-700">

                {fundedPercent.toFixed(1)}%

              </span>

            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

              <div

                className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full"

                style={{

                  width: `${fundedPercent}%`,

                }}

              />

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 gap-3 mb-6">

            <div className="rounded-2xl bg-gray-50 p-4">

              <FiTrendingUp className="text-emerald-600 mb-2" />

              <p className="text-[10px] text-gray-400 uppercase">

                Expected ROI

              </p>

              <p className="font-bold text-gray-900 mt-1">

                {property?.roi ??

                  property?.targetROI ??

                  0}%

              </p>

            </div>

            {/* <div className="rounded-2xl bg-gray-50 p-4">

              <FiUsers className="text-emerald-600 mb-2" />

              <p className="text-[10px] text-gray-400 uppercase">

                Investors

              </p>

              <p className="font-bold text-gray-900 mt-1">

                {property?.investors || 0}

              </p>

            </div> */}

          </div>

          {/* INVEST BUTTON */}

          
<button
  type="button"
  onClick={() => {
    const role = localStorage.getItem("role");

    if (role === "broker") {
      toast.error(
        "Brokers cannot invest using their broker account. Please use a separate investor account."
      );
      return;
    }

    navigate(`/checkout/${property._id || property.id}`);
  }}
  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg"
>
  Invest Now
</button>


          {/* WATCHLIST */}

          <button

            onClick={handleWatchlist}

            className={`w-full mt-3 flex items-center justify-center gap-2 border rounded-2xl py-3 font-semibold text-sm transition-all

              ${

                liked

                  ? "border-red-200 bg-red-50 text-red-500"

                  : "border-gray-200 text-gray-700 hover:bg-gray-50"

              }

            `}

          >

            {liked

              ? <FaHeart />

              : <FiHeart />

            }

            {liked

              ? "Saved to Watchlist"

              : "Save to Watchlist"

            }

          </button>

          <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-gray-400">

            <FiCheckCircle className="text-emerald-500" />

            Secure & verified investment

          </div>

        </div>

      </div>

    </div>

  );

}

/* =====================================================

   FAQ

===================================================== */

function FAQSection() {

  const [open, setOpen] = useState(null);

  return (

    <section className="py-8">

      <div className="mb-6">

        <p className="text-emerald-700 text-xs uppercase tracking-[0.2em] font-bold mb-2">

          Learn More

        </p>

        <h2 className="text-2xl font-bold text-gray-900">

          Investment Knowledge

        </h2>

      </div>

      <div className="space-y-3">

        {FAQS.map((faq, index) => (

          <div

            key={index}

            className="bg-white border border-gray-200 rounded-2xl overflow-hidden"

          >

            <button

              onClick={() =>

                setOpen(

                  open === index

                    ? null

                    : index

                )

              }

              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"

            >

              <span className="font-semibold text-gray-900 text-sm">

                {faq.q}

              </span>

              {open === index

                ? <FiChevronUp />

                : <FiChevronDown />

              }

            </button>

            {open === index && (

              <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">

                {faq.a}

              </div>

            )}

          </div>

        ))}

      </div>

    </section>

  );

}

/* =====================================================

   RELATED CARD

===================================================== */

function RelatedCard({ property }) {

  const navigate = useNavigate();

  const image =

    property?.media?.images?.[0] ||

    FALLBACK_IMAGE;

  return (

    <div

      onClick={() =>

        navigate(`/properties/${property?._id}`)

      }

      className="group cursor-pointer bg-white border border-gray-200 rounded-[24px] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"

    >

      <div className="relative overflow-hidden h-48">

        <img

          src={image}

          alt={property?.name}

          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold text-gray-800 uppercase">

          {property?.type || "Property"}

        </span>

      </div>

      <div className="p-5">

        <h3 className="font-bold text-gray-900">

          {property?.name}

        </h3>

        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">

          <FiMapPin />

          {property?.location?.city},

          {" "}

          {property?.location?.state}

        </div>

        <div className="flex justify-between mt-5 pt-4 border-t border-gray-100">

          <div>

            <p className="text-[9px] text-gray-400 uppercase">

              Expected ROI

            </p>

            <p className="font-bold text-emerald-700 mt-1">

              {property?.roi || 0}%

            </p>

          </div>

          <div className="text-right">

            <p className="text-[9px] text-gray-400 uppercase">

              Share Price

            </p>

            <p className="font-bold text-gray-900 mt-1">

              {formatCurrency(

                property?.sharePrice ??

                property?.pricePerShare

              )}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

/* =====================================================

   MAIN PAGE

===================================================== */

export default function PropertydetailPage() {

  const { id } = useParams();

  const navigate = useNavigate();

const [isBroker, setIsBroker] = useState(
  () => localStorage.getItem("role") === "broker"
);

useEffect(() => {
  const checkRole = () => {
    setIsBroker(localStorage.getItem("role") === "broker");
  };

  window.addEventListener("storage", checkRole);

  return () => {
    window.removeEventListener("storage", checkRole);
  };
}, []);

  const properties = useSelector((state) => state.property.properties);

  // Update this selector if your Redux auth slice uses a different path.
  const user = useSelector((state) => state.auth?.user);
  

  const [property, setProperty] =

    useState(null);

  const [relatedProperties, setRelatedProperties] =

    useState([]);

  const [liked, setLiked] =

    useState(false);

  /* =========================

     FETCH PROPERTY

  \========================= */

  const fetchProperty = async () => {

    try {

      const res = await axios.get(

        `/api/properties/${id}`

      );

      setProperty(res.data);

    } catch (error) {

      console.error(

        "Property fetch error:",

        error

      );

      toast.error(

        "Unable to load property"

      );

    }

  };

  /* =========================

     RELATED

  \========================= */

  const fetchRelatedProperties =

    async () => {

      try {

        const res = await axios.get(

          `/api/properties/related/${id}`

        );

        setRelatedProperties(

          Array.isArray(res.data)

            ? res.data

            : res.data?.properties || []

        );

      } catch (error) {

        console.error(

          "Related property error:",

          error

        );

      }

    };

  

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    if (!id) return;

    fetchProperty();
    fetchRelatedProperties();
  }, [id]);


  /* =========================

     WATCHLIST CHECK

  \========================= */

  useEffect(() => {

    const checkWatchlist =

      async () => {

        try {

          const res =

            await axios.get(

              "/api/user/watchlist"

            );

          const watchlist =

            res.data?.data || [];

          const currentId =

            property?._id ||

            property?.id;

          const exists =

            watchlist.some(

              (item) =>

                String(item?._id) ===

                String(currentId)

            );

          setLiked(exists);

        } catch (error) {

          console.log(

            "Watchlist error:",

            error

          );

        }

      };

    if (

      property?._id ||

      property?.id

    ) {

      checkWatchlist();

    }

  }, [property]);

  /* =========================

     LOADING

  \========================= */

  if (!property) {

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500">

            Loading property...

          </p>

        </div>

      </div>

    );

  }

  const locationText = [

    property?.location?.city,

    property?.location?.state,

  ]

    .filter(Boolean)

    .join(", ");

  return (

    <div className="min-h-screen bg-[#f7f8f7]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-7">

          <NavLink

            to="/"

            className="hover:text-emerald-700"

          >

            Home

          </NavLink>

          <span>/</span>

          <NavLink

            to="/properties"

            className="hover:text-emerald-700"

          >

            Properties

          </NavLink>

          <span>/</span>

          <span className="text-gray-700 truncate">

            {property?.name}

          </span>

        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] gap-8 xl:gap-10">

          {/* LEFT */}

          <div className="min-w-0">

            <Gallery property={property} />

            {/* OVERVIEW */}

            <section className="bg-white border border-gray-200 rounded-[28px] p-6 sm:p-8 mb-6 shadow-sm">

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">

                <div>

                  <p className="text-emerald-700 text-xs uppercase tracking-[0.2em] font-bold mb-2">

                    Property Details

                  </p>

                  <h2 className="text-2xl font-bold text-gray-900">

                    Property Overview

                  </h2>

                </div>

              </div>

              <p className="text-gray-500 text-sm leading-7">

                {property?.description ||

                  "No description available for this property."

                }

              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                <InfoCard

                  icon={<MdOutlineSquareFoot />}

                  label="Property Size"

                  value={

                    property?.size ||

                    "Not Available"

                  }

                />

                <InfoCard

                  icon={<HiOutlineLocationMarker />}

                  label="Location"

                  value={

                    locationText ||

                    "Not Available"

                  }

                />

                <InfoCard

                  icon={<MdOutlinePeople />}

                  label="Tenants"

                  value={

                    property?.tenants ||

                    "Not Available"

                  }

                />

                <InfoCard

                  icon={<RiBuilding2Line />}

                  label="Property Grade"

                  value={

                    property?.propertyGrade ||

                    "Not Available"

                  }

                />

              </div>

            </section>

            {/* PERFORMANCE */}

            <section className="bg-white border border-gray-200 rounded-[28px] p-6 sm:p-8 mb-6 shadow-sm">

              <div className="mb-7">

                <p className="text-emerald-700 text-xs uppercase tracking-[0.2em] font-bold mb-2">

                  Financial Insights

                </p>

                <h2 className="text-2xl font-bold text-gray-900">

                  Investment Performance

                </h2>

              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

                <PerformanceCard

                  label="Total Asset Value"

                  value={formatCurrency(

                    property?.totalValue

                  )}

                />

                <PerformanceCard

                  label="Price Per Share"

                  value={formatCurrency(

                    property?.sharePrice ??

                    property?.pricePerShare

                  )}

                />

                <PerformanceCard

                  label="Expected ROI"

                  value={`${property?.roi ??

                    property?.targetROI ??

                    0}%`}

                  green

                />
{/* 
                <PerformanceCard

                  label="Rental Yield"

                  value={`${property?.rentalYield ?? 0}%`}

                  green

                /> */}

                {/* <PerformanceCard

                  label="Holding Period"

                  value={`${property?.duration || 0} Years`}

                /> */}

                <PerformanceCard

                  label="Lock-in Period"

                  value={`${property?.lockInYears ?? 2} Years`}

                />

              </div>

            </section>

            {/* CALCULATOR */}

            <div className="mb-6">

              <ReturnsCalculator

                property={property}

              />

            </div>

            {/* LOCATION */}

            <section className="bg-white border border-gray-200 rounded-[28px] p-6 sm:p-8 mb-6 shadow-sm">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-emerald-700 text-xs uppercase tracking-[0.2em] font-bold mb-2">

                    Where It Is

                  </p>

                  <h2 className="text-2xl font-bold text-gray-900">

                    Location

                  </h2>

                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">

                  <FiMapPin />

                  {locationText}

                </div>

              </div>

              <div className="overflow-hidden rounded-3xl border border-gray-200 h-[300px]">

                <iframe

                  title="Property Location"

                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13757.354064198062!2d73.8536679!3d18.4719759!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776857246711!5m2!1sen!2sin"

                  width="100%"

                  height="100%"

                  style={{ border: 0 }}

                  allowFullScreen

                  loading="lazy"

                  referrerPolicy="no-referrer-when-downgrade"

                />

              </div>

            </section>

           {/* DOCUMENTS */}


{/* DOCUMENTS */}
<section className="bg-white border border-gray-200 rounded-[28px] p-6 sm:p-8 mb-6 shadow-sm">
  <div className="mb-6">
    <p className="text-emerald-700 text-xs uppercase tracking-[0.2em] font-bold mb-2">
      Verified Documents
    </p>

    <h2 className="text-2xl font-bold text-gray-900">
      Due Diligence
    </h2>
  </div>

  {(() => {
    const note = property?.dueDiligenceNote || "";
    const docs = property?.media?.documents || [];
    const legalTitle = property?.legalDocumentTitle || "";
    const legalContent = property?.legalDocumentContent || "";

    const video = property?.media?.video || "";
    const brochure = property?.media?.brochure || "";
    
    if (
      !note.trim() &&
      !legalContent.trim() &&
      docs.length === 0 &&
      !video &&
      !brochure
    ) {
      return (
        <p className="text-sm text-gray-400">
          No documents available
        </p>
      );
    }

    return (
      <div className="space-y-5">
       
{legalContent.trim() && (
  <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <BsFileText size={22} />
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {legalTitle || "Property Legal Document"}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Legal Document · Available to view and download
        </p>
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        
onClick={() => {
  const escapeHtml = (text) =>
    String(text || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));

  const title = escapeHtml(
    legalTitle || "PROPERTY LEGAL DOCUMENT"
  );

  const content = escapeHtml(legalContent);

  const formattedContent = content
    .replace(
      /(\d+\.\s+[A-Z][A-Z\s&/-]{2,})/g,
      '<h3 class="section-heading">$1</h3>'
    )
    .replace(/\n/g, "<br />");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>

      <style>
        * { box-sizing: border-box; }

        body {
          margin: 0;
          padding: 35px;
          background: #eef1f4;
          font-family: Arial, Helvetica, sans-serif;
          color: #243044;
        }

        .toolbar {
          max-width: 850px;
          margin: 0 auto 18px;
          display: flex;
          justify-content: flex-end;
        }

        .print-btn {
          border: 0;
          background: #087b60;
          color: white;
          padding: 12px 22px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .paper {
          max-width: 850px;
          min-height: 1050px;
          margin: auto;
          padding: 55px 65px;
          background: white;
          box-shadow: 0 5px 28px rgba(0,0,0,.12);
          position: relative;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding-bottom: 22px;
          border-bottom: 3px solid #087b60;
        }

        .brand {
          color: #123d35;
          font-size: 25px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .brand span {
          display: block;
          color: #087b60;
          font-size: 10px;
          letter-spacing: 4px;
          margin-top: 4px;
        }

        .document-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: #64748b;
          text-align: right;
          text-transform: uppercase;
        }

        .doc-title {
          text-align: center;
          margin: 34px 0 8px;
          font-size: 22px;
          color: #173c34;
          letter-spacing: .7px;
        }

        .subtitle {
          text-align: center;
          color: #738092;
          font-size: 11px;
          margin-bottom: 30px;
        }

        .content {
          font-size: 13px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        .section-heading {
          color: #087b60;
          font-size: 13px;
          margin-top: 22px;
          margin-bottom: 5px;
          padding-bottom: 5px;
          border-bottom: 1px solid #dce8e4;
        }

        .footer {
          margin-top: 60px;
          padding-top: 15px;
          border-top: 1px solid #d5dedb;
          color: #64748b;
          font-size: 10px;
          line-height: 1.7;
          text-align: center;
        }

        @page {
          size: A4;
          margin: 12mm;
        }

        @media print {
          body {
            padding: 0;
            background: white;
          }

          .toolbar { display: none; }

          .paper {
            max-width: none;
            min-height: auto;
            padding: 20px;
            box-shadow: none;
          }
        }

        @media (max-width: 600px) {
          body { padding: 10px; }
          .paper { padding: 25px 20px; }
          .brand { font-size: 19px; }
        }
      </style>
    </head>

    <body>
      <div class="toolbar">
        <button class="print-btn" onclick="window.print()">
          Print / Save as PDF
        </button>
      </div>

      <main class="paper">
        <header class="header">
          <div class="brand">
            PRONEX
            <span>WORLD</span>
          </div>

          <div class="document-label">
            Property Documentation<br />
            Legal & Due Diligence
          </div>
        </header>

        <h1 class="doc-title">${title}</h1>

        <p class="subtitle">
          PROPERTY RECORD · LEGAL DOCUMENTATION
        </p>

        <div class="content">${formattedContent}</div>

        <footer class="footer">
          <strong>PRONEX WORLD</strong><br />
          Property Legal Documentation<br />
          This document should be verified against original records
          and reviewed by an appropriate legal professional.
        </footer>
      </main>
    </body>
    </html>
  `;

  const blob = new Blob([html], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const previewWindow = window.open(url, "_blank");

  if (!previewWindow) {
    URL.revokeObjectURL(url);
    toast.error("Please allow pop-ups to preview the document");
    return;
  }

  setTimeout(() => URL.revokeObjectURL(url), 60000);
}}

        className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Preview
      </button>

      <button
        type="button"
        onClick={() => {
          try {
            const html = createLegalDocumentHtml(
              legalTitle,
              legalContent
            );
        
            const printWindow = window.open("", "_blank");
        
            if (!printWindow) {
              toast.error("Please allow pop-ups in your browser");
              return;
            }
        
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
        
            printWindow.onload = () => {
              printWindow.focus();
              printWindow.print();
            };
          } catch (error) {
            console.error("Legal document download error:", error);
            toast.error("Unable to prepare legal document");
          }
        }}
        className="flex items-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        <FiDownload />
        Download
      </button>
    </div>
  </div>
)}


        {note.trim() && (
          <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiCheckCircle className="text-emerald-600" />
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Legal Documents Update
              </p>
            </div>

            <p className="text-sm text-gray-700 leading-7 whitespace-pre-line">
              {note}
            </p>
          </div>
        )}

       {/* UPLOADED PDF DOCUMENTS */}
{Array.isArray(docs) && docs.length > 0 && (
  <div className="grid sm:grid-cols-2 gap-4">
    {docs.map((doc, index) => {
      const docUrl =
        typeof doc === "string"
          ? doc
          : doc?.url || doc?.secure_url || doc?.path || "";

      const docName =
        typeof doc === "string"
          ? doc.split("/").pop()?.split("?")[0] || `Document ${index + 1}`
          : doc?.name || `Property Document ${index + 1}`;

      if (!docUrl) return null;

      return (
        <div
          key={doc?._id || `${docName}-${index}`}
          className="flex items-center justify-between gap-3 border border-gray-200 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-md transition"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <BsFileText size={19} />
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 break-words">
                {docName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Property Document
              </p>
            </div>
          </div>

          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Preview PDF
          </a>
        </div>
      );
    })}
  </div>
)}

{/* PROPERTY VIDEO */}
{video && (
  <div className="rounded-2xl border border-gray-200 p-5">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Property Video
    </h3>

    <video
      key={video}
      controls
      playsInline
      preload="metadata"
      className="w-full max-h-[450px] rounded-xl bg-black"
    >
      <source src={video} />
      Your browser does not support video playback.
    </video>

    <a
      href={video}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-3 text-sm font-semibold text-emerald-700 hover:underline"
    >
      Open Video in New Tab
    </a>
  </div>
)}


{/* PROPERTY BROCHURE PDF */}
{property?.media?.brochure && (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <BsFileText size={22} />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">
          Property Brochure
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Property brochure · PDF document
        </p>
      </div>
    </div>

    {/* PDF PREVIEW */}
   

    {/* PREVIEW AND DOWNLOAD */}
    <div className="flex flex-wrap gap-3 mt-4">
      <a
        href={property.media.brochure}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Open PDF
      </a>

      <a
        href={property.media.brochure}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        <FiDownload />
        Download Brochure
      </a>
    </div>
  </div>
)}

      </div>
    );
  })()}
</section>


            <FAQSection />

            {/* RELATED */}

            {relatedProperties.length > 0 && (

              <section className="py-8">

                <div className="flex items-end justify-between gap-4 mb-6">

                  <div>

                    <p className="text-emerald-700 text-xs uppercase tracking-[0.2em] font-bold mb-2">

                      Discover More

                    </p>

                    <h2 className="text-2xl font-bold text-gray-900">

                      Curated Opportunities

                    </h2>

                  </div>

                  <NavLink

                    to="/properties"

                    className="hidden sm:flex items-center gap-2 text-sm text-emerald-700 font-semibold hover:gap-3 transition-all"

                  >

                    Explore All

                    <FiArrowRight />

                  </NavLink>

                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

                  {relatedProperties

                    .slice(0, 3)

                    .map((item) => (

                      <RelatedCard

                        key={item?._id}

                        property={item}

                      />

                    ))}

                </div>

              </section>

            )}

          </div>

          {/* RIGHT SIDEBAR */}

          <aside>

            <StickyCard
            property={property}
            liked={liked}
            setLiked={setLiked}
            isBroker={isBroker}
          />

          </aside>

        </div>

      </div>

    </div>

  );

}

/* =====================================================

   SMALL COMPONENTS

===================================================== */

function InfoCard({

  icon,

  label,

  value,

}) {

  return (

    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">

      <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-emerald-700 mb-4">

        {icon}

      </div>

      <p className="text-[9px] uppercase tracking-wider text-gray-400">

        {label}

      </p>

      <p className="text-sm font-semibold text-gray-900 mt-1 truncate">

        {value}

      </p>

    </div>

  );

}

function PerformanceCard({

  label,

  value,

  green,

}) {

  return (

    <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 hover:bg-white hover:shadow-md transition">

      <p className="text-[9px] uppercase tracking-wider text-gray-400">

        {label}

      </p>

      <p

        className={`text-xl font-bold mt-2 ${

          green

            ? "text-emerald-700"

            : "text-gray-900"

        }`}

      >

        {value}

      </p>

    </div>

  );

}
