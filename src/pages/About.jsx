import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FiMapPin,
  FiTrendingUp,
  FiHome,
  FiPercent,
  FiUsers,
  FiShield,
  FiZap,
  FiBarChart2,
  FiFileText,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { BsBuilding, BsGraphUpArrow, BsCurrencyDollar } from "react-icons/bs";

const stats = [
  {
    icon: <BsBuilding size={22} />,
    value: "Fractional",
    label: "Real Estate Ownership",
  },
  {
    icon: <FiZap size={22} />,
    value: "AI-Powered",
    label: "Property Intelligence",
  },
  {
    icon: <FiBarChart2 size={22} />,
    value: "Data-Driven",
    label: "Investment Decisions",
  },
  {
    icon: <FiMapPin size={22} />,
    value: "Multi-Asset",
    label: "Portfolio Diversification",
  },
];

const whyItems = [
  {
    icon: <FiZap size={20} />,
    title: "AI-Powered Intelligence",
    desc: "Discover opportunities and evaluate assets using advanced analytics and real-time market intelligence.",
  },
  {
    icon: <FiHome size={20} />,
    title: "Fractional Ownership",
    desc: "Access carefully selected real estate assets without committing all your capital to a single property.",
  },
  {
    icon: <FiBarChart2 size={20} />,
    title: "Advanced Analytics",
    desc: "Understand property fundamentals, market trends, comparable transactions, and growth potential.",
  },
  {
    icon: <FiShield size={20} />,
    title: "Greater Transparency",
    desc: "Make informed decisions supported by data, documentation, and clear property intelligence.",
  },
  {
    icon: <FiMapPin size={20} />,
    title: "Smarter Diversification",
    desc: "Build exposure across multiple properties, sectors, and locations for a stronger investment foundation.",
  },
  {
    icon: <FiFileText size={20} />,
    title: "Property Intelligence",
    desc: "Access market data, location intelligence, infrastructure growth, and property fundamentals.",
  },
  {
    icon: <FiTrendingUp size={20} />,
    title: "Long-Term Wealth Focus",
    desc: "Create a smarter foundation for long-term wealth through intelligent real estate ownership.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function LiveStatsStrip() {
  return (
    <FadeIn>
      <div className="py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group bg-white border border-emerald-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                  {s.icon}
                </div>

                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-gray-900">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function WhyInvest() {
  return (
    <FadeIn>
      <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-emerald-950 p-8 sm:p-10 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
            Why Pronex World
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 max-w-2xl">
            Intelligent real estate ownership built for the future.
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            Pronex World combines fractional ownership, Artificial Intelligence,
            advanced analytics, and real-time market intelligence to help
            investors discover opportunities and make more informed decisions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {item.icon}
                  </div>

                  <p className="text-white font-bold text-sm mb-1">
                    {item.title}
                  </p>

                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function HowItWorksStrip() {
  const steps = [
    {
      num: "01",
      title: "Explore Opportunities",
      desc: "Discover carefully selected real estate opportunities supported by AI-powered insights and market intelligence.",
    },
    {
      num: "02",
      title: "Evaluate Assets",
      desc: "Understand property fundamentals, location intelligence, market trends, comparable transactions, and growth factors.",
    },
    {
      num: "03",
      title: "Diversify Your Portfolio",
      desc: "Build exposure across multiple assets, sectors, and locations instead of concentrating capital in one property.",
    },
    {
      num: "04",
      title: "Invest Intelligently",
      desc: "Make data-driven investment decisions with greater transparency and confidence.",
    },
    {
      num: "05",
      title: "Track Your Ownership",
      desc: "Monitor your portfolio and follow your real estate investment journey over time.",
    },
  ];

  return (
    <FadeIn>
      <div className="mb-24 mt-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
            A Smarter Way to Invest
          </p>

          <h2 className="text-3xl font-extrabold text-gray-900">
            How Pronex World Works
          </h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-4xl mx-auto mt-4">
            Instead of committing all your capital to a single property, Pronex
            World helps you explore fractional interests across carefully
            selected real estate assets—creating a smarter foundation for
            long-term wealth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 100}>
              <div className="flex flex-col items-center text-center group h-full">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 group-hover:border-emerald-400 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all">
                  <span className="text-2xl font-extrabold text-emerald-500">
                    {s.num}
                  </span>
                </div>

                <p className="font-bold text-gray-900 text-sm mb-2">
                  {s.title}
                </p>

                <p className="text-gray-400 text-xs leading-relaxed max-w-[220px]">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function PropertyIntelligence() {
  return (
    <FadeIn>
      <section className="mb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
              Beyond Investing
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5">
              AI-Powered Property Intelligence
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-4">
              Pronex World goes beyond fractional real estate investment.
              We deliver AI-powered property intelligence and indicative
              valuation services for developers, property owners, financial
              institutions, businesses, and investors.
            </p>

            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Every assessment is supported by evidence—combining market data,
              location intelligence, infrastructure growth, comparable
              transactions, and property fundamentals.
            </p>

            <div className="space-y-3">
              {[
                "Market data and real-time intelligence",
                "Location and infrastructure growth analysis",
                "Comparable transaction insights",
                "Property fundamentals and evidence-based assessment",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80"
              alt="AI powered real estate intelligence"
              className="rounded-3xl shadow-xl w-full h-[420px] object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                Evidence Over Emotion
              </p>

              <p className="text-gray-800 font-semibold text-sm">
                Informed decisions powered by data, intelligence, and
                transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

function FinalCTA() {
  return (
    <FadeIn>
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        </div>

        <div className="relative z-10">
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-3">
            The Future of Ownership
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Own More. Earn More.
          </h2>

          <p className="text-emerald-50 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Pronex World is more than a platform. It is the future of
            intelligent real estate ownership.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NavLink
              to="/property"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all text-sm shadow-lg"
            >
              <FiHome size={15} />
              Explore Properties
            </NavLink>

            <NavLink
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-emerald-900/30 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-900/50 active:scale-95 transition-all text-sm border border-white/20"
            >
              Start Your Journey
              <FiArrowRight size={15} />
            </NavLink>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export function AboutExtension() {
  return (
    <section className="bg-white pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveStatsStrip />
        <HowItWorksStrip />
        <PropertyIntelligence />
        <WhyInvest />
        <FinalCTA />
      </div>
    </section>
  );
}

function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return ref;
}

const About = () => {
  const headerRef = useFadeIn();
  const missionTextRef = useFadeIn();
  const missionImgRef = useFadeIn();
  const visionImgRef = useFadeIn();
  const visionTextRef = useFadeIn();

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-white to-white pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center mb-16">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.25em] mb-4">
              Intelligent Real Estate Ownership
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-gray-900 leading-tight">
              About <span className="text-emerald-600">Pronex World</span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-semibold text-emerald-600">
              Own More. Earn More.
            </p>

            <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
              Pronex World is an AI-powered Fractional Real Estate Investment
              Platform redefining how the world owns real estate.
            </p>
          </div>

          {/* INTRODUCTION */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-10">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                For decades, premium real estate has remained accessible to
                only a select few, demanding significant capital and exposing
                investors to concentration risk. We believe there is a better
                way.
              </p>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-5">
                Pronex World enables investors to own fractional interests in
                carefully selected real estate assets, making premium property
                investment more accessible, diversified, and intelligent.
                Instead of committing all your capital to a single property,
                you can build a portfolio across multiple assets, sectors, and
                locations—creating a smarter foundation for long-term wealth.
              </p>
            </div>
          </div>

          {/* PHILOSOPHY */}
          <div className="mb-24 rounded-3xl bg-emerald-600 p-8 sm:p-12 text-center shadow-xl">
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Our Philosophy
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-relaxed max-w-4xl mx-auto">
              Own more—not just one.
              <br />
              Diversify more—not concentrate.
              <br />
              Invest with intelligence—not assumptions.
            </h2>
          </div>

          {/* MISSION */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div ref={missionTextRef}>
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
                Our Purpose
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Our Mission
              </h2>

              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Our mission is to democratize real estate ownership by removing
                traditional barriers and creating a transparent,
                technology-driven investment ecosystem where more people can
                participate in wealth creation.
              </p>

              <p className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
                Whether investing for the first time or managing a diversified
                portfolio, Pronex World aims to make intelligent real estate
                ownership more accessible and informed.
              </p>
            </div>

            <div ref={missionImgRef} className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80"
                alt="Premium real estate investment"
                className="rounded-3xl shadow-xl w-full h-72 sm:h-96 object-cover"
              />
            </div>
          </div>

          {/* VISION */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div ref={visionImgRef} className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80"
                alt="Future of real estate ownership"
                className="rounded-3xl shadow-xl w-full h-72 sm:h-96 object-cover"
              />
            </div>

            <div ref={visionTextRef} className="order-1 lg:order-2">
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
                Looking Ahead
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Our Vision
              </h2>

              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                We envision a future where real estate ownership is as
                accessible and intelligent as investing in stocks, while
                delivering the stability of tangible assets and the power of
                diversification.
              </p>

              <p className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
                Our goal is to help shape a future where technology,
                intelligence, and transparency transform the way people
                participate in real estate ownership.
              </p>
            </div>
          </div>

          {/* CORE VALUES */}
          <div className="py-10 mb-20 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3 text-center">
                What We Stand For
              </h2>

              <p className="text-gray-500 text-sm text-center mb-12">
                The principles shaping the future of Pronex World
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Accessibility",
                    desc: "Making premium real estate ownership more accessible through fractional participation.",
                  },
                  {
                    title: "Diversification",
                    desc: "Helping investors build exposure across multiple assets, sectors, and locations.",
                  },
                  {
                    title: "Intelligence",
                    desc: "Using Artificial Intelligence, analytics, and market intelligence to support informed decisions.",
                  },
                  {
                    title: "Transparency",
                    desc: "Creating a technology-driven ecosystem built around clarity, data, and confidence.",
                  },
                  {
                    title: "Evidence-Based Decisions",
                    desc: "Supporting property assessment through market data, comparable transactions, and fundamentals.",
                  },
                  {
                    title: "Long-Term Value",
                    desc: "Building a smarter foundation for sustainable and diversified wealth creation.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group p-7 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
                      <FiCheckCircle size={22} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutExtension />
    </div>
  );
};

export default About;