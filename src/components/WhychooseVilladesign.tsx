import { Link } from "react-router-dom";
import Villadesign1 from '../assets/whychoosevilladesign1.png';
import Villadesign2 from '../assets/whychoosevilladesign2.png';
import Villadesign3 from '../assets/whychoosevilladesign3.png';

const services = [
  {
    title: "Why Choose Ansaf Cont For Villa Design?",
    description:
      "At Ansaf Cont, We Blend Creativity With Craftsmanship To Deliver Transformative Interior Spaces That Reflect Elegance, Innovation, And Personalized Comfort. From Expert Lighting Design To End-To-End Project Execution, We Tailor Every Detail To Your Lifestyle. Trusted Across The UAE, Our Unmatched Attention To Detail And Commitment To Excellence Make Us The Preferred Choice For Luxurious ...",
    image: Villadesign1,
    link: "/services/villa-design",
    reverse: false,
  },
  {
    title: "Crafting Luxurious Interiors",
    description:
      "At Ansaf Cont, We Believe The Heart of Luxury Lies Within. Our Team Specializes in Creating Villa Interiors That Are As Functional As They Are Beautiful. We Meticulously Blend Textures, Premium Materials, Sophisticated Color Palettes, And Intelligent Lighting To Curate A Truly High-End Living Experience. From Timeless Elegance To Cutting-Edge Contemporary, We Deliver Custom Designs Perfectly ...",
    image: Villadesign2,
    link: "/services/interior-design",
    reverse: true,
  },
  {
    title: "Award-Winning Villa Architecture And Planning By Ansaf Cont",
    description:
      "Ansaf Cont’s Team Of Seasoned Architects And Engineers Excels In Villa Architecture Design Across Dubai. We Deliver Structurally Robust And Visually Stunning Homes, All While Ensuring Full Compliance With UAE Building Codes and Sustainability ....",
    image:  Villadesign3,
    link: "/services/villa-renovation",
    reverse: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white space-y-16" style={{ paddingTop: '9rem' }}>
      {services.map((service, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            service.reverse ? "md:flex-row-reverse" : ""
          } items-center gap-8`}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full md:w-1/2 rounded shadow-md object-cover"
            style={{ height: '450px' }}
          />
          <div className="md:w-1/2 space-y-4">
            {/* Responsive title font */}
            <h2 className="font-bold text-gray-900 text-2xl md:text-5xl">
              {service.title}
            </h2>
            <p className="text-gray-700 text-base md:text-xl">
              {service.description}
            </p>
            <Link to={service.link}>
              <button className="bg-[#001F3F] text-white px-5 py-2 text-sm font-medium rounded hover:bg-[#003060] transition flex items-center gap-2">
                Learn More <span className="text-lg">»</span>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
