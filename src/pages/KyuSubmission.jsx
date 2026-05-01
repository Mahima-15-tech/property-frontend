import { FiHelpCircle, FiBell, FiCheck, FiClock, FiShield } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function KycSubmission() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-slate-50 to-teal-50 font-sans">
      
      <div className="absolute top-10 left-96 w-64 sm:w-96 h-64 sm:h-96 bg-teal-200 opacity-30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center relative overflow-hidden">
        <div className="absolute top-10 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-slate-200 opacity-20 rounded-full blur-3xl -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-emerald-800 rounded-full flex items-center justify-center shadow-2xl mb-8">
            <FiCheck size={44} className="text-white" strokeWidth={3} />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-900 mb-4 leading-tight">
            KYC Submitted Successfully
          </h1>
          <p className="text-base sm:text-lg font-semibold text-gray-600 mb-1">Verification in progress.</p>
          <p className="text-sm sm:text-base text-gray-500 mb-10">You will be notified shortly.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 flex items-start gap-4 text-left shadow-sm">
              <FiClock size={22} className="text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Review Period</p>
                <p className="text-xs text-gray-500 leading-relaxed">Estimated 2-4 business hours for manual verification.</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 flex items-start gap-4 text-left shadow-sm">
              <FiShield size={22} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Trust Score</p>
                <p className="text-xs text-gray-500 leading-relaxed">Your preliminary account limit is now active.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-10 py-3.5 rounded-2xl text-sm transition-colors shadow-md">
               <NavLink to='/payment'>
                 Continue Investment
               </NavLink>
             
            </button>
        
          </div>
        </div>
      </main>

      
    </div>
  );
}
