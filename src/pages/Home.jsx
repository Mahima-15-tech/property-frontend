import { useState, useEffect } from "react";
import {
  FiSearch,
  FiShield,
  FiEye,
  FiCheckCircle,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp,
  FiArrowRight,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiStar,
  FiFileText,
  FiMapPin,
  FiHome,
  FiLayers,
  FiBell,
  FiDownload,
  FiPieChart,
  FiBookOpen,
  FiActivity,
  FiBriefcase,

} from "react-icons/fi";

import {
  BsBuilding,
  BsGraphUp,
  BsCheckLg,
  BsPhone,
  BsShieldCheck,
} from "react-icons/bs";

import {
  MdOutlineVerified,
  MdOutlineSupport,
  MdOutlineAccountBalance,
} from "react-icons/md";

import {
  RiMoneyDollarCircleLine,
  RiBuilding2Line,
  RiRobot2Line,
} from "react-icons/ri";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineSafety } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

import mobile from "../assets/images/original.jpg";
import axios from "../utils/axios";


/* =========================================================
   CONTENT DATA
========================================================= */

const HIGHLIGHTS = [
  {
    icon: <RiMoneyDollarCircleLine size={20} />,
    title: "Minimum Investment from ₹10 Lakh",
    desc: "Access premium real estate opportunities with a structured entry point.",
  },
  {
    icon: <MdOutlineAccountBalance size={20} />,
    title: "Property-Specific LLP Ownership",
    desc: "Invest through professionally structured LLP ownership models.",
  },
  {
    icon: <RiRobot2Line size={20} />,
    title: "AI-Powered Property Intelligence",
    desc: "Use data, analytics, market trends and property insights to evaluate opportunities.",
  },
  {
    icon: <BsBuilding size={20} />,
    title: "Professional Asset Management",
    desc: "Property administration and asset management are professionally coordinated.",
  },
  {
    icon: <FiLayers size={20} />,
    title: "Diversified Real Estate Portfolio",
    desc: "Explore selected opportunities across different properties, sectors and locations.",
  },
  {
    icon: <FiFileText size={20} />,
    title: "Transparent Investment Process",
    desc: "Review relevant property information, documents and disclosures before investing.",
  },
];


const WHY_ITEMS = [
  {
    icon: <FiTrendingUp size={22} />,
    title: "AI-Powered Decision Making",
    desc: "Our platform evaluates locations, infrastructure, demand, comparable transactions, market trends and property fundamentals to support informed investment decisions.",
  },
  {
    icon: <BsBuilding size={22} />,
    title: "Professional Asset Management",
    desc: "Pronex World coordinates property acquisition, documentation, compliance, administration, reporting and asset management in accordance with the LLP Agreement.",
  },
  {
    icon: <FiEye size={22} />,
    title: "Transparency",
    desc: "Every investment opportunity includes property information, legal documentation, ownership structure and applicable disclosures.",
  },
  {
    icon: <BsGraphUp size={22} />,
    title: "Long-Term Value",
    desc: "We focus on quality assets with strong fundamentals rather than short-term speculation.",
  },
];


const STEPS = [
  {
    icon: <FiUsers size={22} />,
    num: "01",
    title: "Create Your Account",
    desc: "Register on Pronex World using your email and mobile number. Once your account is created, you can explore investment opportunities, AI property reports, market insights, and your investment dashboard.",
  },
  {
    icon: <MdOutlineVerified size={22} />,
    num: "02",
    title: "Complete KYC",
    desc: "Complete identity verification by submitting the required KYC documents. This helps us comply with applicable laws, protect investors, and maintain a secure investment ecosystem.",
  },
  {
    icon: <FiSearch size={22} />,
    num: "03",
    title: "Explore Opportunities",
    desc: "Browse carefully selected residential, commercial, and mixed-use assets. Every property is supported by AI-powered market intelligence, legal due diligence, location analysis, infrastructure review, and investment documentation.",
  },
  {
    icon: <FiBarChart2 size={22} />,
    num: "04",
    title: "Review the Investment",
    desc: "Study the property details, LLP structure, projected holding strategy, applicable costs, risk disclosures, and supporting documents before making your decision.",
  },
  {
    icon: <BsBuilding size={22} />,
    num: "05",
    title: "Invest Through an LLP",
    desc: "Each property is held through a dedicated LLP. Investors participate in the LLP according to the executed LLP Agreement. Pronex World also participates in the LLP and manages day-to-day operations, compliance, reporting, and asset administration in accordance with the LLP Agreement.",
  },
  {
    icon: <AiOutlineSafety size={22} />,
    num: "06",
    title: "Secure Investment Process",
    desc: "After completing the required documentation, your investment is processed through secure banking channels. Confirmation and investment records are made available through your dashboard.",
  },
  {
    icon: <RiBuilding2Line size={22} />,
    num: "07",
    title: "Professional Asset Management",
    desc: "Pronex World oversees property administration, tenant coordination where applicable, maintenance, compliance, financial reporting, and strategic decisions as permitted under the LLP Agreement.",
  },
  {
    icon: <FiTrendingUp size={22} />,
    num: "08",
    title: "Track Your Portfolio",
    desc: "Your investor dashboard provides access to portfolio details, investment documents, reports, notifications, and updates related to your LLP investments.",
  },
  {
    icon: <RiMoneyDollarCircleLine size={22} />,
    num: "09",
    title: "Income & Distributions",
    desc: "Where applicable and subject to the LLP Agreement, rental income or other distributable income may be distributed to partners after deducting applicable expenses and obligations.",
  },
  {
    icon: <FiArrowRight size={22} />,
    num: "10",
    title: "Exit",
    desc: "Exit opportunities are governed by the LLP Agreement and may include sale of the underlying property, transfer of partnership interests where permitted, or other approved exit mechanisms.",
  },
];

