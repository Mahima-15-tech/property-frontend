import { useState, useEffect, useRef } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "../utils/axios";

export default function VerifyMobile({
  email,
  setPage,
  role = "investor",
  mode = "login",
}) {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value.slice(-1);

    setOtp(updated);
    setOtpErr("");

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

    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const updated = ["", "", "", "", "", ""];

    paste.split("").forEach((char, i) => {
      updated[i] = char;
    });

    setOtp(updated);
    setOtpErr("");

    const nextEmpty = updated.findIndex((v) => !v);

    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  // RESEND OTP
  const handleResend = async (e) => {
    e.preventDefault();

    if (!canResend) return;

    setOtpErr("");

    try {
      await axios.post("/api/auth/resend-otp", {
        email,
        role,
        mode,
      });

      setOtp(["", "", "", "", "", ""]);

      setTimer(30);
      setCanResend(false);

      inputRefs.current[0]?.focus();

      toast.success("OTP resent successfully");
    } catch (err) {
      console.log("Error resend", err);

      toast.error(
        err.response?.data?.message || "Unable to resend OTP"
      );
    }
  };

  const formatTimer = (t) => {
    return `00:${String(t).padStart(2, "0")}`;
  };

  // VERIFY OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setOtpErr("Enter valid 6-digit OTP");
      return;
    }

    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp: finalOtp,
        role,
        mode,
      });

      // TOKEN SAVE
      localStorage.setItem("token", res.data.token);

      // ROLE SAVE
      localStorage.setItem("role", res.data.role);

      toast.success(res.data.message || "Login successful");

      // POPUP CLOSE
      setPage(0);

      // ROLE BASED REDIRECT
      if (res.data.role === "broker") {
        navigate("/broker-dashboard");
      } else {
        navigate("/portfolio");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  };

  // EMAIL MASK
  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");

    if (!domain) return email;

    if (name.length <= 2) {
      return `${name[0] || ""}***@${domain}`;
    }

    return `${name.slice(0, 2)}***@${domain}`;
  };

  return (
    <div>
      <div
        className="flex flex-col rounded-2xl"
        style={{
          background:
            "linear-gradient(150deg, #eef2ee 0%, #f0f4f0 40%, #e8ede8 100%)",
        }}
      >
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-8 md:px-10">

            <div className="flex justify-center mb-4 sm:mb-7 mt-3">
              <div className="bg-[#e8f0ec] p-3 sm:p-5 rounded-xl">
                <FiMail className="text-[#1a5c47] text-xl sm:text-3xl" />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="text-center mb-2 sm:mb-8">
                <h1 className="text-[#0f2820] text-xl whitespace-nowrap sm:text-3xl font-bold mb-2 sm:mb-3">
                  Verify Your Email
                </h1>

                <p className="text-gray-500 text-xs sm:text-base sm:mb-1">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-semibold text-[#1a5c47]">
                    {maskEmail(email)}
                  </span>
                </p>
              </div>

              {/* OTP INPUT */}
              <div
                className="flex justify-between gap-1.5 sm:gap-2 sm:mb-1"
                onPaste={handlePaste}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(i, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(i, e)
                    }
                    className={`${
                      otpErr
                        ? "border-2 border-red-400 text-red-500 focus:border-red-500"
                        : "border-2 border-transparent focus:border-[#1a5c47] text-[#0f2820]"
                    } 
                    w-full aspect-square max-w-[52px]
                    sm:max-w-[56px] md:max-w-[60px]
                    text-center text-base sm:text-lg font-bold
                    bg-[#f0f2f8] rounded-lg sm:rounded-2xl
                    focus:bg-white outline-none transition-all`}
                    placeholder="•"
                  />
                ))}
              </div>

              {otpErr && (
                <p className="text-red-500 text-xs mt-2">
                  {otpErr}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#1a5c47] hover:bg-[#155240] active:bg-[#0f3d2e]
                text-white font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl
                text-sm sm:text-base tracking-wide transition-colors
                sm:mb-6 mt-5"
              >
                Verify OTP
              </button>

              {/* RESEND */}
              <p className="text-center text-xs mt-2 text-gray-500 mb-0 sm:mb-8">
                Didn't receive the code?{" "}

                <button
                  type="button"
                  onClick={handleResend}
                  className={`font-semibold transition-colors ${
                    canResend
                      ? "text-[#1a5c47] hover:opacity-70 cursor-pointer"
                      : "text-[#1a5c47] cursor-not-allowed opacity-70"
                  }`}
                >
                  {canResend
                    ? "Resend now"
                    : `Resend in ${formatTimer(timer)}`}
                </button>
              </p>

              <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 pb-3">
                <FiLock className="text-gray-400 text-xs" />

                <span className="text-[10px] sm:text-xs text-gray-400 tracking-widest uppercase font-medium">
                  Secure Email Verification
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}