import React from 'react';
import { motion } from 'framer-motion';
import building1 from '../assets/building1.png';
import building2 from '../assets/building2.webp';
import building3 from '../assets/building3.png';
import Contract from '../assets/contract.svg';
import SpeedIcon from '../assets/speedIcons.svg';
import HandOver from '../assets/handover.svg';

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: { 
      opacity:  0, 
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0
    },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { duration: 0.6, delay } 
    }
  };
};

const MeasureUpSection = () => {
  const features = [
    { icon: SpeedIcon, title: "Speed Builder", text: "We pride ourselves on timely project delivery without compromising quality. Our efficient planning, skilled workforce, and modern construction techniques ensure your project is completed quickly and to the highest standards." },
    { icon: HandOver, title: "Professional", text: "Professionalism is at the core of everything we do. From transparent communication to ethical business practices, we maintain the highes industry standards to buildtrust and long-term partnerships with our clients." },
    { icon: Contract, title: "24/7 Support", text: "Our commitment to you doesn’t stop when the workday ends. We offer round-theclock support to address your needs, answer your questions, and ensure a smooth, stress-free construction experience at every stage." }
  ];

  return (
    <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 bg-white">
      
      {/* Left Side - Content */}
      <motion.div 
        className="flex-1"
        variants={fadeIn("left", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="text-blue-600 font-semibold text-xl md:text-2xl">
          Our Professional Team
        </p>
        <h2 className="font-bold mt-2 mb-4 text-3xl md:text-5xl">
          We Measure Up Every <br /> Potentiality
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          We follow starting from the pre-construction, budgeting and conceptual phase and carrying through the final project documentation
        </p>

        {/* Features */}
        <div className="mt-10 flex flex-col gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              className="flex items-start gap-4"
              variants={fadeIn("up", 0.3 + i * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <img src={feature.icon} alt={feature.title} className="mt-1 w-8 h-8" />
              <div>
                <h4 className="font-semibold text-gray-800 text-xl md:text-2xl">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-lg md:text-xl">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Side - Images */}
      <motion.div 
        className="relative flex-1 flex justify-center items-center"
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Main building image */}
        <motion.img 
          src={building2} 
          alt="building2" 
          className="rounded-xl w-60 sm:w-72 md:w-[550px] h-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />

        {/* Small building 1 (always absolute) */}
        <motion.img 
          src={building1} 
          alt="building1" 
          className="absolute top-[-40px] left-[10px] w-24 sm:w-32 md:w-36 rounded-xl shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Small building 3 (always absolute) */}
        <motion.img 
          src={building3} 
          alt="building3" 
          className="absolute bottom-[-100px] left-0 w-56 sm:w-72 md:w-80 rounded-xl shadow-md"
          style={{ maxWidth: '463px', height:'auto' }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </motion.div>
    </section>
  );
};

export default MeasureUpSection;
