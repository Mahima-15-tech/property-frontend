import { useState } from "react";
import { BsBuilding } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "../utils/axios";

const FullOwnershipCard = ({
  property,
  investment,
  onRequest,
  loading,
  ownershipRequest,
  setOwnershipRequest,
}) => {
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentFile, setPaymentFile] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  if (!property || !investment) return null;

  const totalShares = Number(property.totalShares || 0);
  const currentShares = Number(investment.shares || 0);

  const remainingShares = Math.max(totalShares - currentShares, 0);

  const currentOwnership =
    totalShares > 0 ? (currentShares / totalShares) * 100 : 0;

  const isAlreadyFullOwner =
    currentShares >= totalShares || investment.isFullOwner === true;

  if (!property.enableFullOwnership) return null;

  if (isAlreadyFullOwner) {
    return (
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <FiCheckCircle className="text-xl text-green-600" />
          </div>

          <div>
            <h3 className="font-semibold text-green-800">
              Full Ownership Achieved
            </h3>

            <p className="text-sm text-green-700">
              You own 100% of this property.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (remainingShares <= 0) return null;

  const requestPaymentStatus = ownershipRequest?.paymentStatus;
  const requestStatus = ownershipRequest?.status;

  const paymentSubmitted =
    requestStatus === "payment_submitted" ||
    requestPaymentStatus === "payment_submitted";

  const paymentVerified =
    requestStatus === "payment_verified" ||
    requestPaymentStatus === "verified";

  const paymentRejected = requestPaymentStatus === "rejected";

  const additionalShares =
    Number(ownershipRequest?.additionalShares || remainingShares);

  const pricePerShare = Number(
    ownershipRequest?.pricePerShare ||
      property.currentPricePerShare ||
      property.sharePrice ||
      property.pricePerShare ||
      0
  );

  const totalAmount =
    Number(ownershipRequest?.totalAmount) ||
    additionalShares * pricePerShare;

  const handlePaymentProof = async () => {
    if (!ownershipRequest?._id) {
      toast.error("Ownership request not found");
      return;
    }

    if (!paymentReference.trim()) {
      toast.error("Please enter UTR / payment reference");
      return;
    }

    if (!paymentFile) {
      toast.error("Please upload payment screenshot");
      return;
    }

    try {
      setPaymentLoading(true);

      const formData = new FormData();

      formData.append("paymentReference", paymentReference.trim());
      formData.append("paymentMethod", "Bank Transfer");
      formData.append("file", paymentFile);

      const res = await axios.post(
        `/api/ownership/${ownershipRequest._id}/payment-proof`,
        formData
      );

      setOwnershipRequest(res.data?.request || ownershipRequest);

      toast.success("Payment proof submitted successfully");

      setPaymentReference("");
      setPaymentFile(null);
    } catch (error) {
      console.error("Payment proof error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to submit payment proof"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <BsBuilding className="text-xl text-blue-600" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Full Ownership
            </h3>

            <p className="text-sm text-gray-500">
              Increase your ownership to 100%
            </p>
          </div>
        </div>
      </div>

      {/* Ownership Progress */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Current Ownership
          </span>

          <span className="text-sm font-semibold text-gray-900">
            {currentOwnership.toFixed(1)}%
          </span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${Math.min(currentOwnership, 100)}%`,
            }}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Shares Owned</p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {currentShares.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Remaining Shares</p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {remainingShares.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Request Full Ownership */}
      {!ownershipRequest && (
        <div className="border-t border-gray-100 p-5">
          <button
            type="button"
            onClick={onRequest}
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Request..." : "Request 100% Ownership"}
          </button>
        </div>
      )}

      {/* Payment Pending */}
      {ownershipRequest &&
        !paymentSubmitted &&
        !paymentVerified &&
        !paymentRejected && (
          <div className="border-t border-gray-100 p-5">
            <div className="rounded-xl bg-blue-50 p-4">
              <h4 className="font-semibold text-gray-900">
                Complete Payment
              </h4>

              <p className="mt-1 text-sm text-gray-600">
                Transfer the required amount and submit your payment proof.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-xs text-gray-500">
                    Additional Shares
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {additionalShares.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-xs text-gray-500">
                    Price / Share
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    ₹{pricePerShare.toLocaleString()}
                  </p>
                </div>

                <div className="col-span-2 rounded-lg bg-white p-3">
                  <p className="text-xs text-gray-500">
                    Total Amount
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    ₹{totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-white p-3">
                <p className="text-xs text-gray-500">
                  Payment Method
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  Bank Transfer
                </p>
              </div>

              {/* UTR */}
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  UTR / Payment Reference
                </label>

                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) =>
                    setPaymentReference(e.target.value)
                  }
                  placeholder="Enter UTR number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Screenshot */}
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Payment Screenshot
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setPaymentFile(e.target.files?.[0] || null)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm"
                />
              </div>

              <button
                type="button"
                onClick={handlePaymentProof}
                disabled={paymentLoading}
                className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paymentLoading
                  ? "Submitting..."
                  : "Submit Payment Proof"}
              </button>
            </div>
          </div>
        )}

      {/* Payment Submitted */}
      {paymentSubmitted && !paymentVerified && (
        <div className="border-t border-gray-100 p-5">
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <FiCheckCircle className="text-lg text-yellow-600" />
              </div>

              <div>
                <h4 className="font-semibold text-yellow-800">
                  Payment Submitted
                </h4>

                <p className="mt-1 text-sm text-yellow-700">
                  Your payment proof has been submitted and is
                  waiting for verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Verified */}
      {paymentVerified && (
        <div className="border-t border-gray-100 p-5">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <FiCheckCircle className="text-lg text-green-600" />
              </div>

              <div>
                <h4 className="font-semibold text-green-800">
                  Payment Verified
                </h4>

                <p className="mt-1 text-sm text-green-700">
                  Your payment has been verified successfully.
                  Your full ownership request is now being processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Rejected */}
      {paymentRejected && (
        <div className="border-t border-gray-100 p-5">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <h4 className="font-semibold text-red-800">
              Payment Proof Rejected
            </h4>

            <p className="mt-1 text-sm text-red-700">
              Your payment proof was rejected. Please submit the
              correct payment details again.
            </p>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                UTR / Payment Reference
              </label>

              <input
                type="text"
                value={paymentReference}
                onChange={(e) =>
                  setPaymentReference(e.target.value)
                }
                placeholder="Enter UTR number"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Payment Screenshot
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPaymentFile(e.target.files?.[0] || null)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handlePaymentProof}
              disabled={paymentLoading}
              className="mt-4 w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentLoading
                ? "Submitting..."
                : "Resubmit Payment Proof"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullOwnershipCard;