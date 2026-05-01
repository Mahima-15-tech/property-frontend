
import { useState, useEffect } from "react";
import { FiHelpCircle, FiBell, FiUser, FiCreditCard, FiFileText, FiCamera, FiCheckSquare, FiShield, FiCheck } from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "../utils/axios";

const NAV_STEPS = [
  { icon: <FiUser size={16} />, label: "Basic Info" },
  { icon: <FiCreditCard size={16} />, label: "PAN Verify" },
  { icon: <FiFileText size={16} />, label: "ID Verify" },
  { icon: <FiFileText size={16} />, label: "Documents" },
  { icon: <FiCamera size={16} />, label: "Selfie" },
  { icon: <BsBank2 size={16} />, label: "Bank Details" },
  { icon: <FiCheckSquare size={16} />, label: "Review", active: true },
];

const PROGRESS = [
  { label: "INFO" },
  { label: "PAN" },
  { label: "ID" },
  { label: "DOCS" },
  { label: "BANK" },
  { label: "FINAL", num: "06" },
];

const DOCS = [
  { img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80", name: "ID_FRONT.JPG" },
  { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&q=80", name: "BANK_STMT.PDF" },
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", name: "SELFIE.PNG" },
];


function Section({ title, type, setEdit, setActive, children }) {

  const onEdit = (e) => {
    e.preventDefault() ;
    setActive(type)
    setEdit(type);
  }
  

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-4 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-emerald-800">{title}</h2>
        <button className="text-sm text-gray-500 hover:text-emerald-700 font-medium transition-colors"
         onClick={onEdit}>
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, icon }) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-gray-500">{icon}</span>}
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

const handleSubmit = async () => {
  try {
    await axios.post("/api/kyc/submit");

    alert("KYC Submitted Successfully");

  } catch (err) {
    console.log(err);
  }
};

export default function KycReviewandSubmit({setActive, edit, setEdit}) {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState(6);
  const [confirmed, setConfirmed] = useState(false);
 
  const [kycData, setKycData] = useState(null);

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const res = await axios.get("/api/kyc");
        console.log("KYC DATA:", res.data); // debug
        setKycData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchKyc();
  }, []);

  // console.log("pan",panPreview   );
  // console.log("aadhar",aadhaarPreview   );

  const onSubmit = async () => {
    try {
      await axios.post("/api/kyc/submit");
      navigate('/kyc-submission');
    } catch (err) {
      console.log(err);
    }
  };

  if (!kycData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      <div className="flex flex-1">

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">Review & Submit</h1>
            <p className="text-gray-500 text-sm mb-8">Please double check your details before final submission</p>

          

            <Section title="Personal Info" setActive={setActive} type="basic"  setEdit={setEdit} >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" value={kycData.fullName || "-"} />
              <Field label="Email Address" value={kycData.email || "-"} />
                <div className="sm:col-span-1 space-y-5 ">
                <Field label="DOB" value={kycData.dob?.slice(0,10) || "-"} />
                <Field label="Residential Address" value={kycData.address || "-"} />
                </div>
              </div>
            </Section>

            <Section title="Pan Verification" setActive={setActive}  type="pan"  setEdit={setEdit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="PAN Number" value={kycData.panNumber || "-"} />

{kycData.panFile && (
  <img src={kycData.panFile} alt="PAN" className="h-24 mt-2" />
)}
              
              
            
                <Field label="Document Type" value="Passport (United Kingdom)" icon={<FiShield size={14} className="text-emerald-700" />} />
              </div>
            </Section>

            <Section title="Aadhar Verification" setActive={setActive}  type="id"  setEdit={setEdit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Aadhaar Number" value={kycData.aadhaarNumber || "-"} />

{kycData.aadhaarFile && (
  <img src={kycData.aadhaarFile} alt="aadhaar" className="h-24 mt-2" />
)}
               
              </div>
            </Section>

            <Section title="Nominee Verification" setActive={setActive}  type="nominee"  setEdit={setEdit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Nominee Name" value={kycData.nominee?.name || "-"} />
<Field label="Nominee PAN" value={kycData.nominee?.panNumber || "-"} />
<Field label="Nominee DOB" value={kycData.nominee?.dob || "-"} />
<Field label="Nominee Aadhaar" value={kycData.nominee?.aadhaarNumber || "-"} />
              
              </div>
            </Section>

            <Section title="Bank Verification" setActive={setActive}  type="bank"  setEdit={setEdit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Beneficiary Name" value={kycData.bank?.beneficiaryName || "-"} />
<Field label="Account Number" value={kycData.bank?.accountNumber || "-"} />
<Field label="Branch Name" value={kycData.bank?.branch || "-"} />
<Field label="IFSC Code" value={kycData.bank?.ifsc || "-"} />

{kycData.bank?.cancelCheque && (
  <img src={kycData.bank.cancelCheque} alt="cheque" className="h-24 mt-2" />
)}
               
              </div>
            </Section>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex items-start gap-3">
             
              <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={() => setConfirmed(!confirmed)}
                        className="hidden"
                      />

                      <span
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          confirmed
                            ? "bg-emerald-700 border-emerald-700"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {confirmed && <FiCheck size={12} className="text-white" />}
                      </span>
                    </label>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">I confirm all details are correct</p>
                <p className="text-xs text-gray-500 leading-relaxed">I hereby declare that the information provided is true and accurate to the best of my knowledge. I understand that providing false information may result in application rejection.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pb-8">
              
              <button disabled={!confirmed} onClick={onSubmit}
                className={`px-8 py-3.5 rounded-2xl text-sm font-bold transition-colors ${confirmed ? "bg-emerald-800 hover:bg-emerald-900 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
              
                  Submit KYC
               
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}