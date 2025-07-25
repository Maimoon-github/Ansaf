import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import BannerSection from "@/components/BannerSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import MeasureUpSection from "@/components/MeasureUpSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <BannerSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FeaturedWorkSection />
      <MeasureUpSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;