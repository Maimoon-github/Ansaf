import { Card, CardContent } from "@/components/ui/card";
import projectHouse1 from "@/assets/project-house-1.jpg";
import projectBuilding1 from "@/assets/project-building-1.jpg";
import projectVilla1 from "@/assets/project-villa-1.jpg";
import projectApartment1 from "@/assets/project-apartment-1.jpg";
import projectHouse2 from "@/assets/project-house-2.jpg";
import projectBuilding2 from "@/assets/project-building-2.jpg";

const FeaturedWorkSection = () => {
  const projects = [
    {
      image: projectHouse1,
      name: "Modern Family Home",
      category: "House",
    },
    {
      image: projectBuilding1,
      name: "Corporate Center",
      category: "Building",
    },
    {
      image: projectVilla1,
      name: "Luxury Villa Estate",
      category: "Villa",
    },
    {
      image: projectApartment1,
      name: "Riverside Apartments",
      category: "Building",
    },
    {
      image: projectHouse2,
      name: "Contemporary House",
      category: "House",
    },
    {
      image: projectBuilding2,
      name: "Business Complex",
      category: "Building",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-construction-dark mb-4">
            Featured Work
          </h2>
          <p className="text-construction-gray text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects that showcase our commitment 
            to quality, innovation, and exceptional craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-construction-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-construction-dark mb-2">
                  {project.name}
                </h3>
                <p className="text-construction-gray">
                  {project.category} Project
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;