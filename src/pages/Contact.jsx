

import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";



import {

  FiChevronDown,

  FiChevronUp,

  FiCheckCircle,

  FiMessageSquare,

  FiClock,

  FiShield,

  FiUser,

  FiPhone,

  FiMail,

  FiCreditCard,

  FiArrowRight,

  FiHeadphones,

  FiRefreshCw,

} from "react-icons/fi";



import axios from "../utils/axios";

import toast from "react-hot-toast";



// =====================================================

// INITIAL FORM

// =====================================================



const initialForm = () => ({

  type: "",

  subject: "",

  message: "",



  name: "",

  email: "",

  phone: "",



  panCard: null,

  aadhaarCard: null,



  bank: {

    beneficiaryName: "",

    accountNumber: "",

    ifsc: "",

    branch: "",

    cancelCheque: null,

  },

});



// =====================================================

// SUPPORT FORM

// =====================================================



function ContactForm() {

  const [form, setForm] = useState(initialForm);

  const [sent, setSent] = useState(false);

  const [loading, setLoading] = useState(false);



  const setField = (key, value) => {

    setForm((prev) => ({

      ...prev,

      [key]: value,

    }));

  };



  const setBankField = (key, value) => {

    setForm((prev) => ({

      ...prev,

      bank: {

        ...prev.bank,

        [key]: value,

      },

    }));

  };



  // =====================================================

  // SUBMIT

  // =====================================================



  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!form.type) {

      return toast.error("Please select a request type");

    }

    if (!form.subject.trim()) {
      return toast.error("Please enter a subject");
    }

    if (!form.message.trim()) {

      return toast.error("Please enter your message");

    }



    if (form.message.length > 1000) {

      return toast.error("Message cannot exceed 1000 characters");

    }



    // Contact details validation

    if (form.type === "contact_change") {

      if (

        !form.name.trim() &&

        !form.email.trim() &&

        !form.phone.trim() &&

        !form.panCard &&

        !form.aadhaarCard

      ) {

        return toast.error(

          "Please enter contact details or upload a PAN/Aadhaar document"

        );

      }

    }



    // Bank details validation

    if (form.type === "bank_change") {

      if (

        !form.bank.beneficiaryName.trim() ||

        !form.bank.accountNumber.trim() ||

        !form.bank.ifsc.trim() ||

        !form.bank.branch.trim()

      ) {

        return toast.error("Please fill all required bank details");

      }

    }



    // File size validation: 5 MB per file

    const files = [

      form.panCard,

      form.aadhaarCard,

      form.bank.cancelCheque,

    ].filter(Boolean);



    const maxFileSize = 5 * 1024 * 1024;



    for (const file of files) {

      if (file.size > maxFileSize) {

        return toast.error(

          `${file.name} exceeds the 5 MB file size limit`

        );

      }



      const allowedTypes = [

        "application/pdf",

        "image/jpeg",

        "image/png",

      ];



      if (!allowedTypes.includes(file.type)) {

        return toast.error(

          "Only PDF, JPG, JPEG and PNG files are allowed"

        );

      }

    }



    try {

      setLoading(true);



      const requestedChanges = {};



      if (form.type === "contact_change") {

        if (form.name.trim()) {

          requestedChanges.name = form.name.trim();

        }



        if (form.email.trim()) {

          requestedChanges.email = form.email.trim();

        }



        if (form.phone.trim()) {

          requestedChanges.phone = form.phone.trim();

        }

      }



      if (form.type === "bank_change") {

        requestedChanges.bank = {

          beneficiaryName: form.bank.beneficiaryName.trim(),

          accountNumber: form.bank.accountNumber.trim(),

          ifsc: form.bank.ifsc.trim().toUpperCase(),

          branch: form.bank.branch.trim(),

        };

      }



      // FormData is required for multipart file uploads

      const formData = new FormData();



      formData.append("subject", form.subject.trim());



      formData.append("type", form.type);

      formData.append("message", form.message.trim());



      formData.append(

        "requestedChanges",

        JSON.stringify(requestedChanges)

      );



      // Contact documents

      if (form.type === "contact_change") {

        if (form.panCard) {

          formData.append("documents", form.panCard);

        }



        if (form.aadhaarCard) {

          formData.append("documents", form.aadhaarCard);

        }

      }



      // Cancelled cheque

      if (form.type === "bank_change" && form.bank.cancelCheque) {

        formData.append("documents", form.bank.cancelCheque);

      }



      const res = await axios.post("/api/contact", formData);



      toast.success(

        res.data?.message || "Request submitted successfully"

      );



      setSent(true);

      setForm(initialForm());

    } catch (err) {

      console.error("SUPPORT REQUEST ERROR:", err);



      toast.error(

        err?.response?.data?.message ||

          "Something went wrong. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };



  // =====================================================

  // SUCCESS

  // =====================================================



  if (sent) {

    return (

      <div className="py-12 text-center">

        <div className="relative mx-auto w-fit">

          <div className="absolute inset-0 bg-emerald-200/30 blur-2xl rounded-full" />



          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">

            <FiCheckCircle size={38} />

          </div>

        </div>



        <h3 className="mt-6 text-2xl font-extrabold text-slate-900">

          Request Submitted

        </h3>



        <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">

          Your request has been submitted successfully.

          Our support team will review it and get back to you shortly.

        </p>



        <div className="flex items-center justify-center gap-2 mt-5 text-xs font-semibold text-emerald-700">

          <FiClock />

          Usually reviewed within 2 business hours

        </div>



        <button

          type="button"

          onClick={() => setSent(false)}

          className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 transition"

        >

          <FiRefreshCw size={14} />

          Submit another request

        </button>

      </div>

    );

  }



  return (

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* REQUEST TYPE */}



      <div>

        <label className="block text-sm font-bold text-slate-800 mb-3">

          What can we help you with?

        </label>



        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <RequestTypeCard

            selected={form.type === "contact_change"}

            icon={<FiUser />}

            title="Contact Details"

            description="Update personal details and upload PAN/Aadhaar"

            onClick={() => setField("type", "contact_change")}

          />



          <RequestTypeCard

            selected={form.type === "bank_change"}

            icon={<FiCreditCard />}

            title="Bank Details"

            description="Update bank details and upload cancelled cheque"

            onClick={() => setField("type", "bank_change")}

          />



          <RequestTypeCard

            selected={form.type === "other"}

            icon={<FiMessageSquare />}

            title="Other Support"

            description="Ask us anything else"

            onClick={() => setField("type", "other")}

          />

        </div>

      </div>



      {/* CONTACT DETAILS */}



      {form.type === "contact_change" && (

        <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">

          <div className="flex items-start gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-sm">

              <FiUser />

            </div>



            <div>

              <h3 className="font-bold text-slate-900">

                Update Contact Information

              </h3>



              <p className="text-xs text-slate-500 mt-1">

                Enter the details you want to change and upload

                the required identity documents.

              </p>

            </div>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <InputField

              label="New Full Name"

              icon={<FiUser />}

              placeholder="Enter new name"

              value={form.name}

              onChange={(e) => setField("name", e.target.value)}

            />



            <InputField

              label="New Email Address"

              icon={<FiMail />}

              type="email"

              placeholder="name@example.com"

              value={form.email}

              onChange={(e) => setField("email", e.target.value)}

            />



            <InputField

              label="New Phone Number"

              icon={<FiPhone />}

              type="tel"

              placeholder="9876543210"

              value={form.phone}

              onChange={(e) =>

                setField(

                  "phone",

                  e.target.value.replace(/\D/g, "").slice(0, 10)

                )

              }

            />



            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <DocumentUpload

                label="PAN Card"

                value={form.panCard}

                onChange={(file) => setField("panCard", file)}

              />



              <DocumentUpload

                label="Aadhaar Card"

                value={form.aadhaarCard}

                onChange={(file) => setField("aadhaarCard", file)}

              />

            </div>

          </div>



          <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-amber-50 border border-amber-100 p-4">

            <FiShield className="text-amber-600 mt-0.5 shrink-0" />



            <p className="text-xs text-amber-800 leading-relaxed">

              Upload only the documents required for your request.

              Identity documents contain sensitive personal information

              and must be handled securely.

            </p>

          </div>

        </div>

      )}



      {/* BANK DETAILS */}



      {form.type === "bank_change" && (

        <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">

          <div className="flex items-start gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-sm">

              <FiCreditCard />

            </div>



            <div>

              <h3 className="font-bold text-slate-900">

                Update Bank Details

              </h3>



              <p className="text-xs text-slate-500 mt-1">

                Ensure the information matches your bank records.

              </p>

            </div>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <InputField

              label="Beneficiary Name"

              required

              placeholder="Account holder name"

              value={form.bank.beneficiaryName}

              onChange={(e) =>

                setBankField("beneficiaryName", e.target.value)

              }

            />



            <InputField

              label="Account Number"

              required

              placeholder="Enter account number"

              value={form.bank.accountNumber}

              onChange={(e) =>

                setBankField(

                  "accountNumber",

                  e.target.value.replace(/\D/g, "")

                )

              }

            />



            <InputField

              label="IFSC Code"

              required

              placeholder="HDFC0001234"

              value={form.bank.ifsc}

              onChange={(e) =>

                setBankField(

                  "ifsc",

                  e.target.value.toUpperCase().replace(/\s/g, "")

                )

              }

            />



            <InputField

              label="Branch"

              required

              placeholder="Branch name"

              value={form.bank.branch}

              onChange={(e) =>

                setBankField("branch", e.target.value)

              }

            />



            <div className="sm:col-span-2">

              <DocumentUpload

                label="Cancelled Cheque"

                value={form.bank.cancelCheque}

                onChange={(file) => setBankField("cancelCheque", file)}

              />

            </div>

          </div>



          <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-amber-50 border border-amber-100 p-4">

            <FiShield className="text-amber-600 mt-0.5 shrink-0" />



            <p className="text-xs text-amber-800 leading-relaxed">

              Bank detail changes are reviewed by our support team

              before they are applied to your account.

            </p>

          </div>

        </div>

      )}



      {/* SUBJECT AND MESSAGE */}



      {form.type && (

        <div className="space-y-4">

         
<InputField
  label="Subject"
  required
  placeholder={
    form.type === "contact_change"
      ? "Request to update contact details"
      : form.type === "bank_change"
      ? "Request to update bank details"
      : "How can we help you?"
  }
  value={form.subject}
  onChange={(e) => setField("subject", e.target.value)}
/>



          <div>

            <label className="block text-sm font-bold text-slate-800 mb-2">

              Message

              <span className="text-rose-500 ml-1">*</span>

            </label>



            <textarea

              required

              rows={5}

              maxLength={1000}

              value={form.message}

              onChange={(e) => setField("message", e.target.value)}

              placeholder="Please describe your request or issue in detail..."

              className="w-full resize-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all"

            />



            <div className="flex justify-end mt-1.5">

              <span className="text-[11px] text-slate-400">

                {form.message.length}/1000

              </span>

            </div>

          </div>

        </div>

      )}



      {/* SUBMIT */}



      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">

        <div className="flex items-center gap-2 text-xs text-slate-500">

          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">

            <FiShield size={14} />

          </div>



          Your information is securely handled

        </div>



        <button

          type="submit"

          disabled={loading || !form.type}

          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-teal-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-slate-900/10 hover:shadow-teal-900/20 active:scale-[0.98] transition-all"

        >

          {loading ? (

            <>

              <FiRefreshCw className="animate-spin" />

              Submitting...

            </>

          ) : (

            <>

              Submit Request

              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />

            </>

          )}

        </button>

      </div>

    </form>

  );

}



