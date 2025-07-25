import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-construction-dark/80 to-construction-blue/60"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Building Dreams,<br />
          <span className="text-construction-orange">Crafting Reality</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          We turn your construction visions into stunning realities with expert craftsmanship and innovative solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg">
            Get A Quote
          </Button>
          <Button variant="outline-white" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;