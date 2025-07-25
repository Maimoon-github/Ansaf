import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Palette, Cog, Hammer, Shield, Home } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: MapPin,
      title: "Find the Perfect Site",
      description: "Expert site selection and evaluation services to ensure your project starts on the right foundation.",
    },
    {
      icon: Palette,
      title: "Hire a Designer",
      description: "Connect with our talented design professionals who bring creativity and functionality together.",
    },
    {
      icon: Cog,
      title: "Engineering Design",
      description: "Comprehensive engineering solutions that ensure structural integrity and safety in every project.",
    },
    {
      icon: Hammer,
      title: "Construction",
      description: "Full-service construction with skilled craftsmen dedicated to quality and timely completion.",
    },
    {
      icon: Shield,
      title: "Project Management",
      description: "Expert project oversight ensuring your construction stays on schedule and within budget.",
    },
    {
      icon: Home,
      title: "Interior Design",
      description: "Complete interior design services to make your space both beautiful and functional.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-construction-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-construction-dark mb-4">
            Sure We Build
            <span className="block text-construction-orange">Impressive</span>
          </h2>
          <p className="text-construction-gray text-lg max-w-2xl mx-auto">
            From initial planning to final completion, we offer comprehensive construction services 
            that cover every aspect of your building project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-construction-orange rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-construction-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-construction-gray">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;