// =====================================================

// REQUEST TYPE CARD

// =====================================================



function RequestTypeCard({

  selected,

  icon,

  title,

  description,

  onClick,

}) {

  return (

    <button

      type="button"

      onClick={onClick}

      className={`text-left p-4 rounded-2xl border transition-all duration-200 ${

        selected

          ? "bg-teal-50 border-teal-300 ring-4 ring-teal-50 shadow-sm"

          : "bg-white border-slate-200 hover:border-teal-200 hover:shadow-sm"

      }`}

    >

      <div

        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${

          selected

            ? "bg-teal-700 text-white"

            : "bg-slate-50 text-slate-500"

        }`}

      >

        {icon}

      </div>



      <div className="font-bold text-sm text-slate-900">{title}</div>



      <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">

        {description}

      </div>

    </button>

  );

}



// =====================================================

// REUSABLE DOCUMENT UPLOAD

// =====================================================



function DocumentUpload({ label, value, onChange }) {

  return (

    <div>

      <label className="block text-sm font-bold text-slate-800 mb-2">

        {label}

      </label>



      <label className="flex items-center gap-3 w-full cursor-pointer bg-white border border-slate-200 rounded-2xl px-4 py-3.5 hover:border-teal-400 focus-within:ring-4 focus-within:ring-teal-50 transition-all">

        <span className="w-10 h-10 shrink-0 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">

          <FiCreditCard size={18} />

        </span>



        <span className="min-w-0 flex-1">

          <span className="block text-sm font-semibold text-slate-800">

            {value ? "Change document" : "Choose document"}

          </span>



          <span className="block text-xs text-slate-400 mt-1 truncate">

            {value ? value.name : "PDF, JPG or PNG · Max 5 MB"}

          </span>

        </span>



        <input

          type="file"

          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"

          className="sr-only"

          onChange={(e) => {

            const file = e.target.files?.[0] || null;

            onChange(file);

            e.target.value = "";

          }}

        />

      </label>



      {value && (

        <button

          type="button"

          onClick={() => onChange(null)}

          className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700"

        >

          Remove selected file

        </button>

      )}

    </div>

  );

}



// =====================================================

// INPUT

// =====================================================



function InputField({

  label,

  icon,

  type = "text",

  placeholder,

  value,

  onChange,

  required = false,

}) {

  return (

    <div>

      <label className="block text-sm font-bold text-slate-800 mb-2">

        {label}

        {required && <span className="text-rose-500 ml-1">*</span>}

      </label>



      <div className="relative">

        {icon && (

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">

            {icon}

          </span>

        )}



        <input

          type={type}

          required={required}

          value={value}

          onChange={onChange}

          placeholder={placeholder}

          className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all ${

            icon ? "pl-11" : ""

          }`}

        />

      </div>

    </div>

  );

}



