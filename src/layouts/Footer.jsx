import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Footer() {

  const cols = [
    {
      title: "Explore",
      links: [
        { name: "Properties", path: "/property" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Watchlist", path: "/watchlist" },
      ],
    },

    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },

 
        // ✅ BLOG CONNECTED
        { name: "Blog", path: "/blogs" },

        
      ],
    },

    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
        { name: "Refund & Cancellation", path: "/refund-cancellation-policy" },
        { name: "Shipping & Delivery", path: "/shipping-delivery-policy" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "Account Data Deletion", path: "/account-data-deletion" },
        { name: "Grievance Officer", path: "/grievance-officer" },
      ],
    },

    {
      title: "Support",
      links: [
     
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/contact#faq" },
       
      ],
    },
  ];

  return (
    <footer className="text-gray-400 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">

          {/* LOGO SECTION */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">

                {/* LOGO */}
              <NavLink
                to="/"
                className="flex-shrink-0 text-black duration-200"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain w-32 h-16"
                />
              </NavLink>
            {/* <Link to="/">
              <span className="text-xl font-bold text-teal-500">
                Pronex 
                <span className="text-teal-500">
                 World
                </span>
              </span>
            </Link> */}

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
                        className="text-xs hover:text-emerald-400 transition-colors hover:underline"
                      >
                        {link.name}
                      </Link>

                    ) : (

                      <a
                        href="#"
                        className="text-xs hover:text-emerald-400 transition-colors hover:underline"
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

        <div className="border-t border-gray-800 pt-6 text-center flex items-start justify-between">
          <p className="text-xs text-gray-600">
            ©️ 2026 Pronex World. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
              
                <button className="hover:underline"> Powered By GroupK Technologies</button>
            
         
          </p>
        </div>

      </div>
    </footer>
  );
}