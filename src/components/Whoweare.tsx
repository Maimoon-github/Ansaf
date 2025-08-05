import React from "react";
import buildingImage from "../assets/who-we-are-about-us.png"; // adjust path if needed
import { FaRegSmile, FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import StatsSection from "./StatsSection";

const Whoweare = () => {
  return (
    <div className="px-6 md:px-20 py-16 space-y-16">
      {/* Who We Are */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <p className="text-blue-600 font-semibold">Who Are We</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ansaf Contracting Staff</h2>
          <p className="text-gray-700 text-sm leading-7">
            Our key staff, most of whom have decades of professional experience, have carefully
            selected a well balanced team by combining high level practical skill and knowledge
            acquired in the eld of management and operation. This unique combination ensures
            solutions to problems encountered on most construction and engineering projects.
            Furthermore, we believe the total commitment is the key to dependable in position than
            others in the market. Our team of construction professionals offer single source
            solution for all your construction related needs. Whether its site preparation or new
            facility, we have the experience personnel to provide the highest quality construction
            on schedule and within a budget. We support our clients from project beginning to the
            commissioning of fully operational facility. Quality, service and commitment to our
            clients are our mission. We meet our client’s needs by providing superior services and
            technical excellence and by completing construction on time with the highest quality.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src={buildingImage} alt="Construction Building" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Scope & Mission */}
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-4">Scope Of Services</h3>
          <p className="text-gray-700 text-sm leading-7">
            Provides general contracting services for a wide range of clients. To achieve each
            project’s goals, we have established processes and guidelines that we follow starting
            from the pre-construction, budgeting and conceptual phase and carrying through the nal
            project documentation.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-700 text-sm leading-7">
            Our mission is to render best quality services accompanied with budget control and
            timely completion of work. We strive to consider our client views and do our best to
            fulfill their requirements for the project.
          </p>
        </div>
      </div>

      <StatsSection/>

    </div>
  );
};

export default Whoweare;
