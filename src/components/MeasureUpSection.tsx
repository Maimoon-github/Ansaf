import React from 'react';
import building1 from '../assets/building1.png';
import building2 from '../assets/building2.png';
import building3 from '../assets/building3.png';
import speedIcon from '../assets/speed-icon.svg';
import professionalIcon from '../assets/professional-icon.svg';
import supportIcon from '../assets/support-icon.svg';

const MeasureUpSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 bg-white">
      {/* Left Side - Images */}
      <div className="relative flex-1 flex justify-center items-center">
        <img src={building2} alt="building1" className="rounded-xl w-80 md:w-[550px]" />
        <img src={building1} alt="building2" className="absolute top-[-30px] right-[100px] w-32 md:w-36 rounded-xl shadow-lg" />
        <img src={building3} alt="building3" className="absolute bottom-[-20px] right-10 w-72 md:w-80 rounded-xl shadow-md" />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 text-center md:text-right" style={{textAlign:'right'}}>
        <p className="text-blue-600 font-semibold" style={{fontSize: '22px'}}>Our Professional Team</p>
        <h2 className="font-bold mt-2 mb-4" style={{fontSize: '50px'}}>
          We Measure Up Every <br /> Potentiality
        </h2>
        <p className="text-gray-600  mx-auto " style={{fontSize: '20px'}}>
          We follow starting from the pre-construction, budgeting and conceptual phase and carrying through the final project documentation
        </p>

        {/* Features */}
        <div className="mt-10 flex flex-col gap-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-4" style={{textAlign:'right'}}>
            
            <div>
              <h4 className="font-semibold text-gray-800" style={{fontSize: '24px'}}>Speed Builder</h4>
              <p className="text-lg text-gray-600" style={{fontSize: '20px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
            <img src={speedIcon} alt="Speed Builder" className="mt-1" />
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4" style={{textAlign:'right'}}>
           
            <div>
              <h4 className="font-semibold text-gray-800" style={{fontSize: '24px'}}>Professional</h4>
              <p className="text-sm text-gray-600" style={{fontSize: '20px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
             <img src={professionalIcon} alt="Professional" className="mt-1" />
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4" style={{textAlign:'right'}}>
            
            <div>
              <h4 className="font-semibold text-gray-800" style={{fontSize: '24px'}}>24/7 Support</h4>
              <p className="text-sm text-gray-600" style={{fontSize: '20px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
            <img src={supportIcon} alt="24/7 Support" className=" mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeasureUpSection;
