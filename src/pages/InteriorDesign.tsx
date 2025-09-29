import HeaderNew from '@/components/Header2';
import Interiorbgimage from '../assets/interiordesign.webp'
// import ImageSlider from "./ImageSlider";
import ImageSlider from "../components/VillaCarousel";
import Interiordesign1 from "../assets/interiosdesignslider1.webp";
import Interiordesign2  from "../assets/interiordesignslider02.jpg";
import InteriorDesign from '../components/whyinteriordesign'
import roofImage from '../assets/interior-roof.png'
import interiorImage from '../assets/iNteriorlast.png'
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
const villaSlides = [
  {
    id: 1,
    image: Interiordesign1,
    title: "INTERIOR DESIGN",
    desc:
      "Interior design is the art and science of enhancing interior spaces to achieve a healthier and more aesthetically pleasing environment. It combines creativity, functionality, and personal expression to transform ....",
  },
  {
    id: 2,
    image: Interiordesign2,
    title: "Modern Living Spaces",
    desc:
      "Experience interiors that blend elegance with practicality. Our designs bring harmony, comfort, and style to every corner, creating spaces you’ll truly love to live in.",
  },
];


const InteriosDesign = () => {
     const handleButtonClick = () => {
    window.location.href = "/contact"; // or any other path
  };

  return (
    <>
  <div
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${Interiorbgimage})`, height:'700px' }}
> 
  <HeaderNew />

  <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
    {/* Alignment wrapper same as Navbar */}
    <div className="w-[90%] max-w-[1200px] mx-auto flex justify-end">
      <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-4 leading-snug">
          Interior Design
        </h1>
        <p className="text-sm mb-6">
          We set ourselves apart in the UAE's interior design landscape through our unwavering commitment to captivating interior decoration.
        </p>
        <Link to={"https://calendly.com/ansafcont-building-contracting/30min"}>
                        <button className="bg-white text-black px-5 py-2 rounded hover:bg-orange-300 text-sm font-semibold">
                          BOOK AN APPOINTMENT
                        </button>
                      </Link>
      </div>
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