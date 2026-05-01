
import { useState, useEffect } from "react";
import { FiCheckCircle, FiShield, FiLock, FiMapPin, FiMinus, FiPlus, FiCheck, FiAlertCircle } from "react-icons/fi";
import { MdVerified, MdOutlineAccountBalance } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsGraphUp } from "react-icons/bs";
import { NavLink, Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";




function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {[
        { icon: <FiLock size={13} />, label: "SECURE PAYMENT" },
        { icon: <MdVerified size={13} />, label: "VERIFIED PROPERTY" },
        { icon: <MdOutlineAccountBalance size={13} />, label: "TRANSPARENT OWNERSHIP" },
      ].map((b) => (
        <div key={b.label} className="flex items-center gap-1.5 bg-teal-700 text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-md">
          {b.icon}
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function PropertyCard({property}) {
  return (
    <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-sky-400 to-teal-600 flex items-center justify-center">
        {/* <BsGraphUp size={32} className="text-white opacity-70" /> */}
        <img
          src={property.image || property.media?.images?.[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg"> {property.name}  </h3>
            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 mt-0.5">
              <FiMapPin size={11} /> {property.location?.city}, {property.location?.state}
            </p>
          </div>
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
  {property?.roi || 0}% ROI
</span>
        </div>
        <div className="flex gap-6 mt-2">
          <div>
            <p className="text-gray-400 text-xs">Type</p>
            <p className="text-gray-800 text-sm font-semibold">
  {property?.type || "N/A"}
</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Share Price</p>
            <p className="text-gray-800 text-sm font-semibold">{property.sharePrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareSelector({ shares, setShares, property }) {
  const price = property?.sharePrice || 0;
  const totalShares = property?.totalShares || 0;

  const investment = shares * price;

  // ✅ ownership safe calculation
  const ownership =
    totalShares > 0
      ? ((shares / totalShares) * 100).toFixed(2)
      : 0;

  

  return (
    <div>
      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">
        Select Number of Shares
      </h3>

      <div className="border border-gray-200 bg-green-50 rounded-xl p-4 flex items-center justify-between gap-4">
        
        {/* 🔢 Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShares((s) => Math.max(1, s - 1))}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
          >
            <FiMinus size={14} />
          </button>

          <span className="text-gray-900 font-semibold text-base w-4 text-center">
            {shares}
          </span>

          <button
            onClick={() => setShares((s) => s + 1)}
            className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white hover:bg-teal-800 active:scale-95 transition-all"
          >
            <FiPlus size={14} />
          </button>
        </div>

        {/* 💰 Info */}
        <div className="text-right">
          <p className="text-gray-400 text-xs">
            {shares} share{shares > 1 ? "s" : ""} ={" "}
            <span className="font-semibold text-gray-700">
              {ownership}%
            </span>{" "}
            ownership
          </p>


          <p className="text-teal-700 font-bold text-lg sm:text-xl">
            Total: ₹{investment.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
function ReferralCode({ code, setCode, applied, setApplied }) {

  return (
    <div>
      <p className="text-gray-500 text-xs font-semibold tracking-wide uppercase mb-2"> Broker Referral Code (Optional)</p>
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm text-gray-700 bg-white outline-none"
            placeholder="Enter referral code"
          />
          {applied && (
            <div className="flex items-center gap-1 pr-3 text-teal-600 text-xs font-semibold">
              <FiCheck size={13} /> Applied
            </div>
          )}
        </div>
        <button
          onClick={async () => {
            try {
              const res = await axios.post("/api/investments/validate-referral", {
                code
              });
          
              if (res.data.valid) {
                setApplied(true);
              }
          
            } catch (err) {
              setApplied(false);
              alert("Invalid referral code");
            }
          }}
          className="bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-teal-800 active:scale-95 transition-all"
        >
          Apply
        </button>
      </div>
      {applied && (
  <p className="text-teal-600 text-xs mt-1.5">
    Broker code applied successfully
  </p>
)}

{!applied && code && (
  <p className="text-red-500 text-xs mt-1.5">
    Invalid referral code
  </p>
)}
    </div>
  );
}

function InvestmentBreakdown({ shares, applied , property }) {
  const price = property?.sharePrice || 0;

  const investment = shares * price;
  
  const discount = applied 
    ? investment * 0.05 
    : 0;
  
  const total = investment - discount;
 
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-green-50">
      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">Investment Breakdown</h3>
      <div className="space-y-2 text-sm">
        {[
          { label: "Investment Amount", value: `₹${investment.toLocaleString()}` },
          { label: "Platform Fee", value: "₹0" },
          { label: "Taxes", value: "₹0" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between text-gray-600">
            <span>{r.label}</span>
            <span>{r.value}</span>
          </div>
        ))}
        {discount > 0 && (
          <div className="flex justify-between text-teal-600 font-medium">
            <span>Discount</span>
            <span>-₹{discount.toFixed(0)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base sm:text-lg">
          <span>Total Payable Amount</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function AgreementRow({ agreed, setAgreed }) {
  return (
    <div className="flex items-start gap-3">
      <button
        onClick={() => setAgreed((a) => !a)}
        className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${agreed ? "bg-teal-700 border-teal-700" : "border-gray-300 bg-white"}`}
      >
        {agreed && <FiCheck size={10} className="text-white" />}
      </button>
      <p className="text-gray-500 text-xs sm:text-sm">
        I agree to the investment terms, ownership structure, and legal documentation.{" "}
        <span className="text-teal-700 cursor-pointer underline">View Agreement</span>
      </p>
    </div>
  );
}
function InvestmentSummary({ shares, property }) {

  const price = property?.sharePrice || 0;
  const investment = shares * price;

  const roi = property?.roi || 0;

  // ✅ annual return
  const annual = (investment * roi) / 100;

  // ✅ monthly return
  const monthly = annual / 12;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm">
      <h3 className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Investment Summary</h3>

      <div className="space-y-3">
        {[
          { label: "Property", value: property.name },
          { 
            label: "Location", 
            value: `${property.location?.city || ""}, ${property.location?.state || ""}` 
          },
          { label: "Share Price", value: `₹${price.toLocaleString()}`, bold: true },
          { label: "Selected Shares", value: `${shares} Share${shares > 1 ? "s" : ""}`, bold: true },
          { 
            label: "Ownership %", 
            value: `${((shares / (property?.totalShares || 1)) * 100).toFixed(2)}%`, 
            teal: true, 
            bold: true 
          },
        ].map((r) => (
          <div key={r.label} className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{r.label}</span>
            <span className={`${r.teal ? "text-teal-700" : "text-gray-900"} ${r.bold ? "font-bold" : ""}`}>
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* 🔥 FIXED SNAPSHOT */}
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">
          Financial Snapshot
        </p>

        <div className="flex gap-4">
          <div>
            <p className="text-gray-400 text-xs">Estimated Annual</p>
            <p className="text-gray-900 font-bold text-base">
              ₹{annual.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Monthly Income</p>
            <p className="text-gray-900 font-bold text-base">
              ₹{monthly.toFixed(0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FundingProgress({ property }) {
  return (
    <div className="bg-green-50 border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600 text-sm font-semibold">Funding Progress</p>
        <span className="text-gray-900 font-bold text-sm">
  {property?.soldPercent || 0}%
</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
      <div 
  className="bg-teal-600 h-2 rounded-full" 
  style={{ width: `${property?.soldPercent || 0}%` }} 
/>
      </div>
      <p className="text-gray-400 text-xs italic">
  Only {property?.availableShares || 0} shares remaining
</p>

      <div className="flex justify-around mt-5 pt-4 border-t border-gray-100">
        {[
          { icon: <FiShield size={18} />, label: "SECURE\nTRANSACTION" },
          { icon: <MdVerified size={18} />, label: "VERIFIED\nLISTING" },
          { icon: <HiOutlineDocumentText size={18} />, label: "LEGAL\nPROTECTION" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1 text-teal-700">
            {b.icon}
            <p className="text-[9px] sm:text-[10px] text-gray-500 font-semibold text-center whitespace-pre-line leading-tight">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Checkout() {
 
  
  const location = useLocation();
  const navigate = useNavigate()
  const [shares, setShares] = useState(1);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  
  const properties = useSelector((state) => state.property.properties);
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const existing = properties.find((p) => p._id === id);
  
    if (existing) {
      setProperty(existing);
    } else {
      fetchProperty();
    }
  }, [id, properties]);

  console.log("🔥 PROPERTY DATA:", property);
  
  const fetchProperty = async () => {
    const res = await axios.get(`/api/properties/${id}`);
    // console.log("🔥 API RESPONSE:", res.data);
    setProperty(res.data);
  };
  console.log('proer0', property);


  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }
  
    // 🚨 AGREEMENT CHECK (extra safe)
    if (!agreed) {
      alert("Please accept agreement");
      return;
    }
  
    try {
      const propertyId = property?._id || property?.id;
  
      // 1️⃣ Investment create karo
      const res = await axios.post("/api/investments/create", {
        propertyId,
        shares,
        referralCode: code,
      });
  
      const kycStatus = res.data.kycStatus;
  
      if (kycStatus !== "approved") {
        navigate("/kyc");
        return;
      }
  
      // 2️⃣ Razorpay load
      const isLoaded = await loadRazorpay();
  
      if (!isLoaded) {
        alert("Razorpay failed to load");
        return;
      }
  
      // 3️⃣ amount calculate
      const investment = shares * property.sharePrice;
      const discount = applied ? investment * 0.05 : 0;
      const amount = Math.round(investment - discount);
  
      // 4️⃣ order create
      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/capturePayment`,
        {
          amount,
          currency: "INR",
        }
      );
  
      const order = orderRes.data.data;
  
      // 5️⃣ open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: property.name,
        description: "Property Investment",
        order_id: order.id,
  
        handler: async function (response) {
          // verify payment
          const verify = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verifyPayment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              propertyId: property._id,
              amount: amount,
            }

          );
  
          if (verify.data.success) {
            navigate("/investment-success", {
              state: {
                propertyName: property.name,
                amount,
                shares,
                paymentId: response.razorpay_payment_id,
                location: property.location, 
                totalShares: property.totalShares 
              }
            });
          } else {
            alert("Payment verification failed");
          }
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="min-h-screen bg-white font-sans">
   
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">Confirm Your Investment</h1>
          <p className="text-gray-500 text-sm sm:text-base mb-4">Review details, select shares, and proceed securely.</p>
          <TrustBadges />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            <PropertyCard property={property}/>
            <ShareSelector shares={shares} setShares={setShares} property={property} />
            <ReferralCode code={code} setCode={setCode} applied={applied} setApplied={setApplied} />
            <InvestmentBreakdown 
  shares={shares} 
  applied={applied} 
  property={property} 
/>
            <AgreementRow agreed={agreed} setAgreed={setAgreed} />
            <button
              className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all
              active:scale-[0.98] ${agreed ? "bg-teal-700 text-white hover:bg-teal-800" : "bg-teal-700/60 text-white  "}`}
              disabled={!agreed}
              onClick={onSubmit}
            >
              
                  Proceed to Payment
             
            
            </button>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <InvestmentSummary shares={shares} property={property} />
            <FundingProgress property={property} />
          </div>
        </div>
      </main>

    </div>
    {showAuthPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center">

      <h3 className="text-xl font-semibold mb-2">
        Login Required
      </h3>

      <p className="text-gray-500 text-sm mb-5">
        Please login or signup to continue with your investment and proceed to secure payment.
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 bg-[#0F766E] text-white rounded-lg"
        >
          Signup
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 border rounded-lg"
        >
          Login
        </button>
      </div>

      <button
        onClick={() => setShowAuthPopup(false)}
        className="mt-4 text-xs text-gray-400"
      >
        Cancel
      </button>

    </div>
  </div>
)}
    </>
  );
}

