import React, { useState, useEffect, useRef } from "react";
import bgImage from "../assets/fulllbaner.png";

const WhyChooseUs = () => {
  const skills = [
    { name: "Construction", percent: 90 },
    { name: "House Renovation", percent: 70 },
    { name: "Interior Design", percent: 80 },
    { name: "Electricity", percent: 85 },
  ];

  const [progress, setProgress] = useState(skills.map(() => 0));
  const sectionRef = useRef(null);

  const animateProgress = () => {
    skills.forEach((skill, i) => {
      let start = 0;
      const end = skill.percent;
      const duration = 1500; // ms
      const step = end / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setProgress((prev) =>
          prev.map((p, index) => (index === i ? Math.floor(start) : p))
        );
      }, 16);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgress(skills.map(() => 0)); // reset
            animateProgress(); // start animation
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 max-w-4xl px-6 py-10 bg-white/50 rounded-lg shadow-lg">
        <h4 className="text-sm font-semibold mb-2"  >
          Our Professional Team
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          We Are Advanced And <br /> Right For The Work
        </h2>
        <p className="text-gray-600 mb-6">
          We have established processes and guidelines that we follow starting from the
          pre-construction, budgeting and conceptual phase and carrying through the final
          project documentation.
        </p>

        <div className="space-y-5">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {skill.name}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {progress[index]}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className=" h-2 rounded-full transition-all duration-200 ease-in-out "
                  style={{ width: `${progress[index]}%`, backgroundColor:'#F89F22' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
