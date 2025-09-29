
import StatsSection from '@/components/StatsSection';
import ContactUshero from '../assets/ContactUs-hero.webp'
import Header2 from '@/components/Header2'
// import Header from '../components/Header'
import Footer from '@/components/Footer';
import ContactForm from '@/components/Contact-Form';
const ContactUs = () => {
return (
    <>
   <div
      className="bg-cover bg-center "
      style={{ backgroundImage: `url(${ContactUshero})`, height: '700px' }}
    > 
    <Header2/>

      {/* <Header /> */}


      {/* contact */}
<div className="w-full flex justify-center items-center h-[calc(100vh-100px)] px-6">
    {/* Alignment wrapper same as Navbar */}
    <div className="w-[90%] max-w-[1200px] mx-auto flex justify-end">
      <div className="bg-gray-900 bg-opacity-60 text-white max-w-md p-6 rounded-xl mt-10 animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-4 leading-snug">
        Contact Us
        </h1>
        <p className="text-sm mb-6">
         We never compromise with the quality of building materials.
        </p>
      </div>
    </div>
  </div>
</div>

{/* end contact */}
      
      <ContactForm/>
      <StatsSection/>
      <Footer/>

       </>
  );
};

export default ContactUs;