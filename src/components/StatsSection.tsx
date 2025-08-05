import {Building,  Users, Award, Clock } from "lucide-react";
// import Construct from '../assets/S-08 1.svg';
const StatsSection = () => {
  const stats = [
    {
      icon: Building,
      number: "750+",
      label: "Projects Completed",
    },
    {
      icon: Users,
      number: "999+",
      label: "Happy Clients",
    },
    {
      icon: Clock,
      number: "15+",
      label: "Years Experience",
    },
    {
      icon: Award,
      number: "50+",
      label: "Team Members",
    },
  ];

  return (
    <section className="pb-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-construction-blue rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-construction-dark mb-2">
                {stat.number}
              </div>
              <div className="text-construction-gray">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;