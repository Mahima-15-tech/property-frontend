import { useState, useEffect } from "react";
import {
  FiLock,
  FiShield,
  FiCheckCircle,
  FiCreditCard,
  FiChevronRight,
  FiInfo,
} from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { BsPhone, BsBank2, BsBuilding } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_RAZORPAY_SECRET = import.meta.env.VITE_RAZORPAY_SECRET;
const VITE_RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

// console.log('url', BACKEND_URL)
function PageHeader() {
  return (
    <div className="mb-7">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
        Complete Your Payment
      </h1>

      <p className="text-gray-500 text-sm sm:text-base mt-1">
        Secure your ownership and finalize your investment
      </p>
    </div>
  );
}

function PaymentTabs({ active, setActive }) {
  const tabs = [
    { key: "card", label: "Card Payment", icon: <FiCreditCard size={14} /> },
    { key: "upi", label: "UPI / GPay", icon: <BsPhone size={14} /> },
    { key: "net", label: "Net Banking", icon: <BsBank2 size={14} /> },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-2xl p-1 w-full sm:w-auto mb-6">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => setActive(t.key)}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex-1 sm:flex-none justify-center ${
            active === t.key
              ? "bg-teal-800 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {t.icon}
          <span className="hidden xs:inline sm:inline">{t.label}</span>
          <span className="xs:hidden sm:hidden">{t.label.split(" ")[0]}</span>
        </button>
      ))}
    </div>
  );
}

