import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiChevronDown, FiChevronUp, FiBell, FiShield, FiLock, FiCheckCircle, FiMessageSquare, FiClock, FiGlobe } from "react-icons/fi";
import { BsPersonCircle, BsBuilding, BsWhatsapp, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";
import { MdOutlineVerified, MdOutlineSupportAgent } from "react-icons/md";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const inputCls = "w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all";

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.email || !form.message) {
        return toast.error("Please fill required fields");
      }
  
      const res = await axios.post("/api/contact", form);
  
      toast.success(res.data.message);
  
      setSent(true);
  
      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        type: "",
        message: "",
      });
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 mb-4">
          <FiCheckCircle size={32} />
        </div>
        <h3 className="font-bold text-gray-900 text-xl mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm max-w-xs">Our team will get back to you within 2 business hours.</p>
        <button onClick={() => setSent(false)} className="mt-5 text-teal-700 text-sm font-semibold hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
          <input className={inputCls} required placeholder="Johnathan Sterling" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
          <input type="email" className={inputCls} required placeholder="john@example.com" value={form.email} onChange={set("email")} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
          <input type="tel" className={inputCls} placeholder="+91 98765 43210" 
          inputMode="numeric"  maxLength={10} minLength={10} value={form.phone} onChange={set("phone")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Inquiry Type</label>
          <select className={inputCls} value={form.type} onChange={set("type")}>
            <option value="">Select a topic</option>
            <option>Investment Inquiry</option>
            <option>KYC Support</option>
            <option>Payment Issue</option>
            <option>Property Information</option>
            <option>Account Help</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
        <input className={inputCls} placeholder="Brief subject of your query" value={form.subject} onChange={set("subject")} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
        <textarea  required className={`${inputCls} resize-none h-32`} placeholder="Describe your query in detail..." value={form.message} onChange={set("message")} />
      </div>
      <button onClick={handleSubmit} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-teal-900 active:scale-95 transition-all">
        <FiSend size={15} />
        Send Message
      </button>
    </div>
  );
}

const faqs = [
  {
    q: "What is Pronex World?",
    a: (
      <>
        <p>
          Pronex World is an AI-powered fractional real estate investment
          platform that enables investors to co-own premium real estate through
          dedicated Limited Liability Partnerships (LLPs). Each property is
          owned through a separate LLP, allowing investors to participate in
          high-value real estate with a minimum investment of ₹10 lakh.
        </p>
      </>
    ),
  },

  {
    q: "How do investors earn returns?",
    a: (
      <>
        <p className="mb-3">
          For every property, Pronex World forms a separate LLP.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            Pronex World holds a 10% partnership interest and manages the LLP.
          </li>
          <li>
            The remaining 90% partnership interests are held by up to nine
            investors, each holding a 10% stake.
          </li>
          <li>
            Pronex World oversees property acquisition, documentation,
            compliance, asset management, and exit on behalf of the LLP,
            subject to the LLP Agreement.
          </li>
        </ul>
      </>
    ),
  },

  {
    q: "How do investors earn returns?",
    a: (
      <>
        <p className="mb-3">Investors may benefit from:</p>

        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>
            Capital appreciation in the property's value over time.
          </li>
          <li>
            Rental income or other property income, where applicable and as
            provided under the LLP Agreement.
          </li>
          <li>
            Net proceeds upon the sale or exit of the property, distributed
            according to each partner's ownership interest.
          </li>
        </ul>

        <p>
          Investment returns are market-linked and are not guaranteed.
        </p>
      </>
    ),
  },

  {
    q: "What properties can I invest in?",
    a: (
      <>
        <p className="mb-3">
          Pronex World focuses on carefully selected real estate
          opportunities, including:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Premium residential apartments</li>
          <li>Luxury villas</li>
          <li>Commercial office spaces</li>
          <li>Retail assets</li>
          <li>Mixed-use developments</li>
          <li>
            Other high-potential real estate opportunities identified through
            AI-powered market intelligence
          </li>
        </ul>

        <p className="mt-3">
          Property availability may vary based on market opportunities.
        </p>
      </>
    ),
  },

  {
    q: "What is the minimum investment?",
    a: (
      <>
        <p>
          The minimum investment starts from ₹10,00,000, subject to the terms
          of the specific investment opportunity.
        </p>
      </>
    ),
  },

  {
    q: "Who manages the property?",
    a: (
      <>
        <p>
          Pronex World manages the day-to-day administration of each LLP,
          including property acquisition, legal documentation, compliance,
          asset management, reporting, and exit coordination. Investors remain
          partners in the LLP and hold ownership interests as specified in the
          LLP Agreement.
        </p>
      </>
    ),
  },

  {
    q: "Is my investment diversified?",
    a: (
      <>
        <p>
          Yes. Instead of investing your entire capital in a single property,
          you may choose to invest across multiple LLPs, properties, cities,
          and asset classes to build a diversified real estate portfolio.
        </p>
      </>
    ),
  },

  {
    q: "How does AI help?",
    a: (
      <>
        <p className="mb-3">
          Pronex World's AI-powered platform analyzes:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Market trends</li>
          <li>Location intelligence</li>
          <li>Infrastructure growth</li>
          <li>Comparable transactions</li>
          <li>Property fundamentals</li>
          <li>Demand and supply indicators</li>
        </ul>
      </>
    ),
  },
];

function FAQ() {
 
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm sm:text-base">Quick answers to common support questions.</p>
        </div>
        <div className="space-y-3">
        {faqs.map((f, i) => (
  <div
    key={i}
    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
  >
    <button
      onClick={() => setOpen(open === i ? null : i)}
      className="w-full flex items-center justify-between px-5 py-4 text-left"
    >
      <span className="font-semibold text-gray-900 text-sm">{f.q}</span>

      {open === i ? (
        <FiChevronUp
          size={16}
          className="text-teal-700 flex-shrink-0"
        />
      ) : (
        <FiChevronDown
          size={16}
          className="text-gray-400 flex-shrink-0"
        />
      )}
    </button>

    {open === i && (
      <div className="px-5 pb-4 border-t border-gray-50">
        <div className="text-gray-500 text-sm leading-relaxed pt-3">
          {f.a}
        </div>
      </div>
    )}
  </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function ContactPage() {
  return (
    <div className="min-h-screen font-sans ">
  
      <section className="py-12 sm:py-16 ">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
       
          <div className="bg-green-100 border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h2 className="text-xl sm:text-4xl font-extrabold text-gray-900 mb-1">Send Us a Message</h2>
              <p className="text-gray-500 text-sm">Fill in the form below and we'll get back to you shortly.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <FAQ />

    </div>
  );
}