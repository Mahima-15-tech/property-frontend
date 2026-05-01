const BASE_URL = import.meta.env.VITE_BASE_URL;

// console.log('base', BASE_URL)

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSmartphone, FiCheckCircle, FiUsers, FiBarChart2, FiLock, FiCircle } from "react-icons/fi";
import axios from "../utils/axios";

import VerifyMobile from "../components/VerifyMobile";
import toast from "react-hot-toast";


const Login = () => {
    const [mobile, setMobile] = useState("");
    const [page, setPage ] = useState(0);
     const [mobileErr, setMobileErr] = useState("");

     useEffect(() => {
      localStorage.setItem("loginType", "investor");
    }, []);

    const features = [
      { icon: <FiSmartphone />, label: "Secure OTP Login" },
      { icon: <FiCheckCircle />, label: "Verified Property Listings" },
      { icon: <FiUsers />, label: "Digital KYC Only at Investment" },
      { icon: <FiBarChart2 />, label: "Portfolio Tracking" },
    ];

    const submitHandler = async (e) => {
      e.preventDefault();

      if (!mobile.trim()) {
        setMobileErr("Mobile No. is required ❌");
        return;
      } 
 
      const obj = {
        phone: mobile,
        // otp: "123456",
      };

      console.log('boj', obj )
      try {
        const res = await axios.post("/api/auth/send-otp", { 
          phone: mobile,
          role: "investor"
        });
      
        if (!res?.data) return;
      
        console.log("OTP SENT:", res.data);
      
        setPage(1); // ✅ ONLY AFTER SUCCESS
      
      } catch (error) {
        console.log("OTP ERROR:", error.response?.data);
      
        toast.error(error.response?.data?.message || "Error");
      
        return; // ❌ STOP FLOW
      }
    }

  return (

    <div> 

      <div className="relative top-0 flex flex-col  ">
 
      <div className="flex flex-col lg:flex-row  ">
        <div
          className="relative w-full lg:w-[58%] min-h-[480px] sm:min-h-[300px]  flex flex-col justify-center py-12 sm:py-16 px-6 sm:px-10 lg:px-14"
          style={{
            background: "linear-gradient(160deg, #1d6b52 0%, #1a5c47 30%, #155240 60%, #fff 130%)",
          }}
        >
          <div className="relative z-10  ">
            <h1 className="text-white text-3xl sm:text-5xl   font-normal leading-tight mb-5 sm:mb-6">
              Invest in Real Estate with Confidence
            </h1>
            <p className="text-white/75 text-sm sm:text-base lg:text-lg mb-10 sm:mb-12 max-w-lg leading-relaxed">
              Login to explore properties, track your portfolio, and invest in shares with complete transparency.
            </p>
            <ul className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="bg-white/15 text-white p-2 sm:p-2.5 rounded-lg text-base sm:text-lg flex-shrink-0">
                    {f.icon}
                  </span>
                  <span className="text-white font-semibold text-sm sm:text-base">{f.label}</span>
                </li>
              ))}
            </ul>
            <div className="inline-flex items-center gap-2.5 bg-[#ca8a04]/90 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full">
              <FiCircle className="text-white text-xs" />
              1 Share = 1% Ownership
            </div>
          </div>
        </div>
 
        <div className="w-full lg:w-[42%] bg-gradient-to-br from-[#f8faf9] to-[#eef2f0] flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-14 xl:px-20 py-5 sm:py-16 ">
          <div className="w-full max-w-md mx-auto lg:mx-0">
           
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
             
            <div>
              <form onSubmit={submitHandler} className=" "> 
             <div> 
             <h2 className="text-3xl font-bold text-gray-900 mb-2">
  Welcome Back 👋
</h2>
<p className="text-gray-500 text-sm mb-8">
  Enter your mobile number to continue
</p>
 
<div className="mb-6">
  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">
    Mobile Number
  </label>

  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#1a5c47]/20 focus-within:border-[#1a5c47] transition-all">

    <span className="text-gray-500 text-sm mr-2">+91</span>

    <input
      type="tel"
      placeholder="Enter your number"
      value={mobile}
      onChange={(e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        setMobile(value);
        setMobileErr("");
      }}
      maxLength={10}
      className="flex-1 bg-transparent outline-none text-sm font-semibold text-gray-800 placeholder-gray-400"
    />
  </div>

  {mobileErr && (
    <p className="text-red-500 text-xs mt-2">{mobileErr}</p>
  )}

  <p className="flex items-center gap-1 mt-2 text-xs text-gray-400">
    <FiLock /> OTP will be sent for secure login
  </p>
</div>
 
<button className="w-full bg-gradient-to-r from-[#1a5c47] to-[#0f3d2e] 
hover:scale-[1.02] active:scale-95
text-white font-semibold py-3.5 rounded-2xl text-sm tracking-wide 
transition-all shadow-md hover:shadow-lg">
  Continue
</button>
 
<div className="mt-6 text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <NavLink to="/signup" className=" text-[#1a5c47] font-semibold hover:opacity-70 transition-opacity">
                  Sign Up
                </NavLink>
                 
                </p>
                
              </div>
            </div>
 
            <p className="text-xs text-center text-gray-400 mt-6">
  Your number is safe & securely verified
</p>
 
          

            </form>

            </div>

            </div>
          </div>
        </div>

      </div>
 
       </div>
 
     <div>
      {page == 1 && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      
         <div className="bg-white rounded-2xl p-2 w-[90%] max-w-lg   relative ">
           
           <button

             onClick={() => setPage(0)}
             className="absolute top-3 right-5 text-gray-500 text-xl"
           >
             ✕
           </button>
          <VerifyMobile  mobile={mobile} setPage={setPage}  />

          </div>
          </div>
      )}
     </div>

  

    </div>
  )
}

export default Login



