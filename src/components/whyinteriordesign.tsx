import { Link } from "react-router-dom";
import Interiordesign01 from '../assets/InteriorDesign01.png';
import Villadesign2 from '../assets/whychoosevilladesign2.png';
import Interiordesign03 from '../assets/interiordesign03.png';
import Interiordesign04 from '../assets/interiordesign04.png'
import Interiordesign05 from '../assets/interiordesign05.png'
import Interiordesign06 from '../assets/interiordesign06.png'
import Interiordesign07 from '../assets/interiordesign07.png'

const services = [
  {
    title: "Elevating Spaces with Precision Craftsmanship",
    description:
      "Interior design merges artistic vision with practical functionality to create environments that are both visually striking and highly usable. At Ansaf Cont., we specialize in transforming interior spaces to reflect refined aesthetics, enhanced comfort, and optimal performance. Our approach integrates innovative design solutions with meticulous attention to detail, ensuring every project aligns with the client’s vision ....",
    image: Interiordesign01,
    link: "/services/villa-design",
    reverse: false,
  },
  {
    title: "Contemporary Interior Solution",
    description:
      "Contemporary interior design Blends Clean Lines, Open Layouts, And Neutral Tones To Create Timeless, Functional Spaces, Inspired By Mid-200th-Century Principles, It Prioritizes Simplicity Purposeful Design, And Seamless Integration of Form And Function. Ansaf Cont. Delivers Tailored Interior Solutions That Combine Aesthetic Precision With Practical Living, Ensuring Each Project Reflects Modern Elegance And Enduring Quality.",
    image: Villadesign2,
    link: "/services",
    reverse: true,
  },
  {
    title: "Elevating Modern Interior Spaces",
    description: "Classic Interior Design Embodies European Sophistication, Blending Symmetry, Elegance, And Enduring Beauty. Characterized By Rich Textures, Refined Finishes, And Luxurious Materials, This Style Creates Spaces Of Lasting Appeal. Ansaf Cont. Brings Expert Craftsmanship And Meticulous Attention To Detail, Transforming Interiors Into Refined Environments That Balance Tradition With Modern Functionality.",
    image:  Interiordesign03,
    link: "/services/villa-renovation",
    reverse: false,
  },
  {
    title: "Timeless Elegance In Every Detail",
    description: "Classic Interior Design Embodies European Sophistication, Blending Symmetry, Elegance, And Enduring Beauty. Characterized By Rich Textures, Refined Finishes, And Luxurious Materials, This Style Creates Spaces Of Lasting Appeal. Ansaf Cont. Brings Expert Craftsmanship And Meticulous Attention To Detail, Transforming Interiors Into Refined Environments That Balance Tradition With Modern Functionality.",
    image:  Interiordesign04,
    link: "/services/villa-maintenance",
    reverse: true,
  },
  {
    title: "Elegant Interior Solutions",
    description: "Specialising in refined interior environments, Ansaf Cont. delivers sophisticated spaces that blend luxury with purpose. Our designs incorporate premium materials—such as polished metals, soft textiles, and reflective surfaces—paired with striking colour contrasts to create bold, high-impact interiors. The result is a sleek, elegant ambience that elevates any residential or commercial project.",
    image:  Interiordesign05,
    link: "/services/villa-construction",
    reverse: false,
  },
  {
    title: "Timeless Elegance, Modern Craftsmanship",
    description: "Classic interior design embodies European sophistication, blending symmetry, elegance, and enduring beauty. Characterized by rich textures, refined finishes, and luxurious materials, this style creates spaces of lasting appeal. Ansaf Cont. brings expert craftsmanship and meticulous attention to ...",
    image:  Interiordesign06,
    link: "/services", 
    reverse: true,
  },
  {
    title: "Sleek, Functional Interior Design Solutions",
    description: "Minimal interior design emphasizes simplicity, functionality, and clean aesthetics. Rooted in the less is more  principle, it utilizes neutral palettes, streamlined furnishings, and open layouts to create serene, uncluttered environments. Every detail is intentional—maximizing space, enhancing natural ....",
    image:  Interiordesign07,
    link: "/services/villa-construction",
    reverse: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white space-y-16" style={{paddingTop: '9rem'}}>
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
            className="w-full md:w-1/2 rounded shadow-md object-cover" style={{height: '450px'}}
          />
          <div className="md:w-1/2 space-y-4">
            <h2 className=" font-bold text-gray-900 text-2xl md:text-5xl" >
              {service.title}
            </h2>
            <p className="text-gray-700 " style={{fontSize: '20px'}}>{service.description}</p>
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
