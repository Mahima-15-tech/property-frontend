import react, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./layouts/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Contact from "./pages/Contact";
import About from "./pages/About";

import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PropertyPage from "./pages/Properties";
import Checkout from "./pages/Checkout";
import KYCVerification from "./pages/Kyc";
import PropertydetailPage from "./pages/PropertyDetails";
import Portfolio from "./pages/Portfolio";
import Payment from "./pages/Payment";
import KycPanVerification from "./pages/KycPanVerification";
import KycSubmission from "./pages/KyuSubmission";
import KycReviewandSubmit from "./pages/KycReviewAndSubmit";
import InvestmentSuccess from "./pages/InvestmentSuccess";

import Lenis from "@studio-freight/lenis";
import BrokerDashboard from "./pages/BrokerDashboard";
import AadharVerify from "./pages/AadharVerify";
import WatchList from "./components/WatchList";
import BrokerSignup from "./pages/Brokersignup";
import BrokerLogin from "./pages/BrokerLogin";
import VerificationPending from "./pages/VerificationPending";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundCancellationPolicy from "./pages/RefundCancellationPolicy";
import ShippingDeliveryPolicy from "./pages/ShippingDeliveryPolicy";
import GrievanceOfficer from "./pages/GrievanceOfficer";
import CookiePolicy from "./pages/CookiePolicy";
import AccountDataDeletion from "./pages/AccountDataDeletion";


function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // smoothness (0.05 = very smooth)
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="property" element={<PropertyPage />} />
          <Route path="properties/:id" element={<PropertydetailPage />} />

          <Route path="portfolio" element={<Portfolio />} />

          <Route path="investment-success" element={<InvestmentSuccess />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />

          <Route path="kyc" element={<KYCVerification />} />
    
          <Route path="kyc-submission" element={<KycSubmission />} />

          <Route path="blogs" element={<BlogPage />} />
<Route path="blog/:slug" element={<BlogDetails />} />
         
          <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="refund-cancellation-policy" element={<RefundCancellationPolicy />} />
          <Route path="shipping-delivery-policy" element={<ShippingDeliveryPolicy />} />
          <Route path="grievance-officer" element={<GrievanceOfficer />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="account-data-deletion" element={<AccountDataDeletion />} />
          
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard />{" "}
              </PrivateRoute>
            }
          />
          <Route path="broker-signup" element={<BrokerSignup />} />
          <Route path="broker-login" element={<BrokerLogin />} />
          <Route path="verification-pending" element={<VerificationPending />} />
          <Route path="broker-dashboard" element={<BrokerDashboard />} />
          <Route path="watchlist" element={<WatchList />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;