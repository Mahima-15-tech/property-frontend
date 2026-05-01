import React, { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { FaChartBar, FaDollarSign, FaStar, FaTh } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import VerifyMobile from "../components/VerifyMobile";

const features = [
  { icon: FaChartBar, title: "Manage property leads", desc: "Advanced CRM tools for seamless conversion." },
  { icon: FaDollarSign, title: "Track commissions", desc: "Instant visibility into your earnings and payouts." },
  { icon: FaStar, title: "Access premium listings", desc: "Curated high-yield fractional property portfolios." },
  { icon: FaTh, title: "Real-time sales dashboard", desc: "Live data analytics to drive your business growth." },
];

export default function BrokerLogin() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("loginType", "broker");
  }, []);

  const navigate = useNavigate();

  //  SEND OTP
  const handleSendOtp = async () => {
    try {
      setError("");
  
      if (!/^[6-9]\d{9}$/.test(mobile)) {
        return setError("Enter valid mobile number");
      }
  
      const res = await axios.post("/api/auth/send-otp", {
        phone: mobile,
        role: "broker",
      });
  
      console.log("OTP SENT RESPONSE:", res.data);
  
      setStep(2); // ✅ only on success
  
    } catch (err) {
      console.log("ERROR:", err.response?.data);
  
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setError("");
  
      const res = await axios.post("/api/auth/verify-otp", {
        phone: mobile,
        otp: finalOtp,
      });
  
      // 🔥 SAVE TOKEN
      localStorage.setItem("token", res.data.token);
  
      setSuccess("Login successful");
  
      // 🔥 ROLE BASED REDIRECT
      if (res.data.role === "broker") {
        navigate("/broker-dashboard");
      } else {
        navigate("/portfolio");
      }
  
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full bg-gray-50 flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-xl">

        {/* LEFT SIDE SAME */}
        <div className="bg-[#1a5c4f] text-white flex flex-col justify-between p-8 lg:p-12 w-full lg:w-[48%]">
          <div>
            <p className="text-sm font-semibold tracking-wide mb-6 lg:mb-10">Sovereign Partners</p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6">
              Architecting the future of real estate capital.
            </h1>

            <p className="text-sm text-green-100 mb-8 lg:mb-12 max-w-sm">
              Join our elite network of broker partners and access the most exclusive fractional assets in the market.
            </p>

            <div className="space-y-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="mt-0.5 text-green-300 text-lg">
                    <Icon />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-green-200 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-10">
            <div className="flex -space-x-2">
              {["bg-amber-400", "bg-rose-400", "bg-sky-400"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#1a5c4f] ${c}`} />
              ))}
            </div>
            <p className="text-xs text-green-100">
              Joined by 2,400+ top brokers this month
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gray-50 flex items-center justify-center w-full lg:w-[52%] p-6 sm:p-8 lg:p-10">
  <div className="w-full max-w-md">

  {step === 1 && (
  <div
    className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-10"
    style={{
      background:
        "linear-gradient(150deg, #f7faf9 0%, #f0f5f3 50%, #edf3f1 100%)",
    }}
  >
    {/* ICON */}
    <div className="flex justify-center mb-6">
      <div className="bg-[#e8f0ec] p-4 rounded-2xl">
        <FiLock className="text-[#1a5c47] text-xl" />
      </div>
    </div>

    {/* HEADING */}
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-[#0f2820] mb-2">
        Login with Mobile
      </h2>
      <p className="text-gray-500 text-sm">
        Enter your mobile number to receive OTP
      </p>
    </div>

    {/* INPUT */}
    <div className="mb-5">
      <label className="text-xs font-semibold text-gray-400 uppercase">
        Mobile Number
      </label>

      <div className="mt-2 flex items-center bg-[#f0f2f8] rounded-2xl px-4 py-3 border-2 border-transparent focus-within:border-[#1a5c47] focus-within:bg-white transition-all">
        
        <span className="text-gray-500 text-sm mr-2">+91</span>

        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="9876543210"
          className="w-full bg-transparent outline-none text-sm font-semibold text-[#0f2820] placeholder-gray-400"
        />
      </div>
    </div>

    {/* ERROR */}
    {error && (
      <p className="text-red-500 text-sm mb-3">{error}</p>
    )}

    {/* BUTTON */}
    <button
      onClick={handleSendOtp}
      className="w-full bg-[#1a5c47] hover:bg-[#155240] active:bg-[#0f3d2e]
      text-white font-bold py-3.5 rounded-2xl text-sm tracking-wide transition-all shadow-md hover:shadow-lg"
    >
      Continue
    </button>

    {/* FOOTER */}

    <div className="flex items-center justify-center gap-2 mt-6">
      <FiLock className="text-gray-400 text-xs" />
      <span className="text-[10px] text-gray-400 tracking-widest uppercase font-medium">
        Secure OTP Login
      </span>
    </div>
  </div>
)}

    {/* 🔥 STEP 2 → USE YOUR OTP UI */}
    {step === 2 && (
  <VerifyMobile mobile={mobile} setPage={setStep} />
)}

  </div>
</div>
      </div>
    </div>
  );
}