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
import Bannertool01 from '@/assets/banner-tool01.png'
const Index = () => {
  return (
    <div className="min-h-screen">
     {/* header is in herosection */}
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <BannerSection
      backgroundImage={Bannertool01}
        title="You construct a dream."
        highlight="We will construct them into reality."
        subtitle="Best quality services accompanied with budget control and timely completion of work." />
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