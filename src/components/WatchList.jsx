import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";

const WatchList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("/api/user/watchlist");
        console.log("WATCHLIST PAGE:", res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWatchlist();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No properties in watchlist
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-18 px-4">
      {data.map((p) => (
        <div key={p.id} className="bg-white rounded-3xl shadow-md">
          
          <div className="h-48">
            {p.image ? (
              <img src={p.image} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <BsBuilding size={30} />
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-xs text-gray-400">{p.location}</p>

            <button
              onClick={() => navigate(`/properties/${p.id}`)}
              className="text-emerald-600 mt-3"
            >
              Explore →
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default WatchList;