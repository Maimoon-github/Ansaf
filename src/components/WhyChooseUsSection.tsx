import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import teamImage from "@/assets/team-planning.jpg";

const WhyChooseUsSection = () => {
  const advantages = [
    "Experienced and certified professionals",
    "Quality materials and modern equipment",
    "Transparent pricing with no hidden costs",
    "Timely project completion",
    "24/7 customer support and maintenance",
  ];

  const expertise = [
    { area: "Interior Design", percentage: 95 },
    { area: "House Inspection", percentage: 90 },
    { area: "Project Management", percentage: 98 },
    { area: "Construction Quality", percentage: 96 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src={teamImage} 
              alt="Construction team at work" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-construction-dark mb-6">
              We Are Advanced and
              <span className="block text-construction-orange">Right For The Way</span>
            </h2>
            
            <p className="text-construction-gray text-lg mb-8">
              Choose us for your construction needs and experience the difference that quality, 
              expertise, and dedication can make. We're committed to delivering exceptional results 
              that exceed your expectations.
            </p>

            <div className="space-y-3 mb-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-construction-orange rounded-full mr-3"></div>
                  <span className="text-construction-gray">{advantage}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6 mb-8">
              {expertise.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-construction-dark font-medium">{item.area}</span>
                    <span className="text-construction-orange font-bold">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;