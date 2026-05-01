
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay, FaApple } from "react-icons/fa";


export default function Footer() {


    const cols = [
      { title: "Explore", links: ["Properties", "Portfolio", "Insights", "Watchlist"] },
      { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
      { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy"] },
      { title: "Support", links: ["Help Center", "Contact Us", "FAQs", "Docs"] },
    ];

    return (
      <footer className=" text-gray-400 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <span className="text-xl font-bold text-emerald-700">Sovereign<span className="text-emerald-700">Curator</span></span>
              <p className="mt-3 text-xs text-gray-500 max-w-xs">Institutional-grade fractional real estate platform. Secure, transparent, and fully digital.</p>
              <div className="flex gap-4 mt-5">
                <FaFacebook size={18} className="hover:text-emerald-400 cursor-pointer transition-colors" />
                <FaTwitter size={18} className="hover:text-emerald-400 cursor-pointer transition-colors" />
                <FaInstagram size={18} className="hover:text-emerald-400 cursor-pointer transition-colors" />
                <FaLinkedin size={18} className="hover:text-emerald-400 cursor-pointer transition-colors" />
              </div>
            </div>
            {cols.map(c => (
              <div key={c.title}>
                <h4 className="text-white font-semibold text-sm mb-3">{c.title}</h4>
                <ul className="space-y-2">
                  {c.links.map(l => <li key={l}><a href="#" className="text-xs hover:text-emerald-400 transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-xs text-gray-600">© 2024 SovereignCurator. All rights reserved. </p>
          </div>
        </div>
      </footer>
    );
  }