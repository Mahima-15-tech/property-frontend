import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiShield, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../utils/axios";

export default function LegalPage() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchLegalPage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "api/legal-pages/terms-and-conditions"
        );

        if (mounted && response.data?.success) {
          setPage(response.data.page);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load Terms & Conditions."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLegalPage();

    return () => {
      mounted = false;
    };
  }, []);

  const formattedDate = page?.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition hover:text-teal-800"
          >
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-teal-700">
                <FiShield size={22} />
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-700">
                  Pronex World
                </p>

                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-4xl">
                  {page?.title || "Terms & Conditions"}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
                  {page?.description ||
                    "These terms govern your access to and use of the Pronex World website and services."}
                </p>
              </div>
            </div>
          </div>

          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="mb-8 flex items-center gap-2 border-b border-gray-100 pb-5 text-xs text-gray-400">
              <FiFileText size={14} />
              <span>Last updated: {formattedDate}</span>
            </div>

            {loading ? (
              <p className="py-8 text-sm text-gray-500">
                Loading Terms & Conditions...
              </p>
            ) : error ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {error}
              </div>
            ) : (
              <div
                className={[
                  "[&_section]:mb-8",
                  "[&_section:last-child]:mb-0",
                  "[&_h2]:mb-3",
                  "[&_h2]:text-lg",
                  "[&_h2]:font-bold",
                  "[&_h2]:text-gray-900",
                  "sm:[&_h2]:text-xl",
                  "[&_p]:text-sm",
                  "[&_p]:leading-7",
                  "[&_p]:text-gray-600",
                  "sm:[&_p]:text-[15px]",
                  "[&_ul]:my-3",
                  "[&_ul]:list-disc",
                  "[&_ul]:pl-6",
                  "[&_li]:mb-2",
                  "[&_li]:text-sm",
                  "[&_li]:leading-7",
                  "[&_li]:text-gray-600",
                  "[&_a]:text-teal-700",
                  "[&_a]:underline",
                ].join(" ")}
                dangerouslySetInnerHTML={{
                  __html: page?.content || "",
                }}
              />
            )}
          </article>

          <div className="border-t border-gray-100 bg-slate-50 px-6 py-6 sm:px-10">
            <p className="text-sm leading-6 text-gray-500">
              If you have questions about this policy, please use our
              <Link
                to="/contact"
                className="ml-1 font-semibold text-teal-700 hover:underline"
              >
                Contact Us
              </Link>
              page and provide the relevant details so our team can assist you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}