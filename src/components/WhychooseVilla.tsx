import TurnkeyIcon from "../assets/turnkey_company_hand_offer-512 1.svg";
import FitoutIcon from "../assets/upgrading_10365526 2.svg";
import OldVilla from '../assets/villaconstructions.png';
import Modernvilla from '../assets/villaconstruction-full.png'

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 md:px-20 bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section with images */}
        <div className="space-y-6">
          <img src={OldVilla} alt="Blueprint" className="w-full h-auto" />
          <img src={Modernvilla} alt="Modern Villa" className="w-full h-auto" />
        </div>

        {/* Right Section with text */}
        <div>
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '50px' }}>
            Why Choose Ansaf Cont For Villa Construction In Dubai
          </h2>
          <p className="text-gray-700 mb-4"style={{ fontSize: '22px' }}>
            Dreaming of building your ideal home in Dubai? Ansaf Cont is your go-to villa construction company. 
            We merge in-depth local knowledge with unparalleled luxury craftsmanship to deliver bespoke solutions 
            for homeowners, investors, and developers alike. With us, building your villa in Dubai is not just 
            seamless and stylish, but also completely stress-free.
          </p>

          <h3 className="font-semibold mb-2" style={{ fontSize: '22px' }}>What Sets Us Apart</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700" style={{ fontSize: '22px' }}>
            <li>
              <strong>Local Expertise:</strong> Navigating Dubai’s permits, building codes, and authority 
              approvals is effortless with our seasoned team.
            </li>
            <li>
              <strong>Custom Designs:</strong> Every villa we construct is meticulously tailored to reflect 
              your unique lifestyle and sophisticated taste.
            </li>
            <li>
              <strong>End-To-End Service:</strong> We manage your project from initial design through to final 
              handover — stress-free.
            </li>
            <li>
              <strong>On-Time Delivery:</strong> Our projects are meticulously managed by Dubai’s top villa 
              construction contractors.
            </li>
          </ul>
        </div>
      </div>

      {/* Service Cards */}
      <div className="mt-16 grid md:grid-cols-2 gap-6" >
        {/* Turnkey Construction Card */}
        <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition"style={{maxWidth: '603px'}}>
          <div className="flex justify-between items-start mb-4">
            <img src={TurnkeyIcon} alt="Turnkey Construction" className="" width={'84px'} height={'84px'} />
            <a
              href="/services/turnkey-construction"
              className="bg-orange-500 text-white px-4 py-1 text-sm rounded flex items-center gap-1 hover:bg-orange-600"
            >
              View details →
            </a>
          </div>
          <h3 className="text-blue-800 font-semibold  mb-2" style={{fontSize: '30px'}}>Turnkey Construction</h3>
          <p className="text-gray-600 " style={{fontSize: '20px'}}>
            To bring your dream home to life, the first step is selecting the right piece of land. The ideal site will 
            set the foundation for your future sanctuary.
          </p>
        </div>

        {/* Renovation & Fit-Outs Card */}
        <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition"style={{maxWidth: '603px'}}>
          <div className="flex justify-between items-start mb-4">
            <img src={FitoutIcon} alt="Fitouts" className="" width={'84px'} height={'84px'} />
            <a
              href="/services/renovation-fitouts"
              className="bg-orange-500 text-white px-4 py-1 text-sm rounded flex items-center gap-1 hover:bg-orange-600"
            >
              View details →
            </a>
          </div>
          <h3 className="text-blue-800 font-semibold mb-2" style={{fontSize: '30px'}}>Renovation & Fit-Outs</h3>
          <p className="text-gray-600" style={{fontSize: '20px'}}>
            To bring your dream home to life, the first step is selecting the right piece of land. The ideal site will 
            set the foundation for your future sanctuary.
          </p>
        </div>
      </div>
    </section>
  );
}