const FEATURES = [
  {
    icon: <RiBuilding2Line size={20} />,
    label: "Minimum Investment from ₹10 Lakh",
    desc: "Access premium real estate opportunities through structured fractional participation.",
  },
  {
    icon: <BsBuilding size={20} />,
    label: "Property-Specific LLP Ownership",
    desc: "Each investment opportunity is structured through a dedicated LLP for clear ownership and administration.",
  },
  {
    icon: <FiBarChart2 size={20} />,
    label: "AI-Powered Property Intelligence",
    desc: "Use market intelligence, location analytics and property fundamentals to support informed decisions.",
  },
  {
    icon: <FiShield size={20} />,
    label: "Professional Asset Management",
    desc: "Property administration, reporting and operational management are professionally coordinated.",
  },
];


const FAQS = [
  {
    q: "What is Pronex World?",
    a: "Pronex World is an AI-powered fractional real estate investment platform that enables investors to participate in selected real estate opportunities through professionally managed property-specific LLPs.",
  },
  {
    q: "How does an investment opportunity work on Pronex World?",
    a: "Every investment opportunity follows a standardized presentation format. Investors can review the property snapshot, investment highlights, AI investment score, available documents, applicable fees and charges, risk factors and relevant investment documents before making an investment decision.",
  },
  {
    q: "What information is available for each property?",
    a: "Depending on the opportunity, investors can review property information including Property Name, City, Asset Type, Developer, Status, Minimum Investment and LLP Name, along with supporting investment information and disclosures.",
  },
  {
    q: "What is the AI Investment Score?",
    a: "The AI Investment Score is a proprietary analytical score supported by market intelligence, location analytics and property fundamentals. It is designed as an analytical indicator and is not a guarantee of future performance.",
  },
  {
    q: "How does the LLP ownership model work?",
    a: "Each investment opportunity may be structured through a dedicated property-specific LLP. The applicable LLP Agreement governs rights, obligations, governance, voting, distributions and exit mechanisms for that investment opportunity.",
  },
  {
    q: "What can I access through the investor dashboard?",
    a: "The investor dashboard provides access to portfolio overview, current investments, LLP holdings, capital contributed, property updates, financial statements, distribution history, tax documents, KYC status, notifications, support centre and download centre.",
  },
  {
    q: "How does diversification help investors?",
    a: "Diversification does not eliminate investment risk, but it can help reduce concentration risk by allowing investors to build exposure across different cities, developers and asset classes as part of a broader investment strategy.",
  },
  {
    q: "What is available in the Research Centre?",
    a: "The Research Centre includes market intelligence and educational content such as weekly market reports, city investment reports, infrastructure watch, developer insights, rental market analysis, commercial real estate updates, residential price trends, investment guides, economic commentary and AI research notes.",
  },
  {
    q: "Are investments risk-free?",
    a: "No. Real estate and LLP investments are subject to market risks, liquidity risks, regulatory changes, vacancy risks and property-specific considerations. Investors should review the relevant LLP Agreement, investment documents and risk disclosures before making an investment decision.",
  },
];


const TRUST_BADGES = [
  {
    icon: <RiMoneyDollarCircleLine size={26} />,
    label: "From ₹10 Lakh",
  },
  {
    icon: <MdOutlineAccountBalance size={26} />,
    label: "Property-Specific LLPs",
  },
  {
    icon: <RiRobot2Line size={26} />,
    label: "AI Property Intelligence",
  },
  {
    icon: <BsBuilding size={26} />,
    label: "Professional Management",
  },
  {
    icon: <FiFileText size={26} />,
    label: "Transparent Process",
  },
];


/* =========================================================
   HERO SECTION
========================================================= */

