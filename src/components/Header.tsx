import React, { useState } from "react";
import logo from "../assets/headerlogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const servicesLinks = [
    { name: "Web Development", path: "/services/web-development" },
    { name: "App Development", path: "/services/app-development" },
    { name: "SEO Optimization", path: "/services/seo" },
    { name: "UI/UX Design", path: "/services/ui-ux" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 w-full flex justify-center pt-4 backdrop-blur-sm">
        <div
          className="bg-white rounded-xl w-11/12 max-w-7xl px-6 pt-4 flex flex-wrap md:flex-nowrap items-center justify-between shadow-md"
          style={{ height: "115px", borderBottom: "9px solid #1B4583" }}
        >
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-800 relative">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT US</Link>

            {/* Dropdown - Desktop */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="focus:outline-none">
                SERVICES ▾
              </button>
              {servicesOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 z-50">
                  {servicesLinks.map((service, idx) => (
                    <Link
                      key={idx}
                      to={service.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/projects">PROJECTS</Link>
            <Link to="/blog">BLOG</Link>
            <Link to="/pages">PAGES</Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Button */}
          <div className="hidden md:block">
            <Link to="/contact-us">
              <button className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-r-xl hover:bg-orange-600 transition">
                LETS BUILD
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-white shadow-md w-11/12 mx-auto mt-2 rounded-xl p-4 text-sm font-medium text-gray-800 space-y-2"
          style={{ fontSize: "20px" }}
        >
          <Link to="/" className="block">
            HOME
          </Link>
          <Link to="/about" className="block">
            ABOUT US
          </Link>

          {/* Mobile Dropdown */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full text-left"
            >
              SERVICES {servicesOpen ? "▴" : "▾"}
            </button>
            {servicesOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {servicesLinks.map((service, idx) => (
                  <Link
                    key={idx}
                    to={service.path}
                    className="block hover:underline"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/projects" className="block">
            PROJECTS
          </Link>
          <Link to="/blog" className="block">
            BLOG
          </Link>
          <Link to="/pages" className="block">
            PAGES
          </Link>

          <Link to="/contact-us">
            <button className="w-full mt-2 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              LETS BUILD
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
