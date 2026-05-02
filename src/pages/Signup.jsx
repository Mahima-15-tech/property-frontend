import OTPVerify from "../components/OTPVerify";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from "../utils/axios";

import React, { useState, useEffect, useRef } from "react";
import {
  FiShield,
  FiSmartphone,
  FiAward,
  FiTrendingUp,
  FiLock,
  FiInfo,
} from "react-icons/fi";
import Referral from "../components/Referral";

const Signup = () => {
  const [page, setPage] = useState(0);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [fullNameErr, setFullNameErr] = useState("");
  const [mobileErr, setMobileErr] = useState("");
  const [agreeErr, setAgreeErr] = useState("");

  useEffect(() => {
    localStorage.setItem("loginType", "investor");
  }, []);

  // console.log('afrre', agreed)
  const features = [
    { icon: <FiShield />, label: "No KYC during signup" },
    { icon: <FiSmartphone />, label: "Secure OTP Login" },
    { icon: <FiAward />, label: "Verified Investment Platform" },
    { icon: <FiTrendingUp />, label: "Easy Portfolio Tracking" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 3) {
      setFullNameErr("Full name is required ❌");
      return;
    }

    if (!agreed) {
      setAgreeErr("Please fill the checkbox ❌");
      return;
    }

    if (!mobile.trim()) {
      setMobileErr("Mobile No. is required ❌");
      return;
    }

    // console.log('signup')
    const obj = {
      name: fullName,
      phone: mobile,
      agree: agreed,
    };

    try {
      const res = await axios.post("/api/auth/send-otp", {
        name: fullName,
        phone: mobile,
        role: "investor"
      });

      setPage(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="relative top-0 flex flex-col">
      <div>
        <div className="flex flex-col lg:flex-row min-h-screen  ">
          <div
            className="relative w-full lg:w-[58%] min-h-[420px] sm:min-h-[300px]   flex flex-col justify-center py-10 sm:py-10 px-6 sm:px-10 lg:px-14"
            style={{
              background:
                "linear-gradient(160deg, #1a3d2e 0%, #0F766E 40%, #0F766E 70%, #0F766E 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20 bg-center bg-cover "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=60')",
                mixBlendMode: "luminosity",
              }}
            />
            <div className="relative z-10 mt-0 ">
              <div className="inline-block mb-6 sm:mb-8">
                <span className="bg-[#D4A017] text-white text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">
                  1 Share = 1% Ownership
                </span>
              </div>
              <h2 className="text-white text-3xl sm:text-5xl    font-bold leading-tight mb-8 sm:mb-12">
                Start Your Investment Journey
              </h2>
              <ul className="space-y-4 sm:space-y-5">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 sm:gap-4">
                    <span className="bg-white/10 text-white p-2 sm:p-2.5 rounded-lg text-base sm:text-lg flex-shrink-0">
                      {f.icon}
                    </span>
                    <span className="text-white/90 text-sm sm:text-base font-medium">
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-[52%] bg-white  flex flex-col  justify-center  px-5 sm:px-10 md:px-16 lg:px-14 xl:px-20 py-5 sm:py-9 ">
            <form onSubmit={submitHandler} className="">
              <div className="w-full max-w-md mx-auto lg:mx-0   ">
                <h2 className="text-[#1a1a1a] text-3xl sm:text-4xl font-bold mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-10">
                  Get started in just a few steps
                </p>

                <div className="mb-6">
                  <label className="block text-[#3d1818] text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    required
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setFullNameErr("");
                    }}
                    className="w-full bg-[#f0f4f8] rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#14532d]/30 transition-all"
                  />
                  {fullNameErr && (
                    <p className="text-red-500 text-xs mt-1">{fullNameErr}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-[#1a1a1a] text-sm font-semibold mb-2">
                    Mobile Number
                  </label>
                  <div className="gap-2 flex">
                    <div className="bg-[#f0f4f8] w-14 rounded-xl px-3 sm:px-4 py-3.5 text-sm font-medium text-gray-700 flex items-center flex-shrink-0">
                      +91
                    </div>
                    <div className="w-full">
                      <input
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        maxLength={10}
                        minLength={10}
                        onChange={(e) => {
                          const value = e.target.value;
                          // sirf numbers allow
                          if (!/^\d*$/.test(value)) return;
                          setMobile(value);
                          // typing pe error hata
                          setMobileErr("");
                        }}
                        className=" w-full    bg-[#f0f4f8] rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#14532d]/30 transition-all min-w-0"
                        required
                      />
                    </div>
                  </div>
                  <div className=" ">
                    {mobileErr && (
                      <p className="text-red-500 text-xs mt-1">{mobileErr}</p>
                    )}
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                    <FiInfo className="flex-shrink-0 text-gray-400" />
                    We'll send an OTP to verify your number
                  </p>
                </div>

                <div className="bg-[#f0f7f4] border border-[#d1fae5] rounded-xl px-4 py-3.5 flex items-start gap-3 mb-6">
                  <FiShield className="text-[#14532d] text-lg flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-700">
                    <span className="font-semibold text-[#1a1a1a]">
                      Important Info:{" "}
                    </span>
                    KYC will be required only when you invest.
                  </p>
                </div>

                <label className="flex flex-col items-start cursor-pointer   mb-7  ">
                  <div className=" flex ">
                    <div>
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#14532d]"
                        required
                      />
                    </div>

                    <div className="flex  ">
                      <span className="sm:text-sm text-xs text-gray-600 pl-2">
                        I agree to{" "}
                        <a
                          href="#"
                          className="text-[#1a1a1a]   text-xs sm:text-sm font-semibold underline hover:opacity-70"
                        >
                          Terms &amp; Conditions
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
                  </div>

                  <div className="flex   ">
                    {agreeErr && (
                      <p className="text-red-500 text-xs mt-1">{agreeErr}</p>
                    )}
                  </div>
                </label>

                <button
                  disabled={!agreed}
                  className={`${
                    agreed
                      ? " bg-[#0F766E] hover:bg-[#0F766E] text-white"
                      : "bg-[#1daea2] text-white "
                  } w-full     
           font-semibold py-4 rounded-2xl text-sm sm:text-base transition-colors mb-6`}
                >
                  Send OTP
                </button>

                <div className="flex  items-center justify-center text-center space-y-3">
                  {/* <span className="hover:cursor-pointer" onClick={() => setPage(2)}>
                    Apply Referral
                </span> */}
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      className="text-[#1a1a1a] font-semibold underline hover:opacity-70"
                    >
                      Login
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {page == 1 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg  max-h-lg relative">
              <button
                onClick={() => setPage(0)}
                className="absolute top-1 right-2 text-gray-500 text-xl"
              >
                ✕
              </button>

              <OTPVerify mobile={mobile} setPage={setPage} />
            </div>
          </div>
        )}
      </div>

      <div>
        {page == 2 && (
          <div className="fixed  inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg   relative">
              <button
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
    </div>
  );
};

export default Signup;

