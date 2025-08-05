import React from "react";
import { FaClock, FaTools, FaUserTie } from "react-icons/fa";

// Import your images from assets
import imageMain from "@/assets/AboutProfessionalteam1.png";       // Large construction site
import imageTop from "@/assets/AboutProfessionalteam2.png";         // Man on roof
import imageBottom from "@/assets/AboutProfessionalteam3.png";   // Handshake

const features = [
  {
    icon: <FaTools className="text-orange-500 text-2xl" />,
    title: "Speed Builder",
    description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Ut Elit Tellus, Luctus Nec Ullamcorper Mattis,"
  },
  {
    icon: <FaUserTie className="text-orange-500 text-2xl" />,
    title: "Professional",
    description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Ut Elit Tellus, Luctus Nec Ullamcorper Mattis,"
  },
  {
    icon: <FaClock className="text-orange-500 text-2xl" />,
    title: "24/7 Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Ut Elit Tellus, Luctus Nec Ullamcorper Mattis,"
  }
];

const ProfessionalTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* === Text Section === */}
        <div className="flex-1">
          <h4 className="text-blue-800 font-semibold mb-2">Our Professional Team</h4>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            We Measure Up Every <br className="hidden sm:block" />
            Potentiality
          </h2>
          <p className="text-gray-600 mb-8">
            We follow starting from the pre-construction, budgeting and conceptual phase and carrying through the final project documentation.
          </p>

          <div className="space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="shrink-0">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Image Section === */}
        <div className="flex-1 relative w-full h-full">

          {/* Main image */}
          <img
            src={imageTop}
            alt="Construction Team"
            className="rounded-xl w-full h-auto shadow-xl"
          />
          {/* Top small image */}
          <img
            src={imageMain}
            alt="Roof Work"
            className="absolute top-0 left-0 w-28 md:w-32 lg:w-36 rounded-xl shadow-lg -translate-x-1/4 -translate-y-1/4"
          />

          {/* Bottom small image */}
          <img
            src={imageBottom}
            alt="Handshake"
            className="absolute bottom-0 left-1/4 w-40 md:w-44 lg:w-52 rounded-xl shadow-lg translate-y-1/3"
          />
        </div>
      </div>
    </section>
  );
};

export default ProfessionalTeam;
