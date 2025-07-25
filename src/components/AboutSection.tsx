import { Button } from "@/components/ui/button";
import teamImage from "@/assets/team-planning.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-construction-dark mb-6">
              Committed To Superior
              <span className="block text-construction-orange">Quality & Results</span>
            </h2>
            <p className="text-construction-gray text-lg mb-6">
              Since 2008, we've been dedicated to delivering exceptional construction services 
              that exceed our clients' expectations. Our commitment to quality, innovation, and 
              customer satisfaction has made us a trusted partner in the construction industry.
            </p>
            <p className="text-construction-gray text-lg mb-8">
              We combine traditional craftsmanship with modern technology to create structures 
              that stand the test of time. Every project is a testament to our dedication to 
              excellence and attention to detail.
            </p>
            <Button variant="hero" size="lg">
              Learn More About Us
            </Button>
          </div>
          <div className="relative">
            <img 
              src={teamImage} 
              alt="Construction team planning" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;