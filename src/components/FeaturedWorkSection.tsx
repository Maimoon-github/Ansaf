import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import projectHouse1 from "@/assets/project-house-1.jpg";
import projectBuilding1 from "@/assets/project-building-1.jpg";
import projectVilla1 from "@/assets/project-villa-1.jpg";
import projectApartment1 from "@/assets/project-apartment-1.jpg";
import projectHouse2 from "@/assets/project-house-2.jpg";
import projectBuilding2 from "@/assets/project-building-2.jpg";

const FeaturedWorkSection = () => {
  const projects = [
    { image: projectHouse1, name: "Modern Family Home", category: "House" },
    { image: projectBuilding1, name: "Corporate Center", category: "Building" },
    { image: projectVilla1, name: "Luxury Villa Estate", category: "Villa" },
    { image: projectApartment1, name: "Riverside Apartments", category: "Building" },
    { image: projectHouse2, name: "Contemporary House", category: "House" },
    { image: projectBuilding2, name: "Business Complex", category: "Building" },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-construction-dark mb-4">
            Our Projects
          </h2>
          <p className="text-construction-gray text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects that showcase our
            commitment to quality, innovation, and exceptional craftsmanship.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden shadow-md rounded-2xl group relative">
                {/* Image with Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4  text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md" style={{ backgroundColor: "#F89F22" }}>
                    {project.category}
                  </span>
                </div>

                {/* Card Content */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-construction-dark mb-2 group-hover:text-construction-orange transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-construction-gray">
                    {project.category} Project
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
