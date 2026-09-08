import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

import {
  FiSearch,
  FiClock,
  FiCalendar,
  FiArrowRight,
  FiBookOpen,
  FiLoader,
  FiTag,
} from "react-icons/fi";

import { HiOutlineSparkles } from "react-icons/hi";
import { MdVerified } from "react-icons/md";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const [loading, setLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 1,
  });

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 9,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (selectedCategory !== "All") {
        params.category = selectedCategory;
      }

      const response = await axios.get("/api/blogs", {
        params,
      });

      if (response.data.success) {
        setBlogs(response.data.blogs || []);

        setPagination(
          response.data.pagination || {
            total: 0,
            page: 1,
            limit: 9,
            totalPages: 1,
          }
        );
      }
    } catch (error) {
      console.error(
        "FETCH BLOGS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH FEATURED BLOGS
  // =====================================================

  const fetchFeaturedBlogs = async () => {
    try {
      setFeaturedLoading(true);

      const response = await axios.get(
        "/api/blogs/featured"
      );

      if (response.data.success) {
        setFeaturedBlogs(response.data.blogs || []);
      }
    } catch (error) {
      console.error(
        "FETCH FEATURED BLOGS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setFeaturedLoading(false);
    }
  };

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "/api/blogs/categories"
      );

      if (response.data.success) {
        const fetchedCategories =
          response.data.categories || [];

        setCategories([
          "All",
          ...fetchedCategories.filter(
            (category) => category !== "All"
          ),
        ]);
      }
    } catch (error) {
      console.error(
        "FETCH CATEGORIES ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchFeaturedBlogs();
    fetchCategories();
  }, []);

  // =====================================================
  // FETCH BLOGS ON SEARCH / CATEGORY CHANGE
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  // =====================================================
  // REMOVE FEATURED BLOGS FROM LATEST SECTION
  // =====================================================

  const latestBlogs = blogs;

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Recently added";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // EMPTY IMAGE
  // =====================================================

  const BlogImageFallback = () => {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
          <FiBookOpen
            size={28}
            className="text-teal-700"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900">

        {/* Background Effects */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />

          <div className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />

          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[100px]" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-100 backdrop-blur">

            <HiOutlineSparkles size={16} />

            PROPERTY INVESTMENT INSIGHTS

          </div>

          {/* Heading */}

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">

            Learn. Invest.

            <span className="text-teal-300">
              {" "}Grow.
            </span>

          </h1>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-teal-100/75 sm:text-base md:text-lg">

            Explore expert insights, real estate trends,
            investment strategies and practical guides
            to help you make smarter property decisions.

          </p>

          {/* Trust Points */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            {[
              "Expert Insights",
              "Market Trends",
              "Investment Guides",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white"
              >

                <MdVerified className="text-teal-300" />

                {item}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FEATURED ARTICLES */}
      {/* ================================================= */}

      {!featuredLoading &&
        featuredBlogs.length > 0 && (

          <section className="bg-green-50/60 py-14 sm:py-16">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              {/* Section Header */}

              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-teal-700">

                    <HiOutlineSparkles size={16} />

                    FEATURED INSIGHTS

                  </div>

                  <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">

                    Featured Articles

                  </h2>

                  <p className="mt-2 text-sm text-gray-500">

                    Handpicked insights to help you make
                    smarter investment decisions.

                  </p>

                </div>

                <div className="hidden sm:block">

                  <div className="h-1 w-20 rounded-full bg-teal-700" />

                </div>

              </div>


              {/* Featured Cards */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {featuredBlogs.slice(0, 3).map(
                  (blog) => (

                    <Link
                      key={blog._id}
                      to={`/blog/${blog.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* IMAGE */}

                      <div className="relative h-56 overflow-hidden bg-gray-100">

                        {blog.coverImage ? (

                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                        ) : (

                          <BlogImageFallback />

                        )}


                        {/* Category */}

                        <div className="absolute left-4 top-4">

                          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-teal-700 shadow-sm">

                            <FiTag size={11} />

                            {blog.category || "Investment"}

                          </span>

                        </div>

                      </div>


                      {/* CONTENT */}

                      <div className="flex flex-1 flex-col p-5">

                        {/* Meta */}

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">

                          <span className="flex items-center gap-1.5">

                            <FiCalendar size={13} />

                            {formatDate(blog.publishedAt)}

                          </span>

                          <span className="flex items-center gap-1.5">

                            <FiClock size={13} />

                            {blog.readTime || 5} min read

                          </span>

                        </div>


                        {/* Title */}

                        <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition group-hover:text-teal-700 sm:text-xl">

                          {blog.title}

                        </h3>


                        {/* Description */}

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">

                          {blog.shortDescription ||
                            "Discover valuable insights and practical strategies for smarter property investments."}

                        </p>


                        {/* Footer */}

                        <div className="mt-auto pt-5">

                          <div className="flex items-center gap-2 text-sm font-bold text-teal-700">

                            Read Article

                            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

                          </div>

                        </div>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </div>

          </section>

        )}


      {/* ================================================= */}
      {/* LATEST ARTICLES */}
      {/* ================================================= */}

      <section className="py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


          {/* ================================================= */}
          {/* HEADER + SEARCH */}
          {/* ================================================= */}

          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">

                Knowledge Hub

              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">

                Latest Articles

              </h2>

              <p className="mt-2 max-w-xl text-sm text-gray-500">

                Discover insights, strategies and practical
                knowledge for smarter property investments.

              </p>

            </div>


            {/* SEARCH */}

            <div className="relative w-full lg:w-[360px]">

              <FiSearch
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search articles..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />

            </div>

          </div>


          {/* ================================================= */}
          {/* CATEGORIES */}
          {/* ================================================= */}

          <div className="mb-10 flex flex-wrap gap-2.5">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                  selectedCategory === category
                    ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >

                {category}

              </button>

            ))}

          </div>


          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading ? (

            <div className="flex min-h-[350px] flex-col items-center justify-center">

              <FiLoader
                size={34}
                className="animate-spin text-teal-700"
              />

              <p className="mt-4 text-sm text-gray-400">

                Loading articles...

              </p>

            </div>

          ) : latestBlogs.length === 0 ? (

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-50">

                <FiBookOpen
                  size={32}
                  className="text-teal-700"
                />

              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">

                No more articles found

              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">

                Try changing your search or selecting
                a different category.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {latestBlogs.map((blog) => (

                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden bg-gray-100">

                    {blog.coverImage ? (

                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <BlogImageFallback />

                    )}


                    {/* Category */}

                    <div className="absolute left-4 top-4">

                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-teal-700 shadow-sm backdrop-blur">

                        {blog.category || "Investment"}

                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="flex flex-1 flex-col p-5">

                    {/* Date */}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">

                      <span className="flex items-center gap-1.5">

                        <FiCalendar size={13} />

                        {formatDate(blog.publishedAt)}

                      </span>

                      <span className="flex items-center gap-1.5">

                        <FiClock size={13} />

                        {blog.readTime || 5} min read

                      </span>

                    </div>


                    {/* Title */}

                    <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-teal-700 sm:text-xl">

                      {blog.title}

                    </h3>


                    {/* Description */}

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">

                      {blog.shortDescription ||
                        "Explore practical insights and strategies for smarter property investment decisions."}

                    </p>


                    {/* AUTHOR */}

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">

                      <div className="min-w-0">

                        <p className="truncate text-xs font-bold text-gray-800">

                          {blog.author?.name ||
                            "Property Invest Team"}

                        </p>

                        {blog.author?.role && (

                          <p className="mt-1 truncate text-[11px] text-gray-400">

                            {blog.author.role}

                          </p>

                        )}

                      </div>


                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-all group-hover:bg-teal-700 group-hover:text-white">

                        <FiArrowRight size={17} />

                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}


          {/* ================================================= */}
          {/* PAGINATION */}
          {/* ================================================= */}

          {pagination.totalPages > 1 && (

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">

              <button
                disabled={pagination.page <= 1}
                onClick={() =>
                  fetchBlogs(pagination.page - 1)
                }
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >

                Previous

              </button>


              <div className="rounded-xl bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700">

                Page {pagination.page} of{" "}
                {pagination.totalPages}

              </div>


              <button
                disabled={
                  pagination.page >=
                  pagination.totalPages
                }
                onClick={() =>
                  fetchBlogs(pagination.page + 1)
                }
                className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
              >

                Next

              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}