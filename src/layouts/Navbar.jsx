import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProfileDropdown from "../components/ProfileDropdown";
import { CgProfile } from "react-icons/cg";
import axios from "../utils/axios";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // ==============================
  // FETCH WATCHLIST
  // ==============================
  const fetchWatchlist = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWatchlist([]);
      return;
    }

    try {
      const res = await axios.get("/api/user/watchlist");

      console.log("NAVBAR WATCHLIST:", res.data);

      // Handle different backend response structures
      let watchlistData = [];

      if (Array.isArray(res.data)) {
        watchlistData = res.data;
      } else if (Array.isArray(res.data?.watchlist)) {
        watchlistData = res.data.watchlist;
      } else if (Array.isArray(res.data?.data)) {
        watchlistData = res.data.data;
      }

      setWatchlist(watchlistData);
    } catch (err) {
      console.log("Watchlist fetch error:", err);
      setWatchlist([]);
    }
  }, []);

  // ==============================
  // INITIAL WATCHLIST FETCH
  // ==============================
  useEffect(() => {
    if (isLoggedIn) {
      fetchWatchlist();
    } else {
      setWatchlist([]);
    }
  }, [isLoggedIn, fetchWatchlist]);

  // ==============================
  // LISTEN FOR WATCHLIST UPDATES
  // ==============================
  useEffect(() => {
    const handleWatchlistUpdate = () => {
      fetchWatchlist();
    };

    window.addEventListener(
      "watchlistUpdated",
      handleWatchlistUpdate
    );

    return () => {
      window.removeEventListener(
        "watchlistUpdated",
        handleWatchlistUpdate
      );
    };
  }, [fetchWatchlist]);

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setWatchlist([]);
    setShowLogoutConfirm(false);
    setIsLoggedIn(false);
    setMobileMenuOpen(false);

    navigate("/");

    toast.success("Logout successfully");
  };

  // ==============================
  // DASHBOARD
  // ==============================
  const onDashboard = () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    if (role === "broker") {
      navigate("/broker-dashboard");
    } else {
      navigate("/portfolio");
    }

    setMobileMenuOpen(false);
  };

  // ==============================
  // WATCHLIST NAVIGATION
  // ==============================
  const handleWatchlistNavigation = () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    navigate("/watchlist");
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="z-20 shadow-lg sticky top-0">
        <div>
          <nav className="mx-auto bg-white/40 transparent rounded-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 h-[65px] sm:h-[70px] lg:h-[75px] max-w-screen-2xl mx-auto">

              {/* LOGO */}
              <NavLink
                to="/"
                className="flex-shrink-0 text-black duration-200"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/602/602175.png"
                  alt="Logo"
                  className="object-contain w-10 h-10"
                />
              </NavLink>

              {/* DESKTOP MENU */}
              <div className="hidden lg:flex items-center gap-6 text-[16px] font-medium tracking-wide">

                <div className="py-1 transition hover:text-[#0F766E]">
                  <NavLink
                    to="/"
                    className="flex-shrink-0 text-black duration-200"
                  >
                    Home
                  </NavLink>
                </div>

                <div className="py-1 transition hover:text-[#0F766E]">
                  <NavLink to="/property">
                    Properties
                  </NavLink>
                </div>

                <div className="py-1 transition hover:text-[#0F766E]">
                  <span
                    onClick={onDashboard}
                    className="cursor-pointer hover:text-[#0F766E]"
                  >
                    {isLoggedIn && role === "broker"
                      ? "Dashboard"
                      : "Portfolio"}
                  </span>
                </div>

                <div className="py-1 transition hover:text-[#0F766E]">
                  <NavLink to="/about">
                    About
                  </NavLink>
                </div>

                <div className="py-1 transition hover:text-[#0F766E]">
                  <NavLink to="/contact">
                    Contact
                  </NavLink>
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-2 sm:gap-3">

                {/* SIGNUP */}
                {!isLoggedIn && (
                  <NavLink
                    to="/signup"
                    className="hidden sm:block px-4 py-2 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-lg cursor-pointer transition"
                  >
                    Get Started
                  </NavLink>
                )}

                {/* LOGIN */}
                {!isLoggedIn && (
                  <NavLink
                    to="/login"
                    className="hidden sm:block px-4 py-2 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-lg cursor-pointer transition"
                  >
                    Login
                  </NavLink>
                )}

                {/* PROFILE */}
                <div className="hidden lg:block">
                  <div className="flex justify-center items-center gap-3">

                    {isLoggedIn && (
                      <>
                        <CgProfile className="w-7 h-7" />

                        <ProfileDropdown
                          onLogoutClick={() =>
                            setShowLogoutConfirm(true)
                          }
                          watchList={watchlist}
                        />
                      </>
                    )}

                  </div>
                </div>

                {/* MOBILE MENU BUTTON */}
                {!mobileMenuOpen && (
                  <button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                    <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                    <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                  </button>
                )}

                {mobileMenuOpen && (
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <RxCross1 className="text-2xl block lg:hidden" />
                  </button>
                )}

              </div>
            </div>

            {/* ================= MOBILE MENU ================= */}
            <div
              className={[
                "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-b-2xl",
                mobileMenuOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0",
              ].join(" ")}
            >
              <div className="flex flex-col px-6 py-4 gap-4 text-[15px] font-medium border-t border-gray-100">

                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 hover:text-[#0F766E] transition"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#0F766E] transition"
                >
                  Property
                </NavLink>

                {isLoggedIn && role === "broker" ? (
                  <NavLink
                    to="/broker-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-[#0F766E] transition"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/portfolio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-[#0F766E] transition"
                  >
                    Portfolio
                  </NavLink>
                )}

                <NavLink
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 hover:text-[#0F766E] transition"
                >
                  About
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#0F766E] transition"
                >
                  Contact
                </NavLink>

                {/* MOBILE ACTION BUTTONS */}
                <div className="flex flex-col items-start gap-3 mb-5">

                  {isLoggedIn && (
                    <button
                      className="text-white bg-[#0F766E] hover:bg-[#0d645e] px-3 py-2 rounded-lg"
                      onClick={onDashboard}
                    >
                      Dashboard
                    </button>
                  )}

                  {/* WATCHLIST WITH COUNT */}
                  {role !== "broker" && (
                    <button
                      onClick={handleWatchlistNavigation}
                      className="text-white bg-[#0F766E] hover:bg-[#0d645e] px-3 py-2 rounded-lg flex items-center gap-2"
                    >
                      Watchlist

                      <span className="min-w-6 h-6 px-2 bg-emerald-400 text-teal-950 rounded-full flex items-center justify-center text-xs font-bold">
                        {Array.isArray(watchlist)
                          ? watchlist.length
                          : 0}
                      </span>
                    </button>
                  )}

                  {isLoggedIn && (
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
                      onClick={() =>
                        setShowLogoutConfirm(true)
                      }
                    >
                      Logout
                    </button>
                  )}

                </div>

              </div>

              {/* MOBILE LOGIN/SIGNUP */}
              <div className="flex justify-center gap-3 pb-5">

                {!isLoggedIn && (
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    to="/signup"
                    className="sm:hidden w-40 text-center block px-4 py-2 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-lg cursor-pointer"
                  >
                    Get Started
                  </NavLink>
                )}

                {!isLoggedIn && (
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    to="/login"
                    className="sm:hidden w-40 text-center block px-4 py-2 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-lg cursor-pointer"
                  >
                    Login
                  </NavLink>
                )}

              </div>
            </div>

          </nav>
        </div>
      </div>

      {/* ================= AUTH POPUP ================= */}
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center">

            <h3 className="text-xl font-semibold mb-2">
              Unlock Your Portfolio
            </h3>

            <p className="text-gray-500 text-sm mb-5">
              Sign up as an investor to track your investments,
              view portfolio performance, and manage your assets.
            </p>

            <div className="flex gap-3 justify-center">

              <button
                onClick={() => {
                  setShowAuthPopup(false);
                  navigate("/signup");
                }}
                className="px-4 py-2 bg-[#0F766E] text-white rounded-lg"
              >
                Signup
              </button>

              <button
                onClick={() => {
                  setShowAuthPopup(false);
                  navigate("/login");
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Login
              </button>

            </div>

            <button
              onClick={() => setShowAuthPopup(false)}
              className="mt-4 text-xs text-gray-400"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ================= LOGOUT CONFIRM ================= */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">

            <h3 className="text-lg font-semibold mb-2">
              Sign Out
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Logout
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;