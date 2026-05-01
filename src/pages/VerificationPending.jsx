import { useState } from "react";
import { FiBell, FiDownload, FiArrowRight, FiInfo, FiCheckCircle, FiClock,
     FiGrid, FiShield, FiZap, FiUserCheck, FiMessageCircle, FiHome } from "react-icons/fi";
import { BsPersonCircle, BsBuilding, BsFileEarmarkText } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineScale } from "react-icons/hi";

function StatusIcon() {
  return (
    <div className="relative w-14 h-14 mb-5">
      <div className="w-14 h-14 rounded-2xl bg-teal-700 flex items-center justify-center">
        <FiShield size={24} className="text-white" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
        <FiClock size={12} className="text-white" />
      </div>
    </div>
  );
}

function ApplicationDetails() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <BsFileEarmarkText size={16} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Details</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl font-extrabold text-gray-900">#SOV-8829</span>
        <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Pending Review</span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5">
        {[
          { label: "Full Name", value: "John Doe" },
          { label: "Mobile", value: "+91 98765 43210" },
          { label: "PAN Number", value: "ABCDE1234F" },
          { label: "RERA ID", value: "PRM/KA/RERA/1234" },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-[10px] text-gray-400 font-medium mb-0.5">{f.label}</p>
            <p className="text-sm font-semibold text-gray-800">{f.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div>
          <p className="text-[10px] text-gray-400 font-medium mb-0.5">Submitted Date</p>
          <p className="text-sm font-semibold text-gray-800">Oct 24, 2024</p>
        </div>
        <button className="flex items-center gap-1.5 text-teal-700 text-xs font-semibold hover:text-teal-900 transition-colors">
          <FiDownload size={13} />
          Download Receipt
        </button>
      </div>
    </div>
  );
}

const progressSteps = [
  { icon: <FiCheckCircle size={16} />, title: "Application Submitted", desc: "Your details were recorded on Oct 24, 2024", done: true, active: false },
  { icon: <FiZap size={16} />, title: "Documents Under Review", desc: "Legal and compliance team is verifying RERA & PAN.", done: false, active: true },
  { icon: <MdOutlineVerified size={16} />, title: "Verification Approval", desc: "Final check before onboarding.", done: false, active: false },
  { icon: <FiGrid size={16} />, title: "Dashboard Access", desc: "Start listing properties and earning commissions.", done: false, active: false },
];

function ProgressTracker() {
  return (
    <div className="bg-green-50 border border-gray-100 rounded-2xl p-5 shadow-sm mb-6">
      <p className="text-sm font-bold text-gray-800 mb-5">Application Progress</p>
      <div className="relative">
        <div className="absolute left-4 top-5 bottom-5 w-px bg-gray-100" />
        <div className="space-y-5">
          {progressSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all
                ${step.done ? "bg-teal-700 border-teal-700 text-white" : step.active ? "bg-amber-400 border-amber-400 text-white" : "bg-white border-gray-200 text-gray-300"}`}>
                {step.icon}
              </div>
              <div className="pt-1 min-w-0 ">
                <p className={`text-sm font-semibold ${step.done ? "text-teal-700" : step.active ? "text-gray-900" : "text-gray-400"}`}>{step.title}</p>
                <p className={`text-xs mt-0.5 ${step.done || step.active ? "text-gray-500" : "text-gray-300"}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <button className="flex items-center gap-2 bg-teal-700 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-teal-800 active:scale-95 transition-all">
        <FiHome size={15} />
        Go to Home
        <FiArrowRight size={14} />
      </button>
      <button className="flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all">
        <FiClock size={14} />
        Track Status
      </button>
      <button className="text-gray-500 text-sm font-medium hover:text-teal-700 transition-colors">
        Contact Support
      </button>
    </div>
  );
}

function NotificationBar() {
  return (
    <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mb-6">
      <FiInfo size={15} className="text-teal-600 mt-0.5 flex-shrink-0" />
      <p className="text-teal-700 text-xs leading-relaxed">
        We will notify you via <span className="font-bold">SMS</span> and <span className="font-bold">Email</span> as soon as your status changes.
      </p>
    </div>
  );
}



function WhySovereignCard() {
  const features = [
    { icon: <BsBuilding size={16} />, title: "10,000+ verified partners", desc: "Join a massive network of elite brokers." },
    { icon: <FiZap size={16} />, title: "Fast approval", desc: "Automated checks for instant validation." },
    { icon: <FiUserCheck size={16} />, title: "Dedicated relationship manager", desc: "Personalized support for your growth." },
  ];
  return (
    <div className="sticky top-16  lg:h-[50%] xl:h-[45%] flex flex-col justify-between py-6 px-5 overflow-hidden">
      <div className="relative  flex-1 rounded-2xl overflow-hidden mb-4">
        <div className="absolute  inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500" />
        <div className="absolute  inset-0 flex items-center p-5 bg-gradient-to-t from-black/40 via-transparent to-transparent">
          <div className="w-full">
            <h3 className="text-white font-extrabold sm:text-[1.2rem] xl:text-2xl mb-5">Why Sovereign?</h3>
            <div className="space-y-4 " >
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white flex-shrink-0 backdrop-blur-sm">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[0.7rem]">{f.title}</p>
                    <p className="text-white/70 lg:text-[0.6rem] xl:text-xs  mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/20">
              <HiOutlineScale size={16} className="text-teal-300" />
              <span className="text-teal-300 font-semibold text-xs ">Trust, Transparency, Scale.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-between bg-amber-200 border border-amber-100 rounded-2xl px-4 py-4">
        <div>
          <p className="font-bold text-gray-900 text-sm">Need help with documents?</p>
          <p className="text-gray-400 text-xs mt-0.5">Our experts are available 24/7</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white flex-shrink-0">
          <FiMessageCircle size={17} />
        </div>
      </div>
    </div>
  );
}

export default function VerificationPending() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
     
      <div className="sm:max-w-5xl max-w-6xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-4" >

          <div className="flex-1 " style={{ scrollbarWidth: "thin" }}>
            <div className="py-6 sm:py-8 px-3 sm:px-5 lg:px-6">
              <StatusIcon />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Verification Pending</h1>
              <p className="text-gray-500 text-sm mb-1 max-w-md">
                Your partner application has been submitted successfully and is currently under review.
              </p>
              <p className="text-gray-400 text-xs italic mb-7">Estimated review window: 24–48 business hours.</p>
              <ApplicationDetails />
              <ProgressTracker />
              <ActionButtons />
              <NotificationBar />
            </div>
          </div>

          <div className=" w-72 xl:w-96 flex-shrink-0">
            <WhySovereignCard />
          </div>
        </div>
        
      
      </div>
    </div>
  );
}