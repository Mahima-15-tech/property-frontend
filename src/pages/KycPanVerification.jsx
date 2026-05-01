import { useState } from "react";
import { FiHelpCircle, FiBell, FiUser, FiCreditCard, FiFileText, FiCamera, FiHome, FiCheckSquare, FiArrowRight, FiShield, FiCheck, FiInfo } from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";

const STEPS = [
  { icon: <FiUser size={16} />, label: "Basic Info" },
  { icon: <FiCreditCard size={16} />, label: "PAN Verify" },
  { icon: <FiFileText size={16} />, label: "ID Verify" },
  { icon: <FiFileText size={16} />, label: "Documents" },
  { icon: <FiCamera size={16} />, label: "Selfie" },
  { icon: <BsBank2 size={16} />, label: "Bank Details" },
  { icon: <FiCheckSquare size={16} />, label: "Review" },
];
import { useDispatch } from "react-redux";

import { setPan } from "../slices/kycslice";

const PROGRESS_STEPS = [1, 2, 3, 4];


 export default function KycPanVerification({setActive, edit ,setEdit}) {
  const navigate = useNavigate();

  const [panNum, setPanNum] = useState('');
  // const [panImage, setPanImage] = useState(null);
  const [error, setError] = useState("");
  const [panFile, setPanFile] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const {  name, panPreview   } = useSelector((state) => state.kyc);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!panNum || !panFile) {
        setError("All fields required");
        return;
      }
  
      const formData = new FormData();
      formData.append("panNumber", panNum);
      formData.append("document", panFile);
  
      await axios.post("/api/kyc/pan", formData);
  
      setActive("id");
  
    } catch (err) {
      console.log(err);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    console.log('file', file )
    setPanFile(file);  

    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setPan({
        panPreview: reader.result  
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPanNum(value);
    // console.log('pan', panNum, value)
   
    // PAN format: ABCDE1234F
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (value && !panRegex.test(value)) {
      setError("Invalid PAN format");
    } else {
      setError("");
    }
  };

  return (
    <div className="sm:min-h-screen  font-sans flex flex-col">
      
      <div className="flex flex-1 overflow-hidden">
    
        <main className="flex-1 overflow-y-auto px-0 sm:px-8 py-6 flex flex-col items-center">
          <div className="w-full max-w-2xl ">
         

            <div className="bg-white rounded-3xl sm:shadow-xl shadow-md border border-gray-100 p-2 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">PAN Verification</h1>
              <p className="text-gray-500 text-sm mb-7">Verify your tax identity to unlock investment limits.</p>
            
              <form onSubmit={handleSubmit}>

                  <div className="mb-5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
                      PAN Number <sup  className="text-emerald-800">*</sup>
                    </label>

                    <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                      <div>
                        <input
                          type="text"
                          placeholder="Enter pan number"
                          value={panNum}
                          onChange={handleChange}
                          required
                          maxLength={12}
                          minLength={12}
                          className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none bg-gray-50 min-w-0"
                        />
                      </div>

                      <div className="flex items-center  gap-1.5">
                          <MdOutlineVerified  className="text-emerald-600" />
                          <span className="sm:text-xs text-[0.5rem] pr-3 sm:pr-0 font-bold text-emerald-700 uppercase tracking-wider">
                            Verified
                          </span>
                        </div>
                    </div>
                  </div>

                    <div className="mb-5">
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
                       Upload PAN  <sup className="text-emerald-800">*</sup>
                      </label>

                      <div className="flex items-center justify-between border border-gray-200 rounded-xl  sm:px-4 py-3.5 bg-gray-50">
                        <div>
                        <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="flex-1 sm:px-4 px-2 py-2  text-sm text-gray-700 outline-none bg-gray-50 min-w-0"
                              />
                        </div>


                    
                      </div>

                      {panPreview && (
                          <img
                            src={panPreview}
                            alt="PAN Preview"
                            className="mt-2 h-20"
                          />
                        )}
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
                      <FiShield size={18} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="sm:text-xs text-[0.6rem] text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-800">
                          Regulatory Compliance:
                        </span>{" "}
                        PAN is required for financial compliance under sovereign banking
                        regulations. Your data is encrypted and never stored on public servers.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-2xl sm:text-base flex items-center justify-center gap-2 transition-colors mb-4"
                    >
                        {edit === "pan" ? "Update PAN" : " Proceed to ID Verification"}
                      <FiArrowRight size={18} />
                    </button>
                  </form>
           
            </div>

           
          </div>
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-800 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-white text-xs font-semibold">Completion Status</p>
          <p className="text-emerald-300 text-xs">15% Complete</p>
        </div>
        <div className="w-24 bg-emerald-700 rounded-full h-1.5">
          <div className="bg-emerald-300 h-1.5 rounded-full" style={{ width: "15%" }}></div>
        </div>
      </div>
    </div>
  );
}