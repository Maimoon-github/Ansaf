import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-construction-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to build together?
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Join our team of construction professionals and be part of building the future. 
          We're always looking for talented individuals who share our passion for excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Send us your CV!
          </Button>
          <Button variant="outline-white" size="lg">
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;