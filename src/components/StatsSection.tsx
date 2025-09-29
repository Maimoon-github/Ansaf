import { useState, useEffect, useRef } from "react";
import { Building, Users, Award, Clock } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { icon: Building, number: 50, suffix: "+", label: "Projects Completed" },
    { icon: Users, number: 90, suffix: "+", label: "Happy Clients" },
    { icon: Clock, number: 15, suffix: "+", label: "Years Experience" },
    { icon: Award, number: 50, suffix: "+", label: "Team Members" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  
  const startCounting = () => {
    stats.forEach((stat, i) => {
      let start = 0;
      const end = stat.number;
      const duration = 2000; // ms
      const increment = end / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts(prev =>
          prev.map((count, index) => (index === i ? Math.floor(start) : count))
        );
      }, 16);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCounts(stats.map(() => 0)); // reset to 0
            startCounting(); // start animation
          }
        });
      },
      { threshold: 0.5 } // visible at least 50%
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: "#F89F22" }}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-construction-dark mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-construction-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
