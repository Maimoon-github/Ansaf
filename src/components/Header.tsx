import React, { useState } from "react";
import logo from "../assets/headerlogo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 w-full flex justify-center pt-4 backdrop-blur-sm">
        <div className="bg-white rounded-xl w-11/12 max-w-7xl px-6 pt-4 flex flex-wrap md:flex-nowrap items-center justify-between shadow-md" style={{height: '115px', borderBottom: '9px solid #1B4583'}}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" />
           
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-800">
            <a href="/">HOME</a>
            <a href="/about">ABOUT US</a>
            <a href="/services">SERVICES</a>
            <a href="/projects">PROJECTS</a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Button */}
          <div className="hidden md:block">
            <button className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-r-xl hover:bg-orange-600 transition">
              LETS BUILD
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md w-11/12 mx-auto mt-2 rounded-xl p-4 text-sm font-medium text-gray-800 space-y-2" style={{fontSize:'20px'}}>
          <a href="/" className="block">HOME</a>
          <a href="/About" className="block">ABOUT US</a>
          <a href="/services" className="block">SERVICES</a>
          <a href="/projects" className="block">PROJECTS</a>
          <button className="w-full mt-2 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
            LETS BUILD
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
