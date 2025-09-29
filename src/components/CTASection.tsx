import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20  text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to build together?
        </h2>
        <p className="text-xl mb-8 text-black/90 max-w-2xl mx-auto">
          Join our team of construction professionals and be part of building the future. 
          We're always looking for talented individuals who share our passion for excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{alignItems: 'center'}}>
          <Link to={'/Contact-us'}><Button variant="hero" size="lg" className="flex items-center gap-2" style={{background: 'transparent', color:'black' , }}>
            {/* <Download className="h-5 w-5" /> */}
            Contact Us
          </Button></Link>
          
        </div>
      </div>
    </section>
  );
};

export default CTASection;