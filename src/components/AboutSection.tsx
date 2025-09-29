import React from 'react';
import { FaHardHat, FaSmile, FaCog, FaUsers } from 'react-icons/fa';
import Engineerimage from '../assets/Engineerimage.webp';
import OngoingConstruction from '../assets/OngoingConstruction.webp';
const AboutSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Left Column */}
        <div className="md:w-1/2">
          <h5 className="text-blue-800 font-semibold text-sm mb-2">Who Are We</h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Committed To Superior <br /> Quality & Results
          </h2>
          <div className="w-16 h-1 bg-orange-400 mb-6"></div>
          <img
            src={Engineerimage}
            alt="Engineer with site"
            className="w-full rounded-lg shadow" style={{height: '478px', objectFit: 'cover'}}
          />
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-4">
          <p className="text-blue-900 font-bold " style={{fontSize: '24px'}}>
            We’re Problem-Solvers With Focus. Project Managers With Purpose. Team Players With One
            Goal In Mind: To Deliver Your Project On Time, On Budget, And On Vision.
          </p>
          <p className="text-gray-600" style={{fontSize: '0.87rem'}}>
            We Have Established Processes And Guidelines That We Follow Starting From The
            Pre-Construction, Budgeting And Conceptual Phase And Carrying Through The Final Project
            Documentation
          </p>

          <div>
            <h6 className="text-blue-900 font-semibold mt-4 mb-2" style={{fontSize: '22px'}}>Who Are We</h6>
            <div className="w-16 h-1 bg-orange-400 mb-4"></div>
            <img
              src={OngoingConstruction}
              alt="Ongoing construction"
              className="w-full rounded-lg shadow" style={{height: '417px', objectFit: 'cover'}}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
     
    </section>
  );
};

export default AboutSection;
