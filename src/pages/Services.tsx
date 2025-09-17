import HeaderNew from "@/components/Header2";
import Servicebgimage from '../assets/service-hero.png'
import Serviceall from '../components/Services-all'
import WhyChooseUs from "@/components/WhyChooseUsSection";
import Servicequality from '@/components/ServiceQuality'
import Footer from "@/components/Footer";

const Servies = () => {
  return (
<>
 <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${Servicebgimage})` }}
    > 
<HeaderNew/>
 <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
        <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
          <h1 className="text-3xl font-bold mb-4 leading-snug">
           Services
          </h1>
          <p className="text-sm mb-6">
           We never compromise with the quality of building materials.
          </p>
        </div>
      </div>
</div>
{/* end of header  */}

{/* about services */}
<Serviceall/>
<WhyChooseUs/>
<Servicequality/>
<Footer/>
</>

  );
};
 
export default Servies;