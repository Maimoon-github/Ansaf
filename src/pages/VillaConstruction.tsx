import Header from '@/components/Header';
import villabgimage from '../assets/house-with-balcony-ladder-side 1.png'
import Footer from '@/components/Footer';
import WhyChooseUs from '@/components/WhychooseVilla';
import villaLeftImg from "@/assets/villaconstructionleft.png";
import villaRightImg from "@/assets/villaconstructionright.png";


import ImageSlider  from "../components/VillaCarousel";
import Villa1 from "../assets/viilaCaarousal1.png";
import Villa2 from "../assets/viilaCaarousal1.png";
const villaSlides = [
  {
    id: 1,
    image: Villa1,
    title: "Build Your Dream Villa in Dubai ",
    desc:
      "Imagine waking up every day in a home that reflects your taste, lifestyle, and the luxurious essence of Dubai. Choosing the right villa construction company in Dubai can make all the difference.",
  },
  {
    id: 2,
    image: Villa2,
    title: "MODERN MAKEOVER",
    desc:
      "Transform your villa with a modern aesthetic, clean lines, and updated interiors. Experience style with substance at ANSAF Villas.",
  },
];



const VillaConstruction = () => {
   const handleButtonClick = () => {
    window.location.href = "/contact"; // or any other path
  };
  return (
    <>
   <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${villabgimage})` }}
    > 
    <Header/>
     <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
           Villa Construction
          </h1>
          <p className="text-sm mb-6">
           Embarking on the journey to build your dream villa in Dubai, UAE, starts with choosing the right construction partner. Look no further – Ansaf Cont. is widely recognized as one of the top villa construction contractors in the region.
          </p>
           <button className="bg-white text-black px-5 py-2 rounded hover:bg-orange-600 text-sm font-semibold">
              BOOK AN APPOINMENT
            </button>
        </div>
      </div>
    </div>

   
       <ImageSlider slides={villaSlides} />
    <WhyChooseUs/>
    

    {/* long para */}
      <section className="bg-white py-16 px-4 md:px-8 lg:px-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Ansaf Cont: Your Partner In Dubai Villa Construction
        </h2>
        <p className="text-gray-600 mb-8 max-w-4xl">
          Building your dream villa in Dubai doesn’t have to be complicated. At Ansaf Cont, we
          transform the journey from concept to reality into a seamless, enjoyable experience. Our
          client-first approach ensures transparency and keeps you informed and in control at every
          stage.
        </p>

        {/* Process List */}
        <div className="space-y-6 mb-12">
          {[
            {
              title: "1. Initial Consultation & Design",
              desc: "It all begins with your vision. We take the time to understand your aspirations, budget, and lifestyle...",
            },
            {
              title: "2. Approvals & Paperwork",
              desc: "Navigating the complexities of permits and regulations can be daunting. We handle all necessary approvals...",
            },
            {
              title: "3. Site Preparation & Foundation",
              desc: "With the design and approvals in place, our team meticulously prepares the land...",
            },
            {
              title: "4. Construction & Quality Checks",
              desc: "This is where your vision truly takes shape. We build with only premium materials...",
            },
            {
              title: "5. Interior Finishing & Landscaping",
              desc: "Every detail matters. From the stylish interiors that reflect your taste...",
            },
            {
              title: "6. Final Inspection & Handover",
              desc: "Before we hand over the keys, we conduct a thorough final quality check...",
            },
          ].map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <p className="font-medium text-gray-800 mb-8">
          Ready to begin your villa construction journey in Dubai with <i>Ansaf Cont</i>?
        </p>

        {/* Bottom Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Block */}
          <div className="p-6">
            <img
              src={villaLeftImg}
              alt="Villa design left"
              className="mb-4 w-full h-auto object-cover rounded"
            />
            <p className="text-gray-700 mb-4">
             Building a villa isn't just about construction; it's about crafting a lifestyle. At Ansaf Cont, we're more than just villa builders – we're your partners in making your dream home a reality. Our experienced team meticulously manages every phase of the villa construction process. From the initial site analysis and architectural design to robust structural development and exquisite interior detailing, we ensure your villa is built to the highest standards of quality and precision. Whether you envision a sleek contemporary design or a timeless classic, Ansaf Cont is dedicated to transforming your dream home into a lasting reality.
            </p>
            <button className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Send Enquiry →
            </button>
          </div>

          {/* Right Block */}
          <div className=" p-6 ">
            <img
              src={villaRightImg}
              alt="Villa design right"
              className="mb-4 w-full h-auto object-cover rounded"
            />
            <p className="text-gray-700 mb-4">
             At Ansaf Cont, we specialize in delivering the best villa construction services in Dubai, seamlessly blending luxury with functionality. Our commitment to quality, attention to detail, and client-focused approach ensures each villa is not just a structure, but a personalized sanctuary. From architectural planning to the final finishing touches, we turn visions into extraordinary living spaces that reflect elegance and individuality.
            </p>
            <button className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Send Enquiry →
            </button>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
</>
 );
};

export default VillaConstruction;
