import { useEffect, useState } from "react";
import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiMapPin,
  FiBarChart2,
  FiBookmark,
  FiArrowRight,
  FiMail,
  FiGlobe,
  FiShare2,
} from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import axios from "../utils/axios";

const NAV_LINKS = ["Portfolio", "Marketplace", "Insights", "Governance"];

const LOCATIONS = ["London, UK", "New York, USA", "Dubai, UAE"];
const FUNDING_STATUS = ["All", "Fully Funded", "In Progress"];

const BADGE1_COLORS = {
  HOT: "bg-emerald-700",
  NEW: "bg-teal-600",
  STABLE: "bg-blue-700",
  PREMIUM: "bg-purple-700",
  RESIDENTIAL: "bg-orange-600",
};

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <a href="#" className="hover:text-gray-700">
        Home
      </a>
      <span className="text-gray-400">&rsaquo;</span>
      <span className="text-gray-900 font-medium">Properties</span>
    </div>
  );
}

function FilterPanel({
  locations,
  setLocations,
  allLocations,   
  budgetRange,
  setBudgetRange,
  roiRange,
  setRoiRange,
  fundingStatus,
  setFundingStatus,
  type,        
  setType,
  onApply,
  onReset,
}) {
  const toggleLocation = (loc) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };
  const toggleFunding = (s) => setFundingStatus(s);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="font-semibold text-gray-900 text-base">Filters</span>
        <button
          onClick={onReset}
          className="text-xs text-emerald-700 font-medium hover:underline"
        >
          Reset Filters
        </button>
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Location
        </p>
        {allLocations.map((loc) => (
          <label
            key={loc}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={locations.includes(loc)}
              onChange={() => toggleLocation(loc)}
              className="w-4 h-4 accent-emerald-700 rounded"
            />
            <span className="text-sm text-gray-700">{loc}</span>
          </label>
        ))}
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Property Type
        </p>
        <div className="relative">
        <select
  value={type}
  onChange={(e) => setType(e.target.value)}
  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 appearance-none bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
>
<option value="">All</option>
<option value="commercial">Commercial</option>
<option value="residential">Residential</option>
<option value="industrial">Industrial</option>
          </select>
          <FiChevronDown
            className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            size={15}
          />
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Budget Range
          </p>
          <span className="text-xs text-emerald-700 font-semibold">
  {budgetRange
    ? `₹${budgetRange.toLocaleString()}`
    : "Any"}
</span>
        </div>
        <input
          type="range"
          min={100000}
          max={10000000}
          step={100000}
          value={budgetRange}
          onChange={(e) => setBudgetRange(Number(e.target.value))}
          className="w-full accent-emerald-700 h-1.5 rounded-full"
        />
        <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400">₹1L</span>
