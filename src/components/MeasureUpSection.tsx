import constructionToolsImage from "@/assets/construction-tools.jpg";

const MeasureUpSection = () => {
  return (
    <section className="py-20 bg-construction-light">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-construction-dark mb-6">
              We Measure Up to Every
              <span className="block text-construction-orange">Potentiality</span>
            </h2>
            <p className="text-construction-gray text-lg mb-6">
              Our team of skilled professionals uses state-of-the-art tools and equipment 
              to ensure precision in every aspect of construction. From foundation to finishing, 
              we maintain the highest standards of quality and safety.
            </p>
            <p className="text-construction-gray text-lg mb-8">
              With years of experience and continuous training, our workforce is equipped 
              to handle complex projects while meeting tight deadlines and exceeding 
              client expectations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-construction-orange mb-2">100%</div>
                <div className="text-construction-gray">Safety Compliance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-construction-orange mb-2">24/7</div>
                <div className="text-construction-gray">Project Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-construction-orange mb-2">ISO</div>
                <div className="text-construction-gray">Certified Quality</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-construction-orange mb-2">5★</div>
                <div className="text-construction-gray">Client Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={constructionToolsImage} 
              alt="Construction workers and tools" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeasureUpSection;