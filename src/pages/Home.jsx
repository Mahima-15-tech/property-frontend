 



import { useState } from "react";
import { FiSearch, FiShield, FiEye, FiCheckCircle, FiBarChart2, FiChevronDown, FiChevronUp, FiArrowRight, FiTrendingUp, FiDollarSign, FiUsers, FiStar } from "react-icons/fi";
import { BsBuilding, BsHouseDoor, BsGraphUp, BsCheckLg, BsPhone } from "react-icons/bs";
import { MdOutlineVerified, MdOutlineSupport } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiBuilding2Line } from "react-icons/ri";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay, FaApple } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineSafety } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import mobile from '../assets/images/original.jpg'
import { useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";



const STEPS = [
  { icon: <FiSearch size={22} />, num: "01", title: "Browse Properties", desc: "Explore curated, high-yield listings verified by our expert team of real estate analysts." },
  { icon: <MdOutlineVerified size={22} />, num: "02", title: "Digital KYC", desc: "No upfront paperwork. Complete your regulatory compliance instantly at the point of investment." },
  { icon: <RiMoneyDollarCircleLine size={22} />, num: "03", title: "Earn Dividends", desc: "Receive monthly rental income and participate in long-term capital appreciation automatically." },
];



const FEATURES = [
  { icon: <RiBuilding2Line size={20} />, label: "Fractional Ownership", badge: "Benefit", desc: "Own premium residential and commercial properties for an initial investment of only $10 per share." },
  { icon: <FiDollarSign size={20} />, label: "Low Entry Barrier", badge: "Benefit", desc: "No upfront paperwork. Complete your regulatory compliance instantly at the point of investment." },
  { icon: <FiTrendingUp size={20} />, label: "Transparent Returns", badge: "Benefit", desc: "View all top documents and financial splits directly from your investor dashboard." },
  { icon: <MdOutlineSupport size={20} />, label: "Fast Support", badge: "Benefit", desc: "Dedicated membership assistance for when you want to business on your investments." },
];

const FAQS = [
  { q: "What does 1 share = 1% mean?", a: "Each property listed in Sovereign Curator (SVC). When you buy 1 share, you legally own 1% of the share in that specific SPC, granting you 1% of all rental income and 1% of the final sale proceeds." },
  { q: "When do I need to complete KYC?", a: "KYC is required before making your first investment. The process is fully digital and typically takes only a few minutes." },
  { q: "Can I sell my shares before the property is sold?", a: "Yes, you can list your shares on our secondary marketplace at any time, subject to market demand." },
  { q: "How are properties selected?", a: "Our expert team evaluates hundreds of properties monthly, selecting only those meeting strict criteria for yield, location, and growth potential." },
  { q: "Is there a minimum investment amount?", a: "The minimum investment is $10 per share. Each property is divided into 100 shares at their respective share prices." },
];

const TRUST_BADGES = [
  { icon: <MdOutlineVerified size={28} />, label: "Verified Listings" },
  { icon: <AiOutlineSafety size={28} />, label: "Secure Investment" },
  { icon: <FiEye size={28} />, label: "Transparent Ownership" },
  { icon: <BsCheckLg size={28} />, label: "Digital Compliance" },
  { icon: <FiBarChart2 size={28} />, label: "Portfolio Analytics" },
];


function Hero() {
  return (
    <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-gray-900 leading-tight">
            Own Real Estate<br /><span className="text-emerald-500">One Share</span> at a Time
          </h1>
          <p className="mt-5 text-gray-500 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
            Democratizing high-yield property investment. Buy shares in premium residential and commercial assets with digital ease. 1 Share = 1% Ownership.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm">
              <NavLink to='/property' >
                  Explore Properties
              </NavLink>
            </button>
            <button className="border border-gray-300 hover:border-emerald-400 text-gray-700 font-semibold px-7 py-3 rounded-lg transition-colors text-sm bg-green-50">
              <NavLink to='/broker-signup'>
                  Become a Partner
              </NavLink>
            </button>
          </div>
          <div className="mt-10 flex gap-10 justify-center lg:justify-start">
            <div>
              <p className="text-2xl font-bold text-gray-900">$240M+</p>
              <p className="text-xs text-gray-500 mt-1">Assets Managed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12.4%</p>
              <p className="text-xs text-gray-500 mt-1">Avg. Yield</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1  relative w-full max-w-md ">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80" alt="Luxury Property" className="rounded-2xl shadow-2xl w-full object-cover h-64 sm:h-80 lg:h-96" />
          <div className="absolute bottom-4 left-4 right-4  sm:-left-10 sm:right-auto sm:-bottom-6 bg-white rounded-xl shadow-lg p-4 sm:max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-semibold text-gray-700">Live Portfolio Tracking</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Monitor your rental income and distribution in real-time across all properties.</p>
            <div className="flex items-center justify-between">
              <span className="text-emerald-500 text-xs font-bold">+4.2% Month on Month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="bg-green-50 border-y border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {TRUST_BADGES.map(b => (
            <div key={b.label} className="flex flex-col items-center gap-1.5">
              <span className="text-emerald-500">{b.icon}</span>
              <span className="text-xs text-gray-500 font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Investment Simplicity</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">Three steps to institutional-grade real estate exposure without the management headache.</p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map(s => (
            <div key={s.num} className="flex flex-col items-center bg-green-50 py-8 rounded-xl  ">
              <div className="relative mb-4">
                <span className="text-6xl font-black text-gray-100 select-none leading-none">{s.num}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-emerald-500 text-white p-3 rounded-xl shadow-md">{s.icon}</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-2">{s.title}</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ p }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl   hover:scale-105 duration-300 tr transition-all">
      <div className="relative">
        <img src={p.img} alt={p.name} className="w-full h-44 object-cover" />
        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wide">{p.badge}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <HiOutlineLocationMarker size={13} className="text-gray-400" />
          <span className="text-xs text-gray-500">{p.loc}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Proj. ROI</p>
            <p className="text-sm font-bold text-gray-900">{p.price}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Yield</p>
            <p className="text-sm font-bold text-emerald-500">{p.yield}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Share Price</p>
            <p className="text-sm font-bold text-gray-900">{p.sharePrice}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Available</p>
            <p className="text-sm font-bold text-gray-900">{p.available}</p>
          </div>
        </div>
        <button
      onClick={() => navigate(`/properties/${p.id}`)}
      className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-lg"
    >
      View Details
    </button>
      </div>
    </div>
  );
}

function Opportunities() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProperties = async () => {
    try {
      const res = await axios.get("/api/properties/featured");

      const formatted = res.data.map((p) => ({
        id: p._id,
        name: p.name,
        loc: `${p.location?.city}, ${p.location?.state}`,
        img: p.media?.images?.[0] || "https://via.placeholder.com/400",
        price: `${p.roi}%`,
        yield: `${p.rentalYield}%`,
        sharePrice: `₹${p.pricePerShare}`,
        available: `${p.availableShares}/${p.totalShares}`,
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
    <section className="py-16 lg:py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Investment Opportunities
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Current institutional grade assets available for fractional links.
            </p>
          </div>

          <NavLink
            to="/property"
            className="hidden sm:flex items-center gap-1 text-emerald-600 text-sm font-semibold hover:underline"
          >
            View All Properties <FiArrowRight />
          </NavLink>
        </div>

        {/* ✅ Loader */}
        {loading ? (
          <p className="text-center text-gray-500">
            Loading properties...
          </p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500">
            No properties found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
  <PropertyCard key={p.id} p={p} />
))}
          </div>
        )}

        <div className="mt-6 sm:hidden text-center">
          <NavLink
            to="/property"
            className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold"
          >
            View All Properties <FiArrowRight />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

function FractionalSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">The Future of Wealth is <span className="text-emerald-500">Fractional</span></h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(f => (
              <div key={f.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-50 text-emerald-500 p-2 rounded-lg">{f.icon}</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">{f.badge}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{f.label}</h4>
                <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 text-xs font-medium">Investor Dashboard</span>
              <FiBarChart2 className="text-emerald-400" size={18} />
            </div>
            <p className="text-gray-500 text-xs mb-4">Total Investor Value</p>
            <p className="text-white text-3xl font-extrabold">$142,500.00 <span className="text-emerald-400 text-base font-semibold">+10.4%</span></p>
            <div className="mt-5 grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs">Properties</p>
                <p className="text-white font-bold mt-1">$18,000</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs">Rental Income (MTD)</p>
                <p className="text-emerald-400 font-bold mt-1">$942.15</p>
              </div>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors">See How Portfolio Works</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partner() {
  return (
    <section className="py-16 lg:py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Partner With Us</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-md">Are you a broker or wealth manager? Join our affiliate program and earn commissions on every successful investment made through your network.</p>
          <ul className="mt-6 space-y-2">
            {["Unique Private-Label for Clients", "Real-Time Referral Tracking", "Dedicated Partner Dashboard"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <FiCheckCircle className="text-emerald-500 shrink-0" size={16} />
                {item}
              </li>
            ))}
          </ul>
          <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3 rounded-lg text-sm transition-colors">Become a Partner</button>
        </div>
        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-900">Affiliate Earnings</span>
              <FiUsers size={16} className="text-gray-400" />
            </div>
            {[
              { name: "James Smith", amount: "$714", sub: "Earnings this month", color: "bg-emerald-100 text-emerald-700", badge: "Active" },
              { name: "Linda Miller", amount: "$316", sub: "Jul 2025 (7)", color: "bg-blue-100 text-blue-700", badge: "Active" },
            ].map(a => (
              <div key={a.name} className="flex items-center gap-3 mb-3 bg-green-50 rounded-xl p-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${a.color}`}>{a.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{a.name}</p>
                  <p className="text-xs text-gray-400 truncate">{a.sub}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{a.amount}</p>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{a.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="border  border-gray-200 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between px-5 py-4 text-left bg-green-50 hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-sm font-semibold text-gray-900">{f.q}</span>
                {open === i ? <FiChevronUp className="text-emerald-500 shrink-0" size={18} /> : <FiChevronDown className="text-gray-400 shrink-0" size={18} />}
              </button>
              {open === i && <div className="px-5 pb-4 text-sm text-gray-500 bg-white">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppBanner() {
  return (
    <section className="bg-gray-900 py-14 lg:py-20 rounded-3xl sm:px-20 px-2">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
      
        <div className="flex-1  sm:flex-col ">
          <div >
             <h2 className="text-xl sm:text-4xl font-bold text-white">Your Real Estate Portfolio in Your Pocket</h2>
             <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto lg:mx-0">Track your fractional yields, browse new opportunities, and manage your wealth from anywhere in the world.</p>
         
         </div>
         
          <div className="mt-8 flex flex-row sm:flex-row gap-3 justify-center lg:justify-start ">
            <button className="flex max-w-40 items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
              <FaApple size={20} />
              <div className="text-left"><div className="text-[10px] text-gray-500">Download on the</div><div className="font-bold text-sm">App Store</div></div>
            </button>
            <button className="flex  max-w-40  items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
              <FaGooglePlay size={18} className="text-emerald-600" />
              <div className="text-left"><div className="text-[10px] text-gray-500">Get it on</div><div className="font-bold text-sm">Google Play</div></div>
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <img src={mobile} alt="img" />
      
        </div>
      </div>
    </section>
  );
}


export default function Home() {

    return (
    <div className="min-h-screen font-sans bg-white">
    
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Opportunities />
      <FractionalSection />
      <Partner />
      <FAQ />
      <AppBanner />
    
    </div>
  );
}