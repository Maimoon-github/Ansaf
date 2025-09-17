import { Link } from "react-router-dom";
import villamaintaince01 from '../assets/maintaincechoose01.png';
import villamaintaince02 from '../assets/maintaincechoose02.png';
import villamaintaince03 from '../assets/maintaincechoose03.png';
import villamaintaince04 from '../assets/maintaincechoose04.png';
import maintaincechoose05 from '../assets/maintaincechoose05.png';
import maintaincechoose06 from '../assets/maintaincechoose06.png';
import maintaincechoose07 from '../assets/maintaincechoose07.png';
const services = [
  {
    title: "Eco-friendly Water Tank Cleaning",
    description: (
      <div>
        Ansaf Cont. is dedicated to safeguarding your home's water quality through our eco-conscious tank cleaning services. By eliminating harmful sediment and bacterial growth, we guarantee a safe and clear water supply for your family with negligible interruption to your service.
        <ul>
          <li> Draining tank</li>
          <li> Dislodging and removing residue</li>
          <li>   Disinfecting, scrubbing and pressure-washing</li>
          <li>  all tank surfaces</li>
          <li> Drying and refilling tank</li>
        </ul>
      </div>
    ),
    image: villamaintaince02,
    link: "/services/villa-design",
    reverse: false,
  },
  {
    title: "Premier AC Repair & Maintenance Services",
    description:(
        <div>
      Ansaf Cont. provides expert AC services that enhance energy efficiency, prevent costly breakdowns, and ensure your home remains cool as temperatures climb. Depend on our skilled technicians to resolve your air conditioning issues promptly and effectively.
       <ul>
          <li> AC Installation Services </li>
          <li>  AC Repair Services</li>
          <li>   AC Maintenance Services</li>
        </ul>
      </div>
    ),
    image: villamaintaince01,
    link: "/services/villa-interior",
    reverse: true,
  },
  {
    title: "Expert Plumbing Solutions",
    description:(
        <div>
      From a dripping faucet to a major leak, we handle all your plumbing needs. Our skilled technicians manage your entire water system, including all pipes, valves, and fixtures. to ensure efficient water delivery, heating, cooling, and waste removal.
      We specialize in resolving:
       <ul>
          <li>Annoying Blockages</li>
          <li>Damaging Leaks</li>
          <li>Component Failure</li>
          <li>Broken Fixtures</li>
          <li>Flow & Control Issues</li>
          <li>Main Line Clogs</li>
        </ul>
</div>
    ),
    image:  villamaintaince03,
    link: "/services/villa-architecture",
    reverse: false,
  },
  {
    title: "Handyman Services in Dubai",
    description: (
        <div>
            Our skilled technicians are among the most experienced in the UAE, delivering proactive maintenance and rapid-response repairs to thousands of homes every week. We specialize in resolving all the common household fixes you might need,
             such as:
              <ul>
          <li>Repairing broken hinges, latches, and handles </li>
          <li>Fixing minor tile cracks</li>
          <li>Securely hanging shelves, mirrors, and pictures</li>
          <li>Unsticking jammed doors or windows</li>
          <li>Touching up paint scratches and scuffs</li>
        </ul>
    </div>
    ),
    image:  villamaintaince04,
    link: "/services/villa-architecture",
    reverse: true,
  },

  {
    title: "Expert Electrical Maintenance & Repair in Dubai",
    description:(
        <div>
            As a leading electrical maintenance firm in Dubai, our certified engineering teams possess extensive experience across the UAE. We specialize in comprehensive preventative & reactive maintenance for thousands of residential properties each week. Our expertise allows us to swiftly diagnose and resolve a full spectrum of electrical system issues, including:
            <ul>
          <li>Faulty light fittings & fixtures</li>
          <li>Compromised or non-operational power sockets</li>
          <li>Insecure electrical connections</li>
          <li>Unbalanced power loads</li>
        </ul>
        </div>
    ),
    image:  maintaincechoose05,
    link: "/services/villa-architecture",
    reverse: false ,
  },
  {
    title: "Commercial Grade Cleanliness,  Your Home",
    description:(
        <div>
        Every day, Ansaf Cont.'s expert teams clean and maintain over 302 million square feet of commercial space in Dubai. Now, we're bringing that unparalleled expertise and efficiency to your home. We understand that a busy household full of family, pets, and friends deserves a professional touch. Forget the constant struggle of keeping things tidy. We offer a streamlined process: a thorough consultation at your home to understand your needs, followed by a detailed quote for a weekly service plan designed just for you. Trust the professionals to make your home shine.
    
        </div>
    ),
    image:  maintaincechoose06,
    link: "/services/villa-architecture",
    reverse: true ,
  },
   {
    title: "Transform Your Space with Professional Painting",
    description:(
        <div>
           Ready to refresh your home or business? Whether you're looking to add a vibrant new colour, restore faded walls, or perfect your property's exterior, our expert painting services deliver flawless results. Contact mplus today to schedule a consultation.
Our Comprehensive Painting Solutions:
            <ul>
          <li>Complete interior and exterior wall painting for villas</li>
          <li>Professional interior painting for apartments</li>
          <li>Pergola re-polishing and restoration</li>
          <li>Durable road and parking line marking</li>
          <li>Precision spray painting for wooden doors</li>
        </ul>
        </div>
    ),
    image:  maintaincechoose07,
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