function CardForm({ handlePayment }) {
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls =
    "w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all";

  return (
    <div className="space-y-5">
      <form onSubmit={handlePayment}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            className={inputCls}
            placeholder="Johnathan Sterling"
            value={form.name}
            onChange={set("name")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              className={`${inputCls} pr-12`}
              placeholder="XXXX XXXX XXXX 4242"
              value={form.card}
              onChange={set("card")}
              maxLength={19}
            />
            <FiCreditCard
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              className={inputCls}
              placeholder="MM / YY"
              value={form.expiry}
              onChange={set("expiry")}
              maxLength={7}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              className={inputCls}
              placeholder="•••"
              type="password"
              value={form.cvv}
              onChange={set("cvv")}
              maxLength={4}
            />
          </div>
        </div>

        <button className="w-full bg-teal-800 text-white font-bold text-sm sm:text-base py-4 rounded-xl hover:bg-teal-900 active:scale-[0.98] transition-all mt-2">
          Confirm and Pay $24,500
        </button>
      </form>
    </div>
  );
}

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function UPIForm({ handlePayment }) {
  const navigate = useNavigate();
  const [upi, setUpi] = useState("");

  return (
    <div className="space-y-5">
      <div>
        <form onSubmit={handlePayment}>
          {" "}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI ID
            </label>
            <input
              className="w-full  bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all"
              placeholder="yourname@upi"
              type="text"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>
          <button className="w-full mt-3 bg-teal-800 text-white font-bold text-sm sm:text-base py-4 rounded-xl hover:bg-teal-900 active:scale-[0.98] transition-all">
            Confirm and Pay $24,500
          </button>
        </form>
      </div>
    </div>
  );
}

function NetBankingForm({ handlePayment }) {
  return (
    <div className="space-y-5">
      <form onSubmit={handlePayment}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>
          <select className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all">
            <option value="">Choose your bank</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>SBI</option>
            <option>Axis Bank</option>
            <option>Kotak Mahindra</option>
          </select>
        </div>
        <button className="w-full bg-teal-800 text-white font-bold text-sm sm:text-base py-4 rounded-xl hover:bg-teal-900 active:scale-[0.98] transition-all">
          Confirm and Pay $24,500
        </button>
      </form>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: <FiLock size={20} />, label: "256-bit Encryption" },
    { icon: <FiShield size={20} />, label: "Secure Gateway" },
    { icon: <FiCheckCircle size={20} />, label: "Verified Platform" },
  ];
  return (
    <div className="flex justify-around mt-8 pt-6 border-t border-gray-100">
      {badges.map((b) => (
        <div key={b.label} className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
            {b.icon}
          </div>
          <span className="text-xs text-gray-500 font-medium text-center">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PaymentForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upi");

  const handlePayment = async (e) => {
    e.preventDefault();
  
    const res = await loadRazorpay();
  
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
  
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/payment/capturePayment`,
        {
          amount: 50000, // ₹500
          currency: "INR",
        }
      );
  
      const order = response.data.data;
  
      const options = {
        key: VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Property Platform",
        description: "Investment Payment",
        order_id: order.id,
  
        handler: async function (response) {
          await verifyPayment(response);
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  
    } catch (err) {
      console.log(err);
      toast.error("Payment Failed");
    }
  };

  const verifyPayment = async (response) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/payment/verifyPayment`,
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
      );
  
      if (res.data.success) {
        toast.success("Payment Successful");
        navigate("/investment-success");
      } else {
        toast.error("Payment Verification Failed");
      }
  
    } catch (err) {
      console.log(err);
      toast.error("Verification Error");
    }
  };

  return (
    <div className="flex-1 min-w-0 ">
      <PaymentTabs active={activeTab} setActive={setActiveTab} />
      {activeTab === "card" && <CardForm handlePayment={handlePayment} />}
      {activeTab === "upi" && <UPIForm handlePayment={handlePayment} />}
      {activeTab === "net" && <NetBankingForm handlePayment={handlePayment} />}
      <TrustBadges />
    </div>
  );
}

function OrderSummary() {
  const rows = [
    { label: "Investment Amount", value: "$25,000.00", color: "text-gray-900" },
    { label: "Platform Fee", value: "$0.00", color: "text-gray-900" },
    { label: "Taxes & Duties", value: "$0.00", color: "text-gray-900" },
    {
      label: "Promotional Discount",
      value: "-$500.00",
      color: "text-teal-600",
    },
  ];
  return (
    <div className="w-full lg:w-96 xl:w-[420px] flex-shrink-0 shadow-2xl">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden ">
        <div className="relative h-44 sm:h-52 bg-gradient-to-br from-amber-200 via-orange-200 to-sky-300 flex items-end">
          <div className="absolute inset-0 flex items-center justify-center">
            <BsBuilding size={60} className="text-white opacity-30" />
          </div>
          <div className="relative z-10 p-4 pb-5 w-full bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
              Current Asset
            </p>
            <p className="text-white font-bold text-lg sm:text-xl mt-0.5">
              The Azure Heights, Dubai
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-gray-400 text-xs font-medium mb-0.5">
                Equity Allocation
              </p>
              <p className="text-gray-900 font-bold text-sm sm:text-base">
                1 Share (1.00% Ownership)
              </p>
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
              +4.2% Est. Yield
            </span>
          </div>

          <div className="space-y-3 pb-4 border-b border-gray-100">
            {rows.map((r) => (
              <div key={r.label} className="flex justify-between text-sm">
                <span
                  className={
                    r.label === "Promotional Discount"
                      ? "text-teal-600"
                      : "text-gray-500"
                  }
                >
                  {r.label}
                </span>
                <span className={`font-medium ${r.color}`}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Total Payable
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                $24,500
              </p>
            </div>
            <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50">
              <FiInfo size={13} />
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-xs text-center mt-4 leading-relaxed px-5 pb-10">
        By clicking "Confirm and Pay", you agree to Sovereign Curator's{" "}
        <span className="text-teal-700 underline cursor-pointer">
          Terms of Investment
        </span>{" "}
        and acknowledge the risks associated with fractional property ownership.
      </p>
    </div>
  );
}

export default function Payment() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PageHeader />
        <div className="flex flex-col  lg:flex-row gap-8 lg:gap-10 lg:items-start items-center ">
          <PaymentForm />
          <OrderSummary />
        </div>
      </main>
    </div>
  );
}