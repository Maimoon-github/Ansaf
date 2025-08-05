// BannerSection.jsx
const BannerSection = ({ 
  backgroundImage, 
  title, 
  subtitle, 
  highlight, 
  overlayOpacity = 50 
}) => {
  return (
    <section className="relative py-60">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={`absolute inset-0 bg-black/${overlayOpacity}`}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {title}
          <br />
          <span className="text-orange-400">{highlight}</span>
        </h2>
        <h3 className="text-lg md:text-xl text-white mb-8">
          {subtitle}
        </h3>
      </div>
    </section>
  );
};

export default BannerSection;
