import { Link } from "react-router-dom";
import Fitout01 from '../assets/Fitout01.png';
import Fitout02 from '../assets/Fitout02.png';
import Fitout03 from '../assets/Fitout03.png';
import Fitout04 from '../assets/Fitout04.png';
import Fitout05 from '../assets/Fitout05.png';
import Fitout06 from '../assets/Fitout06.webp';


const services = [
  {
    title: "Design and Build",
    description: (
      <div>
       We provide a seamless, all-in-one solution to bring your project to life. By uniting the design and construction phases under one roof, we ensure your vision is executed flawlessly from the initial blueprint to the final build. Our process guarantees a perfect blend of style and function, managing every detail of your new construction, renovation, or fit-out to deliver a space that is built with integrity and designed for you.
        
      </div>
    ),
    image: Fitout01,
    link: "/services/villa-design",
    reverse: false,
  },
  {
    title: "Project Management",
    description:(
        <div>
     Our seasoned project managers provide rigorous oversight for every phase of your fit-out. We are committed to the precise management of timelines, budgets, and quality control from planning through to execution. By handling all liaison with contractors, suppliers, and stakeholders, we ensure a streamlined workflow and clear communication, resulting in a successful, high-quality project delivery.
      </div>
    ),
    image: Fitout03,
    link: "/services",
    reverse: true,
  },
  {
    title: "Furniture & Fixes",
    description:(
        <div>
  Our specialty is the design and fabrication of custom furniture and fixtures, where exceptional craftsmanship meets intelligent design. We create bespoke pieces that are built to last, feel comfortable, and look stunning. By focusing on the finest details, we ensure each item seamlessly integrates into your space, elevating its ambiance while reflecting your brand's commitment to quality.
      </div>
    ),
    image: Fitout02,
    link: "/services",
    reverse: false,
  },
  {
    title: "Ansaf Cont: Crafting Dubai's Premier Interior Fit-Outs.",
    description:(
        <div>
     As a leading fit-out design and contracting firm, we deliver end-to-end solutions for your office, retail, or residential space. Our team ensures a perfect fusion of creativity, function, and quality, managing your project seamlessly from initial concept to final handover for a truly stress-free renovation.
</div>
    ),
    image:  Fitout04,
    link: "/services",
    reverse: true,
  },
  {
    title: "Comprehensive Interior Maintenance Services",
    description: (
        <div>
            We ensure your space operates at peak performance. Our team provides ongoing maintenance to preserve the aesthetic and functional quality of your interiors. Through scheduled inspections and timely repairs, we maintain a safe, secure, and efficient environment. Trust us to minimize downtime and prevent unexpected expenses with our reliable maintenance solutions.
    </div>
    ),
    image:  Fitout05,
    link: "/services",
    reverse: false,
  },

  {
    title: "Transform Your Interior. Expertly Renovated.",
    description:(
        <div>
           Ready to update your property? From simple cosmetic changes to full-scale transformations, we deliver. We partner with you to understand your goals—be it a more practical layout, premium finishes, or a renewed atmosphere. Our experts use top-tier materials and techniques to breathe new life into your space, boosting both its style and usability.
        </div>
    ),
    image:  Fitout06,
    link: "/services",
    reverse: true ,
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
            className="w-full md:w-1/2 rounded shadow-md object-cover" style={{height: '450px'}}
          />
          <div className="md:w-1/2 space-y-4">
            <h2 className=" font-bold text-gray-900 text-2xl md:text-5xl">
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
