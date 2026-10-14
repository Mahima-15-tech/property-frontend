import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiArrowRight,
  FiTrash2,
  FiHeart,
} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import toast from "react-hot-toast";

const WatchList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH WATCHLIST
  // =========================
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("/api/user/watchlist");

        console.log("WATCHLIST PAGE:", res.data);

        const watchlistData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.watchlist || [];

        setData(
          Array.isArray(watchlistData)
            ? watchlistData
            : []
        );
      } catch (err) {
        console.log(
          "Watchlist fetch error:",
          err.response?.data || err
        );

        setData([]);
        toast.error("Failed to load watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // =========================
  // REMOVE FROM WATCHLIST
  // =========================
  const handleRemoveFromWatchlist = async (
    e,
    propertyId
  ) => {
    e.stopPropagation();

    try {
      const res = await axios.post(
        `/api/user/watchlist/toggle/${propertyId}`
      );

      console.log("REMOVE RESPONSE:", res.data);

      setData((prev) =>
        prev.filter((item) => {
          const p = item.property || item;

          window.dispatchEvent(
            new Event("watchlistUpdated")
          );

          return (
            p._id?.toString() !== propertyId?.toString() &&
            p.id?.toString() !== propertyId?.toString()
          );
        })
      );

      toast.success("Removed from watchlist");
    } catch (err) {
      console.log(
        "Remove error:",
        err.response?.data || err
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-slate-100 animate-pulse h-80 rounded-3xl"
            />
          ))}
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0F766E] flex items-center justify-center mb-4 border border-emerald-100 shadow-xs">
          <FiHeart className="w-8 h-8 text-[#0F766E]" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1">
          Your Watchlist is Empty
        </h3>

        <p className="text-sm text-slate-500 max-w-sm mb-6">
          Explore our available properties and save your
          favorite investments to track them here.
        </p>

        <button
          onClick={() => navigate("/property")}
          className="px-6 py-2.5 bg-[#0F766E] hover:bg-[#0d645e] text-white text-sm font-semibold rounded-xl transition-all shadow-xs hover:shadow-md active:scale-95"
        >
          Explore Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Saved Properties
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of all the real estate opportunities
            you are interested in.
          </p>
        </div>

        <span className="px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-[#0F766E] font-semibold text-xs rounded-full">
          {data.length}{" "}
          {data.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* PROPERTY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item) => {
          const p = item.property || item;

          const propertyId =
            p._id || p.id;

          const image =
            p.image ||
            p.images?.[0] ||
            p.media?.images?.[0];

          const location =
            typeof p.location === "string"
              ? p.location
              : [
                  p.location?.city,
                  p.location?.state,
                ]
                  .filter(Boolean)
                  .join(", ");

          const price =
            p.price ||
            p.totalValue ||
            p.pricePerShare;

          return (
            <div
              key={propertyId}
              onClick={() =>
                navigate(`/properties/${propertyId}`)
              }
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative"
            >

              <div>

                {/* IMAGE */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">

                  {image ? (
                    <img
                      src={image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                      <BsBuilding className="text-3xl mb-1" />

                      <span className="text-[10px] font-semibold tracking-wider uppercase">
                        No Image Available
                      </span>
                    </div>
                  )}

                  {/* REMOVE */}
                  <button
                    onClick={(e) =>
                      handleRemoveFromWatchlist(
                        e,
                        propertyId
                      )
                    }
                    title="Remove from watchlist"
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors shadow-xs border border-slate-100"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>

                  {/* TYPE */}
                  {p.type && (
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                      {p.type}
                    </span>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0F766E] transition-colors line-clamp-1">
                    {p.name || "Untitled Property"}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2 mb-4">
                    <FiMapPin className="text-[#0F766E] flex-shrink-0" />

                    <span className="truncate">
                      {location || "Location on request"}
                    </span>
                  </div>

                  {/* PRICE */}
                  {price && (
                    <div className="text-lg font-bold text-slate-900 mb-2">
                      ₹
                      {typeof price === "number"
                        ? price.toLocaleString("en-IN")
                        : price}
                    </div>
                  )}

                </div>

              </div>

              {/* FOOTER */}
              <div className="px-5 pb-5 pt-0">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/properties/${propertyId}`
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 group-hover:bg-[#0F766E] text-slate-700 group-hover:text-white font-semibold text-xs transition-all duration-200 border border-slate-200/60 group-hover:border-transparent"
                >
                  <span>View Details</span>

                  <FiArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                </button>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default WatchList;