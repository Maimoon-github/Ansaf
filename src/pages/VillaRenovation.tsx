import HeaderNew from "@/components/Header2";
import VillaRenovationHero from '../assets/villa-renovation-hero.webp'
import VillaRenovationCard from "@/components/VillaRenovationslider";
import WhyChoosVillarenovation from '@/components/WhychooseVillarenovation';
import VillaRenovationSection from '@/components/villaRenovationparas';
import Footer from "@/components/Footer";
import { Link } from 'react-router-dom'
const VillaRenovation = () => {
  return (
    <>
  <div
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${VillaRenovationHero})`,height:'700px' }}
> 
  <HeaderNew />

  <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
    {/* Alignment wrapper same as Navbar */}
    <div className="w-[90%] max-w-[1200px] mx-auto flex justify-end">
      <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-4 leading-snug">
          Villa Renovation
        </h1>
        <p className="text-sm mb-6">
          We never compromise with the quality of building materials.
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


      <VillaRenovationCard/>
      <WhyChoosVillarenovation/>



        {/* long para */}
      <section className="bg-white py-16 px-4 md:px-8 lg:px-16 text-gray-800" >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
         Why Choose Ansaf Cont. for Your Villa Renovation?
        </h2>
        <p className="text-gray-600 mb-8 max-w-4xl" style={{fontSize: '22px'}}>
         Transform your villa into a refined, functional living space with Ansaf Cont.—a trusted name in premium renovation and remodeling across Dubai and Abu Dhabi. With deep local expertise and years of industry experience, we specialize in turning visionary concepts into seamless realities.
Our team of skilled professionals collaborates closely with you from concept to completion, ensuring every detail aligns with your lifestyle and aesthetic goals. From partial updates to full-scale refurbishments, we deliver precision craftsmanship, transparent pricing, and timely execution—without compromise.
We don’t just renovate homes; we elevate them. With a focus on quality, innovation, and enduring design, Ansaf Cont. creates spaces that are elegant, efficient, and built for the future.  
        </p>

        {/* Process List */}
        <div className="space-y-6 mb-12">
          {[
            {
              title: "Premium Villa Renovations in Dubai",
              desc: "Seamless Transformations, Tailored to Your Vision",
            },
            {
              title: "Complete Structural Overhauls",
              desc: "Redesign layouts, expand living areas, or add extensions—delivering full villa transformations for properties in need of modernization or enhanced functionality.",
            },
            {
              title: "Interior Design & Customization",
              desc: "Craft elevated living spaces with bespoke kitchens, luxury bathrooms, and refined interiors aligned with your lifestyle and aesthetic preferences.",
            },
            {
              title: "4. Construction & Quality Checks",
              desc: "This is where your vision truly takes shape. We build with only premium materials...",
            },
            {
              title: "Exterior Enhancements & Outdoor Living",
              desc: "Boost curb appeal and outdoor enjoyment with updated façades, landscaped gardens, swimming pools, and integrated entertainment zones.",
            },
            {
              title: "End-to-End Project Management",
              desc: "A single, trusted team oversees every phase—design, sourcing, construction, and final delivery—ensuring a smooth, stress-free renovation experience.",
            },  
            {
              title: "Smart & Sustainable Solutions",
              desc: "Incorporate intelligent home systems and energy-efficient technologies to enhance comfort, convenience, and environmental performance.",
            },  
          ].map((item, index) => (
            <div key={index} style={{fontSize: '22px'}}>
              <h4 className="font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
        </section>
        <VillaRenovationSection/>
          <Footer/>
         </>
  );
};

export default VillaRenovation;