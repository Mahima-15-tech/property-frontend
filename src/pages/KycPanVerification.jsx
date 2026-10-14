
import { useState } from "react";
import {
  FiUser,
  FiCreditCard,
  FiFileText,
  FiCamera,
  FiArrowRight,
  FiShield,
  FiInfo,
  FiClock,
} from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios";
import { setPan } from "../slices/kycslice";

const STEPS = [
  { icon: <FiUser size={16} />, label: "Basic Info" },
  { icon: <FiCreditCard size={16} />, label: "PAN Details" },
  { icon: <FiFileText size={16} />, label: "ID Details" },
  { icon: <FiFileText size={16} />, label: "Documents" },
  { icon: <FiCamera size={16} />, label: "Selfie" },
  { icon: <BsBank2 size={16} />, label: "Bank Details" },
];

export default function KycPanVerification({
  setActive,
  edit,
  setEdit,
}) {
  const [panNum, setPanNum] = useState("");
  const [panFile, setPanFile] = useState(null);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { panPreview } = useSelector((state) => state.kyc);

  const handleChange = (e) => {
    const value = e.target.value
      .toUpperCase()
      .replace(/\s/g, "");

    setPanNum(value);
    setError("");
    setSubmitError("");

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (value && value.length === 10 && !panRegex.test(value)) {
      setError("Please enter a valid PAN number");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(file.type)) {
      setError("Please upload a JPG, PNG or PDF file");
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
    setPanFile(file);

    // Preview only image files. PDFs can still be uploaded.
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        dispatch(
          setPan({
            panPreview: reader.result,
          })
        );
      };

      reader.readAsDataURL(file);
    } else {
      dispatch(setPan({ panPreview: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitError("");

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!panRegex.test(panNum)) {
      setError("Please enter a valid 10-character PAN number");
      return;
    }

    if (!panFile && !panPreview) {
      setError("Please upload your PAN document");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("panNumber", panNum);

      if (panFile) {
        formData.append("document", panFile);
      }

      await axios.post("/api/kyc/pan", formData);

      // Continue to the next KYC step.
      // PAN approval must be managed by the admin/backend.
      setActive("id");
   
} catch (err) {
  console.error("PAN submission failed:", {
    status: err.response?.status,
    response: err.response?.data,
    message: err.message,
    url: err.config?.url,
    contentType: err.config?.headers?.["Content-Type"],
  });

  setSubmitError(
    err.response?.data?.message ||
    err.response?.data?.error ||
    "PAN submission failed. Please check the backend logs."
  );
} finally {
  setLoading(false);
}

  };

  const inputCls =
    "w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-white border border-gray-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all";

  return (
    <div className="sm:min-h-screen font-sans flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-0 sm:px-8 py-6 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl sm:shadow-xl shadow-md border border-gray-100 p-4 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                PAN Details
              </h1>

              <p className="text-gray-500 text-sm mb-6">
                Enter your PAN details and upload the document for team
                review.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
                <FiClock
                  size={19}
                  className="text-amber-700 shrink-0 mt-0.5"
                />

                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    Team review required
                  </p>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Your PAN details will be reviewed by our team after
                    submission. Approval is required before your PAN can be
                    marked as approved.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    PAN Number <sup className="text-emerald-800">*</sup>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter 10-character PAN number"
                    value={panNum}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    autoComplete="off"
                    className={inputCls}
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Enter your PAN exactly as printed on your PAN card.
                  </p>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Upload PAN Document{" "}
                    <sup className="text-emerald-800">*</sup>
                  </label>

                  <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      onChange={handleFileChange}
                      required={!panPreview}
                      className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-800 file:font-semibold"
                    />
                  </div>

                  {panFile && (
                    <p className="text-xs text-gray-600 mt-2">
                      Selected file: {panFile.name}
                    </p>
                  )}

                  {panPreview && (
                    <img
                      src={panPreview}
                      alt="PAN document preview"
                      className="mt-3 h-24 max-w-full rounded-lg border border-gray-200 object-contain"
                    />
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Accepted formats: JPG, PNG or PDF. Maximum size: 5 MB.
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                )}

                {submitError && (
                  <p className="text-sm text-red-600 mb-4">
                    {submitError}
                  </p>
                )}

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3 mb-7">
                  <FiShield
                    size={18}
                    className="text-gray-500 shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">
                      Document Review:
                    </span>{" "}
                    Your PAN details and uploaded document will be submitted
                    for administrative review. The final approval status will
                    depend on the team's decision.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
                >
                  {loading
                    ? "Submitting..."
                    : edit === "pan"
                    ? "Update PAN Details"
                    : "Submit PAN & Continue"}

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
