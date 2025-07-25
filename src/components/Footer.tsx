import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-construction-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">BuildCraft</div>
            <p className="text-white/80 mb-6">
              Building dreams and crafting reality since 2008. We're your trusted partner 
              for all construction needs.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-white/60 hover:text-construction-orange cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-white/60 hover:text-construction-orange cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-white/60 hover:text-construction-orange cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-white/60 hover:text-construction-orange cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-construction-orange mr-3" />
                <span className="text-white/80">123 Construction Ave, Building City, BC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-construction-orange mr-3" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-construction-orange mr-3" />
                <span className="text-white/80">info@buildcraft.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-white/80 hover:text-construction-orange transition-colors">Home</a>
              <a href="#about" className="block text-white/80 hover:text-construction-orange transition-colors">About Us</a>
              <a href="#services" className="block text-white/80 hover:text-construction-orange transition-colors">Services</a>
              <a href="#projects" className="block text-white/80 hover:text-construction-orange transition-colors">Projects</a>
              <a href="#contact" className="block text-white/80 hover:text-construction-orange transition-colors">Contact</a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <form className="space-y-4">
              <Input 
                placeholder="Your Name" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input 
                type="email" 
                placeholder="Your Email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Textarea 
                placeholder="Your Message" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
              <Button variant="hero" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60">
            © 2024 BuildCraft Construction. All rights reserved. Built with quality and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;