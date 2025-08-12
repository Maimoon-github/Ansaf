import { motion } from "framer-motion";
import speedicons from '../assets/speedIcons.svg';
import Hiredesigner from '../assets/hire-a-designer.svg';
import GetIntouch from '../assets/get-in-touch.svg';
import SiteEvaluation from '../assets/site-evaluation.svg';
import EngineeringDesign from '../assets/engineering-design.svg';
import Contract from '../assets/contract.svg';
import PermitProcessing from '../assets/permit-processing.svg';
import Construction from '../assets/construction.svg';
import HandOver from '../assets/handover.svg';

const services = [
  { icon: <img src={speedicons} alt="" />, title: 'Find The Perfect Site', desc: 'To bring your dream home to life, the first step is selecting the right piece of land. The ideal site will set the foundation for your future sanctuary.' },
  { icon: <img src={Hiredesigner} alt="" />, title: 'Hire A Designer', desc: 'A Designer brings your vision to life. Find a pro, share specifics: floor area, rooms, bathrooms, kitchen size, garage space, maid’s room, or special needs.' },
  { icon: <img src={GetIntouch} alt="" />, title: 'Get In Touch', desc: 'You’ve made the right choice—welcome aboard! Now, relax and let us handle the rest. Your project is in capable hands. Ready to get started?' },
  { icon: <img src={SiteEvaluation} alt="" />, title: 'Site Evaluation', desc: 'Once you get in touch, our engineers will visit your property. They’ll assess the site to understand the best ways to position and build your design.' },
  { icon: <img src={EngineeringDesign} alt="" />, title: 'Engineering Design', desc: 'We’ll develop a comprehensive engineering design & procurement process tailored to your project, efficiency beyond just aesthetics.' },
  { icon: <img src={Contract} alt="" />, title: 'Contract', desc: 'We’ll agree on the total project cost, then review your project’s detailed specifications.' },
  { icon: <img src={PermitProcessing} alt="" />, title: 'Permit Processing', desc: 'We Handle Building Permit Applications. Once Approved, Construction On Your Plot Can Begin.' },
  { icon: <img src={Construction} alt="" />, title: 'Construction', desc: 'Once Permitted, We Begin Building Your Dream Space. We’ll Provide Regular Updates & You’re Welcome To Offer Input & See The Progress Firsthand.' },
  { icon: <img src={HandOver} alt="" />, title: 'Hand Over', desc: 'Months of work, your project complete. Keys granted, your dream home is now yours.' },
];

const ServicesSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-white">
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h5 className="text-blue-800 text-sm font-semibold mb-1">What We Offer</h5>
          <h2 className="text-3xl font-bold text-gray-900">
            Sure We Build <span style={{color:'#F89F22'}}>Impressive</span>
          </h2>
        </div>
        <div className="text-gray-600 max-w-2xl text-sm leading-relaxed">
          Our company boasts extensive experience across a diverse range of projects. We've successfully delivered numerous residential projects, from individual homes to expansive villas and multi-story buildings, ensuring quality craftsmanship and client satisfaction. Our expertise also extends to the industrial sector, where we've managed complex builds for various facilities, and the commercial sector, bringing innovative and functional spaces to life for businesses. This broad experience base allows us to tackle projects of any scale & complexity with confidence & proficiency.
        </div>
      </motion.div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-lg border hover:shadow-lg transition duration-300 bg-white"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-orange-500 text-2xl mb-3">{item.icon}</div>
            <h3 className="text-blue-900 font-semibold mb-2" style={{ fontSize: '28px' }}>
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontSize: '18px' }}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