function Hero() {
  return (
    <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        <div className="flex-1 text-center lg:text-left">

          <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
            Own More. Earn More.
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-gray-900 leading-tight">
            Own Premium Real Estate.
            <span className="block text-emerald-500">
              Build Wealth Intelligently.
            </span>
          </h1>

          <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Pronex World is an AI-powered fractional real estate investment
            platform that enables investors to co-own premium real estate
            through professionally managed property-specific LLPs.
          </p>

          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Invest from ₹10 lakh, diversify across carefully selected assets,
            and make informed investment decisions with AI-powered property
            intelligence, transparent ownership, and professional asset
            management.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

            <NavLink
              to="/property"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Explore Investment Opportunities
              <FiArrowRight />
            </NavLink>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-emerald-400 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm bg-white"
            >
              Learn How It Works
            </a>

          </div>

          <p className="mt-8 text-xs text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Investment opportunities are offered through property-specific LLPs.
            Investments are subject to market risks. Please review the relevant
            LLP Agreement, investment documents and risk disclosures before investing.
          </p>

        </div>

        <div className="flex-1 relative w-full max-w-md">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80"
            alt="Premium real estate investment"
            className="rounded-3xl shadow-2xl w-full object-cover h-72 sm:h-96"
          />

          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl p-5">
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
              AI-Powered Intelligence
            </p>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Discover opportunities using location intelligence, market trends,
              comparable transactions and property fundamentals.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}


/* =========================================================
   TRUST / KEY HIGHLIGHTS
========================================================= */

function TrustBar() {
  const highlights = [
    {
      icon: <RiMoneyDollarCircleLine size={26} />,
      label: "Minimum Investment from ₹10 Lakh",
    },
    {
      icon: <BsBuilding size={26} />,
      label: "Property-Specific LLP Ownership",
    },
    {
      icon: <FiBarChart2 size={26} />,
      label: "AI-Powered Property Intelligence",
    },
    {
      icon: <FiShield size={26} />,
      label: "Professional Asset Management",
    },
    {
      icon: <FiTrendingUp size={26} />,
      label: "Diversified Real Estate Portfolio",
    },
    {
      icon: <FiEye size={26} />,
      label: "Transparent Investment Process",
    },
  ];

  return (
    <section className="bg-emerald-50 border-y border-emerald-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm text-emerald-600 flex items-center justify-center">
                {item.icon}
              </div>

              <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}


/* =========================================================
   WHY PRONEX WORLD
========================================================= */

function WhyPronexWorld() {
  return (
    <section className="py-16 lg:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mx-auto text-center">

          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Why Pronex World
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">
            Real Estate, Reimagined
          </h2>

          <p className="text-gray-500 mt-5 leading-relaxed">
            Traditional real estate investing often requires significant
            capital, time, legal expertise and active management. Pronex World
            simplifies this journey by combining technology, AI and structured
            ownership into one seamless investment experience.
          </p>

        </div>


        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

          {WHY_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                {item.desc}
              </p>

            </div>
          ))}

        </div>


        <div className="mt-12 rounded-3xl bg-gray-900 text-white p-8 sm:p-12">

          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
            Our Philosophy
          </p>

          <h3 className="text-3xl sm:text-4xl font-bold mt-3 max-w-3xl">
            Own More. Earn More.
          </h3>

          <p className="text-gray-300 mt-5 max-w-4xl leading-relaxed">
            We believe wealth should not be limited to those who can purchase
            entire properties. Diversify across quality assets instead of
            concentrating all your capital into one property.
          </p>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   KEY HIGHLIGHTS
========================================================= */

function KeyHighlights() {
  return (
    <section className="py-16 lg:py-24 bg-emerald-50/50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Built for Intelligent Ownership
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Why Investors Choose Pronex World
          </h2>

        </div>


        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all"
            >

              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mt-2">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
    >
      {/* subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-50/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-100 bg-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            
            <p className="text-emerald-600 font-bold text-[11px] uppercase tracking-[0.2em]">
              Simple Investment Journey
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 tracking-tight">
            Investing in Premium Real Estate
            <span className="block text-emerald-500 mt-1">
              Has Never Been Simpler.
            </span>
          </h2>

          <p className="text-gray-500 mt-6 text-sm sm:text-base leading-7 max-w-3xl mx-auto">
            Pronex World enables investors to co-own premium real estate through
            professionally managed property-specific LLPs. Our investment process
            combines AI-powered property intelligence, structured due diligence,
            transparent ownership, and professional asset management.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, index) => (
            <div
              key={s.num}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-200"
            >
              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              {/* Number watermark */}
              <span className="absolute -right-2 -top-1 text-[90px] font-black text-gray-50 leading-none select-none group-hover:text-emerald-50 transition-colors duration-500">
                {s.num}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  
                  <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-500">
                    {s.icon}
                  </div>

                  <span className="text-sm font-bold text-emerald-600">
                    STEP {s.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                  {s.title}
                </h3>

                <p className="text-gray-500 text-sm mt-3 leading-6">
                  {s.desc}
                </p>

                {/* Bottom arrow */}
                {/* <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-400 group-hover:text-emerald-600 transition-colors">
                  <span>Learn more</span>
                  <FiArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            From your first investment to portfolio tracking, Pronex World brings
            technology, transparency and professional management together in one
            intelligent real estate investment experience.
          </p>
        </div>

      </div>
    </section>
  );
}


/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({ p }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 duration-300 transition-all">

      <div className="relative">

        <img
          src={p.img}
          alt={p.name}
          className="w-full h-48 object-cover"
        />

        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
          {p.badge}
        </span>

      </div>


      <div className="p-5">

        <h3 className="font-bold text-gray-900 text-lg">
          {p.name}
        </h3>

        <div className="flex items-center gap-1 mt-2">

          <HiOutlineLocationMarker
            size={14}
            className="text-gray-400"
          />

          <span className="text-xs text-gray-500">
            {p.loc}
          </span>

        </div>


        <div className="grid grid-cols-2 gap-4 mt-5">

          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Indicative ROI
            </p>

            <p className="text-sm font-bold text-gray-900 mt-1">
              {p.price}
            </p>
          </div>


          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Rental Yield
            </p>

            <p className="text-sm font-bold text-emerald-600 mt-1">
              {p.yield}
            </p>
          </div>


          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Investment Unit
            </p>

            <p className="text-sm font-bold text-gray-900 mt-1">
              {p.sharePrice}
            </p>
          </div>


          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Availability
            </p>

            <p className="text-sm font-bold text-gray-900 mt-1">
              {p.available}
            </p>
          </div>

        </div>


        <button
          onClick={() => navigate(`/properties/${p.id}`)}
          className="mt-5 w-full bg-gray-900 hover:bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          View Investment Details
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   INVESTMENT OPPORTUNITIES
========================================================= */

function Opportunities() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProperties = async () => {
    try {
      const res = await axios.get("/api/properties/featured");

      const formatted = res.data.map((p) => ({
        id: p._id,
        name: p.name,

        loc:
          [p.location?.city, p.location?.state]
            .filter(Boolean)
            .join(", ") || "Location Available on Request",

        img:
          p.media?.images?.[0] ||
          "https://via.placeholder.com/800x500",

        price:
          p.roi !== undefined && p.roi !== null
            ? `${p.roi}%`
            : "Available in Details",

        yield:
          p.rentalYield !== undefined && p.rentalYield !== null
            ? `${p.rentalYield}%`
            : "Available in Details",

        sharePrice:
          p.pricePerShare
            ? `₹${Number(p.pricePerShare).toLocaleString("en-IN")}`
            : "See Details",

        available:
          p.availableShares !== undefined &&
          p.totalShares !== undefined
            ? `${p.availableShares}/${p.totalShares}`
            : "Check Availability",

        badge: p.type?.toUpperCase() || "PROPERTY",
      }));

      setProperties(formatted);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchFeaturedProperties();
  }, []);


  return (
    <section className="py-16 lg:py-24 bg-emerald-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

          <div>

            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Selected Opportunities
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Investment Opportunities
            </h2>

            <p className="text-gray-500 text-sm mt-3 max-w-xl">
              Explore selected real estate opportunities and review relevant
              property information before making an investment decision.
            </p>

          </div>


          <NavLink
            to="/property"
            className="inline-flex items-center gap-2 text-emerald-700 text-sm font-semibold hover:gap-3 transition-all"
          >
            Explore All Opportunities
            <FiArrowRight />
          </NavLink>

        </div>


        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading investment opportunities...
          </div>
        ) : properties.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No investment opportunities are currently available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                p={property}
              />
            ))}

          </div>
        )}

      </div>
    </section>
  );
}


