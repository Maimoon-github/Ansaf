import constructionImage from "@/assets/construction-tools.jpg";

const BannerSection = () => {
  return (
    <section className="relative py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${constructionImage})` }}
      >
        <div className="absolute inset-0 bg-construction-dark/80"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          "You construct a dream.<br />
          <span className="text-construction-orange">We will construct them into reality."</span>
        </h2>
      </div>
    </section>
  );
};

export default BannerSection;