// =====================================================

// FAQ DATA

// =====================================================



const faqs = [

  {

    q: "What is Pronex World?",

    a: (

      <p>

        Pronex World is a fractional real estate investment platform

        that enables investors to co-own premium real estate through

        dedicated Limited Liability Partnerships (LLPs). Each property

        is owned through a separate LLP, allowing investors to

        participate in high-value real estate with a minimum investment

        of ₹10 lakh.

      </p>

    ),

  },

  {

    q: "How does the LLP structure work?",

    a: (

      <>

        <p className="mb-3">

          For every property, Pronex World forms a separate LLP.

        </p>

        <ul className="list-disc pl-5 space-y-2">

          <li>

            Pronex World holds a 10% partnership interest and manages

            the LLP.

          </li>

          <li>

            The remaining 90% partnership interests are held by up to

            nine investors, each holding a 10% stake.

          </li>

          <li>

            Pronex World oversees property acquisition, documentation,

            compliance, asset management and exit on behalf of the LLP,

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

        <ul className="list-disc pl-5 space-y-2 mb-3">

          <li>Capital appreciation in the property's value over time.</li>

          <li>

            Rental income or other property income, where applicable

            and as provided under the LLP Agreement.

          </li>

          <li>

            Net proceeds upon the sale or exit of the property,

            distributed according to each partner's ownership interest.

          </li>

        </ul>

        <p>Investment returns are market-linked and are not guaranteed.</p>

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

        <ul className="list-disc pl-5 space-y-2">

          <li>Premium residential apartments</li>

          <li>Luxury villas</li>

          <li>Commercial office spaces</li>

          <li>Retail assets</li>

          <li>Mixed-use developments</li>

          <li>

            Other high-potential real estate opportunities identified

            through market intelligence

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

      <p>

        The minimum investment starts from ₹10,00,000, subject to the

        terms of the specific investment opportunity.

      </p>

    ),

  },

  {

    q: "Who manages the property?",

    a: (

      <p>

        Pronex World manages the day-to-day administration of each LLP,

        including property acquisition, legal documentation, compliance,

        asset management, reporting and exit coordination. Investors

        remain partners in the LLP and hold ownership interests as

        specified in the LLP Agreement.

      </p>

    ),

  },

  {

    q: "Is my investment diversified?",

    a: (

      <p>

        Yes. Instead of investing your entire capital in a single

        property, you may choose to invest across multiple LLPs,

        properties, cities and asset classes to build a diversified

        real estate portfolio.

      </p>

    ),

  },

];



