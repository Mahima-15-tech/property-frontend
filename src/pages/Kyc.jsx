
import { useEffect, useState } from "react";
import {
  FiUser,
  FiCreditCard,
  FiFileText,
  FiHome,
  FiCheckSquare,
  FiShield,
  FiCheck,
  FiArrowRight,
  FiMapPin,
  FiLock,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

import KycPanVerification from "./KycPanVerification";
import AadharVerify from "./AadharVerify";
import KycReviewandSubmit from "./KycReviewAndSubmit";
import Nominee from "./Nominee";
import BankDetails from "./BankDetails";
import axios from "../utils/axios";

const steps = [
  { key: "basic", label: "Personal", shortLabel: "01", icon: FiUser },
  { key: "pan", label: "PAN Details", shortLabel: "02", icon: FiCreditCard },
  { key: "id", label: "Identity", shortLabel: "03", icon: FiFileText },
  { key: "nominee", label: "Nominee", shortLabel: "04", icon: FiUser },
  { key: "bank", label: "Bank Details", shortLabel: "05", icon: FiHome },
  { key: "review", label: "Review", shortLabel: "06", icon: FiCheckSquare },
];

function StepBar({ active }) {
  const activeIndex = steps.findIndex((step) => step.key === active);
  const currentIndex = activeIndex < 0 ? 0 : activeIndex;

  return (
    <div className="w-full">
      {/* Desktop stepper */}
      <div className="hidden md:flex items-start w-full">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isDone = index < currentIndex;

          return (
            <div
              key={step.key}
              className="flex-1 flex flex-col items-center relative"
            >
              {index !== 0 && (
                <div
                  className={`absolute right-1/2 top-5 h-[2px] w-full ${
                    isDone ? "bg-teal-600" : "bg-slate-200"
                  }`}
                />
              )}

              {index < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 top-5 h-[2px] w-full ${
                    index < currentIndex ? "bg-teal-600" : "bg-slate-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-teal-700 bg-teal-700 text-white shadow-lg shadow-teal-700/20"
                    : isDone
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {isDone ? <FiCheck size={17} /> : <Icon size={17} />}
              </div>

              <span
                className={`mt-3 text-center text-xs font-medium ${
                  isActive
                    ? "text-teal-800"
                    : isDone
                    ? "text-slate-700"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-white">
              {(() => {
                const Icon = steps[currentIndex].icon;
                return <Icon size={20} />;
              })()}
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                STEP {currentIndex + 1} OF {steps.length}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">
                {steps[currentIndex].label}
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-teal-700">
            {Math.round(((currentIndex + 1) / steps.length) * 100)}%
          </span>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SecurityNotice() {
  return (
    <div className="flex gap-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
        <FiShield size={19} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">
          Your information matters
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Please provide accurate details. Your KYC information will be used
          for identity verification and compliance checks.
        </p>
      </div>
    </div>
  );
}

function PropertySummary({ property }) {
  if (!property) return null;

  const location = [
    property?.location?.city,
    property?.location?.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-teal-800 via-teal-700 to-slate-900 p-5 text-white">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-100">
          <FiHome size={15} />
          INVESTMENT PROPERTY
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug">
          {property.name || "Selected Property"}
        </h3>

        {location && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-teal-100">
            <FiMapPin size={14} />
            {location}
          </p>
        )}
      </div>

      <div className="space-y-4 p-5">
        {property.totalValue != null && (
          <div>
            <p className="text-xs text-slate-500">Total Property Value</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              ₹{Number(property.totalValue).toLocaleString("en-IN")}
            </p>
          </div>
        )}

        {property.pricePerShare != null && (
          <div>
            <p className="text-xs text-slate-500">Price Per Share</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              ₹{Number(property.pricePerShare).toLocaleString("en-IN")}
            </p>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="flex items-start gap-2">
            <FiLock className="mt-0.5 shrink-0 text-teal-700" size={15} />
            <p className="text-xs leading-5 text-slate-600">
              Complete your KYC and submit your details for review before
              proceeding with your investment.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BasicInfoForm({ setActive, edit, setEdit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const res = await axios.get("/api/kyc");
        const data = res.data?.kyc || res.data;

        if (mounted && data) {
          setForm({
            name: data.fullName || "",
            email: data.email || "",
            dob: data.dob ? data.dob.slice(0, 10) : "",
            address: data.address || "",
          });
        }
      } catch (error) {
        if (mounted) {
          console.error("Unable to load KYC details:", error);
        }
      } finally {
        if (mounted) setInitialLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 ${
      errors[field] ? "border-red-400" : "border-slate-200"
    }`;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (apiError) setApiError("");
  };

  const validate = () => {
    const nextErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const address = form.address.trim();

    if (name.length < 3 || name.length > 100) {
      nextErrors.name = "Enter your full name (3–100 characters).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.dob) {
      nextErrors.dob = "Date of birth is required.";
    } else {
      const selectedDate = new Date(`${form.dob}T00:00:00`);
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      if (
        Number.isNaN(selectedDate.getTime()) ||
        selectedDate > today
      ) {
        nextErrors.dob = "Enter a valid date of birth.";
      }
    }

    if (address.length < 10) {
      nextErrors.address = "Please enter your complete residential address.";
    }

    return nextErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setApiError("");

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      await axios.post("/api/kyc/basic", {
        fullName: form.name.trim(),
        email: form.email.trim(),
        dob: form.dob,
        address: form.address.trim(),
      });

      if (edit === "basic") {
        setActive("review");
        setEdit("");
      } else {
        setActive("pan");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "We couldn't save your details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-slate-500">
        <FiLoader className="animate-spin" size={19} />
        Loading your details...
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            autoComplete="name"
            className={inputClass("name")}
            placeholder="Enter your full name as per PAN"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            autoComplete="email"
            className={inputClass("email")}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            autoComplete="bday"
            className={inputClass("dob")}
            value={form.dob}
            max={new Date().toLocaleDateString("en-CA")}
            onChange={(e) => handleChange("dob", e.target.value)}
          />

          {errors.dob && (
            <p className="mt-1.5 text-xs text-red-600">{errors.dob}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Residential Address <span className="text-red-500">*</span>
          </label>

          <textarea
            autoComplete="street-address"
            rows={4}
            className={`${inputClass("address")} resize-y`}
            placeholder="Enter your complete residential address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          {errors.address && (
            <p className="mt-1.5 text-xs text-red-600">{errors.address}</p>
          )}
        </div>
      </div>

      <SecurityNotice />

      {apiError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <FiAlertCircle className="mt-0.5 shrink-0" size={17} />
          <p>{apiError}</p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          <span className="text-red-500">*</span> Required fields
        </p>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-800 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-700/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={17} />
              Saving Details...
            </>
          ) : (
            <>
              {edit === "basic" ? "Update Details" : "Save & Continue"}
              <FiArrowRight size={17} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FormCard({ setActive, edit, setEdit, property }) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
      <section className="min-w-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-white to-teal-50/50 px-5 py-6 sm:px-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800">
            <FiUser size={14} />
            PERSONAL INFORMATION
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Let's get to know you
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Start by sharing your personal details. Make sure they match your
            identity documents so your KYC review can proceed smoothly.
          </p>
        </div>

        <div className="p-5 sm:p-8">
          <BasicInfoForm
            setActive={setActive}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      </section>

      <div className="hidden xl:block">
        <PropertySummary property={property} />
      </div>

      {property && (
        <div className="xl:hidden">
          <PropertySummary property={property} />
        </div>
      )}
    </div>
  );
}

export default function KYCVerification() {
  const [active, setActive] = useState("basic");
  const [edit, setEdit] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const location = useLocation();

  const propertyId =
    location.state?.propertyId ||
    location.state?.property?._id ||
    location.state?.property?.id;

  const property = location.state?.property;

  const returnToInvestment = location.state?.returnToInvestment || false;
  const investmentShares = location.state?.shares;
  const investmentReferralCode = location.state?.referralCode || "";

  useEffect(() => {
    let mounted = true;

    const fetchKyc = async () => {
      try {
        const res = await axios.get("/api/kyc");
        const data = res.data?.kyc || res.data;

        if (!mounted) return;

        const stepMap = {
          1: "basic",
          2: "pan",
          3: "id",
          4: "nominee",
          5: "bank",
          6: "review",
        };

        setActive(stepMap[data?.currentStep] || "basic");
        setLoadError("");
      } catch (error) {
        if (!mounted) return;

        // Allow a new KYC form if no KYC record exists yet.
        if (error.response?.status === 404) {
          setActive("basic");
        } else {
          console.error("Unable to fetch KYC status:", error);
          setLoadError(
            error.response?.data?.message ||
              "We couldn't load your KYC progress. Please try again."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchKyc();

    return () => {
      mounted = false;
    };
  }, []);

  const retryFetch = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] font-sans text-slate-800">
      <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Page heading */}
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-sm">
              <FiShield size={14} />
              SECURE KYC PROCESS
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              KYC Verification
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Complete your identity and account details to continue with your
              property investment journey.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-600 shadow-sm sm:self-auto">
            <FiLock className="text-teal-700" size={15} />
            Secure information
          </div>
        </div>

        {/* Progress section */}
        <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white px-4 py-5 shadow-sm sm:mb-8 sm:px-7 sm:py-6">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                Your verification progress
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Complete each section with accurate information.
              </p>
            </div>

            {!loading && !loadError && (
              <span className="mt-1 text-xs font-medium text-slate-500 sm:mt-0">
                Step {steps.findIndex((step) => step.key === active) + 1} of{" "}
                {steps.length}
              </span>
            )}
          </div>

          <StepBar active={active} />
        </section>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <FiLoader className="animate-spin text-teal-700" size={30} />
            <p className="mt-4 text-sm font-medium text-slate-700">
              Loading your KYC progress...
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Please wait a moment.
            </p>
          </div>
        ) : loadError ? (
          <div className="rounded-3xl border border-red-100 bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <FiAlertCircle size={23} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Unable to load KYC
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {loadError}
            </p>

            <button
              type="button"
              onClick={retryFetch}
              className="mt-5 rounded-xl bg-teal-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-900"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {active === "basic" && (
              <FormCard
                setActive={setActive}
                edit={edit}
                setEdit={setEdit}
                property={property}
              />
            )}

            {active === "pan" && (
              <KycPanVerification
                setActive={setActive}
                edit={edit}
                setEdit={setEdit}
              />
            )}

            {active === "id" && (
              <AadharVerify
                setActive={setActive}
                edit={edit}
                setEdit={setEdit}
              />
            )}

            {active === "nominee" && (
              <Nominee
                setActive={setActive}
                edit={edit}
                setEdit={setEdit}
              />
            )}

            {active === "bank" && (
              <BankDetails
                setActive={setActive}
                edit={edit}
                setEdit={setEdit}
              />
            )}

            {active === "review" && (
              <KycReviewandSubmit
                setActive={setActive}
                edit={edit}
                setEdit={setEdit}
                returnToInvestment={returnToInvestment}
                property={property}
                propertyId={propertyId}
                shares={investmentShares}
                referralCode={investmentReferralCode}
              />
            )}
          </>
        )}

        {/* Footer information */}
        <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <FiShield className="shrink-0 text-teal-700" size={15} />
            Your details are used for KYC and compliance purposes.
          </p>

          <p className="text-xs text-slate-400">
            Submission does not mean KYC approval.
          </p>
        </div>
      </main>
    </div>
  );
}