<span className="text-[10px] text-gray-400">₹1Cr+</span>

        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Funding Status
        </p>
        <div className="flex flex-wrap gap-2">
          {FUNDING_STATUS.map((s) => (
            <button
              key={s}
              onClick={() => toggleFunding(s)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                fundingStatus === s
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "border-gray-200 text-gray-600 hover:border-emerald-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}

function PropertyCard({ p }) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-44 object-cover group-hover:scale-110 transition duration-700"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[10px] font-bold text-white px-2 py-1 rounded-full bg-emerald-600 shadow">
            {p.badge1}
          </span>
          <span className="text-[10px] font-bold text-gray-700 bg-white px-2 py-1 rounded-full">
            {p.badge2}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base">
          {p.name}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
          <HiOutlineLocationMarker />
          {p.loc}
        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div>
            <p className="text-gray-400 text-[10px] uppercase">
              Locking
            </p>
            <p className="font-semibold">{p.locking_period}</p>
          </div>

          <div>
            <p className="text-gray-400 text-[10px] uppercase">
              Value
            </p>
            <p className="font-semibold">{p.totalValue}</p>
          </div>
        </div>

        {/* SHARE */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">{p.sharePrice}</p>
            <span className="text-xs text-gray-500">
              {p.funded}% funded
            </span>
          </div>

          {/* progress */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-emerald-500 to-green-700 rounded-full transition-all"
              style={{ width: `${p.funded}%` }}
            />
          </div>
        </div>

        {/* BUTTON */}
        <NavLink to={`/properties/${p.id}`}>
          <button className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 text-white text-sm font-semibold hover:opacity-90 transition">
            View Details →
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default function PropertyPage() {
  const [locations, setLocations] = useState([]);
  const [budgetRange, setBudgetRange] = useState(100000);
const [roiRange, setRoiRange] = useState(null);
  const [fundingStatus, setFundingStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest Listed");
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoad] = useState(6);
 
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [type, setType] = useState("");
  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  

  const handleReset = () => {
    setLocations([]);
    setBudgetRange(100000);
    setRoiRange(null);
    setFundingStatus("All");
    setType("");
    fetchProperties(); 
  };
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await axios.get("/api/properties");
  
      const cities = [
        ...new Map(
          res.data
            .map(p => p.location?.city?.trim())
            .filter(Boolean)
            .map(city => [city.toLowerCase(), city])
        ).values()
      ];
  
      setAllLocations(cities);
    };
  
    fetchLocations();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
  
      const res = await axios.get("/api/properties/explore", {
        params: {
          ...(search && { search }),
  
          ...(locations.length > 0 && { 
            city: locations.map(loc => loc.toLowerCase()) 
          }),
  
          ...(roiRange && { minROI: roiRange }),
  
          ...(budgetRange && { minPrice: budgetRange }),
  
          ...(fundingStatus !== "All" && {
            status: fundingStatus === "In Progress" ? "funding" : "funded"
          }),
  
          ...(type && { type }), 
  
          sort:
            sortBy === "Highest ROI"
              ? "roi"
              : sortBy === "Lowest Price"
              ? "price"
              : "newest",
  
          page: currentPage,
          limit: 6
        }
      });
  
      setProperties(res.data.data);
  
setTotalPages(res.data.pagination.pages); 
  
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, [
    search,
    currentPage,
    sortBy,
    locations,
    budgetRange,
    roiRange,
    fundingStatus,
    type
  ]);

  

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Explore Investment
              <br />
              Opportunities
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg">
              Browse premium properties and invest in shares of high-yield real
              estate assets curated for institutional-grade portfolios.
            </p>
          </div>
          <div className="relative w-full sm:w-72 lg:w-80 shrink-0">
            <FiSearch
              className="absolute left-3 top-3 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by city, asset or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-56 xl:w-64 shrink-0">
          <FilterPanel
  locations={locations}
  setLocations={setLocations}
  allLocations={allLocations}   
  type={type}                 
  setType={setType}            
  budgetRange={budgetRange}
  setBudgetRange={setBudgetRange}
  roiRange={roiRange}
  setRoiRange={setRoiRange}
  fundingStatus={fundingStatus}
  setFundingStatus={setFundingStatus}
  onApply={fetchProperties}    
  onReset={handleReset}
/>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                {properties.length} properties
                </span>{" "}
                in Marketplace
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm font-medium text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 appearance-none bg-white pr-7 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option>Newest Listed</option>
                    <option>Highest ROI</option>
                    <option>Lowest Price</option>
                    <option>Most Funded</option>
                  </select>
                  <FiChevronDown
                    className="absolute right-2 top-2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {properties.map((p) => (
  <PropertyCard
    key={p.id}
    p={{
      id: p.id,
      name: p.name,
      loc: p.location
  ? `${capitalize(p.location.city)}, ${capitalize(p.location.state)}`
  : "Location not available",
      img: p.image,
      totalValue: `₹${p.totalValue}`,
      sharePrice: `₹${p.sharePrice}`,
      funded: p.fundedPercent || 0,
      locking_period: p.locking_period || "N/A",

      // NEW FIELDS (keep them!)
      roi: p.roi,
      badge1: p.badge || "HOT",
      badge2: p.type
    }}
  />
))}
            </div>
            <div className="mt-10 text-center text-sm text-gray-500">
  Page {currentPage} of {totalPages}
</div>

<div className="mt-4 flex justify-center">
  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-md border">

    {/* PREV */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="px-2 text-gray-600 hover:text-emerald-600 disabled:opacity-30"
    >
      ←
    </button>

    {/* PAGINATION LOGIC */}
    {(() => {
      let pages = [];

      if (totalPages <= 5) {
        // 👉 small case (no dots)
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        // 👉 big case (with dots)
        pages = [
          1,
          ...(currentPage > 3 ? ["..."] : []),
          ...Array.from(
            { length: 3 },
            (_, i) => currentPage - 1 + i
          ).filter((p) => p > 1 && p < totalPages),
          ...(currentPage < totalPages - 2 ? ["..."] : []),
          totalPages,
        ];
      }

      return pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition ${
              p === currentPage
                ? "bg-emerald-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      );
    })()}

    {/* NEXT */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="px-2 text-gray-600 hover:text-emerald-600 disabled:opacity-30"
    >
      →
    </button>
  </div>
</div>
          </div>
        </div>
      </main>
    </div>
  );
}
