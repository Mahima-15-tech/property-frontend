import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  const hideNavbar = 
  location.pathname === "/login" || 
  location.pathname === "/signup" ||
  location.pathname ===  '/broker-signup' ||
  location.pathname === '/broker-login';   



  const hideFooter = location.pathname === '/broker-dashboard';

  return (
    <>
    
       {!hideNavbar && <Navbar />}
      <Outlet />

      {!hideFooter && <Footer />}
      
      
    </>
  );
};

export default Layout;