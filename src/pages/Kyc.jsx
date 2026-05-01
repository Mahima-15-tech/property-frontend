import { useState, useEffect } from "react";
import {
  FiUser,
  FiCreditCard,
  FiFileText,
  FiCamera,
  FiHome,
  FiCheckSquare,
  FiBell,
  FiShield,
  FiLock,FiHeart,
  FiCheck,FiUsers
} from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { MdOutlineAccountBalance, MdTrendingUp } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsShieldCheck } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import KycPanVerification from "./KycPanVerification";
import AadharVerify from "./AadharVerify";
import KycReviewandSubmit from "./KycReviewAndSubmit";

import { useDispatch } from "react-redux";
import { setKycData } from "../slices/kycslice";
import Nominee from "./Nominee";
import BankDetails from "./BankDetails";
import axios from "../utils/axios";
import { useLocation } from "react-router-dom";

const steps = [
  { key: "basic", label: "BASIC INFO", icon: <FiUser size={16} /> },
  { key: "pan", label: "PAN VERIFY", icon: <FiCreditCard size={16} /> },
  { key: "id", label: "ID VERIFY", icon: <FiFileText size={16} /> },
  { key: "nominee", label: "NOMINEE", icon: <FiUsers size={16} /> }, 
  { key: "bank", label: "BANK", icon: <FiHome size={16} /> },
  { key: "review", label: "REVIEW", icon: <FiCheckSquare size={16} /> },
];

