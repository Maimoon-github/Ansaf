import { useState, useEffect, useRef } from "react";
import { Building, Users, Award, Clock } from "lucide-react";

// Move stats to module scope so the reference is stable across renders.
const STATS = [
  { icon: Building, number: 50, suffix: "+", label: "Projects Completed" },
  { icon: Users, number: 90, suffix: "+", label: "Happy Clients" },
  { icon: Clock, number: 15, suffix: "+", label: "Years Experience" },
  { icon: Award, number: 50, suffix: "+", label: "Team Members" },
];

const StatsSection = () => {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Local startCounting so effect has no external function deps
    const startCounting = () => {
      STATS.forEach((stat, i) => {
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
          setCounts((prev) =>
            prev.map((count, index) => (index === i ? Math.floor(start) : count))
          );
        }, 16);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCounts(STATS.map(() => 0)); // reset to 0
            startCounting(); // start animation
          }
        });
      },
      { threshold: 0.5 } // visible at least 50%
    );

    const node = sectionRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: "#F89F22" }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-construction-dark mb-2">
                  {counts[index]}
                  {stat.suffix}
                </div>
                <div className="text-construction-gray">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
