
import {
  FiCheck,
  FiClock,
  FiShield,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function KycSubmission() {
  const navigate = useNavigate();
  const location = useLocation();

  const message =
    location.state?.message ||
    "Your KYC details have been submitted successfully and are awaiting team review.";

  const status = location.state?.status || "pending";

  const isApproved = status === "approved";

  const handleContinue = () => {
    const state = location.state || {};
  
    let savedInvestment = {};
  
    try {
      savedInvestment = JSON.parse(
        sessionStorage.getItem("investmentReturn") || "{}"
      );
    } catch (error) {
      console.error("Unable to restore investment details:", error);
    }
  
    const propertyId =
      state.propertyId ||
      state.property?._id ||
      state.property?.id ||
      savedInvestment.propertyId;
  
    if (propertyId) {
      sessionStorage.removeItem("investmentReturn");
  
      navigate(`/checkout/${propertyId}`, {
        state: {
          shares: state.shares ?? savedInvestment.shares,
          referralCode:
            state.referralCode ?? savedInvestment.referralCode ?? "",
        },
      });
      return;
    }
  
    console.error("Property ID missing. Cannot return to checkout.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-slate-50 to-teal-50 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-teal-200 opacity-30 rounded-full blur-3xl pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center relative">
        <div className="absolute bottom-10 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-slate-200 opacity-20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
          {/* Status icon */}
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-xl mb-8 ${
              isApproved ? "bg-emerald-800" : "bg-amber-500"
            }`}
          >
            {isApproved ? (
              <FiCheck
                size={44}
                className="text-white"
                strokeWidth={3}
              />
            ) : (
              <FiClock
                size={44}
                className="text-white"
                strokeWidth={2}
              />
            )}
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {isApproved
              ? "KYC Approved"
              : "KYC Submitted Successfully"}
          </h1>

          <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
            {isApproved
              ? "Your KYC has been approved by our team."
              : "Your KYC is awaiting team approval."}
          </p>

          <p className="text-sm sm:text-base text-gray-500 mb-10 max-w-xl leading-relaxed">
            {isApproved
              ? "You can now continue with your investment process."
              : message}
          </p>

          {/* Status information */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-4 mb-10">
            {/* <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 flex items-start gap-4 text-left shadow-sm">
              <FiFileText
                size={22}
                className="text-emerald-700 shrink-0 mt-0.5"
              />

              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  KYC Submission
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your submitted information and documents are available for
                  review.
                </p>
              </div>
            </div> */}

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 flex items-start gap-4 text-left shadow-sm">
              {isApproved ? (
                <FiShield
                  size={22}
                  className="text-emerald-700 shrink-0 mt-0.5"
                />
              ) : (
                <FiClock
                  size={22}
                  className="text-amber-600 shrink-0 mt-0.5"
                />
              )}

              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  Approval Status
                </p>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    isApproved
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {isApproved ? "Approved" : "Pending Review"}
                </span>

                <p className="text-xs text-gray-500 leading-relaxed mt-2">
                  {isApproved
                    ? "Your team approval is complete."
                    : "Our Team will review your details and update the status."}
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
        
<button
  type="button"
  onClick={handleContinue}
  className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-10 py-3.5 rounded-2xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
>
  Continue Investment
  <FiArrowRight size={17} />
</button>


            {!isApproved && (
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                Investment continuation will be available once your KYC has
                been approved.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
