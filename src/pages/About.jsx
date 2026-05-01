import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMapPin, FiTrendingUp, FiArrowRight, FiStar, FiHome,
  FiPercent, FiUsers, FiShield, FiChevronLeft, FiChevronRight,
  FiZap, FiAward, FiBarChart2
} from "react-icons/fi";
import { BsBuilding, BsGraphUpArrow, BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";

// const featuredProperties = [
//   {
//     id: 1,
//     name: "The Azure Heights",
//     location: "Dubai, UAE",
//     image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
//     roi: "15.5%",
//     price: "$25,000",
//     totalValue: "$12.5M",
//     investors: 184,
//     funded: 88,
//     tag: "HOT",
//     tagColor: "bg-rose-500",
//     type: "Residential",
//   },
//   {
//     id: 2,
//     name: "The Alpine Retreat",
//     location: "St. Moritz, Switzerland",
//     image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
//     roi: "12.4%",
//     price: "$18,000",
//     totalValue: "$8.2M",
//     investors: 97,
//     funded: 63,
//     tag: "NEW",
//     tagColor: "bg-emerald-500",
//     type: "Luxury Villa",
//   },
//   {
//     id: 3,
//     name: "Green Valley Estate",
//     location: "Tuscany, Italy",
//     image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
//     roi: "11.2%",
//     price: "$12,000",
//     totalValue: "$5.8M",
//     investors: 210,
//     funded: 95,
//     tag: "CLOSING",
//     tagColor: "bg-amber-500",
//     type: "Estate",
//   },
//   {
//     id: 4,
//     name: "Marina Bay Suites",
//     location: "Singapore",
//     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
//     roi: "13.8%",
//     price: "$30,000",
//     totalValue: "$18M",
//     investors: 56,
//     funded: 41,
//     tag: "PREMIUM",
//     tagColor: "bg-violet-500",
//     type: "Commercial",
//   },
// ];
 
const stats = [
  { icon: <BsCurrencyDollar size={22} />, value: "$240M+", label: "Assets Managed" },
  { icon: <BsGraphUpArrow size={22} />, value: "12.4%", label: "Avg. Annual Yield" },
  { icon: <FiUsers size={22} />, value: "18K+", label: "Active Investors" },
  { icon: <BsBuilding size={22} />, value: "45+", label: "Live Properties" },
];
 
const whyItems = [
  { icon: <FiShield size={20} />, title: "SEBI Regulated", desc: "Fully compliant with all regulatory standards." },
  { icon: <FiZap size={20} />, title: "Instant KYC", desc: "Get verified and start investing in minutes." },
  { icon: <FiAward size={20} />, title: "Curated Assets", desc: "Every property is vetted by our expert team." },
  { icon: <FiBarChart2 size={20} />, title: "Monthly Returns", desc: "Automated payouts directly to your account." },
];
 
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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
 
function PropertyCard({ p, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms, box-shadow 0.3s ease`,
      }}
    >
      <div className="relative overflow-hidden h-48 sm:h-52">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={`absolute top-3 left-3 ${p.tagColor} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wider`}>
          {p.tag}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {p.type}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
          <FiMapPin size={11} />
          <span className="font-medium">{p.location}</span>
        </div>
      </div>
 
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-3 group-hover:text-emerald-600 transition-colors">{p.name}</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
            <p className="text-emerald-600 font-extrabold text-lg leading-none">{p.roi}</p>
            <p className="text-gray-400 text-[10px] font-medium mt-0.5">Est. ROI</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-gray-900 font-extrabold text-lg leading-none">{p.price}</p>
            <p className="text-gray-400 text-[10px] font-medium mt-0.5">Per Share</p>
          </div>
        </div>
 
        <div className="mb-3">
          <div className="flex justify-between text-[10px] font-semibold text-gray-400 mb-1.5">
            <span>Funding Progress</span>
            <span className="text-emerald-600">{p.funded}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${p.funded}%` }}
            />
          </div>
        </div>
 
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <FiUsers size={12} />
            <span>{p.investors} investors</span>
          </div>
          <button className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold hover:gap-2.5 transition-all">
            View Details <FiArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
 
function MarqueeTrack() {
  const items = [
    "Dubai Marina Tower", "Swiss Alps Chalet", "NYC Loft Portfolio",
    "Singapore Bay View", "London Canary Wharf", "Tokyo Premium Suites",
    "Bali Beachfront Villa", "Paris Boulevard Apartments",
  ];
  return (
    <div className="py-6 bg-emerald-50/60 border-y border-emerald-100 my-20">
  <div className="overflow-hidden">
    <div className="flex gap-6 animate-[marquee_30s_linear_infinite] whitespace-nowrap">

      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="text-xs font-medium text-emerald-700 bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-sm"
        >
          {item}
        </span>
      ))}

    </div>
  </div>
