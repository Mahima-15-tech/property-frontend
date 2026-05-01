import { FiInfo, FiUser, FiShield, FiArrowRight } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAadhaar } from "../slices/kycslice";
import { setBank } from "../slices/kycslice";
import axios from "../utils/axios";

export default function BankDetails({setActive, edit, setEdit}) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    accountNumber: "",
    branchName: "",
    ifscCode: "",
  });

  const [cancelCheck, setCancelCheck] = useState(null);
  const {  cancelCheckUpload  } = useSelector((state) => state.kyc);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = new FormData();
  
      data.append("beneficiaryName", formData.beneficiaryName);
      data.append("accountNumber", formData.accountNumber);
      data.append("ifsc", formData.ifscCode);
      data.append("branch", formData.branchName);
      data.append("document", cancelCheck);
  
      await axios.post("/api/kyc/bank", data);
  
      setActive("review");
  
    } catch (err) {
      console.log(err);
    }
  };


   const handleFileChange = (e) => {
      const file = e.target.files[0];
  
      if (!file) return;
      setCancelCheck(file);  
  
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setCancelCheck(reader.result);
      };
  
      reader.readAsDataURL(file);
    };

  return (
    

                <div className="sm:min-h-screen font-sans flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto px-0 sm:px-8 py-6 flex flex-col items-center">
                <div className="w-full max-w-2xl">

                    <div className="bg-white rounded-3xl sm:shadow-xl shadow-md border border-gray-100 p-2 sm:p-8">

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                        Bank Details
                    </h1>
                    <p className="text-gray-500 text-sm mb-7">
                        Add your bank details for secure transactions.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Beneficiary Name */}
                        <div className="mb-5">
                        <label className="text-sm font-semibold text-gray-800 mb-2 block">
                        Beneficiary  Name <sup className="text-emerald-800">*</sup>
                        </label>

                        <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                            <input
                            type="text"
                            name="beneficiaryName"
                            value={formData.beneficiaryName}
                            onChange={handleChange}
                            placeholder="Enter Beneficiary name"
                            required
                            className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                        </div>

                        {/* Account Number */}
                        <div className="mb-5">
                        <label className="text-sm font-semibold text-gray-800 mb-2 block">
                            Account Number <sup className="text-emerald-800">*</sup>
                        </label>

                        <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                            <input
                            type="number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            placeholder="Enter account number"
                            required
                            className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                        </div>

                        {/* Branch Name */}
                        <div className="mb-5">
                        <label className="text-sm font-semibold text-gray-800 mb-2 block">
                            Branch Name <sup className="text-emerald-800">*</sup>
                        </label>

                        <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                            <input
                            type="text"
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleChange}
                            placeholder="Enter branch name"
                            required
                            className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                        </div>

                        {/* IFSC Code */}
                        <div className="mb-5">
                        <label className="text-sm font-semibold text-gray-800 mb-2 block">
                            IFSC Code <sup className="text-emerald-800">*</sup>
                        </label>

                        <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                            <input
                            type="text"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleChange}
                            placeholder="Enter IFSC code"
                            required
                            className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                        </div>

                    <div className="mb-5">
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
                      Cancel Check Upload  <sup className="text-emerald-800">*</sup>
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

                      {cancelCheck && (
                          <img
                            src={cancelCheck}
                            alt="PAN Preview"
                            className="mt-2 h-20"
                          />
                        )}
                    </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 flex items-start gap-3 mb-8">
                        <p className="text-[0.7rem] sm:text-xs  text-gray-600">
                            Your bank details are required and used only for transactions and verification purposes.
                        </p>
                        </div>

                        <button
                        type="submit"
                        className="w-full text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-2xl sm:text-base flex items-center justify-center gap-2"
                        >
                          {edit === "bank" ? "Update Bank Details" : " Review Bank Details"}
                       
                        </button>

                    </form>
                    </div>

                </div>
                </main>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-800 px-4 py-3 flex justify-between">
                <div>
                <p className="text-white text-xs font-semibold">Completion Status</p>
                <p className="text-emerald-300 text-xs">80% Complete</p>
                </div>
                <div className="w-24 bg-emerald-700 rounded-full h-1.5">
                <div className="bg-emerald-300 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
            </div>
            </div>
  );
}