function StepBar({ active }) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="flex items-start justify-center min-w-max mx-auto px-2 gap-0">
        {steps.map((step, i) => {
          const isActive = step.key === active;
          const isDone = i < steps.findIndex((s) => s.key === active);

          return (
            <div key={step.key} className="flex items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all
                    ${
                      isActive
                        ? "bg-teal-800 border-teal-800 text-white"
                        : isDone
                        ? "bg-teal-100 border-teal-300 text-teal-700"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-semibold mt-1.5 tracking-wide ${
                    isActive ? "text-teal-800" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-10 sm:w-14 lg:w-20 h-px mt-5 mx-1 ${
                    isDone ? "bg-teal-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PropertyCard() {
  return (
    <div className="hidden xl:block absolute right-0 top-0 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="relative">
        <div className="w-full h-36 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
          <FiHome size={40} className="text-white opacity-60" />
        </div>
        <div className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <MdTrendingUp size={11} /> +12.4% ANNUALIZED
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-900 text-sm">{property?.name || "Property"}</h4>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed">
          Complete KYC to unlock fractional shares in this prime real estate
          asset.
        </p>
        <div className="mt-3">
          <div className="flex justify-between text-[10px] font-semibold text-gray-400 uppercase mb-1">
            {/* <span>Funding Status</span> */}
            <span>
  {property?.location?.city}, {property?.location?.state}
</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-amber-400 h-1.5 rounded-full"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityBadge() {
  return (
    <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <FiCheck size={14} className="text-teal-700" />
      </div>
      <div>
        <p className="text-teal-700 font-semibold text-sm">
          Your data is secure and encrypted
        </p>
        <p className="text-gray-500 text-xs mt-0.5">
          We use AES-256 bank-level encryption for all KYC documents.
        </p>
      </div>
    </div>
  );
}



function BasicInfoForm({setActive, edit, setEdit}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("/api/kyc");
  
       
        if (res.data && res.data.isKycCompleted) {
          setForm({
            name: res.data.fullName || "",
            email: res.data.email || "",
            dob: res.data.dob?.slice(0, 10) || "",
            address: res.data.address || "",
          });
        }
  
      } catch (err) {
        console.log(err);
      }
    };
  
    loadData();
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    let newErrors = {};

    // ✅ Name
    const nameRegex = /^[A-Za-z ]{3,50}$/;
    if (!nameRegex.test(form.name)) {
      newErrors.name = "Name must be 3-50 letters only";
    }

    // ✅ Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    let today = new Date();
    let selectedDate = new Date(form.dob);

    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (selectedDate > today) {
      newErrors.dob = "Please provide correct date";
    }

    // ✅ Address
    if (form.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    return newErrors;
  };

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all";

    const onSubmit = async (e) => {
      e.preventDefault();
    
      const validationErrors = validate();
      setErrors(validationErrors);
    
      if (Object.keys(validationErrors).length === 0) {
        try {
          await axios.post("/api/kyc/basic", {
            fullName: form.name,
            email: form.email,
            dob: form.dob,
            address: form.address,
          });
    
          if (edit === "basic") {
            setActive("review");
            setEdit("");
          } else {
            setActive("pan");
          }
    
        } catch (err) {
          console.log(err);
        }
      }
    };

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit}>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name (as per PAN Card){" "}
              <sup className="text-emerald-800">*</sup>
            </label>
            <input
              className={inputCls}
              placeholder="Enter your name "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <p style={{ color: "red" }} className="text-xs">{errors.name}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <sup className="text-emerald-800">*</sup>
              </label>
              <input
                type="email"
                className={inputCls}
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <p style={{ color: "red" }} className="text-xs">{errors.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <sup className="text-emerald-800 ">*</sup>
              </label>
              <input
                type="date"
                placeholder="Enter dob"
                className={inputCls}
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                max={new Date().toISOString().split("T")[0]}
              />
              <p style={{ color: "red" }} className="text-xs">{errors.dob}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Residential Address <sup className="text-emerald-800">*</sup>
            </label>
            <textarea
              className={`${inputCls} resize-none h-24`}
              placeholder="Enter your full permanent address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <p style={{ color: "red" }} className="text-xs">{errors.address}</p>
          </div>

          <SecurityBadge />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
           
            <button
              type="submit"
              className="w-full sm:w-auto bg-teal-800 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-teal-900 active:scale-95 transition-all"
            >
             {edit === "basic" ? "Update Info" : "Next Step"}
            </button>

           
          </div>
        </div>
      </form>
    </div>
  );
}

function FormCard({ setActive, edit, setEdit , property }) {
  return (
    <div className="relative ">
      <div className="bg-white  rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 xl:mr-72">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Basic Information
        </h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Please provide your personal details for verification. This
          information is required by law for high-value fractional investments.
        </p>
        <BasicInfoForm setActive={setActive} edit={edit} setEdit={setEdit} />
      </div>
      {/* <PropertyCard /> */}


       <div className="hidden  xl:block absolute right-0 top-0 w-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 px-5 py-5 ">
       <h2 className="text-xl font-extrabold text-gray-900">
  {property?.name || "Property"}
</h2>

<div className="flex items-center gap-1 mt-1 mb-4">
  <HiOutlineLocationMarker size={13} className="text-gray-400" />
  <span className="text-xs text-gray-500">
    {property?.location?.city}, {property?.location?.state}
  </span>
</div>

<div className="grid grid-cols-2 gap-4 mb-4">
  <div>
    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
      Total Value
    </p>
    <p className="text-base font-bold text-gray-900">
      ₹{property?.totalValue || 0}
    </p>
  </div>

  <div>
    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
      Share Price
    </p>
    <p className="text-base font-bold text-gray-900">
      ₹{property?.pricePerShare || 0}
    </p>
  </div>
</div>
            
           
       </div>

    </div>
  );
}






export default function KYCVerification() {
  const [active, setActive] = useState("basic");
  const [edit, setEdit] = useState("");
  const location = useLocation();
const property = location.state?.property;

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const res = await axios.get("/api/kyc");
  
        if (!active) {   // 🔥 IMPORTANT
          const stepMap = {
            1: "basic",
            2: "pan",
            3: "id",
            4: "nominee",
            5: "bank",
            6: "review",
          };
  
          setActive(stepMap[res.data.currentStep] || "basic");
        }
  
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchKyc();
  }, []);






  // useEffect(() => {
 

  // }, [edit]);

  return (
    <div className="  bg-slate-50 font-sans">
      <main className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-10 y">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-teal-800 mb-1">
            KYC Verification
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Sovereign Compliance Platform
          </p>
        </div>
        <div className="flex justify-center mb-8 sm:mb-10 y">
          <StepBar active={active} />
        </div>

        {active === "basic" && <FormCard 
  setActive={setActive} 
  edit={edit} 
  setEdit={setEdit}
  property={property}
/>}
        {active  === "pan" && <KycPanVerification  setActive={setActive} edit={edit} setEdit={setEdit}  />}
        {active === "id" && <AadharVerify  setActive={setActive} edit={edit} setEdit={setEdit} />}
        {active === "nominee" && <Nominee setActive={setActive} edit={edit} setEdit={setEdit} />}
        {active === "bank" && <BankDetails setActive={setActive} edit={edit} setEdit={setEdit} />}
        {active === "review" && <KycReviewandSubmit  setActive={setActive}  edit={edit} setEdit={setEdit} />}
   
      </main>
    </div>
  );
}