/* =========================================================
   AI PROPERTY INTELLIGENCE
========================================================= */

function FractionalSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">

        <div className="flex-1">

          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Intelligent Investing
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            AI-Powered
            <span className="text-emerald-500">
              {" "}Property Intelligence
            </span>
          </h2>

          <p className="text-gray-500 mt-5 leading-relaxed">
            Pronex World combines Artificial Intelligence, advanced analytics
            and real-time market intelligence to help investors discover
            opportunities, evaluate assets, understand market trends and make
            data-driven decisions with greater transparency and confidence.
          </p>


          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {[
              {
                icon: <FiMapPin size={20} />,
                title: "Location Intelligence",
                desc: "Understand surrounding infrastructure, connectivity and growth factors.",
              },
              {
                icon: <FiBarChart2 size={20} />,
                title: "Market Intelligence",
                desc: "Explore market trends, demand signals and comparable transactions.",
              },
              {
                icon: <FiHome size={20} />,
                title: "Property Fundamentals",
                desc: "Review relevant asset characteristics and supporting information.",
              },
              {
                icon: <RiRobot2Line size={20} />,
                title: "AI-Driven Insights",
                desc: "Use technology-supported intelligence to evaluate opportunities.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
              >

                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  {feature.icon}
                </div>

                <h4 className="font-bold text-gray-900 text-sm">
                  {feature.title}
                </h4>

                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  {feature.desc}
                </p>

              </div>
            ))}

          </div>

        </div>


        <div className="flex-1 w-full max-w-md lg:max-w-none">

          <div className="bg-gray-900 rounded-3xl p-7 sm:p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <div>
                <p className="text-gray-400 text-xs">
                  Pronex World Intelligence
                </p>

                <p className="text-white text-xl font-bold mt-1">
                  Property Analysis
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <RiRobot2Line size={22} />
              </div>

            </div>


            <div className="space-y-4">

              {[
                "Location & Infrastructure Intelligence",
                "Market Trends & Demand Signals",
                "Comparable Property Analysis",
                "Property Fundamentals & Documentation",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-gray-800 rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    0{index + 1}
                  </div>

                  <p className="text-gray-200 text-sm font-medium">
                    {item}
                  </p>

                </div>
              ))}

            </div>


            <p className="text-gray-500 text-xs leading-relaxed mt-6">
              AI-powered insights are designed to support informed
              decision-making and should not be considered a guarantee of
              investment performance.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   LLP OWNERSHIP MODEL
========================================================= */

