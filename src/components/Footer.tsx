import React from "react";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


import Logo from "../assets/footerlogo.png"; // Update path as needed
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1B4583] text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Quick Links */}
       <div>
  <h4 className="font-bold text-lg mb-2">Quick Links</h4>
  <div className="h-1 w-10 bg-[#f6931e] mb-4"></div>
  <ul className="space-y-2 text-sm">
    <li><Link to="/about" className="hover:underline">About Company</Link></li>
    <li><Link to="/services" className="hover:underline">Services</Link></li>
    <li><Link to="/#projects" className="hover:underline">Our Projects</Link></li>
    <li><Link to="/Contact-us" className="hover:underline">Contact Us</Link></li>
  </ul>
</div>

        {/* Our Headquarters */}
        <div>
          <h2 className="font-bold text-lg mb-2">Our Qeadquaters</h2>
          <div className="w-12 h-[2px] bg-orange-400 mb-4"></div>
          <p className="text-sm leading-relaxed">
            DAMAC Business<br />
            Tower Office 907 - Dubai<br />
            
          </p>
          <p className="mt-4 text-sm">
            +971 45776041<br />
            
            support@ansafcont.com
          </p>
        </div>
 
        {/* Newsletter */}
        <div>
          <h2 className="font-bold text-lg mb-2">Quality is our forte</h2>
          <div className="w-12 h-[2px] bg-orange-400 mb-4"></div>
          <p className="text-sm mb-4">
            Signup our newsletter to get update information, news, or insight.
          </p>
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-2 mb-2 text-black rounded-sm"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 mb-4 text-black rounded-sm"
          />
          <button className="bg-orange-400 text-white px-6 py-2 text-sm font-semibold hover:bg-orange-500 transition-all">
            SIGN UP
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img src={Logo} alt="Ansaf Logo" className="h-14" />
          <div className="text-white space-x-2">
            <Link to="/">Terms of Use</Link> |
          <Link to="/">Privacy Policy</Link> |
          <Link to="/">License Agreements</Link>
          <div className="text-white text-xs">
          Copyright © 2025 ANSAF Building Contracting LLC
        </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
        <a href="#">  <FaFacebookF className="text-white border border-white p-1 rounded w-6 h-6" /></a>
         <a href="#"> <FaTwitter className="text-white border border-white p-1 rounded w-6 h-6" /></a>
         <a href="#"> <FaYoutube className="text-white border border-white p-1 rounded w-6 h-6" /></a>
         <a href="#"> <FaInstagram className="text-white border border-white p-1 rounded w-6 h-6" /></a>
         <a href="#"> <FaLinkedinIn className="text-white border border-white p-1 rounded w-6 h-6" /></a>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
