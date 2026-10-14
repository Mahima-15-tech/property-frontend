
import { useState } from "react";
import {
  FiArrowRight,
  FiShield,
  FiClock,
} from "react-icons/fi";
import axios from "../utils/axios";

const Nominee = ({ setActive, edit, setEdit }) => {
  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineePan: "",
    nomineeDob: "",
    nomineeAadhaar: "",
  });

  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "nomineePan" ? value.toUpperCase() : value,
    }));

    setError("");
    setSubmitError("");
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setFormData((prev) => ({
      ...prev,
      nomineeAadhaar: formatted,
    }));

    setError("");
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitError("");

    const cleanAadhaar = formData.nomineeAadhaar.replace(/\s/g, "");
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!formData.nomineeName.trim()) {
      setError("Please enter the nominee's full name.");
      return;
    }

    if (!panRegex.test(formData.nomineePan.trim())) {
      setError("Please enter a valid 10-character PAN number.");
      return;
    }

    if (!formData.nomineeDob) {
      setError("Please select the nominee's date of birth.");
      return;
    }

    if (new Date(formData.nomineeDob) >= new Date()) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (!/^\d{12}$/.test(cleanAadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/kyc/nominee", {
        name: formData.nomineeName.trim(),
        panNumber: formData.nomineePan.trim(),
        aadhaarNumber: cleanAadhaar,
        dob: formData.nomineeDob,
      });

      // Continue to the next form step.
      // This does not mean the nominee's details are approved.
      setActive("bank");
    } catch (err) {
      console.error("Nominee submission error:", err);

      setSubmitError(
        err.response?.data?.message ||
          "Unable to save nominee details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400";

  return (
    <div className="sm:min-h-screen font-sans flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-0 sm:px-8 py-6 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl sm:shadow-xl shadow-md border border-gray-100 p-4 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                Nominee Details
              </h1>

              <p className="text-gray-500 text-sm mb-6">
                Provide your nominee's details for account and investment
                records.
              </p>

              {/* Admin review notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
                <FiClock
                  size={19}
                  className="text-amber-700 shrink-0 mt-0.5"
                />

                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    Details subject to review
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mt-1">
                    Please ensure the nominee information is accurate. The
                    submitted details will be reviewed as part of your KYC
                    application.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Nominee Name */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Nominee Name{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <input
                      type="text"
                      name="nomineeName"
                      placeholder="Enter nominee's full name"
                      value={formData.nomineeName}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Nominee PAN */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Nominee PAN Number{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
                    <input
                      type="text"
                      name="nomineePan"
                      placeholder="Enter 10-character PAN"
                      value={formData.nomineePan}
                      onChange={handleChange}
                      maxLength={10}
                      minLength={10}
                      autoComplete="off"
                      required
                      className={inputCls}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Enter the PAN number exactly as printed on the card.
                  </p>
                </div>

                {/* DOB */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Date of Birth{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <input
                      type="date"
                      name="nomineeDob"
                      value={formData.nomineeDob}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Aadhaar */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Nominee Aadhaar Number{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
                    <input
                      type="text"
                      name="nomineeAadhaar"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.nomineeAadhaar}
                      onChange={handleAadhaarChange}
                      maxLength={14}
                      inputMode="numeric"
                      autoComplete="off"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Error messages */}
                {error && (
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                )}

                {submitError && (
                  <p className="text-sm text-red-600 mb-4">
                    {submitError}
                  </p>
                )}

                {/* Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3 mb-7">
                  <FiShield
                    size={18}
                    className="text-gray-500 shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">
                      Important:
                    </span>{" "}
                    Please ensure all nominee details are correct. The
                    information will be included in your KYC submission and
                    may be reviewed by our team.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
                >
                  {loading
                    ? "Saving Details..."
                    : edit === "nominee"
                    ? "Update Nominee Details"
                    : "Save & Continue to Bank Details"}

                  {!loading && <FiArrowRight size={18} />}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Nominee;
