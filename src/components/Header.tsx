import { Button } from "@/components/ui/button";
import { Menu, Home } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 min-h-[100px] flex items-center">
      {/* Background with clouds effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="bg-white rounded-xl shadow-lg px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-construction-blue p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-construction-orange">ANSAF</div>
                <div className="text-xs text-construction-gray uppercase tracking-wide">Building Contracting</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <a href="#home" className="text-construction-dark font-medium hover:text-construction-orange transition-colors text-sm uppercase tracking-wide">
                HOME
              </a>
              <a href="#about" className="text-construction-dark font-medium hover:text-construction-orange transition-colors text-sm uppercase tracking-wide">
                ABOUT US
              </a>
              <a href="#services" className="text-construction-dark font-medium hover:text-construction-orange transition-colors text-sm uppercase tracking-wide">
                SERVICES
              </a>
              <a href="#projects" className="text-construction-dark font-medium hover:text-construction-orange transition-colors text-sm uppercase tracking-wide">
                PROJECTS
              </a>
              <a href="#contact" className="text-construction-dark font-medium hover:text-construction-orange transition-colors text-sm uppercase tracking-wide">
                CONTACT
              </a>
            </nav>

            <div className="hidden lg:block">
              <Button variant="hero" className="px-6 py-3 text-sm font-bold tracking-wide">
                LET'S BUILD
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-construction-dark" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-construction-light">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-construction-dark font-medium hover:text-construction-orange transition-colors">
                  HOME
                </a>
                <a href="#about" className="text-construction-dark font-medium hover:text-construction-orange transition-colors">
                  ABOUT US
                </a>
                <a href="#services" className="text-construction-dark font-medium hover:text-construction-orange transition-colors">
                  SERVICES
                </a>
                <a href="#projects" className="text-construction-dark font-medium hover:text-construction-orange transition-colors">
                  PROJECTS
                </a>
                <Button variant="hero" className="w-full mt-4">
                  LET'S BUILD
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;