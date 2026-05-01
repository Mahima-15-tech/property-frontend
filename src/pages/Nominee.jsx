import { useState } from "react";
import { FiArrowRight, FiShield } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setNominee } from "../slices/kycslice";
import axios from "../utils/axios";

const Nominee = ({setActive, edit, setEdit}) => {
   const dispatch =  useDispatch()
  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineePan: "",
    nomineeDob: "",
    nomineeAadhaar: ""
  });

  // generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "nomineePan" ? value.toUpperCase() : value
    }));
  };

  // Aadhaar formatter
  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 12);

    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

    setFormData((prev) => ({
      ...prev,
      nomineeAadhaar: formatted
    }));
  };

  // submit
  const handleSubmit = async () => {
    try {
      await axios.post("/api/kyc/nominee", {
        name: formData.nomineeName,
        panNumber: formData.nomineePan,
        aadhaarNumber: formData.nomineeAadhaar,
        dob: formData.nomineeDob,
      });
  
      setActive("bank");
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sm:min-h-screen font-sans flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-0 sm:px-8 py-6 flex flex-col items-center">
          <div className="w-full max-w-2xl">

            <div className="bg-white rounded-3xl sm:shadow-xl shadow-md border border-gray-100 p-2 sm:p-8">
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                Nominee Details
              </h1>
              <p className="text-gray-500 text-sm mb-7">
                Add your nominee details for secure account ownership.
              </p>

              <form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}>

                {/* Nominee Name */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Nominee Name <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <input
                      type="text"
                      name="nomineeName"
                      placeholder="Enter nominee name"
                      value={formData.nomineeName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* PAN */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    PAN Number <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <input
                      type="text"
                      name="nomineePan"
                      placeholder="Enter PAN number"
                      value={formData.nomineePan}
                      onChange={handleChange}
                      maxLength={10}
                      required
                      className="bg-transparent outline-none text-sm w-full"
                    />

                    <div className="flex items-center gap-1.5">
                      <MdOutlineVerified className="text-emerald-600" />
                      <span className="text-[0.6rem] sm:text-xs font-bold text-emerald-700 uppercase">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* DOB */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Date of Birth <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <input
                      type="date"
                      name="nomineeDob"
                      value={formData.nomineeDob}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Aadhaar */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Aadhaar Number <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <input
                      type="text"
                      name="nomineeAadhaar"
                      placeholder="1234 5678 9012"
                      value={formData.nomineeAadhaar}
                      onChange={handleAadhaarChange}
                      maxLength={14}
                      required
                      className="bg-transparent outline-none text-sm w-full"
                    />

                    <div className="flex items-center gap-1.5">
                      <MdOutlineVerified className="text-emerald-600" />
                      <span className="text-[0.6rem] sm:text-xs font-bold text-emerald-700 uppercase">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
                  <FiShield size={18} className="text-gray-400 mt-0.5" />
                  <p className="text-[0.6rem] sm:text-xs text-gray-600">
                    Nominee details are required for account security and fund transfer in case of unforeseen events.
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-2xl sm:text-base flex items-center justify-center gap-2"
                >
                  {edit === "nominee" ? "Update Nominee" : "Proceed to Bank Details"}
                  
                  <FiArrowRight size={18} />
                </button>

              </form>
            </div>

          </div>
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-800 px-4 py-3 flex justify-between">
        <div>
          <p className="text-white text-xs font-semibold">Completion Status</p>
          <p className="text-emerald-300 text-xs">60% Complete</p>
        </div>
        <div className="w-24 bg-emerald-700 rounded-full h-1.5">
          <div className="bg-emerald-300 h-1.5 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Nominee;