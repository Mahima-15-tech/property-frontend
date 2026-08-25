import { useEffect, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiRotateCcw,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import axios from "../utils/axios";

const FUNDING_STATUS = ["All", "Fully Funded", "In Progress"];

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800/70 mb-6 font-medium">
      <a href="/" className="hover:text-emerald-900 transition-colors">
        Home
      </a>
      <span className="text-emerald-400">&rsaquo;</span>
      <span className="text-emerald-950 font-semibold">Marketplace</span>
    </nav>
  );
}

function FilterPanel({
  locations,
  setLocations,
  allLocations,
  budgetRange,
  setBudgetRange,
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

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-100/60">
        <div className="flex items-center gap-2 text-gray-900 font-semibold text-base">
          <FiFilter className="text-emerald-700" size={18} />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium hover:underline transition-all"
        >
          <FiRotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* LOCATION FILTER */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-gray-500 mb-3 uppercase tracking-wider">
          Locations (City / State)
        </p>
        <div className="max-h-48 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-emerald-200">
          {allLocations.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Fetching locations...</p>
          ) : (
            allLocations.map((loc) => (
              <label
                key={loc}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="checkbox"
                  checked={locations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 accent-emerald-700 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-emerald-800 capitalize transition-colors">
                  {loc}
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* PROPERTY TYPE */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">
          Property Type
        </p>
        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full text-sm border border-emerald-200/80 rounded-xl px-3 py-2.5 appearance-none bg-white/90 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="industrial">Industrial</option>
          </select>
          <FiChevronDown
            className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* BUDGET RANGE SLIDER */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Budget Range
          </p>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-100/60 px-2 py-0.5 rounded-md">
            {budgetRange ? `₹${(budgetRange / 100000).toFixed(1)}L` : "Any"}
          </span>
        </div>
        <input
          type="range"
          min={100000}
          max={100000000}
          step={100000}
          value={budgetRange ?? 100000000}
          onChange={(e) => setBudgetRange(Number(e.target.value))}
          className="w-full accent-emerald-700 h-1.5 rounded-full bg-gray-200 cursor-pointer"
        />
        <div className="flex justify-between mt-1 text-[10px] text-gray-400 font-medium">
          <span>₹1L</span>
          <span>₹10Cr+</span>
        </div>
      </div>

      {/* FUNDING STATUS */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">
          Funding Status
        </p>
        <div className="flex flex-wrap gap-1.5">
          {FUNDING_STATUS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFundingStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                fundingStatus === s
                  ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-emerald-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow"
      >
        Apply Filters
      </button>
    </div>
  );
}

function PropertyCard({ p }) {
  return (
    <div className="group bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* IMAGE */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={p.img || "https://via.placeholder.com/400x250?text=Property+Image"}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-bold text-white px-3 py-1 rounded-full bg-emerald-700/90 backdrop-blur-md shadow-sm uppercase tracking-wider">
              {p.type || "Asset"}
            </span>
          </div>

          {p.roi && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              {p.roi}% Target ROI
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1 group-hover:text-emerald-800 transition-colors">
            {p.name}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
            <HiOutlineLocationMarker className="text-emerald-700 shrink-0" size={15} />
            <span className="truncate">{p.loc}</span>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-2 gap-3 my-4 p-2.5 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
            <div>
              <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">
                Locking
              </p>
              <p className="font-bold text-gray-800 mt-0.5">{p.locking_period}</p>
            </div>

            <div>
              <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">
                Total Value
              </p>
              <p className="font-bold text-gray-800 mt-0.5">{p.totalValue}</p>
            </div>
          </div>

          {/* SHARE PRICE & PROGRESS */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Share Price</span>
                <span className="font-extrabold text-gray-900 text-lg">{p.sharePrice}</span>
              </div>
              <span className="text-xs font-bold text-emerald-700">
                {Number(p.funded || 0).toFixed(1)}% funded
              </span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-emerald-500 to-green-700 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(p.funded, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="p-4 pt-0">
        <NavLink to={`/properties/${p.id}`}>
          <button className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-emerald-800 text-white text-sm font-semibold transition-all duration-200 shadow-sm">
            View Details →
          </button>
        </NavLink>
      </div>
    </div>
  );
}

// Helper Component for Pagination
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      <span className="text-xs font-medium text-gray-500 tracking-wide">
        Showing Page <span className="font-bold text-emerald-800">{currentPage}</span> of{" "}
        <span className="font-bold text-gray-800">{totalPages}</span>
      </span>

      <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-emerald-100">
        {/* FIRST PAGE BUTTON */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          title="First Page"
          className="p-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition"
        >
          <FiChevronsLeft size={16} />
        </button>

        {/* PREV BUTTON */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition"
        >
          <FiChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={idx} className="px-2 text-xs text-gray-400 font-bold select-none">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  p === currentPage
                    ? "bg-gradient-to-r from-emerald-700 to-green-800 text-white shadow-sm scale-105"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* NEXT BUTTON */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight size={16} />
        </button>

        {/* LAST PAGE BUTTON */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          title="Last Page"
          className="p-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition"
        >
          <FiChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function PropertyPage() {
  const [locations, setLocations] = useState([]);
  const [budgetRange, setBudgetRange] = useState(null);
  const [roiRange, setRoiRange] = useState(null);
  const [fundingStatus, setFundingStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest Listed");
  const [currentPage, setCurrentPage] = useState(1);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [type, setType] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const handleReset = () => {
    setLocations([]);
    setBudgetRange(null);
    setRoiRange(null);
    setFundingStatus("All");
    setType("");
    setSearch("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, locations, budgetRange, roiRange, fundingStatus, type]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("/api/properties");
        const cities = [
          ...new Set(
            res.data
              ?.map((p) => p.location?.city?.trim())
              .filter(Boolean)
              .map((city) => city.toLowerCase())
          ),
        ];
        setAllLocations(cities);
      } catch (err) {
        console.error("Locations Error:", err);
      }
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
            city: locations.join(","),
          }),
          ...(roiRange !== null && { minROI: roiRange }),
          ...(budgetRange !== null && { maxPrice: budgetRange }),
          ...(fundingStatus !== "All" && {
            status: fundingStatus === "In Progress" ? "funding" : "funded",
          }),
          ...(type && { type }),
          sort:
            sortBy === "Highest ROI"
              ? "roi"
              : sortBy === "Lowest Price"
              ? "price"
              : sortBy === "Most Funded"
              ? "funded"
              : "newest",
          page: currentPage,
          limit: 6,
        },
      });

      setProperties(res.data.data || []);
      setTotalPages(res.data.pagination?.pages || 1);
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
    type,
  ]);

  return (
    <div className="min-h-screen bg-green-50 font-sans pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        {/* HEADER & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Explore Investment
              <span className="block text-emerald-800">Opportunities</span>
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl font-normal">
              Browse institutional-grade real estate assets and build your fractional portfolio.
            </p>
          </div>

          <div className="relative w-full md:w-80 shrink-0">
            <FiSearch
              className="absolute left-3.5 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by location, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-emerald-200/80 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTER */}
          <div className="w-full lg:w-64 shrink-0">
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

          {/* MAIN LISTINGS */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white/60 p-3 rounded-xl border border-emerald-100">
              <p className="text-sm font-medium text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {properties.length} properties
                </span>
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-semibold text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 appearance-none bg-white pr-7 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
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

            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 mt-2">Loading marketplace properties...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white/80 rounded-2xl p-12 text-center border border-emerald-100 shadow-sm">
                <p className="text-gray-800 font-bold text-base">No properties match your filter</p>
                <p className="text-gray-500 text-xs mt-1">
                  Try adjusting or resetting your applied filters.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <PropertyCard
                    key={p.id}
                    p={{
                      id: p.id,
                      name: p.name,
                      loc: p.location
                        ? `${capitalize(p.location.city)}, ${capitalize(
                            p.location.state
                          )}`
                        : "Location N/A",
                      img: p.image,
                      totalValue: `₹${p.totalValue?.toLocaleString() || "0"}`,
                      sharePrice: `₹${p.sharePrice?.toLocaleString() || "0"}`,
                      funded: p.fundedPercent || 0,
                      locking_period: p.locking_period || "1 Year",
                      roi: p.roi,
                      type: p.type,
                    }}
                  />
                ))}
              </div>
            )}

            {/* ENHANCED PAGINATION */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}