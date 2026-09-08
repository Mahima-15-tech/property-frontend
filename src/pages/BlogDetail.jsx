import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  Loader2,
  Share2,
  CheckCircle2,
  Copy,
} from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // =====================================================
  // FETCH BLOG
  // =====================================================

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `/api/blogs/slug/${slug}`
      );

      if (response.data.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      console.error(
        "FETCH BLOG ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH RELATED BLOGS
  // =====================================================

  const fetchRelatedBlogs = async () => {
    try {
      const response = await axios.get(
        `/api/blogs/slug/${slug}/related`
      );

      if (response.data.success) {
        setRelatedBlogs(response.data.blogs || []);
      }
    } catch (error) {
      console.error(
        "FETCH RELATED BLOGS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Recently added";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // SHARE BLOG
  // =====================================================

  const handleShare = async () => {
    const shareData = {
      title: blog?.title,
      text: blog?.shortDescription,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  // =====================================================
  // IMAGE FALLBACK
  // =====================================================

  const ImageFallback = ({ large = false }) => {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-900 ${
          large ? "min-h-[450px]" : ""
        }`}
      >
        <div className="flex flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">

            <BookOpen className="h-9 w-9 text-teal-200" />

          </div>

          {large && (
            <p className="mt-5 text-sm text-teal-100/60">
              Property Investment Insights
            </p>
          )}

        </div>
      </div>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">

          <Loader2 className="h-7 w-7 animate-spin text-teal-700" />

        </div>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading article...
        </p>

      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50">

          <BookOpen className="h-9 w-9 text-teal-700" />

        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Article not found
        </h1>

        <p className="mt-2 max-w-md text-slate-500">
          The article you're looking for doesn't exist
          or is no longer available.
        </p>

        <Link
          to="/blogs"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Articles

        </Link>

      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7faf9]">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950">

        {/* Background Glow */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-teal-400/10 blur-[130px]" />

          <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-[150px]" />

          <div className="absolute left-1/2 top-20 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[120px]" />

        </div>


        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6 md:pb-36 lg:px-8">

          {/* BACK */}

          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-teal-100/70 transition hover:text-white"
          >

            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition group-hover:bg-white/10">

              <ArrowLeft className="h-4 w-4" />

            </span>

            Back to Articles

          </Link>


          {/* CONTENT */}

          <div className="mx-auto mt-14 max-w-4xl text-center">

            {/* CATEGORY */}

            <div className="flex justify-center">

              <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/10 px-4 py-2 text-xs font-bold tracking-wide text-teal-200 backdrop-blur">

                <Tag className="h-3.5 w-3.5" />

                {blog.category || "Investment"}

              </span>

            </div>


            {/* TITLE */}

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">

              {blog.title}

            </h1>


            {/* DESCRIPTION */}

            {blog.shortDescription && (

              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-teal-100/70 sm:text-lg sm:leading-8">

                {blog.shortDescription}

              </p>

            )}


            {/* META */}

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-teal-100/65">

              <span className="flex items-center gap-2">

                <Calendar className="h-4 w-4 text-teal-300" />

                {formatDate(blog.publishedAt)}

              </span>


              <span className="hidden h-1 w-1 rounded-full bg-teal-300/50 sm:block" />


              <span className="flex items-center gap-2">

                <Clock className="h-4 w-4 text-teal-300" />

                {blog.readTime || 5} min read

              </span>


              <span className="hidden h-1 w-1 rounded-full bg-teal-300/50 sm:block" />


              <span className="flex items-center gap-2">

                <Eye className="h-4 w-4 text-teal-300" />

                {blog.views || 0} views

              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* PREMIUM COVER IMAGE */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:-mt-24 sm:px-6 lg:px-8">

        <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">

          {/* Image Container */}

          <div className="relative aspect-[16/7] min-h-[260px] w-full overflow-hidden sm:min-h-[380px]">

            {blog.coverImage ? (

              <img
                src={blog.coverImage}
                alt={blog.title}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
              />

            ) : (

              <ImageFallback large />

            )}


            {/* Image Overlay */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

          </div>


          {/* Author Floating Card */}

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">

            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/50 px-4 py-3 text-white shadow-xl backdrop-blur-xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-200">

                <User className="h-5 w-5" />

              </div>

              <div className="text-left">

                <p className="text-xs text-white/60">
                  Written by
                </p>

                <p className="text-sm font-bold">

                  {blog.author?.name ||
                    "Property Invest Team"}

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px]">


          {/* ================================================= */}
          {/* ARTICLE */}
          {/* ================================================= */}

          <article className="min-w-0">

            {/* Intro Card */}

            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.05)] sm:p-10 md:p-12">

              {/* Article Label */}

              <div className="mb-8 flex items-center gap-3">

                <div className="h-10 w-1 rounded-full bg-gradient-to-b from-teal-500 to-emerald-600" />

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">

                    Property Investment Insight

                  </p>

                  <p className="mt-1 text-xs text-slate-400">

                    Expert knowledge for smarter decisions

                  </p>

                </div>

              </div>


              {/* CONTENT */}

              <div className="whitespace-pre-line text-[16px] leading-8 text-slate-600 sm:text-[17px] sm:leading-9">

                {blog.content}

              </div>


              {/* TAGS */}

              {blog.tags?.length > 0 && (

                <div className="mt-12 border-t border-slate-100 pt-8">

                  <p className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">

                    <Tag className="h-4 w-4 text-teal-700" />

                    Explore Topics

                  </p>

                  <div className="flex flex-wrap gap-2">

                    {blog.tags.map((tag, index) => (

                      <span
                        key={index}
                        className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                      >

                        #{tag}

                      </span>

                    ))}

                  </div>

                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* AUTHOR CARD */}
            {/* ================================================= */}

            <div className="mt-8 overflow-hidden rounded-[28px] border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-6 sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-700 text-white shadow-lg shadow-teal-700/20">

                  <User className="h-8 w-8" />

                </div>


                <div className="flex-1">

                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-teal-700">

                    <CheckCircle2 className="h-4 w-4" />

                    Written By

                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-slate-900">

                    {blog.author?.name ||
                      "Property Invest Team"}

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    {blog.author?.role ||
                      "Property Investment Experts"}

                  </p>

                </div>


                <div className="hidden h-12 w-px bg-teal-100 sm:block" />

                <p className="max-w-[180px] text-sm leading-6 text-slate-500">

                  Helping investors make smarter property decisions.

                </p>

              </div>

            </div>

          </article>


          {/* ================================================= */}
          {/* SIDEBAR */}
          {/* ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            {/* SHARE */}

            <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">

                <Share2 className="h-5 w-5" />

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">

                Share this insight

              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">

                Found this article useful? Share it with your network.

              </p>


              <button
                onClick={handleShare}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-teal-800 hover:shadow-lg hover:shadow-teal-700/20 active:scale-[0.98]"
              >

                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Link Copied
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share Article
                  </>
                )}

              </button>

            </div>


            {/* ARTICLE INFO */}

            <div className="mt-5 rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">

              <p className="text-sm font-extrabold text-slate-900">

                Article Information

              </p>


              <div className="mt-5 space-y-5">

                <div className="border-b border-slate-100 pb-4">

                  <p className="text-xs font-medium text-slate-400">
                    Category
                  </p>

                  <div className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-teal-700">

                    <Tag className="h-3.5 w-3.5" />

                    {blog.category || "Investment"}

                  </div>

                </div>


                <div className="border-b border-slate-100 pb-4">

                  <p className="text-xs font-medium text-slate-400">
                    Reading Time
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-700">

                    {blog.readTime || 5} Minutes

                  </p>

                </div>


                <div className="border-b border-slate-100 pb-4">

                  <p className="text-xs font-medium text-slate-400">
                    Published
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-700">

                    {formatDate(blog.publishedAt)}

                  </p>

                </div>


                <div>

                  <p className="text-xs font-medium text-slate-400">
                    Article Views
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">

                    <Eye className="h-4 w-4 text-teal-600" />

                    {blog.views || 0} views

                  </p>

                </div>

              </div>

            </div>


            {/* QUICK CTA */}

            <div className="mt-5 overflow-hidden rounded-[24px] bg-gradient-to-br from-teal-800 to-emerald-800 p-6 text-white shadow-lg shadow-teal-900/10">

              <BookOpen className="h-7 w-7 text-teal-200" />

              <h3 className="mt-5 text-lg font-bold">

                Explore more insights

              </h3>

              <p className="mt-2 text-sm leading-6 text-teal-100/70">

                Discover practical guides and expert knowledge for smarter investments.

              </p>

              <Link
                to="/blogs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-teal-200"
              >

                Browse Articles

                <ArrowRight className="h-4 w-4" />

              </Link>

            </div>

          </aside>

        </div>

      </section>


      {/* ================================================= */}
      {/* RELATED BLOGS */}
      {/* ================================================= */}

      {relatedBlogs.length > 0 && (

        <section className="border-t border-teal-50 bg-white py-16 md:py-20">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


            {/* HEADER */}

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">

                  Continue Reading

                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">

                  Related Articles

                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">

                  More insights and strategies to help you make better property investment decisions.

                </p>

              </div>


              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition hover:text-teal-900"
              >

                View all articles

                <ArrowRight className="h-4 w-4" />

              </Link>

            </div>


            {/* RELATED CARDS */}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {relatedBlogs.slice(0, 3).map((relatedBlog) => (

                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

                    {relatedBlog.coverImage ? (

                      <img
                        src={relatedBlog.coverImage}
                        alt={relatedBlog.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                      />

                    ) : (

                      <ImageFallback />

                    )}


                    {/* CATEGORY */}

                    <div className="absolute left-4 top-4">

                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-teal-700 shadow-sm backdrop-blur">

                        {relatedBlog.category || "Investment"}

                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="flex flex-1 flex-col p-6">

                    <div className="flex items-center gap-3 text-xs text-slate-400">

                      <span className="flex items-center gap-1.5">

                        <Calendar className="h-3.5 w-3.5" />

                        {formatDate(relatedBlog.publishedAt)}

                      </span>

                      <span className="h-1 w-1 rounded-full bg-slate-300" />

                      <span>

                        {relatedBlog.readTime || 5} min read

                      </span>

                    </div>


                    <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-slate-900 transition-colors group-hover:text-teal-700">

                      {relatedBlog.title}

                    </h3>


                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">

                      {relatedBlog.shortDescription ||
                        "Discover practical insights for smarter property investment decisions."}

                    </p>


                    <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-teal-700">

                      Read Article

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>

      )}

    </div>
  );
}