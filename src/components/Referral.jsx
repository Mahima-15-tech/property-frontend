


import { useState } from "react";
import { FiTag, FiInfo } from "react-icons/fi";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";



export default function Referral({setPage}) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (code.trim()) setApplied(true);

    if (code.length === 6 ) {

      const obj = {
        referralCode: code,
      }
    //   BRK1234
      try {
        const res = await axios.post(
          `${BASE_URL}/api/auth/apply-referral`,
          obj, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('res in refer', res.data, res.data.message )
 
      } catch (error) {
        console.log(error);
        // toast.error(error.response?.data?.message || "Error");
      }

    } else {
      
    }
  };

  return (
    <div
      className=" flex flex-col"
      style={{ background: "linear-gradient(150deg, #eef4f4 0%, #f0f5f5 40%, #e8f0f0 100%)" }}
    >
   

      <div className="flex-1 flex flex-col items-center justify-start px-4  pt-8 ">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div
            className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm px-6 sm:px-8 md:px-10 py-8 sm:py-10 mb-4 sm:mb-5"
            style={{ borderTop: "3px solid #1a5c47" }}
          >
            <div className="flex justify-center mb-5 sm:mb-6">
              <div className="bg-[#e8f0ec] p-3.5 sm:p-4 rounded-2xl">
                <FiTag className="text-[#1a5c47] text-2xl sm:text-3xl" />
              </div>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-[#0f2820] text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                Have a Referral Code?
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mb-1">
                Enter your broker code to unlock referral benefits
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                This step is optional
              </p>
            </div>

          
          <div> 

       <form onSubmit={handleSubmit}> 
            <div className="mb-5 sm:mb-6">
              <label className="block text-[#0f2820] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-2">
                Referral Code
              </label>
              <input
                type="text"
                placeholder="Enter code (e.g. BROKER123)"
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setApplied(false); }}
                className="w-full bg-[#f4f6f8] rounded-xl border border-gray-200 px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#1a5c47]/30 focus:border-[#1a5c47] transition-all"
              />
              {applied && (
                <p className="text-[#1a5c47] text-xs font-medium mt-2">
                  ✓ Referral code applied successfully!
                </p>
              )}
            </div>

             {/* <button
              onClick={handleApply}
              className="w-full bg-[#1a5c47] hover:bg-[#155240] active:bg-[#0f3d2e] text-white font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base tracking-wide transition-colors mb-4 sm:mb-5"
            >
              Apply Code
            </button> */}
          <button className="w-full text-white bg-[#0F766E] hover:bg-[#0F766E] font-semibold py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base   mb-4 sm:mb-5">
            Continue
          </button>
          
            </form> 


             <button onClick={() => {
                setPage(0)
            }} className="w-full text-gray-600 text-sm sm:text-base font-medium hover:text-gray-800 transition-colors py-1">
              Skip for now
            </button>
          </div>
          </div>
        </div>
      </div>

    </div>
  );
}