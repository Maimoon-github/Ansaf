import Header from '../components/Header'
import Fitouthero from '../assets/fitout-hero.png'
import ImageSlider from "../components/VillaCarousel";
import Fitoutbanner01 from "../assets/fitout-banner01.png";
import WhyChooseFitout from '../components/WhyChooseFitout'
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useRef } from 'react';
import Footer from '@/components/Footer';

const villaSlides = [
  {
    id: 1,
    image: Fitoutbanner01,
    title: "Redefining Luxury Living with FITOUTPRO",
    desc:
      "Move beyond the ordinary. Our high-end interior design services transform your property into a masterpiece of elegance and sophisticated style, creating an atmosphere of true luxury.",
  },
  {
    id: 2,
    image: Fitoutbanner01,
    title: "Best Furniture and Decor",
    desc:
      "Discover the pinnacle of furniture and decor excellence with FitOutPro. Elevate your space with our curated selection of the finest furnishings."
     },
  {
    id: 3,
    image: Fitoutbanner01,
    title: "New Level of Fitouts",
    desc:
      "Elevate your space with FitOutPro's custom interior solutions. Experience a new level of design excellence and personalized service."
     },
];
const Fitout = () => {
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
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${Fitouthero})` }}
    > 

      <Header />

      <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
         Services
          </h1>
          <p className="text-sm mb-6">
         We never compromise with the quality of building materials.
          </p>
           <button className="bg-white text-black px-5 py-2 rounded hover:bg-orange-600 text-sm font-semibold">
              BOOK AN APPOINMENT
            </button>
        </div>
      </div>
      </div>

       <ImageSlider slides={villaSlides} />
       <WhyChooseFitout/>
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

export default Fitout;