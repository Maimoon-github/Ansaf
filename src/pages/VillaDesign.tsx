import Header from "@/components/Header"
import Villabgimage from '../assets/villabalcony.png'
import WhychooseVilladesign from '@/components/WhychooseVilladesign'

import ImageSlider  from "../components/VillaCarousel";
import Villa1 from "../assets/villadesigncaresoul.png";
import Villa2 from "../assets/villadesigncaresoul.png";
// import WhyChooseUs from "@/components/WhychooseVilla";
import Footer from "@/components/Footer";

const villaSlides = [
  {
    id: 1,
    image: Villa1,
    title: "VILLA DESIGN",
    desc:
      "Villa design is the art of crafting private, luxurious residences that reflect the owner's lifestyle and aesthetic preferences. At ANSAF Villas, every villa is a bespoke masterpiece designed with functionality ...",
  },
  {
    id: 2,
    image: Villa2,
    title: "MODERN MAKEOVER",
    desc:
      "Transform your villa with a modern aesthetic, clean lines, and updated interiors. Experience style with substance at ANSAF Villas.",
  },
];



const VillaDesign = () => {
     const handleButtonClick = () => {
    window.location.href = "/contact"; // or any other path
  };

  return (
    <>
   <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${Villabgimage})` }}
    > 
    <Header/>
    <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
          Villa Design
          </h1>
          <p className="text-sm mb-6">
         As a leading villa design company in the UAE, Ansaf Cont transforms your aspirations into residences that embody elegance and innovation.
          </p>
           <button className="bg-white text-black px-5 py-2 rounded hover:bg-orange-600 text-sm font-semibold">
              BOOK AN APPOINMENT
            </button>
        </div>
      </div>
    </div> 
    
    <ImageSlider slides={villaSlides} />

      <WhychooseVilladesign/>

    <Footer/>
    
       </>
 );
};

export default VillaDesign;