</div>
  );
}
 
function LiveStatsStrip() {
  return (
    <FadeIn>
      <div className="py- bg-white">
  <div className="max-w-6xl mx-auto px-4">

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      {stats.map((s, i) => (
        <div
          key={i}
          className="group bg-white border border-emerald-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
            {s.icon}
          </div>

          <div>
            <p className="text-2xl font-extrabold text-gray-900">
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
 
// function FeaturedProperties() {
//   const [active, setActive] = useState(0);
//   const total = featuredProperties.length;
//   const prev = () => setActive((a) => (a - 1 + total) % total);
//   const next = () => setActive((a) => (a + 1) % total);
 
//   return (
//     <div className="mb-16">
//       <FadeIn>
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
//           <div>
//             <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Live Opportunities</p>
//             <h2 className="text-3xl font-extrabold text-gray-900">Featured Properties</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={prev} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-all">
//               <FiChevronLeft size={16} />
//             </button>
//             <button onClick={next} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-all">
//               <FiChevronRight size={16} />
//             </button>
//             <NavLink to="/property" className="hidden sm:flex items-center gap-1.5 text-emerald-600 text-sm font-semibold hover:gap-2.5 transition-all ml-2">
//               View All <FiArrowRight size={14} />
//             </NavLink>
//           </div>
//         </div>
//       </FadeIn>
 
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         {featuredProperties.map((p, i) => (
//           <PropertyCard key={p.id} p={p} index={i} />
//         ))}
//       </div>
 
//       <div className="flex justify-center mt-6 gap-2">
//         {featuredProperties.map((_, i) => (
//           <button key={i} onClick={() => setActive(i)} className={`rounded-full transition-all ${active === i ? "w-6 h-2 bg-emerald-500" : "w-2 h-2 bg-gray-200"}`} />
//         ))}
//       </div>
//     </div>
//   );
// }
 
function WhyInvest() {
  return (
    <FadeIn>
      <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-emerald-950 p-8 sm:p-10 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Why Choose EquiShare</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 max-w-lg">
            Built for investors who demand more.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
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
    { num: "01", title: "Create Account", desc: "Sign up and complete KYC in minutes." },
    { num: "02", title: "Browse Assets", desc: "Explore curated, high-yield properties." },
    { num: "03", title: "Buy Shares", desc: "Invest any amount starting from one share." },
    { num: "04", title: "Earn Returns", desc: "Receive monthly rental income & capital gains." },
  ];
  return (
    <FadeIn>
      <div className="mb-16 mt-28">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Simple Process</p>
          <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-100 z-0" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 100}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 group-hover:border-emerald-400 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all">
                    <span className="text-2xl font-extrabold text-emerald-500">{s.num}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
 
function TestimonialsStrip() {
  const reviews = [
    { name: "Arjun Mehta", role: "Software Engineer, Bangalore", text: "Earned my first rental income in 30 days. The transparency is unmatched.", rating: 5 },
    { name: "Priya Sharma", role: "Entrepreneur, Mumbai", text: "Finally a platform that makes real estate accessible to everyone. Love it.", rating: 5 },
    { name: "Rahul Nair", role: "Doctor, Kochi", text: "Smooth KYC, clean dashboard, and consistent monthly payouts. Highly recommended.", rating: 5 },
  ];
  return (
    <FadeIn>
      <div className="mb-28">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Investor Stories</p>
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Investors Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 120}>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all">
                <div className="flex gap-0.5 mb-3">
                  {Array(r.rating).fill(0).map((_, j) => (
                    <FiStar key={j} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
 
function FinalCTA() {
  return (
    <FadeIn>
      <div className="rounded-3xl bg-emerald-500 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2" />
        </div>
        <div className="relative z-10">
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-3">Ready to Start?</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Your First Share Awaits</h2>
          <p className="text-emerald-100 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Join 18,000+ investors earning passive income from premium real estate across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NavLink
              to="/property"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all text-sm shadow-lg"
            >
              <FiHome size={15} /> Browse Properties
            </NavLink>
            <NavLink
              to="/broker-signup"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all text-sm border border-emerald-400"
            >
              <FiTrendingUp size={15} /> Start Investing
            </NavLink>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
 
export function AboutExtension() {
  return (
    <section className="bg-white pb-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <LiveStatsStrip />
        
        {/* <FeaturedProperties /> */}
        <HowItWorksStrip />
        <WhyInvest />
        <MarqueeTrack />
        <TestimonialsStrip />
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
 
function FadeInOn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
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
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

const About = () => {
  const navigate = useNavigate();
  const headerRef = useFadeIn();
  const missionTextRef = useFadeIn();
  const missionImgRef = useFadeIn();
  const visionImgRef = useFadeIn();
  const visionTextRef = useFadeIn();
  const valuesHeadRef = useFadeIn();

  return (
    <div> 
     
     <section className="bg-white pt-16 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center lg:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-gray-900 leading-tight">
            About <span className="text-emerald-500">EquiShare</span>
          </h1>
          <p className="mt-5 text-gray-500 text-base sm:text-lg max-w-3xl mx-auto lg:mx-0">
            We're building the future of real estate investing—transparent,
            accessible, and powered by ownership, one share at a time.
          </p>
        </div>
 
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 ">
          <div ref={missionTextRef} className="flex-1 order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Our Mission
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              We believe everyone should be able to own a piece of premium real
              estate without the burden of high capital, paperwork, or
              middlemen.
            </p>
            <p className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
              By tokenizing real estate into fractional shares, we make
              high-yield property investment open to all—from first-time
              investors to seasoned professionals.
            </p>
          </div>
 
          <div ref={missionImgRef} className="flex-1 relative order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
              alt="Our mission - Real estate investment"
              className="rounded-2xl shadow-xl w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>
 
        <div className="flex flex-col lg:flex-row-reverse  gap-12 items-center mb-28 ">
          <div ref={visionImgRef} className="flex-1 order-2 lg:order-1 w-full">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80"
              alt="Our vision - Global real estate"
              className="rounded-2xl shadow-xl w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
 
          <div ref={visionTextRef} className="flex-1 order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Our Vision
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              We envision a world where real estate ownership is no longer
              limited to the wealthy few, but democratized across communities,
              borders, and generations.
            </p>
            <p className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
              With transparent reporting, digital verification, and automated
              distributions, we aim to become the trusted platform for
              fractional real estate worldwide.
            </p>
          </div>
        </div>
 
        <div className="py-10 mb-28 bg-gradient-to-b from-emerald-50/40 to-white">
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-4xl font-extrabold text-gray-900 mb-3 text-center">
      Our Core Values
    </h2>

    <p className="text-gray-500 text-sm text-center mb-12">
      Built with trust, accessibility, and innovation
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="group p-7 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
          ✓
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Transparency First
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          Every property, transaction, and distribution is clearly documented.
        </p>
      </div>

      <div className="group p-7 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
          ✓
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Inclusive Ownership
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          One share is enough to become a co-owner.
        </p>
      </div>

      <div className="group p-7 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
          ✓
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Technology Driven
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          Smart tracking and automated payouts simplify ownership.
        </p>
      </div>

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