// import React from "react";
import image1 from "@/assets/villlarenovationsss.png";
import image2 from "@/assets/villarenovationssss.png";
import RenovationImage from '../assets/renovationvills.png'
import RenovationvillaImage from '../assets/renovationvilla.png'

// import image3 from "@/assets/villa-renovation-3.png";

const VillaRenovationSection = () => {
  return (
    <>
    <section className="bg-white py-16 px-4 md:px-10 lg:px-16 text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-start">
        {/* Text Content */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            Transform Your Villa <br />
            With Precision Renovation By Ansaf Cont.
          </h2>

          <p className="text-gray-600 mb-5" style={{fontSize: '22px'}}>
            Redefine luxury living with expert villa renovations across Dubai and Abu Dhabi.
            Specializing in complete overhauls, targeted remodels, and custom upgrades, Ansaf Cont.
            blends innovative design with meticulous craftsmanship to transform outdated homes into
            modern, functional retreats tailored to your lifestyle. Every detail is engineered for
            elegance, efficiency, and lasting quality.
          </p>

          <p className="text-gray-600 mb-5" style={{fontSize: '22px'}}>
            Ansaf Cont. delivers seamless villa renovation and remodelling solutions across Dubai
            and Abu Dhabi, meeting the evolving needs of modern homeowners. From timeless upgrades
            to smart, integrated designs, we combine technical expertise with meticulous
            craftsmanship to bring visions to life.
          </p>

          <div className="text-gray-700 mb-6" style={{fontSize: '22px'}}>
            <p className="font-semibold mb-2">Our End-To-End Services Include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Fully custom renovations, managed from concept to completion
              </li>
              <li>
                Licensed, code-compliant execution ensuring full regulatory adherence
              </li>
              <li>
                Clear, upfront pricing and reliable on-time delivery
              </li>
            </ul>
          </div>

          <p className="text-gray-600" style={{fontSize: '22px'}}>
            Trusted for quality, transparency, and precision, we turn renovation challenges into
            lasting value.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid">
          <img
            src={image1}
            alt="Villa Renovation Step 1"
            className=" w-full h-full max-h-[440px]"
          />
          <img
            src={image2}
            alt="Villa Renovation Step 2"
            className="w-full h-full max-h-[440px]"
          />
        </div>
      </div>
    </section>
    <section className="w-full px-6 py-16 md:px-20 lg:px-32 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img src={RenovationImage} alt="Interior Design" className="rounded-md w-full h-auto" />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Tailored Home Transformations for Modern Living
          </h2>
          <p className="text-gray-700 text-base leading-relaxed"style={{fontSize: '22px'}}>
           Whether you're upgrading for comfort, accessibility, or style, Ansaf Cont. delivers custom home modification solutions across Dubai and Abu Dhabi designed to meet your unique lifestyle and functional needs.<br />

<ul> Our services include:
<ol> Smart home integration
<li> Accessibility improvements</li>
<li> Open-plan conversions </li>

<li>Kitchen and bathroom </li>

Each project is crafted with precision and purpose, blending innovation with practicality to enhance the way you live.
</ol>
</ul>
          </p>
        </div>
      </div>
    </section>
    <section className="w-full px-6 py-16 md:px-20 lg:px-32 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-10">
       
        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Premium Villa Renovation Services in Dubai & Abu Dhabi
          </h2>
          <p className="text-gray-700 text-base leading-relaxed" style={{fontSize: '22px'}}>
       Transform your space with seamless villa renovations across Dubai and Abu Dhabi. Specializing in both surface-level enhancements and complete interior overhauls, we combine contemporary design, premium materials, and precision craftsmanship to revitalize aging properties.
<ul>Our comprehensive renovation solutions include:
<ol> Wall, ceiling, and flooring upgrades
<li> Lighting and electrical system modernization</li>
<li> HVAC and plumbing improvements </li>


Elevate your home with tailored solutions built for lasting quality and modern functionality.<br />
</ol>
</ul>
          </p>
        </div>
         {/* Image */}
        <div className="w-full md:w-1/2">
          <img src={RenovationvillaImage} alt="Interior Design" className="rounded-md w-full h-auto" />
        </div>

      </div>
    </section>
    </>
  );
};

export default VillaRenovationSection;
