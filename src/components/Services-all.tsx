import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import React from "react";
import { Link } from "react-router-dom";
import constructionImg from "@/assets/servicespageiamge.png"; // Replace with your actual image path
import { FaCheck } from "react-icons/fa";
// Import SVGs from assets
import VillaConstructionIcon from "../assets/villa-construction.svg";
import  FitoutIcon from "../assets/fitout.svg";
import InteriorDesignIcon from "../assets/interior-design.svg";
import VillaRenovationIcon from "../assets/villa-renovation.svg";
import VillaMaintenanceIcon from "../assets/villa-maintenance.svg";
import VillaDesignIcon from "../assets/map_151246 1.svg";

const services = [
  {
    title: "Villa Construction",
    icon: VillaConstructionIcon,
     link: "/services/villa-construction",
    description:
      "A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.",
  },
  {
    title: "Villa Design",
    icon:  InteriorDesignIcon,
     link: "/services/villa-design",
    description:
      "A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.",
  },
  {
    title: "Interior Design",
    icon:  VillaRenovationIcon,
     link: "/services/interior-design",
    description:
      "A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.",
  },
  {
    title: "Villa Renovation",
    icon:   FitoutIcon,
     link: "/services/villa-renovation",
    description:
      "A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.",
  },
  {
    title: "Villa Maintenance",
    icon:  VillaMaintenanceIcon,
     link: "/services/villa-construction",
    description:
      "A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.",
  },
  {
    title: "Fitout",
    icon: VillaDesignIcon,
     link: "/services/villa-construction",
    description:
      "A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.",
  },
];
export default function ServicesSection() {
  return (
    <>
     <section className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left - Image with Box */}
        <div className="relative w-full lg:w-1/2">
          <img src={constructionImg} alt="Services" className="w-full rounded-md" />

          <div className="absolute top-5 left-5 bg-white p-4 rounded-md shadow-lg max-w-[200px]">
            <h4 className="text-lg font-semibold mb-1">General Contracting</h4>
            <p className="text-sm text-gray-600">
              Sodales Consectetuer Massa Interdum Parturient Tempus Convallis Nisi Purus.
            </p>
          </div>
        </div>

        {/* Right - Text */}
        <div className="w-full lg:w-1/2">
          <h6 className="text-blue-600 font-medium mb-2">About Services</h6>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Sure We Build <br /> Impressive
          </h2>
          <div className="w-24 h-1 bg-orange-400 mb-6"></div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We have established processes and guidelines that we follow starting from the pre-construction,
            budgeting and conceptual phase and carrying.
          </p>

          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            {[
              "Villa Construction",
              "Villa Renovation",
              "Villa Design",
              "Villa Maintenance",
              "Interior Design",
              "Fitout",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <FaCheck className="text-black" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
   <section className="py-12 px-4 md:px-16">
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <img src={service.icon} alt={service.title} className="w-10 h-10" />
              <Link
                to={service.link}
                className="text-sm text-gray-600 flex items-center gap-1 hover:text-blue-700 transition"
              >
                View details <FaArrowUpRightFromSquare />
              </Link>
            </div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