function LLPSection() {
  return (
    <section className="py-16 lg:py-24 bg-emerald-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="order-2 lg:order-1">

            <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-sm border border-emerald-100">

              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MdOutlineAccountBalance size={28} />
              </div>

              <div className="mt-7 space-y-5">

                {[
                  {
                    number: "01",
                    title: "Property-Specific Structure",
                    desc: "Investment opportunities may be structured through dedicated LLPs for specific properties.",
                  },
                  {
                    number: "02",
                    title: "Documented Ownership Framework",
                    desc: "Relevant rights, obligations and investment terms are governed by applicable agreements and documents.",
                  },
                  {
                    number: "03",
                    title: "Professional Administration",
                    desc: "Property administration, reporting and related operations are managed in accordance with the applicable LLP framework.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="flex gap-4"
                  >

                    <span className="text-emerald-600 font-extrabold">
                      {item.number}
                    </span>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>


          <div className="order-1 lg:order-2">

            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Structured Ownership
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
              Property-Specific LLP Ownership
            </h2>

            <p className="text-gray-500 mt-5 leading-relaxed">
              Pronex World enables investors to participate in selected real
              estate opportunities through professionally managed
              property-specific LLP structures.
            </p>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Investors can review the applicable LLP Agreement, property
              information and supporting investment documents before making an
              investment decision.
            </p>

            <NavLink
              to="/how-it-works"
              className="mt-7 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn How the Investment Process Works
              <FiArrowRight />
            </NavLink>

          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   FAQ
========================================================= */

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 lg:py-24 bg-white">

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-center text-xs font-bold text-emerald-600 uppercase tracking-widest">
          Knowledge Centre
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mt-3 mb-10">
          Frequently Asked Questions
        </h2>


        <div className="space-y-3">

          {FAQS.map((faq, index) => (

            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >

              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left bg-white hover:bg-emerald-50/50 transition-colors"
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >

                <span className="text-sm font-semibold text-gray-900">
                  {faq.q}
                </span>

                {open === index ? (
                  <FiChevronUp
                    className="text-emerald-500 shrink-0"
                    size={18}
                  />
                ) : (
                  <FiChevronDown
                    className="text-gray-400 shrink-0"
                    size={18}
                  />
                )}

              </button>


              {open === index && (
                <div className="px-5 pb-5 text-sm text-gray-500 bg-white leading-relaxed">
                  {faq.a}
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="pb-16 lg:pb-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-12 sm:px-12 sm:py-16 text-center">

          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full translate-x-1/2 translate-y-1/2" />


          <div className="relative z-10 max-w-3xl mx-auto">

            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
              Pronex World
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
              Own More. Earn More.
            </h2>

            <p className="text-gray-400 mt-5 leading-relaxed">
              Discover selected premium real estate opportunities supported by
              AI-powered property intelligence, structured ownership and
              professional asset management.
            </p>


            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

              <NavLink
                to="/property"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm"
              >
                Explore Investment Opportunities
                <FiArrowRight />
              </NavLink>


              <NavLink
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm"
              >
                Learn How It Works
              </NavLink>

            </div>


            <p className="text-gray-500 text-xs mt-7 leading-relaxed">
              Investment opportunities are offered through property-specific
              LLPs. Investments are subject to market risks. Please review the
              relevant LLP Agreement, investment documents and risk disclosures
              before investing.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   APP BANNER
========================================================= */

function AppBanner() {
  return (
    <section className="max-w-7xl mx-auto mb-16 rounded-3xl bg-gray-900 py-14 lg:py-20 px-2">

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">

        <div className="flex-1">

          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
            Investor Dashboard
          </p>

          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-3">
            Your Real Estate Portfolio in Your Pocket
          </h2>

          <p className="text-gray-400 mt-4 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
            Access investment information, property documents, portfolio
            details, reports and updates through your Pronex World experience.
          </p>

        </div>


        <div className="flex-1 flex justify-center lg:justify-end">

          <img
            src={mobile}
            alt="Pronex World investor dashboard"
            className="max-h-[420px] object-contain"
          />

        </div>

      </div>

    </section>
  );
}

function AIPropertyIntelligence() {
  const capabilities = [
    "Location Intelligence",
    "Infrastructure Growth Analysis",
    "Comparable Transaction Analysis",
    "Developer Performance Review",
    "Rental Demand Analysis",
    "Market Trend Tracking",
    "Property Risk Indicators",
    "Investment Score",
    "Portfolio Diversification Suggestions",
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
              AI Property Intelligence
            </p>

            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-4">
              Data-Driven Decisions.
              <span className="text-emerald-400 block">
                Not Emotional Guesswork.
              </span>
            </h2>

            <p className="text-gray-400 mt-6 leading-relaxed">
              Artificial Intelligence is the foundation of Pronex World's
              research process. It helps investors understand opportunities
              using data rather than emotion.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">

              {capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span className="text-sm text-gray-200">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8">
              <FiBarChart2 size={42} className="text-white" />

              <h3 className="text-2xl font-bold text-white mt-6">
                AI Investment Intelligence
              </h3>

              <p className="text-emerald-50 mt-3 leading-relaxed">
                Analyze property fundamentals, location signals, market trends,
                infrastructure development and comparable transactions in one
                structured intelligence layer.
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              AI-generated insights are decision-support tools and should not
              be considered guarantees, financial advice, or predictions of
              future returns.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

function LLPOwnershipModel() {
  const investors = [
    { name: "Pronex World", interest: "10%" },
    { name: "Investor 1", interest: "10%" },
    { name: "Investor 2", interest: "10%" },
    { name: "Investor 3", interest: "10%" },
    { name: "Investor 4", interest: "10%" },
    { name: "Investor 5", interest: "10%" },
    { name: "Investor 6", interest: "10%" },
    { name: "Investor 7", interest: "10%" },
    { name: "Investor 8", interest: "10%" },
    { name: "Investor 9", interest: "10%" },
  ];

  const benefits = [
    "Direct participation through an LLP",
    "Professional management",
    "Transparent documentation",
    "Diversification across multiple LLPs",
    "Digital reporting and records",
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-100 bg-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            <p className="text-emerald-600 font-bold text-[11px] uppercase tracking-[0.2em]">
              Structured Ownership
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 tracking-tight">
            Property-Specific
            <span className="text-emerald-500"> LLP Ownership</span>
          </h2>

          <p className="text-gray-500 mt-5 leading-7 text-sm sm:text-base">
            Each investment opportunity is structured through a dedicated LLP.
            Every LLP is established for a specific property, helping maintain
            clear ownership and administration.
          </p>
        </div>

        {/* Illustrative Model */}
        <div className="mt-14 rounded-3xl border border-gray-200 bg-gray-50/60 p-5 sm:p-8 lg:p-10">

          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Illustrative Model
            </p>
          </div>

          {/* LLP Main Card */}
          <div className="max-w-xl mx-auto">
            <div className="relative bg-gray-900 rounded-2xl p-7 sm:p-8 text-center shadow-xl overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />

              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <BsBuilding
                    size={28}
                    className="text-emerald-400"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-4">
                  Property-Specific LLP
                </h3>

                <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-md mx-auto">
                  Each investment opportunity is structured through a dedicated
                  LLP for clear ownership and administration.
                </p>
              </div>
            </div>
          </div>

          {/* Connection */}
          <div className="flex flex-col items-center my-8">
            <div className="h-10 w-px bg-gray-300" />

            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-md" />

            <div className="h-10 w-px bg-gray-300" />
          </div>

          {/* Partners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {investors.map((investor) => (
              <div
                key={investor.name}
                className="group bg-white rounded-2xl border border-gray-200 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="w-11 h-11 mx-auto rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                  <FiUsers size={19} />
                </div>

                <p className="font-bold text-gray-900 text-sm mt-4">
                  {investor.name}
                </p>

                <div className="mt-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                  <span className="text-emerald-600 text-sm font-bold">
                    {investor.interest}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Illustrative Interest
          </p>
        </div>

        {/* Role + Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {/* Role */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 transition-all hover:shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-5">
              <BsBuilding size={20} />
            </div>

            <h3 className="font-bold text-gray-900 text-xl">
              Role of Pronex World
            </h3>

            <p className="text-gray-500 text-sm sm:text-base leading-7 mt-4">
              Pronex World participates in the LLP and coordinates
              administration, compliance, reporting, documentation and asset
              management in accordance with the LLP Agreement.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 transition-all hover:shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <FiCheckCircle size={21} />
            </div>

            <h3 className="font-bold text-gray-900 text-xl">
              Investor Benefits
            </h3>

            <div className="space-y-3 mt-5">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheckCircle
                      className="text-emerald-500"
                      size={14}
                    />
                  </div>

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Disclosure */}
        <div className="mt-8 max-w-5xl mx-auto rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AiOutlineSafety
              size={22}
              className="text-gray-700 shrink-0 mt-0.5"
            />

            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                Disclosure
              </p>

              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                The rights, obligations, governance, voting, distributions and
                exit mechanisms are governed by the LLP Agreement for each
                investment opportunity.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function DiversificationSection() {
  const benefits = [
    "Spread investment risk",
    "Participate in multiple growth markets",
    "Reduce dependence on a single property",
    "Access different property segments",
    "Build long-term wealth through disciplined diversification",
  ];

  return (
    <section className="py-16 lg:py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
              Smarter Portfolio Strategy
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
              Why Diversification Wins
            </h2>

            <p className="text-gray-500 mt-5 leading-relaxed">
              Investing your entire capital in a single property can expose you
              to concentrated risk. Pronex World encourages investors to build
              diversified real estate portfolios across different cities,
              developers and asset classes.
            </p>

            <div className="mt-8 space-y-4">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
                >
                  <FiCheckCircle className="text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {benefit}
                  </span>
                </div>
              ))}

            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="grid grid-cols-2 gap-4">

              {[
                "Different Cities",
                "Multiple Developers",
                "Asset Classes",
                "Growth Markets",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-emerald-50 rounded-2xl p-6 text-center"
                >
                  <FiTrendingUp className="mx-auto text-emerald-600" size={28} />

                  <p className="font-bold text-gray-800 mt-3">
                    {item}
                  </p>
                </div>
              ))}

            </div>

            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              Diversification does not eliminate investment risk, but it can
              help reduce concentration risk as part of a broader investment
              strategy.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PART 10 – RESEARCH CENTRE & MARKET INTELLIGENCE
========================================================= */

function ResearchCentreSection() {
  const researchCategories = [
    "Weekly Market Reports",
    "City Investment Reports",
    "Infrastructure Watch",
    "Developer Insights",
    "Rental Market Analysis",
    "Commercial Real Estate Updates",
    "Residential Price Trends",
    "Investment Guides",
    "Economic Commentary",
    "AI Research Notes",
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <div>

            <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
              Research Centre & Market Intelligence
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">
              Real Estate Intelligence
              <span className="block text-emerald-500">
                Backed by Research
              </span>
            </h2>

            <p className="text-gray-500 mt-6 leading-relaxed">
              The Research Centre positions Pronex World as a trusted source
              of real estate knowledge and supports investor education.
            </p>

            <div className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-100">

              <p className="text-sm font-bold text-gray-900">
                Purpose
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                Publish high-quality, evidence-based research that helps
                investors understand market dynamics, identify opportunities
                and make informed decisions.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {researchCategories.map((item, index) => (
              <div
                key={item}
                className="group border border-gray-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-emerald-500 transition-colors shrink-0">
                    <span className="text-xs font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="font-semibold text-sm text-gray-800 pt-2">
                    {item}
                  </p>

                </div>
              </div>
            ))}

          </div>

        </div>


        <div className="mt-12 bg-gray-900 rounded-3xl p-8 sm:p-10">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-7">

            <div>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                Stay Informed
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                Explore Market Intelligence
              </h3>
            </div>


            <div className="flex flex-col sm:flex-row gap-3">

              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Explore Research
              </button>

              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Download Reports
              </button>

              <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-colors">
                Subscribe for Market Insights
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function InvestmentOpportunitiesInfo() {
  const snapshot = [
    "Property Name",
    "City",
    "Asset Type",
    "Developer",
    "Status",
    "Minimum Investment",
    "LLP Name",
  ];

  const documents = [
    "Property note",
    "LLP information",
    "Title summary",
    "Due diligence",
    "Financial assumptions",
    "Risk disclosures",
    "Investment documents",
  ];

  const risks = [
    "Market risk",
    "Liquidity risk",
    "Regulatory changes",
    "Vacancy risk",
    "Property-specific considerations",
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
            Investment Opportunities
          </p>

          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-4">
            Evaluate Every Opportunity
            <span className="block text-emerald-500">
              With Greater Confidence.
            </span>
          </h2>

          <p className="text-gray-500 mt-6 leading-7">
            Every investment opportunity on Pronex World follows a standardized
            presentation format to help investors evaluate properties with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-14">

          <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-7 sm:p-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center">
                <BsBuilding size={24} />
              </div>

              <div>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                  Property Snapshot
                </p>

                <h3 className="text-white text-xl font-bold mt-1">
                  Everything Important, Structured Clearly
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              {snapshot.map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-7">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiStar size={22} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-5">
              AI Investment Score
            </h3>

            <p className="text-gray-500 text-sm leading-7 mt-4">
              A proprietary score supported by market intelligence, location
              analytics and property fundamentals.
            </p>

            <p className="text-xs text-gray-400 mt-5 leading-relaxed">
              The score is an analytical indicator and not a guarantee of
              future performance.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition-all">
            <FiTrendingUp className="text-emerald-600" size={24} />

            <h3 className="font-bold text-gray-900 text-xl mt-5">
              Investment Highlights
            </h3>

            <p className="text-gray-500 text-sm leading-7 mt-3">
              Key reasons to invest including location, connectivity,
              infrastructure, tenant demand and long-term potential.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition-all">
            <FiFileText className="text-emerald-600" size={24} />

            <h3 className="font-bold text-gray-900 text-xl mt-5">
              Documents Available
            </h3>

            <div className="space-y-2 mt-4">
              {documents.map((item) => (
                <div key={item} className="flex gap-2 text-sm text-gray-500">
                  <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={15} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition-all">
            <FiDollarSign className="text-emerald-600" size={24} />

            <h3 className="font-bold text-gray-900 text-xl mt-5">
              Fees & Charges
            </h3>

            <p className="text-gray-500 text-sm leading-7 mt-3">
              Display all applicable acquisition, administration and other fees
              in a transparent manner.
            </p>
          </div>

        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-7">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-xl">
                Risk Factors
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Important considerations before making an investment decision.
              </p>
            </div>

            <div className="flex-1 flex flex-wrap gap-2">
              {risks.map((risk) => (
                <span
                  key={risk}
                  className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-600"
                >
                  {risk}
                </span>
              ))}
            </div>

          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <button className="px-6 py-3 rounded-xl border border-gray-300 font-semibold text-sm text-gray-700 hover:border-emerald-400">
            Review Documents
          </button>

          <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800">
            Ask an Expert
          </button>

          <NavLink
            to="/property"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm text-center hover:bg-emerald-600"
          >
            Invest Now
          </NavLink>
        </div>

      </div>
    </section>
  );
}

// function InvestorDashboardSection() {
//   const dashboardItems = [
//     { icon: <FiPieChart />, title: "Portfolio Overview" },
//     { icon: <FiBriefcase />, title: "Current Investments" },
//     { icon: <MdOutlineAccountBalance />, title: "LLP Holdings" },
//     { icon: <FiDollarSign />, title: "Capital Contributed" },
//     { icon: <FiActivity />, title: "Property Updates" },
//     { icon: <FiFileText />, title: "Financial Statements" },
//     { icon: <FiTrendingUp />, title: "Distribution History" },
//     { icon: <FiFileText />, title: "Tax Documents" },
//     { icon: <MdOutlineVerified />, title: "KYC Status" },
//     { icon: <FiBell />, title: "Notifications" },
//     { icon: <MdOutlineSupport />, title: "Support Centre" },
//     { icon: <FiDownload />, title: "Download Centre" },
//   ];

//   return (
//     <section className="py-20 lg:py-28 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         <div className="text-center max-w-3xl mx-auto">
//           <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
//             Investor Dashboard
//           </p>

//           <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-4">
//             Your Digital Command Centre
//           </h2>

//           <p className="text-gray-500 mt-6 leading-7">
//             The investor dashboard should become the digital command centre for
//             every investor.
//           </p>
//         </div>

//         <div className="mt-14 bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10">

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

//             {dashboardItems.map((item) => (
//               <div
//                 key={item.title}
//                 className="group rounded-2xl border border-gray-100 p-5 hover:border-emerald-200 hover:shadow-lg transition-all"
//               >
//                 <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
//                   {item.icon}
//                 </div>

//                 <p className="font-semibold text-gray-800 text-sm mt-4">
//                   {item.title}
//                 </p>
//               </div>
//             ))}

//           </div>

//           <div className="mt-8 border-t border-gray-100 pt-8">
//             <h3 className="font-bold text-gray-900 text-xl">
//               Dashboard Experience
//             </h3>

//             <p className="text-gray-500 text-sm leading-7 mt-3 max-w-4xl">
//               Provide real-time updates, document access, investment milestones,
//               AI insights and secure communication in one place. The dashboard
//               should emphasize simplicity, transparency and data-driven reporting.
//             </p>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

/* =========================================================
   PART 7 – INVESTMENT OPPORTUNITY FORMAT
========================================================= */

function InvestmentOpportunityFormat() {
  const sections = [
    {
      icon: <BsBuilding size={22} />,
      title: "Property Snapshot",
      desc: "Property Name, City, Asset Type, Developer, Status, Minimum Investment, LLP Name.",
    },
    {
      icon: <FiTrendingUp size={22} />,
      title: "Investment Highlights",
      desc: "Key reasons to invest including location, connectivity, infrastructure, tenant demand and long-term potential.",
    },
    {
      icon: <RiRobot2Line size={22} />,
      title: "AI Investment Score",
      desc: "A proprietary score supported by market intelligence, location analytics and property fundamentals. The score is an analytical indicator and not a guarantee of future performance.",
    },
    {
      icon: <FiFileText size={22} />,
      title: "Documents Available",
      desc: "Property note, LLP information, title summary, due diligence, financial assumptions, risk disclosures and investment documents.",
    },
    {
      icon: <RiMoneyDollarCircleLine size={22} />,
      title: "Fees & Charges",
      desc: "Display all applicable acquisition, administration and other fees in a transparent manner.",
    },
    {
      icon: <AiOutlineSafety size={22} />,
      title: "Risk Factors",
      desc: "Market risk, liquidity risk, regulatory changes, vacancy risk, and property-specific considerations.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
            Standardized Investment Format
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">
            Evaluate Every Opportunity
            <span className="block text-emerald-500">
              With Greater Confidence
            </span>
          </h2>

          <p className="text-gray-500 mt-5 leading-relaxed">
            Every investment opportunity on Pronex World follows a standardized
            presentation format to help investors evaluate properties with
            confidence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((item) => (
            <div
              key={item.title}
              className="group bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mt-5">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gray-900 rounded-3xl p-8 sm:p-10 text-center">

          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
            Call to Action
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            Ready to Explore an Investment Opportunity?
          </h3>

          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Review Documents
            </button>

            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Ask an Expert
            </button>

            <NavLink
              to="/property"
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Invest Now
            </NavLink>

          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   PART 8 – INVESTOR DASHBOARD
========================================================= */

function InvestorDashboardSection() {
  const dashboardItems = [
    {
      icon: <FiBarChart2 size={20} />,
      title: "Portfolio Overview",
    },
    {
      icon: <BsBuilding size={20} />,
      title: "Current Investments",
    },
    {
      icon: <MdOutlineAccountBalance size={20} />,
      title: "LLP Holdings",
    },
    {
      icon: <RiMoneyDollarCircleLine size={20} />,
      title: "Capital Contributed",
    },
    {
      icon: <FiTrendingUp size={20} />,
      title: "Property Updates",
    },
    {
      icon: <FiFileText size={20} />,
      title: "Financial Statements",
    },
    {
      icon: <FiDollarSign size={20} />,
      title: "Distribution History",
    },
    {
      icon: <FiFileText size={20} />,
      title: "Tax Documents",
    },
    {
      icon: <MdOutlineVerified size={20} />,
      title: "KYC Status",
    },
    {
      icon: <FiEye size={20} />,
      title: "Notifications",
    },
    {
      icon: <MdOutlineSupport size={20} />,
      title: "Support Centre",
    },
    {
      icon: <FiDownload size={20} />,
      title: "Download Centre",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
            Investor Dashboard
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Your Digital Command Centre
          </h2>

          <p className="text-gray-400 mt-5 leading-relaxed">
            The investor dashboard should become the digital command centre
            for every investor.
          </p>

        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {dashboardItems.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-emerald-400/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                {item.icon}
              </div>

              <p className="text-sm font-semibold text-white mt-4">
                {item.title}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-7 sm:p-10">

          <div className="flex flex-col lg:flex-row gap-8 items-center">

            <div className="flex-1">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                Dashboard Experience
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                Everything in One Secure Place
              </h3>
            </div>

            <div className="flex-1">
              <p className="text-gray-400 leading-relaxed">
                Provide real-time updates, document access, investment
                milestones, AI insights and secure communication in one place.
                The dashboard should emphasize simplicity, transparency and
                data-driven reporting.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// function DiversificationSection() {
//   const benefits = [
//     "Spread investment risk",
//     "Participate in multiple growth markets",
//     "Reduce dependence on a single property",
//     "Access different property segments",
//     "Build long-term wealth through disciplined diversification",
//   ];

//   return (
//     <section className="py-20 lg:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         <div className="grid lg:grid-cols-2 gap-12 items-center">

//           <div>
//             <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
//               Smarter Portfolio Strategy
//             </p>

//             <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-4">
//               Why Diversification
//               <span className="text-emerald-500"> Wins.</span>
//             </h2>

//             <p className="text-gray-500 mt-6 leading-7">
//               Investing your entire capital in a single property can expose you
//               to concentrated risk. Pronex World encourages investors to build
//               diversified real estate portfolios across different cities,
//               developers and asset classes.
//             </p>

//             <div className="mt-8 space-y-3">
//               {benefits.map((benefit) => (
//                 <div
//                   key={benefit}
//                   className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4"
//                 >
//                   <FiCheckCircle className="text-emerald-500 shrink-0" />

//                   <span className="text-sm font-medium text-gray-700">
//                     {benefit}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-900 rounded-3xl p-8 sm:p-10 shadow-2xl">

//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 "Different Cities",
//                 "Multiple Developers",
//                 "Asset Classes",
//                 "Growth Markets",
//               ].map((item) => (
//                 <div
//                   key={item}
//                   className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
//                 >
//                   <FiTrendingUp
//                     className="mx-auto text-emerald-400"
//                     size={28}
//                   />

//                   <p className="font-semibold text-white text-sm mt-4">
//                     {item}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 pt-6 border-t border-white/10">
//               <p className="text-xs text-gray-400 leading-relaxed">
//                 Diversification does not eliminate investment risk, but it can
//                 help reduce concentration risk as part of a broader investment
//                 strategy.
//               </p>
//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

function ResearchCentre() {
  const categories = [
    "Weekly Market Reports",
    "City Investment Reports",
    "Infrastructure Watch",
    "Developer Insights",
    "Rental Market Analysis",
    "Commercial Real Estate Updates",
    "Residential Price Trends",
    "Investment Guides",
    "Economic Commentary",
    "AI Research Notes",
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
              Research Centre & Market Intelligence
            </p>

            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-4">
              Research Before
              <span className="block text-emerald-400">
                You Invest.
              </span>
            </h2>

            <p className="text-gray-400 mt-6 leading-7">
              The Research Centre positions Pronex World as a trusted source of
              real estate knowledge and supports investor education.
            </p>

            <div className="mt-8">
              <h3 className="text-white font-bold text-lg">
                Purpose
              </h3>

              <p className="text-gray-400 text-sm leading-7 mt-3">
                Publish high-quality, evidence-based research that helps
                investors understand market dynamics, identify opportunities
                and make informed decisions.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold">
                Explore Research
              </button>

              <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-semibold">
                Download Reports
              </button>

              <button className="px-6 py-3 rounded-xl border border-white/20 text-gray-200 text-sm font-semibold hover:bg-white/5">
                Subscribe for Market Insights
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {categories.map((item, index) => (
              <div
                key={item}
                className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-400/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <FiBookOpen className="text-emerald-400" size={20} />

                  <span className="text-xs text-gray-600 font-bold">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-gray-200 text-sm font-medium mt-5">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}


/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white">

      <Hero />

      <TrustBar />

      <HowItWorks />

      <Opportunities />

      {/* PART 7 */}
      <InvestmentOpportunityFormat />

      <AIPropertyIntelligence />

      <LLPOwnershipModel />

      {/* PART 8 */}
      <InvestorDashboardSection />

      {/* PART 9 */}
      <DiversificationSection />

      <FractionalSection />

      {/* PART 10 */}
      <ResearchCentreSection />

      <FAQ />

      <AppBanner />

    </div>
  );
}