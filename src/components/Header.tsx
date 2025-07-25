import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-construction-dark">
              BuildCraft
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-construction-dark hover:text-construction-orange transition-colors">
              Home
            </a>
            <a href="#about" className="text-construction-dark hover:text-construction-orange transition-colors">
              About Us
            </a>
            <a href="#services" className="text-construction-dark hover:text-construction-orange transition-colors">
              Services
            </a>
            <a href="#projects" className="text-construction-dark hover:text-construction-orange transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-construction-dark hover:text-construction-orange transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:block">
            <Button variant="hero">Let's Build</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-construction-dark" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-construction-light">
            <nav className="flex flex-col space-y-4 pt-4">
              <a href="#home" className="text-construction-dark hover:text-construction-orange transition-colors">
                Home
              </a>
              <a href="#about" className="text-construction-dark hover:text-construction-orange transition-colors">
                About Us
              </a>
              <a href="#services" className="text-construction-dark hover:text-construction-orange transition-colors">
                Services
              </a>
              <a href="#projects" className="text-construction-dark hover:text-construction-orange transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-construction-dark hover:text-construction-orange transition-colors">
                Contact
              </a>
              <Button variant="hero" className="w-full">Let's Build</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;