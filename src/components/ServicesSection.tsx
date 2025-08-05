import React from 'react';
import {
  FaMapMarkedAlt,
  FaUserTie,
  FaPhoneAlt,
  FaClipboardCheck,
  FaDraftingCompass,
  FaFileContract,
  FaTools,
  FaHardHat,
  FaKey,
} from 'react-icons/fa';

const services = [
  {
    icon: <FaMapMarkedAlt />, 
    title: 'Find The Perfect Site',
    desc: 'To bring your dream home to life, the first step is selecting the right piece of land. The ideal site will set the foundation for your future sanctuary.',
  },
  {
    icon: <FaUserTie />,
    title: 'Hire A Designer',
    desc: 'A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.',
  },
  {
    icon: <FaPhoneAlt />,
    title: 'Get In Touch',
    desc: 'You’ve made the right choice—welcome aboard! Now, relax and let us handle the rest. Your project is in capable hands. Ready to get started?',
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Site Evaluation',
    desc: 'Once you get in touch, our engineers will visit your property. They’ll assess the site to understand the best ways to position and build your design.',
  },
  {
    icon: <FaDraftingCompass />,
    title: 'Engineering Design',
    desc: 'We’ll develop a comprehensive engineering design & procurement process tailored to your project, efficiency beyond just aesthetics.',
  },
  {
    icon: <FaFileContract />,
    title: 'Contract',
    desc: 'We’ll agree on the total project cost, then review your project’s detailed specifications.',
  },
  {
    icon: <FaTools />,
    title: 'Permit Processing',
    desc: 'We Handle Building Permit Applications. Once Approved, Construction On Your Plot Can Begin.',
  },
  {
    icon: <FaHardHat />,
    title: 'Construction',
    desc: 'Once Permitted, We Begin Building Your Dream Space. We’ll Provide Regular Updates & You’re Welcome To Offer Input & See The Progress Firsthand.',
  },
  {
    icon: <FaKey />,
    title: 'Hand Over',
    desc: 'Months of work, your project complete. Keys granted, your dream home is now yours.',
  },
];

const ServicesSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h5 className="text-blue-800 text-sm font-semibold mb-1">What We Offer</h5>
          <h2 className="text-3xl font-bold text-gray-900">
            Sure We Build <span className="text-orange-500">Impressive</span>
          </h2>
        </div>
        <div className="text-gray-600 max-w-2xl text-sm leading-relaxed">
          Our Company Boasts Extensive Experience Across A Diverse Range Of Projects. We've
          Successfully Delivered Numerous <strong>Residential Projects</strong>, From Individual
          Homes To Expansive <strong>Villas</strong> And Multi-Story <strong>Buildings</strong>,
          Ensuring Quality Craftsmanship And Client Satisfaction. Our Expertise Also Extends To The{' '}
          <strong>Industrial Sector</strong>, Where We've Managed Complex Builds For Various
          Facilities, And The <strong>Commercial Sector</strong>, Bringing Innovative And Functional
          Spaces To Life For Businesses. This Broad Experience Base Allows Us To Tackle Projects Of
          Any Scale & Complexity With Confidence & Proficiency.
         
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg border hover:shadow transition duration-300" 
          >
            <div className="text-orange-500 text-2xl mb-3" >{item.icon}</div>
            <h3 className="text-blue-900 text-lg font-semibold mb-2" style={{fontSize: '28px'}}>{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{fontSize: '18px'}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;