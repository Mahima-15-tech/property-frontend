import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiShield, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../utils/axios";

export default function CookiePolicy() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCookiePolicy = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("api/legal-pages/cookie-policy");

        if (response.data?.success && response.data?.page) {
          setPage(response.data.page);
        } else {
          setError("Cookie Policy is currently unavailable.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Cookie Policy is currently unavailable. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCookiePolicy();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800 transition"
          >
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-teal-700 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                <FiShield size={22} />
              </div>

              <div>
                <p className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-2">
                  Pronex World
                </p>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
                  {page?.title || "Cookie Policy"}
                </h1>

                {page?.description && (
                  <p className="mt-3 text-sm sm:text-base text-gray-600 leading-6 max-w-3xl">
                    {page.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 pb-5 border-b border-gray-100">
              <FiFileText size={14} />
              <span>
                Last updated:{" "}
                {formatDate(page?.lastUpdated || page?.updatedAt)}
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <div className="w-8 h-8 border-4 border-emerald-100 border-t-teal-700 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  Loading Cookie Policy...
                </p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            ) : (
              <div
                className="legal-page-content text-sm sm:text-[15px] text-gray-600 leading-7 [&_section]:mb-8 [&_section:last-child]:mb-0 [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_strong]:font-semibold [&_strong]:text-gray-800 [&_a]:text-teal-700 [&_a]:underline"
                dangerouslySetInnerHTML={{
                  __html: page.content || "",
                }}
              />
            )}
          </article>

          <div className="border-t border-gray-100 bg-slate-50 px-6 py-6 sm:px-10">
            <p className="text-sm text-gray-500 leading-6">
              If you have questions about this policy, please use our
              <Link
                to="/contact"
                className="font-semibold text-teal-700 hover:underline ml-1"
              >
                Contact Us
              </Link>{" "}
              page and provide the relevant details so our team can assist you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}