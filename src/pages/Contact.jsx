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


function FAQ() {
  const faqs = [
    { q: "How quickly will I hear back?", a: "We respond to all queries within 2 business hours during working hours. For urgent matters, please call us directly." },
    { q: "Can I schedule a call with an advisor?", a: "Yes! Use our contact form with 'Investment Inquiry' type and we'll schedule a dedicated 30-minute consultation at your convenience." },
    { q: "What documents do I need for KYC support?", a: "PAN card, Aadhaar, bank statement (last 3 months), and a passport photo. Our KYC team will guide you through the entire process." },
    { q: "Is my data safe when I contact you?", a: "Absolutely. All communications are encrypted with AES-256 and we never share your data with third parties." },
  ];
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
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
                {open === i ? <FiChevronUp size={16} className="text-teal-700 flex-shrink-0" /> : <FiChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-4 border-t border-gray-50">
                  <p className="text-gray-500 text-sm leading-relaxed pt-3">{f.a}</p>
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