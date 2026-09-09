import OTPVerify from "../components/OTPVerify";
import { NavLink, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axios";

import React, { useState, useEffect } from "react";
import {
  FiShield,
  FiSmartphone,
  FiAward,
  FiTrendingUp,
  FiInfo,
} from "react-icons/fi";

import Referral from "../components/Referral";

const Signup = () => {
  const [page, setPage] = useState(0);

  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref") || "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [fullNameErr, setFullNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [agreeErr, setAgreeErr] = useState("");

  // Always investor for this page
  useEffect(() => {
    localStorage.setItem("loginType", "investor");
  }, []);

  const features = [
    {
      icon: <FiShield />,
      label: "No KYC during signup",
    },
    {
      icon: <FiSmartphone />,
      label: "Secure Email OTP Login",
    },
    {
      icon: <FiAward />,
      label: "Verified Investment Platform",
    },
    {
      icon: <FiTrendingUp />,
      label: "Easy Portfolio Tracking",
    },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    setFullNameErr("");
    setEmailErr("");
    setAgreeErr("");

    // Full Name Validation
    if (!fullName.trim() || fullName.trim().length < 3) {
      setFullNameErr("Full name is required ❌");
      return;
    }

    // Email Validation
    if (!email.trim()) {
      setEmailErr("Email is required ❌");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setEmailErr("Enter a valid email address ❌");
      return;
    }

    // Terms Validation
    if (!agreed) {
      setAgreeErr("Please accept Terms & Conditions ❌");
      return;
    }

    try {
      const payload = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        role: "investor",
        mode: "signup",
      };

      // Referral code only for investor
      if (referralCode.trim()) {
        payload.referralCode = referralCode.trim().toUpperCase();
      }

      const res = await axios.post("/api/auth/send-otp", payload);

      console.log("OTP SENT:", res.data);

      localStorage.setItem("loginType", "investor");

      toast.success("OTP sent successfully!");

      setPage(1);
    } catch (error) {
      console.error("Signup Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="relative top-0 flex flex-col">
      <div>
        <div className="flex flex-col lg:flex-row min-h-screen">

          {/* ================= LEFT SIDE ================= */}

          <div
            className="relative w-full lg:w-[58%] min-h-[420px] sm:min-h-[300px] flex flex-col justify-center py-10 sm:py-10 px-6 sm:px-10 lg:px-14 overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, #1a3d2e 0%, #0F766E 40%, #0F766E 70%, #0F766E 100%)",
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 opacity-20 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=60')",
                mixBlendMode: "luminosity",
              }}
            />

            <div className="relative z-10 mt-0">

              <div className="inline-block mb-6 sm:mb-8">
                <span className="bg-[#D4A017] text-white text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">
                  1 Share = 1% Ownership
                </span>
              </div>

              <h2 className="text-white text-3xl sm:text-5xl font-bold leading-tight mb-8 sm:mb-12">
                Start Your Investment Journey
              </h2>

              <ul className="space-y-4 sm:space-y-5">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <span className="bg-white/10 text-white p-2 sm:p-2.5 rounded-lg text-base sm:text-lg flex-shrink-0">
                      {feature.icon}
                    </span>

                    <span className="text-white/90 text-sm sm:text-base font-medium">
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="w-full lg:w-[52%] bg-white flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-14 xl:px-20 py-8 sm:py-9">

            <form onSubmit={submitHandler}>
              <div className="w-full max-w-md mx-auto lg:mx-0">

                {/* Heading */}

                <h2 className="text-[#1a1a1a] text-3xl sm:text-4xl font-bold mb-2">
                  Create Your Account
                </h2>

                <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-10">
                  Get started in just a few steps
                </p>

                {/* ================= REFERRAL ================= */}

                {referralCode && (
                  <div className="mb-6 bg-[#f0f7f4] border border-[#d1fae5] rounded-xl px-4 py-3">
                    <p className="text-sm text-[#14532d] font-semibold">
                      Referral Applied ✓
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      You were referred by an existing investor.
                    </p>
                  </div>
                )}

                {/* ================= FULL NAME ================= */}

                <div className="mb-6">
                  <label className="block text-[#1a1a1a] text-sm font-semibold mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setFullNameErr("");
                    }}
                    className="w-full bg-[#f0f4f8] rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#14532d]/30 transition-all"
                  />

                  {fullNameErr && (
                    <p className="text-red-500 text-xs mt-1">
                      {fullNameErr}
                    </p>
                  )}
                </div>

                {/* ================= EMAIL ================= */}

                <div className="mb-4">
                  <label className="block text-[#1a1a1a] text-sm font-semibold mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailErr("");
                    }}
                    className="w-full bg-[#f0f4f8] rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#14532d]/30 transition-all"
                  />

                  {emailErr && (
                    <p className="text-red-500 text-xs mt-1">
                      {emailErr}
                    </p>
                  )}

                  <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                    <FiInfo className="flex-shrink-0 text-gray-400" />
                    We'll send an OTP to verify your email
                  </p>
                </div>

                {/* ================= IMPORTANT INFO ================= */}

                <div className="bg-[#f0f7f4] border border-[#d1fae5] rounded-xl px-4 py-3.5 flex items-start gap-3 mb-6">

                  <FiShield className="text-[#14532d] text-lg flex-shrink-0 mt-0.5" />

                  <p className="text-xs sm:text-sm text-gray-700">
                    <span className="font-semibold text-[#1a1a1a]">
                      Important Info:{" "}
                    </span>

                    KYC will be required only when you invest.
                  </p>
                </div>

                {/* ================= TERMS ================= */}

                <label className="flex flex-col items-start cursor-pointer mb-7">

                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        setAgreeErr("");
                      }}
                      className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#14532d]"
                    />

                    <span className="sm:text-sm text-xs text-gray-600 pl-2">
                      I agree to{" "}

                      <a
                        href="#"
                        className="text-[#1a1a1a] text-xs sm:text-sm font-semibold underline hover:opacity-70"
                      >
                        Terms & Conditions
                      </a>{" "}

                      and{" "}

                      <a
                        href="#"
                        className="text-[#1a1a1a] text-xs sm:text-sm font-semibold underline hover:opacity-70"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </div>

                  {agreeErr && (
                    <p className="text-red-500 text-xs mt-1">
                      {agreeErr}
                    </p>
                  )}
                </label>

                {/* ================= SUBMIT ================= */}

                <button
                  type="submit"
                  disabled={!agreed}
                  className={`${
                    agreed
                      ? "bg-[#0F766E] hover:bg-[#0b625c] text-white"
                      : "bg-[#1daea2] text-white opacity-60 cursor-not-allowed"
                  } w-full font-semibold py-4 rounded-2xl text-sm sm:text-base transition-colors mb-6`}
                >
                  Send OTP
                </button>

                {/* ================= LOGIN / BROKER ================= */}

                <div className="flex flex-col items-center justify-center text-center space-y-3">

                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}

                    <NavLink
                      to="/login"
                      className="text-[#1a1a1a] font-semibold underline hover:opacity-70"
                    >
                      Login
                    </NavLink>
                  </p>

                  <p className="text-sm text-gray-600">
                    Are you a Broker?{" "}

                    <NavLink
                      to="/broker-signup"
                      className="text-[#0F766E] font-semibold underline hover:opacity-70"
                    >
                      Sign up as Broker
                    </NavLink>
                  </p>

                </div>

              </div>
            </form>
          </div>
        </div>

        {/* ================= OTP MODAL ================= */}

        {page === 1 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg relative">

              <button
                type="button"
                onClick={() => setPage(0)}
                className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-800"
              >
                ✕
              </button>

              <OTPVerify
                email={email}
                setPage={setPage}
                mode="signup"
                role="investor"
              />

            </div>
          </div>
        )}

      </div>

      {/* ================= REFERRAL MODAL ================= */}

      {page === 2 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg relative">

            <button
              type="button"
              onClick={() => setPage(0)}
              className="absolute top-7 right-8 text-gray-500 text-xl"
            >
              ✕
            </button>

            <Referral setPage={setPage} />

          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;