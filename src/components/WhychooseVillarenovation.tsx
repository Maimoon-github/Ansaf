import { Link } from "react-router-dom";
import VillaRenovation1 from '../assets/VillaRenovation01.png';
import villaRenovation2 from '../assets/villarenovation02.png';
import villaRenovation3 from '../assets/villarenovation03.png';
import villaRenovation4 from '../assets/villarenovation04.png';
import villaRenovation5 from '../assets/villarenovation05.png';
const services = [
  {
    title: "Precision-Driven Villa Renovations",
    description:
      "Renovating a villa demands precision, expertise, and seamless execution. At Ansaf Cont., we combine meticulous craftsmanship with efficient project management to deliver exceptional results—on time and to the highest standard. Our client-focused approach and experienced team ensure every detail aligns with your vision, transforming spaces with quality and care.",
    image: VillaRenovation1,
    link: "/services/villa-design",
    reverse: false,
  },
  {
    title: "Expert Villa Renovation & Remodeling Services",
    description:
      "Transform your space with precision and style. We specialize in end-to-end villa renovations—from structural modifications to interior enhancements—delivering customized solutions that align with your vision. Whether reimagining layouts, expanding living areas, or modernizing finishes, every project is executed with craftsmanship and attention to detail. Trust a seamless blend of innovation and expertise ...",
    image: villaRenovation2,
    link: "/services/villa-interior",
    reverse: true,
  },
  {
    title: "Integrated Villa Renovation & Design",
    description:
      "Our holistic design-build approach unifies architecture, structural upgrades, and interior finishes into a seamless process. By aligning functionality with refined aesthetics, we transform villas into cohesive, modern living spaces—delivering precision, efficiency, and enduring quality every step of the way.",
    image:  villaRenovation3,
    link: "/services/villa-architecture",
    reverse: false,
  },
  {
    title: "Transforming Villas with Adaptive Renovation Solutions",
    description:
      "Every home and homeowner has distinct needs. Our adaptive planning approach ensures flexible, tailored solutions throughout the renovation process. By listening closely, responding to evolving requirements, and applying innovative design-build strategies, we deliver refined results that align precisely...",
    image:  villaRenovation4,
    link: "/services/villa-architecture",
    reverse: true,
  },

  {
    title: "Elevating Villa Living Through Expert Renovation",
    description:
      "Villa renovation goes beyond aesthetics—it’s about redefining space to deliver greater comfort, functionality, and timeless appeal. With precision craftsmanship and a deep understanding of modern living needs, we transform aging villas into refined, efficient homes tailored to ...",
    image:  villaRenovation5,
    link: "/services/villa-architecture",
    reverse: false ,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white space-y-16" style={{paddingTop: '8rem'}}>
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
          />
          <div className="md:w-1/2 space-y-4">
            <h2 className=" font-bold text-gray-900" style={{fontSize: '50px'}}>
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
