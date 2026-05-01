import React from 'react'
import { FaPhone, FaIdCard, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { useState, useRef } from "react";
import { FaUser, FaStar, FaBolt, FaUserTie, FaMoneyBill, FaTh } from "react-icons/fa";
import { FiUploadCloud, FiFileText } from "react-icons/fi";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";


const benefits = [
  { icon: FaStar, title: "Premium Property Listings", desc: "Gain early access to institutional-grade commercial and residential assets." },
  { icon: FaBolt, title: "Faster Lead Generation", desc: "Utilize our AI-driven marketing stack to close deals 3x faster." },
  { icon: FaUserTie, title: "Dedicated RM", desc: "Personal relationship manager to assist with high-ticket advisory." },
  { icon: FaMoneyBill, title: "Higher Commissions", desc: "Tiered incentives that reward volume and consistency." },
  { icon: FaTh, title: "Real-time Dashboard", desc: "Track your earnings, clients, and assets with surgical precision." },
];

export default function BrokerSignup() {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [confirm1, setConfirm1] = useState(false);
  const [confirm2, setConfirm2] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [rera, setRera] = useState("");

  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/broker-login"); 
  };

  const fileRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file); 
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file); 
  };

  const validateForm = () => {
    let newErrors = {};
  
    if (!name.trim()) newErrors.name = "Full name is required";
  
    if (!/^[6-9]\d{9}$/.test(mobile))
      newErrors.mobile = "Enter valid 10 digit mobile number";
  
    if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter valid email address";
  
    if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan))
      newErrors.pan = "Enter valid PAN (ABCDE1234F)";
  
    if (!fileName)
      newErrors.file = "Please upload address proof";
  
    if (!confirm1)
      newErrors.confirm1 = "Required";
  
    if (!confirm2)
      newErrors.confirm2 = "Required";
  
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSuccess(""); 
        return;
      }
  
    setErrors({}); 
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("pan", pan);
      formData.append("rera", rera);
      formData.append("file", fileName);
      formData.append("confirm1", confirm1);
      formData.append("confirm2", confirm2);
  
      const res = await axios.post("/api/brokers/register", formData);

localStorage.setItem("token", res.data.token);
      setSuccess("Application submitted successfully");
  
      setTimeout(() => {
        navigate("/broker-dashboard");
      }, 1500);
  
    } catch (err) {
      setSuccess("");
    }
  };

  return (

   <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
  <div className="max-w-7xl w-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex-1 px-6 sm:px-10 lg:px-14 py-10 max-w-full lg:max-w-[65%]">
          <form onSubmit={submitHandler} noValidate> 
          <p className="text-xs font-semibold text-[#1a5c4f] tracking-widest uppercase mb-1">Onboarding</p>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Become a Partner</h1>
            {success && (
  <div className="mb-4 p-3 rounded-lg bg-green-100 border border-green-400 text-green-700 text-sm font-medium">
    ✅ {success}
  </div>
)}
          </div>
          

          <div className="flex items-center gap-2 mb-6">
            <FaUser className="text-[#1a5c4f] text-base" />
            <h2 className="text-lg font-bold text-gray-800">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5c4f] border border-transparent"
                required
             />
             {errors.name && (
  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number*</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5c4f] border border-transparent"
                maxLength={10}
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  // sirf numbers allow
                  if (!/^\d*$/.test(value)) return;
                  setMobile(value);
             
                  // setMobileErr("");
                }}
                required
              />
              {errors.mobile && (
  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5c4f] border border-transparent"
                required
             />
             {errors.email && (
  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">PAN Number*</label>
              <input
                value={pan}
                maxLength={10}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                type="text"
                placeholder="Enter you pan number"
                 className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5c4f] border border-transparent"
                 required
              />
              {errors.pan && (
  <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
)}
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">RERA Number (Optional)</label>
            <input
             value={rera}
             onChange={(e) => setRera(e.target.value)}
              type="text"
              placeholder="Enter your rera number"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5c4f] border border-transparent"
              required
           />
           
          </div>

          <div className="flex items-center gap-2 mb-5">
            <FiFileText className="text-[#1a5c4f] text-base" />
            <h2 className="text-lg font-bold text-gray-800">Address Proof Upload</h2>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors mb-6 ${dragOver ? "border-[#1a5c4f] bg-green-50" : "border-gray-300 bg-gray-100"}`}
          >
            <FiUploadCloud className="text-[#1a5c4f] text-4xl mb-3" />
            <p className="font-semibold text-gray-800 mb-1 ">
            {fileName ? fileName.name : "Drag and drop file here"}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Aadhaar, Driving License, Utility Bill, or Passport (PDF, JPG, PNG)
            </p>
            <button
  type="button"   // 🔥 THIS IS THE FIX
  onClick={() => fileRef.current.click()}
  className="border border-[#1a5c4f] text-[#1a5c4f] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
>
  Browse Files
</button>
            <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />
            {errors.file && (
  <p className="text-red-500 text-xs mt-2">{errors.file}</p>
)}
          </div>
          <div className="bg-gray-100 rounded-xl px-5 py-4 mb-8 space-y-3">
          


<div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirm1}
                onChange={() => {
                  console.log("chcked", confirm1)
                  setConfirm1(!confirm1)}}
                  className={`mt-0.5 w-4 h-4 rounded shrink-0` }
              />
              <span className="text-sm text-gray-700">
                I confirm that all the information provided above is accurate and matches my legal documents.
              </span> 
              
              
            </label>
            {errors.confirm1 && (
    <p className="text-red-500 text-xs mt-1 ml-6">
      Please confirm details
    </p>
  )}
</div>
            
<div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirm2}
                onChange={() => setConfirm2(!confirm2)}
                className={`mt-0.5 w-4 h-4 rounded shrink-0`} 
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-[#1a5c4f] font-semibold underline">Terms of Service</span>{" "}
                and{" "}
                <span className="text-[#1a5c4f] font-semibold underline">Privacy Policy</span>.
              </span>
              
            </label>

            
          </div>
          {errors.confirm2 && (
    <p className="text-red-500 text-xs mt-1 ml-6">
      Please accept terms
    </p>
  )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
  className="w-full sm:flex-1 bg-[#1a5c4f] hover:bg-[#154d43] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
>
  Submit Application
</button>


          </div>

          <div className="text-center mt-4">
 <p className="text-sm text-gray-500">
  Already a partner?{" "}
  <span
    onClick={goToLogin}
    className="text-[#1a5c4f] font-semibold cursor-pointer hover:underline"
  >
    Sign in to your dashboard →
  </span>
</p>
</div>
          </form>
        </div>

        <div className="bg-[#1a5c4f] text-white w-full lg:w-[35%] p-8 lg:p-10 flex flex-col justify-between">
          <div className='p-5 sm-p-0'>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                Empowering Sovereignty in Real Estate.
              </h2>
              <p className="text-green-200 text-sm leading-relaxed">
                Join the exclusive network of partners driving the fractional ownership revolution.
              </p>
            </div>

            <p className="text-xs font-bold text-yellow-400 tracking-widest uppercase mb-5">
              Partner Benefits
            </p>

            <div className="space-y-5">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="text-green-300 text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-green-200 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 p-5 sm-p-0">
            <p className="text-xs font-semibold text-green-200">Authorized Platform</p>
            <p className="text-xs text-green-300 mb-3">ISO 27001 Certified Security</p>
            <div className="flex items-center gap-1">
              {["bg-amber-400", "bg-rose-400", "bg-sky-400", "bg-purple-400"].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#1a5c4f] ${c}`} />
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-[#1a5c4f] bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                +5k
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
          