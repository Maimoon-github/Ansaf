import React from "react";
import HeaderNew from "../components/Header2";
import backgroundImage from "../assets/hero-construction1.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <HeaderNew />
      {/* Hero Text Box */}
      <div className="w-full flex justify-end items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
            Building Dreams <br /> Crafting Reality
          </h1>
          <p className="text-sm mb-6">
            Provides General Contracting Services For A Wide Range Of Clients To Achieve Each Project’s Goals.
          </p>
          <div className="flex space-x-4">
           <Link to={"/Contact-us"}> <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 text-sm font-semibold">
              Get a Quote
            </button></Link>
           <Link to={'/services'}> <button className="bg-white text-gray-800 px-5 py-2 rounded hover:bg-gray-200 text-sm font-semibold">
              Learn more...
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
