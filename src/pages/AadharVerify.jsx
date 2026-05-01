import { FiInfo, FiUser, FiShield, FiArrowRight } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAadhaar } from "../slices/kycslice";
import axios from "../utils/axios";

const AadharVerify = ({ setActive, edit, setEdit }) => {
  const navigate = useNavigate();
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadharIma, setAadharImg] = useState("");
  const { aadhaarPreview } = useSelector((state) => state.kyc);
  const [aadharFile, setAadharFile] = useState(null);
  const dispatch = useDispatch();

  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!aadhaarNumber || !aadharFile) {
        console.log("Missing data");
        return;
      }
  
      const formData = new FormData();
  
      // 🔥 spaces hatao (important)
      formData.append("aadhaarNumber", aadhaarNumber.replace(/\s/g, ""));
      formData.append("document", aadharFile);
  
      const res = await axios.post("/api/kyc/aadhaar", formData);
  
      console.log("AADHAAR RES:", res.data);
  
      if (res.data?.kyc?.currentStep === 4) {
        setActive("nominee");
      }
  
    } catch (err) {
      console.log("AADHAAR ERROR:", err.response?.data || err.message);
    }
  };

  // Aadhaar handler image uploader
  const handleAadhaarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setAadharFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        setAadhaar({
          aadhaarPreview: reader.result, // ✅ base64
        })
      );
    };
    reader.readAsDataURL(file);
  };
 
  const handleAadhaarNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
  
    // max 12 digits
    value = value.substring(0, 12);
    
    // 4-4-4 format
    const formatted = value
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
     
    setAadhaarNumber(formatted);
    // console.log('aadjar', aadhaarNumber, formatted)
  };

  return (
    <div className="flex items-center justify-center ">
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-6  sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            Aadhaar Verification
          </h1>

          <p className="text-gray-500 text-sm mb-7">
            Verify your identity using Aadhaar to continue KYC process.
          </p>

          <div className="mb-5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
              Aadhaar Number <FiInfo size={14} className="text-gray-400" />
            </label>

            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
             
            <input
                  placeholder="Enter your Aadhaar number"
                  value={aadhaarNumber}
                  onChange={handleAadhaarNumber}
                  type="text"
                  required
                  className="bg-transparent outline-none w-full"
                  maxLength={14} // spaces include ho rahe hain
                />

              <div className="flex items-center gap-1.5">
                <MdOutlineVerified className="text-emerald-600" />
                <span className="sm:text-xs text-[0.5rem] font-bold text-emerald-700 uppercase tracking-wider">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
              Upload Aadhaar <sup className="text-emerald-800">*</sup>
            </label>

            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAadhaarChange}
                  required
                  className="flex-1 sm:px-4 px-0 py-2 text-sm text-gray-700 outline-none bg-gray-50 min-w-0"
                />
              </div>

             
            </div>

            {aadhaarPreview && (
              <img
                src={aadhaarPreview}
                alt="Aadhaar Preview"
                className="mt-2 h-20"
              />
            )}
          </div>

          {/* Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
            <FiShield size={18} className="text-gray-400 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">
                Secure Verification:
              </span>{" "}
              Aadhaar verification is required for KYC. Your data is encrypted
              and secure.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors mb-4"
          >
            {edit === "id" ? "Update Aadhaar" : " Proceed to Next Step"}
           
            <FiArrowRight size={18} />
          </button>

          <button
            type="button"
            className="w-full text-sm font-semibold text-gray-700 hover:text-gray-900 text-center"
          >
            
            Request Manual Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default AadharVerify;
