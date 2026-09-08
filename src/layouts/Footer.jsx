import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {

  const cols = [
    {
      title: "Explore",
      links: [
        { name: "Properties", path: "/property" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Insights", path: "/blog" },
        { name: "Watchlist", path: "/watchlist" },
      ],
    },

    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },

        // फिलहाल page नहीं है तो बाद में बना सकते हो
        { name: "Careers", path: "#" },

        // ✅ BLOG CONNECTED
        { name: "Blog", path: "/blogs" },

        { name: "Press", path: "#" },
      ],
    },

    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "#" },
        { name: "Terms of Use", path: "#" },
        { name: "Cookie Policy", path: "#" },
      ],
    },

    {
      title: "Support",
      links: [
        { name: "Help Center", path: "#" },
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "#" },
        { name: "Docs", path: "#" },
      ],
    },
  ];

  return (
    <footer className="text-gray-400 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">

          {/* LOGO SECTION */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">

            <Link to="/">
              <span className="text-xl font-bold text-emerald-700">
                Sovereign
                <span className="text-emerald-700">
                  Curator
                </span>
              </span>
            </Link>

            <p className="mt-3 text-xs text-gray-500 max-w-xs">
              Institutional-grade fractional real estate platform.
              Secure, transparent, and fully digital.
            </p>

            <div className="flex gap-4 mt-5">
              <FaFacebook
                size={18}
                className="hover:text-emerald-400 cursor-pointer transition-colors"
              />

              <FaTwitter
                size={18}
                className="hover:text-emerald-400 cursor-pointer transition-colors"
              />

              <FaInstagram
                size={18}
                className="hover:text-emerald-400 cursor-pointer transition-colors"
              />

              <FaLinkedin
                size={18}
                className="hover:text-emerald-400 cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* FOOTER LINKS */}
          {cols.map((column) => (
            <div key={column.title}>

              <h4 className="text-white font-semibold text-sm mb-3">
                {column.title}
              </h4>

              <ul className="space-y-2">

                {column.links.map((link) => (

                  <li key={link.name}>

                    {link.path !== "#" ? (

                      <Link
                        to={link.path}
                        className="text-xs hover:text-emerald-400 transition-colors"
                      >
                        {link.name}
                      </Link>

                    ) : (

                      <a
                        href="#"
                        className="text-xs hover:text-emerald-400 transition-colors"
                      >
                        {link.name}
                      </a>

                    )}

                  </li>

                ))}

              </ul>

            </div>
          ))}

        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-600">
            © 2026 SovereignCurator. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}