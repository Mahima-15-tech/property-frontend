
import {
  FiInfo,
  FiShield,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAadhaar } from "../slices/kycslice";
import axios from "../utils/axios";

const AadharVerify = ({ setActive, edit, setEdit }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadharFile, setAadharFile] = useState(null);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const { aadhaarPreview } = useSelector((state) => state.kyc);
  const dispatch = useDispatch();

  const handleAadhaarNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setAadhaarNumber(formatted);
    setError("");
    setSubmitError("");
  };

  const handleAadhaarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG or PNG image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB");
      e.target.value = "";
      return;
    }

    setError("");
    setSubmitError("");
    setAadharFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(
        setAadhaar({
          aadhaarPreview: reader.result,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitError("");

    const cleanAadhaar = aadhaarNumber.replace(/\s/g, "");

    if (!/^\d{12}$/.test(cleanAadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    if (!aadharFile && !aadhaarPreview) {
      setError("Please upload your Aadhaar document");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("aadhaarNumber", cleanAadhaar);

      if (aadharFile) {
        formData.append("document", aadharFile);
      }

      const res = await axios.post("/api/kyc/aadhaar", formData);

      // Continue only after the backend accepts the submission.
      // Admin approval is handled separately.
      if (
        res.data?.kyc?.currentStep === 4 ||
        res.status === 200 ||
        res.status === 201
      ) {
        setActive("nominee");
      }
    } catch (err) {
      console.error("Aadhaar submission error:", err);

      setSubmitError(
        err.response?.data?.message ||
          "Unable to submit Aadhaar details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400";

  return (
    <div className="flex items-center justify-center px-0 sm:px-4 py-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            Aadhaar Details
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Enter your Aadhaar details and upload the document for team
            review.
          </p>

          {/* Admin review notice */}
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
                Your Aadhaar details will be reviewed by our team after
                submission. Approval is required before your KYC can be
                completed.
              </p>
            </div>
          </div>

          {/* Aadhaar Number */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Aadhaar Number <sup className="text-emerald-800">*</sup>
            </label>

            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus-within:border-emerald-600">
              <input
                placeholder="XXXX XXXX XXXX"
                value={aadhaarNumber}
                onChange={handleAadhaarNumber}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required
                maxLength={14}
                className={inputCls}
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Enter your 12-digit Aadhaar number.
            </p>
          </div>

          {/* Aadhaar Document */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Upload Aadhaar Document{" "}
              <sup className="text-emerald-800">*</sup>
            </label>

            <div className="border border-gray-200 rounded-xl px-3 py-3.5 bg-gray-50">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleAadhaarChange}
                required={!aadhaarPreview}
                className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-800 file:font-semibold"
              />
            </div>

            {aadharFile && (
              <p className="text-xs text-gray-600 mt-2">
                Selected file: {aadharFile.name}
              </p>
            )}

            {aadhaarPreview && (
              <img
                src={aadhaarPreview}
                alt="Aadhaar document preview"
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
            <p className="text-sm text-red-600 mb-4">{submitError}</p>
          )}

          {/* Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3 mb-7">
            <FiShield
              size={18}
              className="text-gray-500 shrink-0 mt-0.5"
            />

            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">
                Document Review:
              </span>{" "}
              Your Aadhaar information and uploaded document will be submitted
              for administrative review. The final approval status depends on
              the team's decision.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
          >
            {loading
              ? "Submitting..."
              : edit === "id"
              ? "Update Aadhaar Details"
              : "Submit Aadhaar & Continue"}

            {!loading && <FiArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AadharVerify;
