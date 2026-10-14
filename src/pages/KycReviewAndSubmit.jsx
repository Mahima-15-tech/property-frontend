
import { useState, useEffect } from "react";
import {
  FiUser,
  FiCreditCard,
  FiFileText,
  FiCamera,
  FiCheckSquare,
  FiShield,
  FiCheck,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

function Section({ title, type, setEdit, setActive, children }) {
  const onEdit = (e) => {
    e.preventDefault();
    setActive(type);
    setEdit(type);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-emerald-800">{title}</h2>

        <button
          type="button"
          className="text-sm text-gray-500 hover:text-emerald-700 font-medium transition-colors"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>

      {children}
    </div>
  );
}

function Field({ label, value }) {
  const displayValue =
    value !== undefined && value !== null && String(value).trim() !== ""
      ? String(value)
      : "Not provided";

  return (
    <div className="min-w-0">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>

      <p className="text-sm font-semibold text-gray-900 break-words">
        {displayValue}
      </p>
    </div>
  );
}

export default function KycReviewandSubmit({
  setActive,
  edit,
  setEdit,
  returnToInvestment,
  property,
  propertyId,
  shares,
  referralCode,
}) {
  const navigate = useNavigate();

  const [confirmed, setConfirmed] = useState(false);
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchKyc = async () => {
      try {
        const res = await axios.get("/api/kyc");

        if (mounted) {
          setKycData(res.data?.data || res.data);
        }
      } catch (err) {
        console.error("Failed to fetch KYC details:", err);

        if (mounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load your KYC details. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchKyc();

    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async () => {
    if (!confirmed || submitting) return;

    setError("");
    setSubmissionMessage("");
    setSubmitting(true);

    try {
      const res = await axios.post("/api/kyc/submit");

      const message =
        res.data?.message ||
        "Your KYC details have been submitted for team review.";

      // Submission is not the same as approval.
      setSubmissionMessage(message);

      // Do not send the user to investment checkout before
      // the backend confirms that KYC has been approved.
      navigate("/kyc-submission", {
        replace: true,
        state: {
          message,
          status: "pending",
          propertyId,
        },
      });
    } catch (err) {
      console.error("KYC submission error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to submit KYC. Please check your details and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500">
        Loading your KYC details...
      </div>
    );
  }

  if (error && !kycData) {
    return (
      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl border border-red-200 p-6">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="text-red-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-900">
              Unable to load KYC details
            </p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!kycData) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No KYC details found. Please complete your KYC first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            Review & Submit
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Review your information before submitting it for team approval.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <FiClock
              size={20}
              className="text-amber-700 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Team approval required
              </p>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                After you submit your details, Our team will review your KYC
                information and documents. Your KYC will be approved only after
                the team completes the review.
              </p>
            </div>
          </div>

          <Section
            title="Personal Information"
            type="basic"
            setActive={setActive}
            setEdit={setEdit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" value={kycData.fullName} />
              <Field label="Email Address" value={kycData.email} />
              <Field
                label="Date of Birth"
                value={kycData.dob?.slice(0, 10)}
              />
              <Field label="Residential Address" value={kycData.address} />
            </div>
          </Section>

          <Section
            title="PAN Details"
            type="pan"
            setActive={setActive}
            setEdit={setEdit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="PAN Number" value={kycData.panNumber} />
            </div>

            {kycData.panFile && (
              <div className="mt-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
                  Uploaded PAN Document
                </p>
                <a
                  href={kycData.panFile}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-emerald-800 underline break-all"
                >
                  View PAN document
                </a>
              </div>
            )}

            
          </Section>

          <Section
            title="Identity Details"
            type="id"
            setActive={setActive}
            setEdit={setEdit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Aadhaar Number"
                value={kycData.aadhaarNumber}
              />
            </div>

            {kycData.aadhaarFile && (
              <div className="mt-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
                  Uploaded Identity Document
                </p>
                <a
                  href={kycData.aadhaarFile}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-emerald-800 underline break-all"
                >
                  View identity document
                </a>
              </div>
            )}

           
          </Section>

          <Section
            title="Nominee Details"
            type="nominee"
            setActive={setActive}
            setEdit={setEdit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Nominee Name"
                value={kycData.nominee?.name}
              />
              <Field
                label="Nominee PAN"
                value={kycData.nominee?.panNumber}
              />
              <Field
                label="Nominee Date of Birth"
                value={kycData.nominee?.dob?.slice(0, 10)}
              />
              <Field
                label="Nominee Aadhaar"
                value={kycData.nominee?.aadhaarNumber}
              />
            </div>
          </Section>

          <Section
            title="Bank Details"
            type="bank"
            setActive={setActive}
            setEdit={setEdit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Beneficiary Name"
                value={kycData.bank?.beneficiaryName}
              />
              <Field
                label="Account Number"
                value={kycData.bank?.accountNumber}
              />
              <Field
                label="Branch Name"
                value={kycData.bank?.branch}
              />
              <Field label="IFSC Code" value={kycData.bank?.ifsc} />
            </div>

            {kycData.bank?.cancelCheque && (
              <div className="mt-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
                  Uploaded Bank Document
                </p>
                <a
                  href={kycData.bank.cancelCheque}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-emerald-800 underline break-all"
                >
                  View bank document
                </a>
              </div>
            )}
          </Section>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex items-start gap-3">
            <input
              id="kyc-confirmation"
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-800 shrink-0"
            />

            <label htmlFor="kyc-confirmation" className="cursor-pointer">
              <p className="text-sm font-bold text-gray-900 mb-1">
                I confirm that my details are correct
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                I declare that the information provided is true and accurate
                to the best of my knowledge. I understand that my KYC
                submission is subject to team review and approval.
              </p>
            </label>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {submissionMessage && (
            <div className="mb-5 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
              {submissionMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8">
            <p className="text-xs text-gray-500">
              Please check all details before final submission.
            </p>

            <button
              type="button"
              disabled={!confirmed || submitting}
              onClick={onSubmit}
              className={`px-8 py-3.5 rounded-2xl text-sm font-bold transition-colors ${
                confirmed && !submitting
                  ? "bg-emerald-800 hover:bg-emerald-900 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting ? "Submitting..." : "Submit KYC for Review"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
