import React, { useRef } from 'react';
import HeaderNew from '../components/Header2'
import VillamaintenanceHero from '../assets/villa-maintaince-hero.webp'
import ImageSlider from "../components/VillaCarousel";
import maintainance1 from "../assets/Expert Water Tank Cleaning & Disinfection.webp";
import Interiordesign2  from "../assets/General Cleaning.webp";
import Interiordesign5  from "../assets/Rapid Response Plumbing.webp";
import Interiordesign3  from "../assets/For expert AC service.webp";
import Interiordesign4  from "../assets/Your Go-To Fix-It Service.webp";
import  WhyChooseMaintaince from '../components/WhyChooseMaintaince'
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '@/components/Footer';


  


const villaSlides = [
   {
    id: 1,
    image: maintainance1,
    title: "Expert Water Tank Cleaning & Disinfection",
    desc:
      "Our certified team provides a meticulous cleaning and sanitation service to ensure your water supply is hygienic and safe for use.",
  },
  {
    id: 2,
    image: Interiordesign2,
    title: "General Cleaning:",
    desc:
    "Experience the peace of mind that comes with our trusted cleaning service. We treat your home with exceptional care to deliver a beautiful, lasting clean you'll love",
  },
  {
    id: 3,
    image: Interiordesign3,
    title: "For expert A/C service",
    desc:
    "contact us today. If your system is failing to cool, the thermostat is malfunctioning, or the fan is operating loudly, we can diagnose and resolve the issue promptly.",
  },
 
  {
    id: 4,
    image: Interiordesign5,
    title: "Rapid Response Plumbing ",
    desc:
      "Experiencing a blocked toilet, water tank leakage, or a burst pipe? Our team is equipped to handle your plumbing emergencies promptly and efficiently.",
  },
  {
    id: 5,
    image: Interiordesign4,
    title: "Your Go-To Fix-It Service",
    desc:
      "That loose door hinge, that shelf you need mounted, those broken handles consider them done. We handle the hard work, so you can enjoy your home",
  },
];

const VillaMaintenance = () => {
    const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();
    if (!token) {
      alert("Please verify that you are not a robot.");
      return;
    }

    // Proceed with form submission or send to backend
    console.log("reCAPTCHA token:", token);
  };
  return (
    <>
   <div
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${VillamaintenanceHero})`, height: '700px' }}
> 
  <HeaderNew />

  <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
    {/* Alignment wrapper same as Navbar */}
    <div className="w-[90%] max-w-[1200px] mx-auto flex justify-end">
      <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-4 leading-snug">
          Villa Maintenance
        </h1>
        <p className="text-sm mb-6">
          We never compromise with the quality of building materials.
        </p>
      </div>
    </div>
  </div>
</div>


            <ImageSlider slides={villaSlides} />
            <WhyChooseMaintaince/>
      
      <section className='py-9'>
      {/* Quote Section */}
            <div className="mt-20 bg-blue-900 text-white py-12 px-6 md:px-16 ">
              <h3 className="text-xl md:text-2xl font-semibold mb-8">
                "Experience high-quality work delivered with excellence and timeliness; request your quote today."
              </h3>
              <form className="grid md:grid-cols-2 gap-6 items-end" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm mb-2">Enter your Name</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-white text-black"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Enter your Email Address</label>
                  <input
                    type="email"
                    className="w-full p-2 rounded bg-white text-black"
                    placeholder="Your Email"
                    required
                  />
                </div>
                
                {/* CAPTCHA */}
                <div className=" mt-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfS5JcrAAAAAN9F_-CE1f1zxi2cdmA1gOVaGuKA" // replace with actual site key
                  />
                </div>
                <div className="pt-6">
                  <button
                    type="submit"
                    className="bg-white text-blue-900 px-6 py-2 rounded hover:bg-gray-100 transition"
                  >
                    REQUEST A QUOTE →
                  </button>
                </div>
      
              </form>
            </div>
            </section>
<Footer/>
       </>
  );
};

export default VillaMaintenance;