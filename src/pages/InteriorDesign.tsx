import HeaderNew from '@/components/Header2';
import Interiorbgimage from '../assets/interiordesign.png'
// import ImageSlider from "./ImageSlider";
import ImageSlider from "../components/VillaCarousel";
import Interiordesign1 from "../assets/interiosdesignslider1.png";
import Interiordesign2  from "../assets/interiosdesignslider1.png";
import InteriorDesign from '../components/whyinteriordesign'
import roofImage from '../assets/interior-roof.png'
import interiorImage from '../assets/iNteriorlast.png'
import Footer from '@/components/Footer';
const villaSlides = [
  {
    id: 1,
    image: Interiordesign1,
    title: "VILLA RENOVATION",
    desc:
      "Villa renovation is more than just updating a space—it’s about reimagining your home to enhance comfort, functionality, and style. At ANSAF Villas, we specialize in transforming outdated villas ...",
  },
  {
    id: 2,
    image: Interiordesign2,
    title: "MODERN MAKEOVER",
    desc:
      "Transform your villa with a modern aesthetic, clean lines, and updated interiors. Experience style with substance at ANSAF Villas.",
  },
];


const InteriosDesign = () => {
     const handleButtonClick = () => {
    window.location.href = "/contact"; // or any other path
  };

  return (
    <>
   <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${Interiorbgimage})` }}
    > 
      <HeaderNew />

      <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
          Interior Design
          </h1>
          <p className="text-sm mb-6">
          we set ourselves apart in the UAE's interior design landscape through our unwavering commitment to captivating interior decoration.
          </p>
           <button className="bg-white text-black px-5 py-2 rounded hover:bg-orange-600 text-sm font-semibold">
              BOOK AN APPOINMENT
            </button>
        </div>
      </div>
      </div>
      <ImageSlider slides={villaSlides} />

<InteriorDesign/>   


<section className="py-16 px-6 lg:px-20 bg-white text-gray-800">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Comprehensive Interior Design Solutions In Dubai
          </h2>
          <p className="mb-4 text-gray-600" style={{fontSize: '20px'}}>
            Delivering tailored interior design expertise across residential and commercial sectors,
            we specialize in transforming spaces into functional, elegant environments that reflect
            client vision and lifestyle.
          </p>

          <ul className="list-disc pl-5 space-y-3 text-gray-700" style={{fontSize: '20px'}}>
            <li>
              <strong>Residential Interior Design:</strong> Redefine your home with thoughtful
              layouts, premium materials, and timeless aesthetics.
            </li>
            <li>
              <strong>Office Interior Design:</strong> Enhance workplace efficiency and brand identity
              through intelligent space planning and contemporary design solutions.
            </li>
            <li>
              <strong>Villa Interior Design:</strong> Craft luxurious, personalized interiors that
              elevate every room, blending high-end finishes with individual style.
            </li>
            <li>
              <strong>Commercial Interior Design:</strong> Make a powerful impression with
              purpose-driven designs for retail, hospitality, and corporate environments.
            </li>
            <li>
              <strong>Turnkey Interior Solutions:</strong> From concept to final handover, we manage
              every detail seamlessly—ensuring a smooth, efficient, and stress-free experience.
            </li>
          </ul>

          <p className="mt-4 text-gray-600" style={{fontSize: '20px'}}>
            With a commitment to excellence and precision, the team brings each project to life
            through innovation, quality craftsmanship, and a client-focused approach.
          </p>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Dubai’s Trusted Design & Build Partner
          </h2>
          <p className="mb-6 text-gray-600" style={{fontSize: '20px'}}>
            Renowned for excellence in the UAE's construction and design sector, Ansaf Cont delivers
            bespoke interior solutions that blend timeless elegance with practical functionality. With
            a proven track record across residential and commercial projects, our expert team
            transforms spaces with meticulous craftsmanship and innovative design.
            From concept to completion, we ensure every detail reflects your vision—delivering refined,
            high-performance environments that stand apart.
          </p>
          <img
            src={roofImage}
            alt="Roof Construction"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
    <section className="w-full px-6 py-16 md:px-20 lg:px-32 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img src={interiorImage} alt="Interior Design" className="rounded-md w-full h-auto" />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Elevating Spaces: <br />
            Premium Interior <br />
            Design And <br />
            Construction In Dubai
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            In The Heart Of Dubai’s Dynamic Skyline, Exceptional Design And Craftsmanship Come
            Together To Redefine Modern Living. Our Expert Team Specializes In Creating Refined,
            Functional Spaces That Blend Elegance With Innovation. By Integrating High-End
            Materials, Bespoke Layouts, And Advanced Building Technologies, We Deliver Interiors
            That Reflect Individual Taste And Enduring Sophistication. Every Element Is
            Meticulously Planned To Harmonize Aesthetics, Comfort, And Performance—Transforming
            Visions Into Inspired, Livable Environments.
          </p>
        </div>
      </div>
    </section>

<Footer/>

    </>
    );
};
export default InteriosDesign;