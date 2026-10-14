
import { useState } from "react";
import {
  FiArrowRight,
  FiShield,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setBank } from "../slices/kycslice";
import axios from "../utils/axios";

export default function BankDetails({ setActive, edit, setEdit }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    beneficiaryName: "",
    accountNumber: "",
    branchName: "",
    ifscCode: "",
  });

  const [cancelCheckFile, setCancelCheckFile] = useState(null);
  const [cancelCheckPreview, setCancelCheckPreview] = useState("");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const { cancelCheckUpload } = useSelector((state) => state.kyc);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "ifscCode" ? value.toUpperCase().trimStart() : value,
    }));

    setError("");
    setSubmitError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG or PNG image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setCancelCheckFile(file);
    setError("");
    setSubmitError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setCancelCheckPreview(reader.result);

      dispatch(
        setBank({
          cancelCheckUpload: reader.result,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitError("");

    const beneficiaryName = formData.beneficiaryName.trim();
    const accountNumber = formData.accountNumber.trim();
    const branchName = formData.branchName.trim();
    const ifscCode = formData.ifscCode.trim().toUpperCase();

    if (!beneficiaryName || !accountNumber || !branchName || !ifscCode) {
      setError("Please fill in all required bank details.");
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      setError("Please enter a valid IFSC code.");
      return;
    }

    if (!/^\d{8,20}$/.test(accountNumber)) {
      setError("Please enter a valid bank account number.");
      return;
    }

    if (!cancelCheckFile && !cancelCheckUpload) {
      setError("Please upload a cancelled cheque or accepted bank document.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("beneficiaryName", beneficiaryName);
      data.append("accountNumber", accountNumber);
      data.append("ifsc", ifscCode);
      data.append("branch", branchName);

      if (cancelCheckFile) {
        data.append("document", cancelCheckFile);
      }

      await axios.post("/api/kyc/bank", data);

      // Saving bank details only moves the user to the review step.
      // It does not mean the bank details or KYC are approved.
      setActive("review");
    } catch (err) {
      console.error("Bank details submission error:", err);

      setSubmitError(
        err.response?.data?.message ||
          "Unable to save bank details. Please try again."
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
                Bank Details
              </h1>

              <p className="text-gray-500 text-sm mb-6">
                Enter your bank details and upload the required document for
                review.
              </p>

              {/* Review notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
                <FiClock
                  size={19}
                  className="text-amber-700 shrink-0 mt-0.5"
                />

                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    Team review required
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mt-1">
                    Your bank details and uploaded document will be reviewed
                    as part of your KYC application. Saving these details
                    does not mean they have been approved.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Beneficiary Name */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Beneficiary Name{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
                    <input
                      type="text"
                      name="beneficiaryName"
                      value={formData.beneficiaryName}
                      onChange={handleChange}
                      placeholder="Enter beneficiary name"
                      autoComplete="off"
                      maxLength={100}
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Account Number */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Account Number{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
                    <input
                      type="text"
                      inputMode="numeric"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData((prev) => ({
                          ...prev,
                          accountNumber: value,
                        }));
                        setError("");
                        setSubmitError("");
                      }}
                      placeholder="Enter bank account number"
                      autoComplete="off"
                      maxLength={20}
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Branch Name */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Branch Name{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                      placeholder="Enter branch name"
                      maxLength={100}
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* IFSC Code */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    IFSC Code <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter IFSC code"
                      maxLength={11}
                      minLength={11}
                      autoComplete="off"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Cancelled Cheque */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-800 mb-2 block">
                    Cancelled Cheque / Bank Document{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl px-3 py-3.5 bg-gray-50">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleFileChange}
                      required={!cancelCheckUpload}
                      className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-800 file:font-semibold"
                    />
                  </div>

                  {cancelCheckFile && (
                    <p className="text-xs text-gray-600 mt-2">
                      Selected file: {cancelCheckFile.name}
                    </p>
                  )}

                  {cancelCheckPreview && (
                    <img
                      src={cancelCheckPreview}
                      alt="Cancelled cheque preview"
                      className="mt-3 h-24 max-w-full rounded-lg border border-gray-200 object-contain"
                    />
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Accepted formats: JPG and PNG. Maximum size: 5 MB.
                  </p>
                </div>

                {/* Error messages */}
                {error && (
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                    <FiAlertCircle
                      size={17}
                      className="text-red-600 shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                )}

                {/* Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3 mb-7">
                  <FiShield
                    size={18}
                    className="text-gray-500 shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">
                      Bank Information:
                    </span>{" "}
                    Please ensure your bank details are accurate. They will
                    be used for the purposes described in the platform's
                    applicable policies and reviewed as part of your KYC
                    submission.
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
                    : edit === "bank"
                    ? "Update Bank Details"
                    : "Review & Submit KYC"}

                  {!loading && <FiArrowRight size={18} />}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