// =====================================================

// FAQ

// =====================================================



function FAQ() {

  const [open, setOpen] = useState(null);



  return (

    <section id="faq" className="bg-slate-50 py-16 sm:py-20">

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-teal-700 shadow-sm mb-4">

            <FiMessageSquare />

            Help Center

          </div>



          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">

            Frequently Asked Questions

          </h2>



          <p className="text-slate-500 text-sm sm:text-base mt-2">

            Quick answers to common questions about Pronex World.

          </p>

        </div>



        <div className="space-y-3">

          {faqs.map((faq, index) => {

            const isOpen = open === index;



            return (

              <div

                key={index}

                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${

                  isOpen

                    ? "border-teal-200 shadow-md shadow-teal-900/5"

                    : "border-slate-100 shadow-sm"

                }`}

              >

                <button

                  type="button"

                  onClick={() => setOpen(isOpen ? null : index)}

                  className="w-full flex items-center justify-between gap-5 px-5 py-5 text-left"

                >

                  <span className="font-bold text-slate-900 text-sm sm:text-base">

                    {faq.q}

                  </span>



                  <span

                    className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center transition ${

                      isOpen

                        ? "bg-teal-50 text-teal-700"

                        : "bg-slate-50 text-slate-400"

                    }`}

                  >

                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}

                  </span>

                </button>



                {isOpen && (

                  <div className="px-5 pb-5">

                    <div className="border-t border-slate-100 pt-4 text-slate-500 text-sm leading-7">

                      {faq.a}

                    </div>

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

}



// =====================================================

// MAIN PAGE

// =====================================================



export default function ContactPage() {

  const location = useLocation();



  useEffect(() => {

    if (location.hash === "#faq") {

      const timer = setTimeout(() => {

        const el = document.getElementById("faq");



        if (el) {

          el.scrollIntoView({ behavior: "smooth" });

        }

      }, 100);



      return () => clearTimeout(timer);

    }

  }, [location]);



  return (

    <div

      className="min-h-screen bg-white font-sans text-slate-900"

      id="form"

    >

      {/* HERO */}



      <section className="relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-100/40 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-emerald-100/30 blur-3xl" />

        </div>



        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10">

          <div className="text-center max-w-3xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold mb-5">

              <FiHeadphones />

              We're here to help

            </div>



            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.05]">

              How can we{" "}

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600">

                help you?

              </span>

            </h1>



            <p className="text-slate-500 text-base sm:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">

              Have a question or need to update your account information?

              Submit a request and our support team will take care of it.

            </p>



            <div className="flex flex-wrap items-center justify-center gap-4 mt-7">

              <TrustItem icon={<FiClock />} text="Quick Response" />

              <TrustItem icon={<FiShield />} text="Secure Support" />

              <TrustItem icon={<FiCheckCircle />} text="Dedicated Team" />

            </div>

          </div>

        </div>

      </section>



      {/* FORM SECTION */}



      <section className="relative pb-16 sm:pb-20">

        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-900/5 overflow-hidden">

            <div className="px-6 sm:px-8 lg:px-10 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-sm">

                  <FiMessageSquare size={19} />

                </div>



                <div>

                  <h2 className="text-xl font-extrabold text-slate-950">

                    Submit a Support Request

                  </h2>



                  <p className="text-xs text-slate-500 mt-0.5">

                    Tell us what you need help with

                  </p>

                </div>

              </div>

            </div>



            <div className="p-6 sm:p-8 lg:p-10">

              <ContactForm />

            </div>

          </div>

        </div>

      </section>



      <FAQ />

    </div>

  );

}



// =====================================================

// TRUST ITEM

// =====================================================



function TrustItem({ icon, text }) {

  return (

    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">

      <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-sm">

        {icon}

      </span>

      {text}

    </div>

  );

}



// =====================================================

// TYPE LABEL

// =====================================================



function getTypeLabel(type) {

  switch (type) {

    case "contact_change":

      return "Request to Update Contact Information";



    case "bank_change":

      return "Request to Update Bank Details";



    default:

      return "Support Request";

  }

}
