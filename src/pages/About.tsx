import React from "react";
import HeaderNew from "../components/Header2";
import Aboutbgimage from '../assets/about-updated-banner.png'
import WhoWeAre from "@/components/Whoweare";
import  Footer from '@/components/Footer'
import BannerSection from "@/components/BannerSection";
import AboutBanner from '@/assets/aboutbanner.png';
import AboutProfessional from '@/components/aboutprofessional';
import Aboutdirector from '@/components/aBout-director';
import MeasureUpSection from "@/components/MeasureUpSection";

const AboutPage = () => {
  return (
    <>
   <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${Aboutbgimage})` }}
    > 

      <HeaderNew/>

      <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
           About Us
          </h1>
          <p className="text-sm mb-6">
           We never compromise with the quality of building materials.
          </p>
        </div>
      </div>
      </div>
{/* who we are section */}
<WhoWeAre/>
<BannerSection
      backgroundImage={AboutBanner}
        title="You construct a dream. We will construct them into reality."
        highlight=""
        subtitle="best quality services accompanied with budget control and timely completion of work." 
    />
<MeasureUpSection/>
    {/* <AboutProfessional/> */}
    <Aboutdirector/>

<Footer/>
   </>
  );
};

export default AboutPage;
