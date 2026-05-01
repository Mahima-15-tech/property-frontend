
import { useState, useEffect, useRef } from "react";
import { FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from 'axios';

export default function OTPVerify({mobile, setPage}) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState("")
  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = [...otp];
    paste.split("").forEach((char, i) => { updated[i] = char; });
    setOtp(updated);
    const nextEmpty = updated.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleResend = async (e) => {
    e.preventDefault()
    setOtpErr("")
    if (!canResend ) return;
  
    setOtp(["", "", "", "", "", ""]);
  
    const obj = {
      name: "User name",
      phone: mobile,
      agree: true,
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/resend-otp`,  
        obj 
      );
      // console.log("OTP resent", res);
      setTimer(10);
      setCanResend(false);
      inputRefs.current[0]?.focus();
  
    } catch (err) {
      console.log("Error resend", err);
    }
  };

  const formatTimer = (t) => `00:${String(t).padStart(2, "0")}`;

  const submitHandler = async(e) => {
    e.preventDefault()
    const finalOtp = otp.join("");
    // console.log("otp:", finalOtp);
  
    // console.log("mobile numbe", mobile)

    const obj = {
       phone: mobile,
       otp: "123456"
    }

    if (finalOtp.length === 6 && finalOtp === "123456") {
  
      try {
        const res = await axios.post(
          `${BASE_URL}/api/auth/verify-otp`,
          obj
        );

        // console.log(" res in otp verify",res);
        let token = res.data.token;
        localStorage.setItem("token", token);

        setPage(0);
        navigate("/property");

      } catch (error) {
        // console.log(error);
        toast.error(error.res?.data?.message || "Error");
      }
    }else {
      setOtpErr("Invalid OTP. Please try again")
    }
  
  };

  const maskMobile = (num) => {
    if (!num) return "";
  
    const last4 = num.slice(-4);
    const masked = "*".repeat(num.length - 4);
  
    return masked + last4;
  };

  return (
    <div className=" flex flex-col rounded-2xl" style={{ background: "linear-gradient(160deg, #eef0f5 0%, #e8eaf2 50%, #f0eef5 100%)" }}>
     

      <div className="  flex-1 flex flex-col items-center justify-center px-2 sm:px-6 py-6 sm:py-14">
        <div className="text-center mb-8 sm:mb-10 ">
          <h1 className="text-[#1a2e2a] text-xl whitespace-nowrap  sm:text-3xl font-bold mb-3 sm:mb-4">
            Verify Your Number
          </h1>
          <p className="text-gray-500 text-xs sm:text-base">
            We've sent a 6-digit code to{" "}
            <span className="text-[#1a5c47] font-semibold">+91 {maskMobile(mobile)}</span>
          </p>
        </div>

        <div className=" w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 px-5 sm:px-8 md:px-10 py-7 sm:py-9">
          
          <div className="">
            <form onSubmit={submitHandler}>
           <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-3  " onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                  placeholder="•"
                className={`${
                  otpErr
                    ? 'border-2 border-red-400 text-red-500 focus:border-red-500'
                    : 'border-2 border-transparent focus:border-[#1a5c47] text-[#1a2e2a]'
                }  w-full aspect-square max-w-[52px] 
                sm:max-w-[56px] md:max-w-[60px] text-center text-lg sm:text-xl font-bold text-[#1a2e2a] bg-[#eef0f7] rounded-lg
                sm:rounded-2xl focus:bg-white outline-none transition-all`}
              />
            ))}
            
          </div> {
              otpErr 

              && (
                <p className="text-red-500 mb-4">{otpErr}</p>
              )
            }
           <button className="w-full bg-[#1a5c47] hover:bg-[#155240] active:bg-[#0f3d2e] text-white 
           font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs 
           sm:text-sm tracking-wide transition-colors mb-6 sm:mb-7  ">
            Verify & Continue
          </button>
           </form>
            

           </div>
      
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          
            <span className="text-gray-300 text-xs">•</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResend}
                className={`text-xs sm:text-sm font-medium transition-colors ${canResend ? "text-[#1a5c47] hover:opacity-70 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
              >
                Resend OTP
              </button>
              {!canResend && (
                <span className="bg-[#f5c842] text-[#7a5a00] text-xs font-bold px-2 py-0.5 rounded-full">
                  {formatTimer(timer)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:pb-3">
            <FiLock className="text-gray-400 text-xs" />
            <span className="text-[10px] sm:text-xs text-gray-400 tracking-widest uppercase font-medium">
              Secure OTP Verification
            </span>
          </div>
        </div>

        
      </div>

      
    </div>
  );
}